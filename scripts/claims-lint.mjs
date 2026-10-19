// Round 87: fail when the site says something it has withdrawn. Rules and allowances live in lib/claims.json.
//   node scripts/claims-lint.mjs            exit 1 and a list when a line carries a withdrawn claim with no qualifier
//   node scripts/claims-lint.mjs --report   print every hit and exit 0 (to see what the rules would catch)
import { readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative } from "node:path"

const root = process.cwd()
const config = JSON.parse(readFileSync(join(root, "lib", "claims.json"), "utf8"))
const report = process.argv.includes("--report")
const scanRoots = ["app", "components", "content", "messages", "lib"]
const extensions = new Set([".ts", ".tsx", ".mdx", ".md", ".json"])
const rules = config.rules.map((rule) => ({ ...rule, regex: new RegExp(rule.pattern, rule.flags ?? "") }))
const qualifiers = config.qualifiers.map((word) => word.toLowerCase())
const allowed = config.allowFiles.map((entry) => entry.path)

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

const hits = []
for (const base of scanRoots) {
  let files = []
  try {
    files = walk(join(root, base))
  } catch {
    continue
  }
  for (const file of files) {
    const rel = relative(root, file).replaceAll("\\", "/")
    if (allowed.some((prefix) => rel === prefix || rel.startsWith(prefix))) continue
    const lines = readFileSync(file, "utf8").split(/\r?\n/)
    lines.forEach((line, index) => {
      const lower = line.toLowerCase()
      // a code comment that explains a removal is not a claim
      const trimmed = line.trim()
      if (trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*")) return
      if (qualifiers.some((word) => lower.includes(word))) return
      for (const rule of rules) {
        if (rule.regex.test(line)) hits.push({ file: rel, line: index + 1, rule: rule.id, reason: rule.reason, text: trimmed.slice(0, 160) })
      }
    })
  }
}

if (hits.length === 0) {
  console.log("claims-lint: no withdrawn claim found outside the allowed files")
  process.exit(0)
}
for (const hit of hits) console.log(`${hit.file}:${hit.line} [${hit.rule}] ${hit.reason}\n    ${hit.text}`)
console.log(`\nclaims-lint: ${hits.length} line(s) carry a withdrawn claim. Rewrite the sentence, or, if it honestly says the thing does not exist, say so in the same line.`)
process.exit(report ? 0 : 1)
