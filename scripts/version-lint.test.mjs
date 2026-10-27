// node --test scripts/version-lint.test.mjs   (no network: the checker is called with a list of versions)
import test from "node:test"
import assert from "node:assert/strict"
import { check, stringsOf } from "./version-lint.mjs"

const PYPI = ["2.0.0", "2.2.6", "2.3.0", "2.3.1", "2.4.0"]
const CONFIG = (site, sdk = site) => `export const SITE_VERSION = "${site}"\nexport const SITE_PUBLIC_SDK_VERSION = "${sdk}"\n`
const run = (siteConfig, files = [], strictLatest = false) => check({ pypi: PYPI, siteConfig, files: files.map(([path, text]) => ({ path, text })), strictLatest })

test("the real newest version passes", () => {
  const r = run(CONFIG("2.4.0"))
  assert.deepEqual(r.problems, [])
  assert.deepEqual(r.warnings, [])
})

test("a version that is not out yet is refused: the site never announces it", () => {
  const r = run(CONFIG("2.4.1"))
  assert.equal(r.problems.length, 2)
  assert.match(r.problems[0], /not a release on PyPI/)
})

test("an older real version is a warning, and a failure only under --strict-latest", () => {
  assert.equal(run(CONFIG("2.3.1")).problems.length, 0)
  assert.equal(run(CONFIG("2.3.1")).warnings.length, 2)
  assert.equal(run(CONFIG("2.3.1"), [], true).problems.length, 2)
})

test("a missing or odd constant is refused", () => {
  assert.match(run("export const SITE_VERSION = `2.4.0`\n").problems.join("|"), /SITE_VERSION is missing/)
})

test("every recognisable way of stating a version is read", () => {
  const text = [
    'value: "pip install delentia-os (PyPI, 2.3.1)"',
    "delentia-os 2.4.0",
    '{ ver: "2.2.6", name: "x" }',
    'badge: "NEW v2.3.0"',
    'how: "pypi.org/project/delentia-os: 2.0.0 on 28 May 2026 to 2.4.0 on 26 October 2026."',
  ].join("\n")
  assert.deepEqual(stringsOf(text).map((f) => f.version).sort(), ["2.0.0", "2.2.6", "2.3.0", "2.3.1", "2.4.0", "2.4.0"])
})

test("a release that PyPI never had is refused wherever it is stated (the research page once listed v2.3.0 to v2.5.0 dated February-March 2026)", () => {
  const r = run(CONFIG("2.4.0"), [["app/research.tsx", 'badge: "v2.5.0",\nbadge: "v2.3.1",'], ["app/p.tsx", 'ver: "5.4.5"']])
  assert.equal(r.problems.length, 2)
  assert.ok(r.problems.some((p) => p.startsWith("app/research.tsx:1:") && p.includes("2.5.0")))
  assert.ok(r.problems.some((p) => p.startsWith("app/p.tsx:1:") && p.includes("5.4.5")))
})

test("the same mistake twice on one line is reported once", () => {
  const r = run(CONFIG("2.4.0"), [["a.tsx", 'x ? "delentia-os 9.9.9" : "delentia-os 9.9.9"']])
  assert.equal(r.problems.length, 1)
})

test("the marker and the UNUSED header skip a line or a file", () => {
  assert.equal(run(CONFIG("2.4.0"), [["a.tsx", 'ver: "9.9.9" // version-lint-ignore'], ["b.tsx", '// UNUSED since Round 87\nver: "9.9.9"']]).problems.length, 0)
})

test("a number that is not a delentia-os version is left alone", () => {
  assert.equal(run(CONFIG("2.4.0"), [["a.tsx", 'next 16.4.0 and mem0ai 2.2.1 and "version": "2.1.0"']]).problems.length, 0)
})
