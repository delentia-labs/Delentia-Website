// Validation schemas of the two public forms (contact, whitepaper access). They live here, not inside the components, so that
// scripts/form-schemas.test.mjs can run them through the real @hookform/resolvers on bad input: a type check cannot see whether
// the resolver and the zod version understand each other (zod 4 with resolvers 3.x type-checked fine and threw at run time).
import { z } from "zod"

export type FormLanguage = "en" | "th"

const say = (language: FormLanguage, th: string, en: string) => (language === "th" ? th : en)

export function getContactSchema(language: FormLanguage) {
  return z.object({
    name: z.string().trim().min(2, say(language, "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร", "Name must be at least 2 characters")),
    email: z.string().trim().email(say(language, "กรุณากรอกอีเมลที่ถูกต้อง", "Please provide a valid email address")),
    subject: z.string().trim().min(5, say(language, "หัวข้อต้องมีอย่างน้อย 5 ตัวอักษร", "Subject must be at least 5 characters")),
    message: z.string().trim().min(10, say(language, "ข้อความต้องมีอย่างน้อย 10 ตัวอักษร", "Message must be at least 10 characters")),
  })
}

export function getWhitepaperSchema(language: FormLanguage) {
  return z.object({
    email: z.string().trim().email(say(language, "กรุณากรอกอีเมลที่ถูกต้อง", "Please provide a valid email address")),
  })
}
