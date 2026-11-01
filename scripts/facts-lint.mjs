// Fails when a page shows a test count that is not the one in lib/site-config.ts.
// The count is typed by hand in many sentences; this keeps them from drifting apart again
// (messages/en.json said 8,585 while every other page said 9,069).
// Files that quote an OLDER run on purpose are listed in HISTORY (changelog, corrections,
// the page that names the run it cites). Blog posts are historical articles and are not scanned.
import { readFileSync, readdirSync, statSync } from "node:fs"
import { join, relative } from "node:path"

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")
const config = readFileSync(join(ROOT, "lib/site-config.ts"), "utf8")
const m = config.match(/export const SITE_PUBLIC_SDK_TESTS = (\d+)/)
if (!m) {
  console.error("facts-lint: SITE_PUBLIC_SDK_TESTS not found in lib/site-config.ts")
  process.exit(2)
}
const current = Number(m[1]).toLocaleString("en-US")

const SCAN_DIRS = ["app", "components", "messages"]
const EXT = /\.(tsx?|json|mdx?)$/
const HISTORY = new Set([
  "app/changelog/ChangelogClient.tsx",
  "app/corrections/page.tsx",
  "app/benchmark-summary/page.tsx",
  "components/diagrams/version-timeline-graph.tsx",
])
// a test-count-like number: 7,000-9,999 written with a thousands comma, next to a word about tests
const NEAR_TESTS = /\b([7-9],\d{3})\b(?=[^\n]{0,40}(?:tests?|passed|passing|การทดสอบ|ทดสอบ|รายการ))|(?:tests?|passed|passing|การทดสอบ)[^\n]{0,40}\b([7-9],\d{3})\b/gi

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    const st = statSync(p)
    if (st.isDirectory()) {
      if (name === "node_modules" || name === ".next") continue
      walk(p, out)
    } else if (EXT.test(name)) out.push(p)
  }
  return out
}

const problems = []
for (const d of SCAN_DIRS) {
  for (const file of walk(join(ROOT, d))) {
    const rel = relative(ROOT, file).replace(/\\/g, "/")
    if (HISTORY.has(rel)) continue
    readFileSync(file, "utf8").split("\n").forEach((line, i) => {
      for (const mm of line.matchAll(NEAR_TESTS)) {
        const n = mm[1] || mm[2]
        if (n !== current) problems.push(`${rel}:${i + 1}: shows ${n}, the current count is ${current}`)
      }
    })
  }
}

if (problems.length) {
  console.error("facts-lint failed:\n" + problems.join("\n"))
  process.exit(1)
}
console.log(`facts-lint passed (current public test count ${current})`)
