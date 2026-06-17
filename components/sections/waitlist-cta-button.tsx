"use client"

import { ArrowRight } from "lucide-react"

interface WaitlistCtaButtonProps {
  locale: "en" | "th"
  className?: string
}

export function WaitlistCtaButton({ locale, className }: WaitlistCtaButtonProps) {
  const isTh = locale === "th"
  const label = isTh ? "ขอสิทธิ์เข้าใช้งาน Kernel" : "Request Kernel Access"

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-waitlist"))
    }
  }

  return (
    <button
      onClick={handleClick}
      className={className}
      type="button"
    >
      {label}
      <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
    </button>
  )
}
