// Round 104: the site must not name a delentia-os version that PyPI does not have.
//
//   node scripts/version-lint.mjs                 check against PyPI (falls back to lib/pypi-releases.json when PyPI cannot be reached)
//   node scripts/version-lint.mjs --offline       check against lib/pypi-releases.json only
//   node scripts/version-lint.mjs --update        rewrite lib/pypi-releases.json from PyPI, then check
//   node scripts/version-lint.mjs --strict-latest also fail when SITE_VERSION is older than the newest release (for a scheduled run)
//   node scripts/version-lint.mjs --root <dir>    check another copy of the site (used by the tests)
//
// What it checks:
//   1. SITE_VERSION and SITE_PUBLIC_SDK_VERSION in lib/site-config.ts are real releases, and not newer than the newest one (the site never announces a version that is not out).
//   2. Every place that states a delentia-os version in a recognisable form names a real release:
//        "delentia-os 2.3.1"   "(PyPI, 2.3.1)"   ver: "2.3.1"   badge: "v2.3.1" / "NEW v2.3.1"   "pypi.org/project/delentia-os: 2.0.0 ... to 2.4.0"
//      A line that carries the marker `version-lint-ignore` is skipped. content/readmes/ (mirrors of other repositories) is not scanned.
// The reason it exists: the research page once listed releases v2.3.0, v2.3.1, v2.4.0 and v2.5.0 dated February-March 2026 when PyPI's first 2.3.x was published in October 2026.
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs"
import { join, relative } from "node:path"

const args = process.argv.slice(2)
const flag = (name) => args.includes(name)
const rootIndex = args.indexOf("--root")
const root = rootIndex >= 0 ? args[rootIndex + 1] : process.cwd()
const snapshotPath = join(root, "lib", "pypi-releases.json")
const scanRoots = ["app", "components", "lib", "messages"]
const extensions = new Set([".ts", ".tsx", ".mdx", ".md", ".json"])

const versionKey = (v) => v.split(".").map((n) => Number.parseInt(n, 10))
function compare(a, b) {
  const x = versionKey(a)
  const y = versionKey(b)
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    const d = (x[i] ?? 0) - (y[i] ?? 0)
    if (d !== 0) return d
  }
  return 0
}

async function fetchPypi() {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 15000)
  try {
    const response = await fetch("https://pypi.org/pypi/delentia-os/json", { signal: controller.signal, headers: { "User-Agent": "delentia-site-version-lint" } })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const data = await response.json()
    const versions = Object.entries(data.releases ?? {})
      .filter(([, files]) => Array.isArray(files) && files.length > 0)
      .map(([version]) => version)
      .filter((v) => /^\d+\.\d+\.\d+$/.test(v))
      .sort(compare)
    if (versions.length === 0) throw new Error("no releases in the answer")
    return versions
  } finally {
    clearTimeout(timer)
  }
}

function readSnapshot() {
  const data = JSON.parse(readFileSync(snapshotPath, "utf8"))
  return { versions: [...data.versions].sort(compare), fetched: data.fetched }
}

