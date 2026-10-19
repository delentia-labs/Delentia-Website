"use client"

import { useState } from "react"
import { m, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  X,
  CheckCircle,
  Zap,
  Brain,
  Globe,
  Shield,
} from "lucide-react"

export function FloatingAIComingSoon() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const { language } = useLanguage()

  const t = {
    title: language === 'th' ? 'ผู้ช่วย DelentiaAI' : 'DelentiaAI Assistant',
    comingSoon: language === 'th' ? 'เร็วๆ นี้' : 'Coming Soon',
    message: language === 'th' 
      ? 'DelentiaAI กำลังอยู่ระหว่างการพัฒนา เวอร์ชันเปิดตัวจะเน้นการนำทางผลิตภัณฑ์ การตอบคำถามด้านแพลตฟอร์ม และการประเมินโซลูชันองค์กรใต้โหมด Analysearch Intent'
      : 'DelentiaAI is currently in development. The first public release will focus on product guidance, platform Q&A, and workflow triage powered by Analysearch Intent Mode.',
    featuresTitle: language === 'th' ? 'สิ่งที่คาดหวังได้:' : 'What to Expect:',
    feature1: language === 'th' ? 'แนะนำเส้นทางผลิตภัณฑ์และสถาปัตยกรรม' : 'Guided product and architecture discovery',
    feature2: language === 'th' ? 'ตอบคำถามด้านแพลตฟอร์มและ use case' : 'Platform and use-case Q&A',
    feature3: language === 'th' ? 'ช่วยคัดกรอง workflow สำหรับงานองค์กร' : 'Workflow triage for enterprise teams',
    feature4: language === 'th' ? 'รองรับสองภาษา (EN/TH)' : 'Bilingual support (EN/TH)',
    notifyMe: language === 'th' ? 'แจ้งเตือนเมื่อพร้อมใช้งาน' : 'Notify me when ready',
    emailPlaceholder: language === 'th' ? 'อีเมลของคุณ' : 'your@email.com',
    subscribe: language === 'th' ? 'สมัครรับข่าวสาร' : 'Subscribe',
    subscribed: language === 'th' ? 'ขอบคุณ! เราจะแจ้งให้คุณทราบเมื่อพร้อม' : 'Thanks! We\'ll notify you when ready.',
    close: language === 'th' ? 'ปิด' : 'Close',
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "floating-ai", locale: language }),
      })
    } catch {
      // Silently fail — UX confirmation still shown
    }
    setSubscribed(true)
    setTimeout(() => {
      setEmail("")
      setSubscribed(false)
    }, 3000)
  }

  const features = [
    { icon: Brain, text: t.feature1 },
    { icon: Zap, text: t.feature2 },
    { icon: Shield, text: t.feature3 },
    { icon: Globe, text: t.feature4 },
  ]

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <m.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent text-accent-foreground shadow-lg shadow-accent/30 flex items-center justify-center animate-glow-pulse hover:scale-110 transition-transform duration-200"
            aria-label={language === 'th' ? 'เปิดตัวช่วย DelentiaAI แบบกำลังพัฒนา' : 'Open coming-soon DelentiaAI assistant'}
          >
            <Sparkles className="w-6 h-6" />
          </m.button>
        )}
      </AnimatePresence>

      {/* Coming Soon Modal */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-md"
          >
            <div className="glass rounded-xl border border-border shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-linear-to-r from-accent/20 to-accent/10 px-6 py-4 flex items-center justify-between border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-warm-amber" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{t.title}</h3>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {t.comingSoon}
                    </Badge>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Message */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.message}
                </p>

                {/* Features */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">
                    {t.featuresTitle}
                  </h4>
                  <div className="space-y-2">
                    {features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                          <feature.icon className="w-4 h-4 text-warm-amber" />
                        </div>
                        <p className="text-sm text-muted-foreground">{feature.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subscribe Form */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">
                    {t.notifyMe}
                  </h4>
                  {subscribed ? (
                    <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-400/10 px-4 py-3 rounded-lg">
                      <CheckCircle className="w-4 h-4" />
                      <span>{t.subscribed}</span>
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="flex gap-2">
                      <Input
                        type="email"
                        placeholder={t.emailPlaceholder}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1"
                        required
                      />
                      <Button type="submit" size="sm" className="bg-accent hover:bg-accent/90">
                        {t.subscribe}
                      </Button>
                    </form>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-3 bg-card/50 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  {language === 'th' 
                    ? 'กำลังพัฒนา ยังไม่เปิดให้ใช้'
                    : 'Under development, not available yet'}
                </p>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
