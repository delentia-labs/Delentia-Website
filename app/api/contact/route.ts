import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase"
import { isPlausibleEmail } from "@/lib/email-valid"

interface ContactInsertPayload {
  name: string
  email: string
  subject: string
  message: string
  locale: string
  context: string
  submitted_at: string
}

interface ContactInsertResult {
  error: { message: string } | null
}

interface ContactsTableClient {
  insert: (payload: ContactInsertPayload) => Promise<ContactInsertResult>
}

interface ContactSupabaseClient {
  from: (table: "contacts") => ContactsTableClient
}

const validateContactForm = (data: Record<string, unknown>) => {
  const errors: Record<string, string> = {}

  if (!data.name || typeof data.name !== "string" || data.name.trim().length < 2)
    errors.name = "Name must be at least 2 characters"

  if (!isPlausibleEmail(data.email, { trim: false }))
    errors.email = "Please provide a valid email address"

  if (!data.subject || typeof data.subject !== "string" || data.subject.trim().length < 5)
    errors.subject = "Subject must be at least 5 characters"

  if (!data.message || typeof data.message !== "string" || data.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters"

  return { isValid: Object.keys(errors).length === 0, errors }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { isValid, errors } = validateContactForm(body)

    if (!isValid) {
      return NextResponse.json({ success: false, errors }, { status: 400 })
    }

    const { name, email, subject, message, locale = "en", context = "contact" } = body

    try {
      const supabase = getSupabaseAdmin() as unknown as ContactSupabaseClient
      const payload: ContactInsertPayload = {
        name: String(name).trim(),
        email: String(email).trim().toLowerCase(),
        subject: String(subject).trim(),
        message: String(message).trim(),
        locale: String(locale),
        context: String(context),
        submitted_at: new Date().toISOString(),
      }
      const { error } = await supabase.from("contacts").insert(payload)
      if (error) {
        console.error("Supabase contact insert error:", error.message)
      }
    } catch (dbErr) {
      console.error("Supabase unavailable:", dbErr)
    }

    return NextResponse.json(
      { success: true, message: "Thank you for reaching out. We'll get back to you within 1 business day!" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ success: false, error: "An error occurred. Please try again." }, { status: 500 })
  }
}
