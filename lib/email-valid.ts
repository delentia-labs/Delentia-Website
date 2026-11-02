// One place for the "does this look like an e-mail address" check used by the contact form, the newsletter and the waitlist.
// The pattern /^[^\s@]+@[^\s@]+\.[^\s@]+$/ has three runs of the same character class around a dot and an @, so on a long input that nearly matches it
// can take time that grows with the square of the length (CodeQL: js/polynomial-redos). An address cannot be longer than 254 characters (RFC 5321),
// so the length is checked first and the pattern never sees anything longer.
export const MAX_EMAIL_LENGTH = 254

const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** `trim` (default) ignores spaces around the address, as the newsletter and the waitlist always did; the contact form passes false because it never accepted them. */
export function isPlausibleEmail(value: unknown, options: { trim?: boolean } = {}): value is string {
  if (typeof value !== "string") return false
  const text = options.trim === false ? value : value.trim()
  if (text.length === 0 || text.length > MAX_EMAIL_LENGTH) return false
  return EMAIL_SHAPE.test(text)
}
