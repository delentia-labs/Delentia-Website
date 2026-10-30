"use client"

import Link from "next/link"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { getWhitepaperSchema } from "@/lib/form-schemas"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { ArrowRight, CheckCircle, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import type { Language } from "@/components/language-provider"
import { buildContactHref } from "@/lib/funnel"
import { getLocalePrefix } from "@/lib/i18n"

interface WhitepaperAccessFormProps {
  language: Language
}

type WhitepaperLeadValues = {
  email: string
}

const copy = {
  en: {
    eyebrow: "Evaluation Pack",
    title: "Unlock Whitepaper Updates & Enterprise Evaluation Material",
    description:
      "Subscribe once to receive release updates for architecture papers, protocol notes, and enterprise evaluation material while the public launch package is being finalized.",
    label: "Work email",
    placeholder: "architect@company.com",
    helper: "We will only use this for Delentia Labs whitepaper and launch-related updates.",
    submit: "Get Access",
    submitting: "Submitting...",
    successTitle: "Access unlocked",
    successDescription:
      "You are on the whitepaper list. You can continue reviewing the current technical materials below while the full launch pack is prepared.",
    links: [
      { label: "10-Layer Architecture", href: "/architecture" },
      { label: "JITNA RFC-001", href: "/protocols/jitna-rfc-001" },
      { label: "Request Enterprise Pack", href: "/contact" },
    ],
    successToast: "Whitepaper access confirmed.",
    errorToast: "Unable to save your request. Please try again.",
  },
  th: {
    eyebrow: "ชุดเอกสารประเมินระบบ",
    title: "ปลดล็อกอัปเดต Whitepaper และเอกสารประเมินสำหรับองค์กร",
    description:
      "สมัครครั้งเดียวเพื่อรับอัปเดตเอกสารสถาปัตยกรรม โปรโตคอล และชุดข้อมูลสำหรับประเมินระบบในช่วงที่กำลังปิดงานก่อนเปิดตัวสาธารณะเต็มรูปแบบ",
    label: "อีเมลที่ใช้ทำงาน",
    placeholder: "architect@company.com",
    helper: "เราจะใช้อีเมลนี้สำหรับอัปเดต Whitepaper และการเปิดตัวของ Delentia Labs เท่านั้น",
    submit: "ขอสิทธิ์เข้าถึง",
    submitting: "กำลังบันทึก...",
    successTitle: "ปลดล็อกเรียบร้อย",
    successDescription:
      "คุณถูกเพิ่มในรายชื่อ Whitepaper แล้ว และสามารถตรวจสอบเอกสารเทคนิคปัจจุบันด้านล่างต่อได้ระหว่างที่กำลังเตรียม launch pack ฉบับสมบูรณ์",
    links: [
      { label: "สถาปัตยกรรม 10 ชั้น", href: "/architecture" },
      { label: "JITNA RFC-001", href: "/protocols/jitna-rfc-001" },
      { label: "ขอชุดเอกสารสำหรับองค์กร", href: "/contact" },
    ],
    successToast: "บันทึกสิทธิ์เข้าถึง Whitepaper แล้ว",
    errorToast: "ไม่สามารถบันทึกคำขอได้ กรุณาลองใหม่อีกครั้ง",
  },
} as const

export default function WhitepaperAccessForm({ language }: WhitepaperAccessFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const localePrefix = getLocalePrefix(language)
  const t = copy[language]

  const form = useForm<WhitepaperLeadValues>({
    resolver: zodResolver(getWhitepaperSchema(language)),
    defaultValues: { email: "" },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email, locale: language, source: "whitepaper" }),
      })
      const result = await response.json()

      if (!response.ok || !result.success) {
        toast.error(result.error || t.errorToast)
        return
      }

      setSubmitted(true)
      form.reset()
      toast.success(t.successToast)
    } catch {
      toast.error(t.errorToast)
    }
  })

  return (
    <section className="mb-12 rounded-[28px] border border-warm-light-gray bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#141414] sm:p-8">
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-warm-amber/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-warm-amber">
          <Mail className="h-3.5 w-3.5" />
          {t.eyebrow}
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{t.title}</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{t.description}</p>
        </div>

        {submitted ? (
          <div className="space-y-5 rounded-2xl border border-warm-sage/30 bg-warm-sage/10 p-5">
            <div className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-warm-sage" />
              <div>
                <h3 className="font-semibold text-foreground">{t.successTitle}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t.successDescription}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {t.links.map((link) => (
                <Button key={link.href} asChild variant="outline" className="justify-start sm:justify-center">
                  <Link href={link.href === "/contact" ? buildContactHref(language, "whitepaper:evaluation-pack:request") : `${localePrefix}${link.href}`}>
                    {link.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-border bg-background p-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.label}</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder={t.placeholder} {...field} />
                    </FormControl>
                    <FormDescription>{t.helper}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className="w-full sm:w-auto">
                {form.formState.isSubmitting ? t.submitting : t.submit}
              </Button>
            </form>
          </Form>
        )}
      </div>
    </section>
  )
}