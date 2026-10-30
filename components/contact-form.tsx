"use client"

import { useEffect, useMemo, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { getContactSchema } from "@/lib/form-schemas"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import type { Language } from "@/components/language-provider"

interface ContactFormProps {
  language: Language
  initialContext?: string
  initialValues?: Partial<ContactFormValues>
}

interface ContactApiSuccess {
  success: true
  message: string
}

interface ContactApiFailure {
  success: false
  errors?: Partial<Record<keyof ContactFormValues, string>>
  message?: string
  error?: string
}

const contactCopy: Record<Language, {
  labels: {
    name: string
    email: string
    subject: string
    message: string
    submit: string
    sending: string
    sendAnother: string
  }
  placeholders: {
    name: string
    email: string
    subject: string
    message: string
  }
  success: {
    title: string
    description: string
  }
  errors: {
    generic: string
    connection: string
  }
}> = {
  en: {
    labels: {
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      submit: "Send Message",
      sending: "Sending...",
      sendAnother: "Send Another Message",
    },
    placeholders: {
      name: "Your name",
      email: "you@example.com",
      subject: "What is this about?",
      message: "Tell us more about your project, question, or partnership request...",
    },
    success: {
      title: "Thank You!",
      description: "We&apos;ve received your message and will get back to you soon.",
    },
    errors: {
      generic: "An error occurred. Please try again.",
      connection: "Failed to send message. Please try again.",
    },
  },
  th: {
    labels: {
      name: "ชื่อ",
      email: "อีเมล",
      subject: "หัวข้อ",
      message: "ข้อความ",
      submit: "ส่งข้อความ",
      sending: "กำลังส่ง...",
      sendAnother: "ส่งข้อความอีกครั้ง",
    },
    placeholders: {
      name: "ชื่อของคุณ",
      email: "you@example.com",
      subject: "ต้องการติดต่อเรื่องอะไร",
      message: "เล่าเพิ่มเติมเกี่ยวกับโปรเจกต์ คำถาม หรือความต้องการร่วมงานกับเรา...",
    },
    success: {
      title: "ขอบคุณ!",
      description: "เราได้รับข้อความของคุณแล้ว และจะติดต่อกลับโดยเร็วที่สุด",
    },
    errors: {
      generic: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
      connection: "ไม่สามารถส่งข้อความได้ กรุณาลองใหม่อีกครั้ง",
    },
  },
}

type ContactFormValues = {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactForm({ language, initialContext = "contact", initialValues }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState("")
  const copy = contactCopy[language]
  const schema = useMemo(() => getContactSchema(language), [language])
  const resolvedDefaults = useMemo<ContactFormValues>(() => ({
    name: "",
    email: "",
    subject: initialValues?.subject ?? "",
    message: initialValues?.message ?? "",
  }), [initialValues?.message, initialValues?.subject])

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: resolvedDefaults,
  })

  useEffect(() => {
    form.reset(resolvedDefaults)
  }, [form, resolvedDefaults])

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError("")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale: language, context: initialContext }),
      })

      const result = (await response.json()) as ContactApiSuccess | ContactApiFailure

      if (!response.ok || !result.success) {
        if ("errors" in result && result.errors) {
          for (const [field, message] of Object.entries(result.errors)) {
            if (!message) continue
            form.setError(field as keyof ContactFormValues, { message })
          }
        }
        const errorMessage = ("message" in result && result.message) || ("error" in result && result.error) || copy.errors.generic
        setServerError(errorMessage)
        toast.error(errorMessage)
        return
      }

      setSubmitted(true)
      form.reset(resolvedDefaults)
      toast.success(result.message)
    } catch {
      setServerError(copy.errors.connection)
      toast.error(copy.errors.connection)
    }
  })

  if (submitted) {
    return (
      <div className="py-12 text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-warm-amber" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">{copy.success.title}</h2>
          <p className="text-lg text-muted-foreground">{copy.success.description}</p>
        </div>
        <Button type="button" variant="outline" onClick={() => setSubmitted(false)}>
          {copy.labels.sendAnother}
        </Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6 rounded-lg border border-border bg-card p-8">
        {serverError ? (
          <div className="flex gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
            <p className="text-sm text-destructive">{serverError}</p>
          </div>
        ) : null}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{copy.labels.name}</FormLabel>
              <FormControl>
                <Input placeholder={copy.placeholders.name} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{copy.labels.email}</FormLabel>
              <FormControl>
                <Input type="email" placeholder={copy.placeholders.email} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{copy.labels.subject}</FormLabel>
              <FormControl>
                <Input placeholder={copy.placeholders.subject} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{copy.labels.message}</FormLabel>
              <FormControl>
                <Textarea rows={6} placeholder={copy.placeholders.message} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className="w-full">
          {form.formState.isSubmitting ? copy.labels.sending : copy.labels.submit}
        </Button>
      </form>
    </Form>
  )
}
