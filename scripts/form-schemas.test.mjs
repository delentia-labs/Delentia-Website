// node --test scripts/form-schemas.test.mjs   (Node 22.18+ or 24: it imports the TypeScript file directly; no network)
//
// The two public forms validate with zod through @hookform/resolvers. This runs the REAL resolver on bad and good input, because that is
// where a version mismatch shows: zod 4 with resolvers 3.10 passed `tsc` and then threw a ZodError on the first invalid submit instead
// of returning the field errors the form shows to the person.
import test from "node:test"
import assert from "node:assert/strict"
import { zodResolver } from "@hookform/resolvers/zod"
import { getContactSchema, getWhitepaperSchema } from "../lib/form-schemas.ts"

const OPTIONS = { fields: {}, shouldUseNativeValidation: false }
const run = (schema, values) => zodResolver(schema)(values, undefined, OPTIONS)

test("a bad contact form comes back as field errors in the person's language, and does not throw", async () => {
  const bad = { name: "a", email: "nope", subject: "abc", message: "short" }
  const th = await run(getContactSchema("th"), bad)
  assert.deepEqual(Object.keys(th.errors).sort(), ["email", "message", "name", "subject"])
  assert.equal(th.errors.name.message, "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร")
  assert.equal(th.errors.email.message, "กรุณากรอกอีเมลที่ถูกต้อง")
  assert.deepEqual(th.values, {})
  const en = await run(getContactSchema("en"), bad)
  assert.equal(en.errors.subject.message, "Subject must be at least 5 characters")
  assert.equal(en.errors.message.message, "Message must be at least 10 characters")
})

test("a good contact form passes and its text is trimmed", async () => {
  const ok = await run(getContactSchema("en"), { name: "  Somchai  ", email: " a@b.co ", subject: "  A subject  ", message: "  A long enough message  " })
  assert.deepEqual(ok.errors, {})
  assert.deepEqual(ok.values, { name: "Somchai", email: "a@b.co", subject: "A subject", message: "A long enough message" })
})

test("only the field that is wrong is reported", async () => {
  const r = await run(getContactSchema("en"), { name: "Somchai", email: "bad", subject: "A subject", message: "A long enough message" })
  assert.deepEqual(Object.keys(r.errors), ["email"])
})

test("an empty value is an error, not a pass", async () => {
  const r = await run(getContactSchema("en"), { name: "", email: "", subject: "", message: "" })
  assert.equal(Object.keys(r.errors).length, 4)
})

test("the whitepaper form checks the e-mail address in both languages", async () => {
  const th = await run(getWhitepaperSchema("th"), { email: "x" })
  assert.equal(th.errors.email.message, "กรุณากรอกอีเมลที่ถูกต้อง")
  const en = await run(getWhitepaperSchema("en"), { email: "x" })
  assert.equal(en.errors.email.message, "Please provide a valid email address")
  const ok = await run(getWhitepaperSchema("en"), { email: "  me@example.com " })
  assert.deepEqual(ok.values, { email: "me@example.com" })
})
