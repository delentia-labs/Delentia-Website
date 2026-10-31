"use client"

import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import SectionHeading from "@/components/section-heading"
import { useMounted } from "@/hooks/use-mounted"
import { pixelIcons } from "@/lib/pixel-icons"
import { getLocalePrefix, resolveLocale } from "@/lib/i18n"
import { SITE_ALGORITHM_COUNT, SITE_PUBLIC_SDK_TESTS } from "@/lib/site-config"

const PIXEL_METRICS = pixelIcons.network

// Round 87 (claims review): this section used to draw progress bars for "Overall Accuracy 96.1%", "Hallucination
// 99.7%", "Latency < 200 ms", "Availability 99.9%", "Data Quality 85/100", "Constitutional Compliance 100%" and a radar
// chart of six scores. None of those was measured. It now lists only results that were measured, each with what it
// does NOT show; the full method and source of every result is on the Benchmark page.
type Measured = {
  label: { en: string; th: string }
  value: { en: string; th: string }
  limit: { en: string; th: string }
}

const measured: Measured[] = [
  {
    label: { en: "Public test suite", th: "ชุดทดสอบสาธารณะ" },
    value: {
      en: `${SITE_PUBLIC_SDK_TESTS.toLocaleString("en-US")} passed, 0 failed, 91.95% line coverage`,
      th: `ผ่าน ${SITE_PUBLIC_SDK_TESTS.toLocaleString("en-US")} ล้มเหลว 0 ครอบคลุมบรรทัด 91.95%`,
    },
    limit: { en: "Shows the code does what the tests say, not that a model uses the tools well.", th: "แสดงว่าโค้ดทำตามที่ชุดทดสอบเขียน ไม่ได้แสดงว่าโมเดลใช้เครื่องมือได้ดี" },
  },
  {
    label: { en: "Hijacked-model test", th: "ทดสอบโมเดลที่ถูกยึด" },
    value: {
      en: "18 of 21 scenarios reached a harmful side effect without the gate, 0 with it",
      th: "18 จาก 21 สถานการณ์ไปถึงผลข้างเคียงที่เป็นอันตรายเมื่อไม่มีเกต, 0 เมื่อมีเกต",
    },
    limit: { en: "A scripted worst-case model, not a real one.", th: "เป็นโมเดลสคริปต์กรณีเลวร้ายที่สุด ไม่ใช่โมเดลจริง" },
  },
  {
    label: { en: "Default policy on labelled requests", th: "นโยบายค่าเริ่มต้นกับคำขอที่ติดป้าย" },
    value: {
      en: "169 requests: 3 of 110 unsafe ones ran, 6 of 59 harmless ones were stopped",
      th: "169 คำขอ: คำขอไม่ปลอดภัยที่ยังรันได้ 3 จาก 110, คำขอไม่เป็นอันตรายที่ถูกหยุด 6 จาก 59",
    },
    limit: { en: "Labels written by the developers; not an independent test.", th: "ป้ายเขียนโดยผู้พัฒนา ไม่ใช่การทดสอบอิสระ" },
  },
  {
    label: { en: "Model-free demo", th: "เดโมที่ไม่ต้องมีโมเดล" },
    value: { en: "5 of 5 checks, about 5 seconds, signed audit log verifies", th: "ผ่าน 5 จาก 5 การตรวจ ราว 5 วินาที บันทึกตรวจสอบที่ลงนามตรวจผ่าน" },
    limit: { en: "A fixed program stands in for the model; the gate, signature and log are real.", th: "โปรแกรมคงที่แทนโมเดล แต่เกต ลายเซ็น และบันทึกเป็นของจริง" },
  },
  {
    label: { en: "With a capable model", th: "กับโมเดลที่เก่งพอ" },
    value: { en: "Not measured yet", th: "ยังไม่ได้วัด" },
    limit: { en: "Only scripted models and small local models have been used so far.", th: "จนถึงตอนนี้ใช้เพียงโมเดลสคริปต์และโมเดลท้องถิ่นขนาดเล็ก" },
  },
]

export default function MetricsSection() {
  const { resolvedTheme } = useTheme()
  const { language } = useLanguage()
  const pathname = usePathname()
  const mounted = useMounted()
  const isDark = mounted && resolvedTheme === "dark"
  const isEn = language === "en"
  const localePrefix = getLocalePrefix(resolveLocale(pathname, language))

  return (
    <section id="metrics" aria-label="Measured results" className={`py-16 md:py-24 transition-colors duration-300 ${isDark ? "bg-dark-900" : "bg-warm-cream"}`}>
      <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag={isEn ? "Measured" : "ผลที่วัดแล้ว"}
          tagColor="sage"
          title="Measured results"
          italicWord="results"
          description={
            isEn
              ? `Only results that were actually measured, each with what it does not show. ${SITE_ALGORITHM_COUNT} algorithms are implemented in the open-source repository; that is a count of modules, not a performance claim.`
              : `เฉพาะผลที่วัดจริง พร้อมสิ่งที่ผลนั้นไม่ได้แสดง อัลกอริทึม ${SITE_ALGORITHM_COUNT} ตัวถูกเขียนไว้ในรีโพโอเพนซอร์ส นั่นคือจำนวนโมดูล ไม่ใช่การอ้างประสิทธิภาพ`
          }
          pixelIcon={PIXEL_METRICS}
        />

        <div className="space-y-3">
          {measured.map((item) => (
            <div
              key={item.label.en}
              className={`rounded-2xl border p-5 ${isDark ? "bg-warm-charcoal border-border" : "bg-white border-warm-light-gray"}`}
            >
              <div className={`text-sm sm:text-base font-semibold ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
                {isEn ? item.label.en : item.label.th}
              </div>
              <div className="mt-1 font-mono text-sm font-bold text-warm-amber">{isEn ? item.value.en : item.value.th}</div>
              <div className={`mt-1 text-xs sm:text-sm ${isDark ? "text-warm-dim" : "text-warm-secondary"}`}>
                {isEn ? "Does not show: " : "ไม่ได้แสดง: "}
                {isEn ? item.limit.en : item.limit.th}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link href={`${localePrefix}/benchmark`} className="text-sm font-medium text-warm-amber hover:underline">
            {isEn ? "Method, limits and source of every result" : "วิธีวัด ข้อจำกัด และที่มาของทุกผล"}
          </Link>
        </div>
      </div>
    </section>
  )
}
