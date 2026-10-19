import { BadgeCheck } from "lucide-react"

interface SignedAIVerifiedBadgeProps {
  locale?: "en" | "th"
}

/**
 * Round 87: this badge used to say "Verified by SignedAI - 7-model HexaCore - Ed25519 signed". No article was
 * verified that way, so it now says what is true. It is not rendered anywhere at the moment.
 *
 * Phase: SET B static implementation (no live API call).
 * Future: swap for dynamic /api/verify endpoint when SignedAI backend is live.
 */
export function SignedAIVerifiedBadge({ locale = "en" }: SignedAIVerifiedBadgeProps) {
  const isTh = locale === "th"
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-warm-sage/35 bg-warm-sage/10 px-3 py-1.5 text-sm text-warm-sage">
      <BadgeCheck className="h-4 w-4 shrink-0" />
      {isTh
        ? "เขียนโดยผู้พัฒนา ไม่ได้ผ่านการตรวจสอบอิสระ"
        : "Written by the developer, not independently verified"}
    </span>
  )
}