export function stringsOf(text) {
  // Every (version, kind) the text states in a recognisable form.
  const found = []
  const patterns = [
    [/delentia-os\s+v?(\d+\.\d+\.\d+)/g, "delentia-os X.Y.Z"],
    [/\(PyPI,\s*v?(\d+\.\d+\.\d+)\)/g, "(PyPI, X.Y.Z)"],
    [/\bver:\s*"(\d+\.\d+\.\d+)"/g, 'ver: "X.Y.Z"'],
    [/\bbadge:\s*"(?:NEW\s+)?v(\d+\.\d+\.\d+)"/g, 'badge: "vX.Y.Z"'],
  ]
  for (const [regex, kind] of patterns) for (const m of text.matchAll(regex)) found.push({ version: m[1], kind, index: m.index })
  for (const m of text.matchAll(/pypi\.org\/project\/delentia-os:[^"`\n]*/g)) {
    for (const v of m[0].matchAll(/\b(\d+\.\d+\.\d+)\b/g)) found.push({ version: v[1], kind: "pypi.org/project/delentia-os: ...", index: m.index })
  }
  return found
}

function walk(dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    const stats = statSync(full)
    if (stats.isDirectory()) {
      if (name === "node_modules" || name === ".next") continue
      out.push(...walk(full))
    } else {
      const dot = name.lastIndexOf(".")
      if (dot >= 0 && extensions.has(name.slice(dot))) out.push(full)
    }
  }
  return out
}

export function check({ pypi, siteConfig, files, strictLatest = false }) {
  const problems = []
  const warnings = []
  const known = new Set(pypi)
  const latest = pypi[pypi.length - 1]
  for (const key of ["SITE_VERSION", "SITE_PUBLIC_SDK_VERSION"]) {
    const m = siteConfig.match(new RegExp(`export const ${key}\\s*=\\s*"(\\d+\\.\\d+\\.\\d+)"`))
    if (!m) {
      problems.push(`lib/site-config.ts: ${key} is missing or is not a plain X.Y.Z string`)
      continue
    }
    if (!known.has(m[1])) problems.push(`lib/site-config.ts: ${key} = ${m[1]} is not a release on PyPI (newest is ${latest}): the site would announce a version that is not out`)
    else if (compare(m[1], latest) < 0) {
      const text = `lib/site-config.ts: ${key} = ${m[1]} but PyPI's newest is ${latest}`
      if (strictLatest) problems.push(text)
      else warnings.push(text)
    }
  }
  const seen = new Set()
  for (const { path, text } of files) {
    if (text.startsWith("// UNUSED")) continue                       // a file that says in its first line that it is not rendered anywhere
    const lines = text.split("\n")
    let offset = 0
    const lineStarts = lines.map((l) => { const s = offset; offset += l.length + 1; return s })
    for (const { version, kind, index } of stringsOf(text)) {
      let line = 0
      while (line + 1 < lineStarts.length && lineStarts[line + 1] <= index) line++
      if (lines[line].includes("version-lint-ignore")) continue
      const key = `${path}:${line}:${version}`
      if (seen.has(key)) continue
      seen.add(key)
      if (!known.has(version)) problems.push(`${path}:${line + 1}: ${kind} names ${version}, which is not a delentia-os release on PyPI`)
    }
  }
  return { problems, warnings }
}

async function main() {
  let pypi
  let source
  if (flag("--offline")) {
    const snap = readSnapshot()
    pypi = snap.versions
    source = `the snapshot of ${snap.fetched} (offline)`
  } else {
    try {
      pypi = await fetchPypi()
      source = "PyPI"
      if (flag("--update")) {
        writeFileSync(snapshotPath, JSON.stringify({ package: "delentia-os", fetched: new Date().toISOString().slice(0, 10), latest: pypi[pypi.length - 1], versions: pypi }, null, 2) + "\n")
        console.log(`updated ${relative(root, snapshotPath)}`)
      }
    } catch (error) {
      const snap = readSnapshot()
      pypi = snap.versions
      source = `the snapshot of ${snap.fetched} (PyPI could not be reached: ${error.message})`
    }
  }
  const files = []
  for (const base of scanRoots) {
    let list = []
    try { list = walk(join(root, base)) } catch { continue }
    for (const file of list) files.push({ path: relative(root, file).replaceAll("\\", "/"), text: readFileSync(file, "utf8") })
  }
  const siteConfig = readFileSync(join(root, "lib", "site-config.ts"), "utf8")
  const { problems, warnings } = check({ pypi, siteConfig, files, strictLatest: flag("--strict-latest") })
  console.log(`delentia-os releases (${source}): ${pypi.join(", ")}`)
  for (const w of warnings) console.log(`warning: ${w}`)
  if (problems.length) {
    for (const p of problems) console.error(`FAIL: ${p}`)
    console.error(`${problems.length} version problem(s)`)
    process.exit(1)
  }
  console.log(`version lint passed (${files.length} files scanned)`)
}

if (import.meta.url === `file://${process.argv[1].replaceAll("\\", "/")}` || process.argv[1]?.endsWith("version-lint.mjs")) await main()
