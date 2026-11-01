const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://jtarikueezptzibbaytr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0YXJpa3VlZXpwdHppYmJheXRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0NzI1NzAsImV4cCI6MjA5NzA0ODU3MH0.eKC5cnQMKDLTvHPQtm7UEZA6_q70RL7M6Q3C5bkeIuE";

const emailsToDelete = [
  "ittirit720@gmail.com",
  "ittiritpod@gmail.com",
  "founder@delentia.com"
];

async function main() {
  console.log(`Checking and cleaning up emails:`, emailsToDelete);
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false }
  });

  for (const email of emailsToDelete) {
    const { data, error } = await supabase
      .from("waitlist_users")
      .delete()
      .eq("email", email)
      .select();

    if (error) {
      console.error(`Error deleting user ${email}:`, error);
    } else {
      console.log(`Deleted rows for ${email}:`, data);
    }
  }
}

main();
