// node --test scripts/email-valid.test.mjs   (Node 22.18+ or 24: it imports the TypeScript file directly; no network)
//
// The contact form, the newsletter and the waitlist all ask lib/email-valid.ts whether an address looks like an address.
// The pattern behind it grows with the square of the input on a long near-match, so the length is checked first.
import test from "node:test"
import assert from "node:assert/strict"
import { isPlausibleEmail, MAX_EMAIL_LENGTH } from "../lib/email-valid.ts"

test("ordinary addresses pass, broken ones do not", () => {
  for (const ok of ["a@b.co", "user+tag@example.com", "first.last@sub.example.org"]) assert.equal(isPlausibleEmail(ok), true, ok)
  for (const bad of ["", "a@b", "a b@c.com", "@x.com", "a@.com", "nope", "a@b@c.com"]) assert.equal(isPlausibleEmail(bad), false, bad)
})

test("not a string is never an address", () => {
  for (const v of [null, undefined, 42, {}, [], true]) assert.equal(isPlausibleEmail(v), false)
})

test("spaces around an address are ignored by default and refused when trim is off (the contact form never accepted them)", () => {
  assert.equal(isPlausibleEmail("  a@b.co  "), true)
  assert.equal(isPlausibleEmail("  a@b.co  ", { trim: false }), false)
  assert.equal(isPlausibleEmail("a@b.co", { trim: false }), true)
})

test("the longest allowed address passes the length check and one character more does not", () => {
  const local = "a".repeat(MAX_EMAIL_LENGTH - "@b.co".length)
  assert.equal(isPlausibleEmail(local + "@b.co"), true)
  assert.equal(isPlausibleEmail("a" + local + "@b.co"), false)
})

test("a long near-match is refused at once instead of being searched (the polynomial case)", () => {
  const hostile = "a@" + "a.".repeat(50_000)                              // 100,002 characters that almost match
  const started = process.hrtime.bigint()
  assert.equal(isPlausibleEmail(hostile), false)
  const ms = Number(process.hrtime.bigint() - started) / 1e6
  assert.ok(ms < 50, `took ${ms} ms`)
  const justUnder = "a@" + "a.".repeat((MAX_EMAIL_LENGTH - 2) / 2)          // the longest near-match the pattern is ever shown
  const t2 = process.hrtime.bigint()
  isPlausibleEmail(justUnder)
  assert.ok(Number(process.hrtime.bigint() - t2) / 1e6 < 50)
})
