const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://jtarikueezptzibbaytr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0YXJpa3VlZXpwdHppYmJheXRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0NzI1NzAsImV4cCI6MjA5NzA0ODU3MH0.eKC5cnQMKDLTvHPQtm7UEZA6_q70RL7M6Q3C5bkeIuE";

const emailsToCheck = [
  "ittirit720@gmail.com",
  "ittiritpod@gmail.com",
  "founder@delentia.com"
];

async function main() {
  console.log(`Checking emails in DB:`, emailsToCheck);
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false }
  });

  const { data, error } = await supabase
    .from("waitlist_users")
    .select("*")
    .in("email", emailsToCheck);

  if (error) {
    console.error("Error checking users:", error);
  } else {
    console.log(`Users data in DB:`, JSON.stringify(data, null, 2));
  }
}

main();
