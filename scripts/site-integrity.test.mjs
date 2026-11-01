// node --test scripts/site-integrity.test.mjs   (Node 22+; no network; needs `npm ci` for @mdx-js/mdx)
//
// Four things that went wrong on the live site and that nothing was checking (found by crawling every URL of the sitemap on 2026-11-01):
//  1. the sitemap and the JSON-LD named a page by its OLD route name, so a URL that returns 404 was offered to search engines;
//  2. the Documentation redirect pointed at a GitHub Pages address with the wrong letter case, which also returns 404;
//  3. a README that uses an HTML <img> failed to compile as MDX, which would fail the build of the GitHub hub pages;
//  4. the entity pages declared an English canonical on their Thai twins.
import test from "node:test"
import assert from "node:assert/strict"
import { existsSync, readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { compile } from "@mdx-js/mdx"

const root = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")
const read = (p) => readFileSync(join(root, p), "utf-8")

function routeExists(path) {
  if (path === "" || path === "/") return existsSync(join(root, "app", "page.tsx"))
  let dir = join(root, "app")
  for (const seg of path.replace(/^\//, "").split("/")) {
    if (existsSync(join(dir, seg))) { dir = join(dir, seg); continue }
    const dynamic = existsSync(dir) ? readdirSync(dir).find((d) => /^\[.+\]$/.test(d)) : null
    if (!dynamic) return false
    dir = join(dir, dynamic)
  }
  return existsSync(join(dir, "page.tsx")) || existsSync(join(dir, "page.mdx"))
}

function redirectSources() {
  return new Set([...read("next.config.mjs").matchAll(/source:\s*"([^"]+)"/g)].map((m) => m[1]))
}

test("every path the sitemap table names is a real route or a redirect", () => {
  const paths = [...read("lib/site-config.ts").matchAll(/^\s*"(\/[^"]*)"(?::\s*[\d.]+)?\s*,?\s*$/gm)].map((m) => m[1])
  assert.ok(paths.length > 50, `expected a long list of paths, found ${paths.length}`)
  const redirects = redirectSources()
  const notPages = new Set(["/api", "/admin", "/analytics", "/monitor", "/owner", "/studio", "/test-console", "/websocket"])      // the robots.txt disallow list shares the file
  const missing = [...new Set(paths)].filter((p) => !notPages.has(p) && !routeExists(p) && !redirects.has(p))
  assert.deepEqual(missing, [], `these paths are in lib/site-config.ts but have no route: ${missing.join(", ")}`)
})

test("a page that was renamed is not still named by its old address in the structured data", () => {
  for (const file of ["app/compare/page.tsx", "app/compare/delentiadb-vs-vector-databases/page.tsx", "lib/site-config.ts"]) {
    assert.ok(!read(file).includes("/compare/rctdb-vs-vector-databases"), `${file} still names the old compare route`)
  }
  // and the old address redirects to the new one, never to itself
  assert.match(read("next.config.mjs"), /source:\s*"\/compare\/rctdb-vs-vector-databases",\s*destination:\s*"\/compare\/delentiadb-vs-vector-databases"/)
})

test("external redirects keep the letter case of the address they point at", () => {
  const config = read("next.config.mjs")
  for (const m of config.matchAll(/destination:\s*"(https:\/\/delentia-labs\.github\.io\/[^"]*)"/g)) {
    assert.ok(m[1].includes("/Delentia-OS/"), `${m[1]} must use /Delentia-OS/ (GitHub Pages is case sensitive and the lower-case address is a 404)`)
  }
})

test("the entity pages declare the canonical of their own language", () => {
  const page = read("app/entity/[term]/page.tsx")
  assert.ok(!/canonical:\s*`https:\/\/delentia\.com\/en\/entity/.test(page), "the entity canonical is hard-coded to English")
  assert.match(page, /canonical:\s*`https:\/\/delentia\.com\/\$\{locale\}\/entity\/\$\{term\}`/)
})

test("the ecosystem pages take the locale of the request, not params of a route that has no locale segment", () => {
  for (const file of ["app/ecosystem/github/page.tsx", "app/ecosystem/github/delentia-os/page.tsx", "app/ecosystem/github/infra/page.tsx"]) {
    const src = read(file)
    assert.ok(!/const \{ locale \} = await params/.test(src), `${file} reads the locale from params`)
    assert.ok(src.includes("getRequestLocale"), `${file} does not use getRequestLocale`)
  }
})

test("a README with an HTML image compiles as MDX once the site's sanitizer has run", async () => {
  const source = read("lib/github-api.ts")
  const body = source.match(/export function sanitizeMarkdown\(content: string\): string \{([\s\S]*?)\n\}/)
  assert.ok(body, "sanitizeMarkdown is not exported or its shape changed")
  const sanitize = new Function("content", body[1])
  const readme = '# Title\n\n<p align="center"><img src="https://example.org/a.svg" alt="a" width="640"></p>\n\nText with <50ms and < 16GB.\n\n<br>\n'
  await assert.rejects(() => compile('<p><img src="https://example.org/a.svg"></p>'), /closing tag/, "an unclosed <img> fails raw (this is the problem the sanitizer exists for)")
  await compile(sanitize(readme))                                  // must not throw
  assert.match(sanitize('<img src="x">'), /<img src="x" \/>/)
  assert.equal(sanitize('<img src="x" />'), '<img src="x" />')     // an already closed tag is left alone
})
