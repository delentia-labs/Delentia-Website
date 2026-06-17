/*
 * Supabase server-side client — for API routes only (not client components)
 * Uses SUPABASE_SERVICE_KEY (secret) — never expose to browser
 *
 * Required environment variables in Vercel:
 *   SUPABASE_URL         = https://<project>.supabase.co
 *   SUPABASE_SERVICE_KEY = service_role_key (secret)
 */
import { createClient, SupabaseClient } from "@supabase/supabase-js"
import { getSupabaseConfig } from "@/lib/auth/config"

type Database = {
  public: {
    Tables: {
      waitlist: {
        Row: { id: string; email: string; locale: string; source: string; subscribed_at: string }
        Insert: { email: string; locale?: string; source?: string; subscribed_at?: string }
        Update: { email?: string; locale?: string; source?: string; subscribed_at?: string }
      }
      waitlist_users: {
        Row: {
          id: string
          email: string
          primary_intent: string
          key_constraint: string
          infrastructure: string
          status: string
          tier: string
          locale: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          primary_intent: string
          key_constraint: string
          infrastructure: string
          status?: string
          tier?: string
          locale?: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          primary_intent?: string
          key_constraint?: string
          infrastructure?: string
          status?: string
          tier?: string
          locale?: string
          created_at?: string
        }
      }
      contacts: {
        Row: { id: string; name: string; email: string; subject: string; message: string; locale: string; context: string; submitted_at: string }
        Insert: { name: string; email: string; subject?: string; message?: string; locale?: string; context?: string; submitted_at?: string }
        Update: { name?: string; email?: string; subject?: string; message?: string; locale?: string; context?: string; submitted_at?: string }
      }
    }
  }
}

let _client: SupabaseClient<Database> | null = null

export function getSupabaseAdmin(): SupabaseClient<Database> {
  if (_client) return _client
  const { url, key } = getSupabaseConfig("admin")
  _client = createClient<Database>(url, key, {
    auth: { persistSession: false },
  })
  return _client
}
