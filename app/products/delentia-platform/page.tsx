import { redirect } from "next/navigation"
import { getRequestLocale } from "@/lib/request-locale"

// Round 87: this product page described an offering that was not available as written and was withdrawn.
// The old client component stays in this folder, unused, so that git history and the file are not lost.
export default async function Page() {
  const locale = await getRequestLocale()
  redirect(locale === "th" ? "/th/products" : "/en/products")
}
