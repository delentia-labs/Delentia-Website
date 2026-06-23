const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://jtarikueezptzibbaytr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0YXJpa3VlZXpwdHppYmJheXRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0NzI1NzAsImV4cCI6MjA5NzA0ODU3MH0.eKC5cnQMKDLTvHPQtm7UEZA6_q70RL7M6Q3C5bkeIuE";

const emailToInsert = "ittirit720@gmail.com";

async function main() {
  console.log(`Inserting test user: ${emailToInsert}`);
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false }
  });

  // First, clean up if already exists (failsafe)
  await supabase
    .from("waitlist_users")
    .delete()
    .eq("email", emailToInsert);

  const newUser = {
    email: emailToInsert,
    primary_intent: "ทดสอบการสมัครและตรวจสอบการรับส่งอีเมลตอบกลับระดับองค์กรแบบอัตโนมัติ",
    key_constraint: "PDPA",
    infrastructure: "Air-Gapped",
    status: "Pending",
    tier: "Enterprise", // Forces Enterprise welcome template
    locale: "th", // Thai language
    created_at: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from("waitlist_users")
    .insert([newUser])
    .select();

  if (error) {
    console.error("Error inserting user into DB:", error);
  } else {
    console.log("Successfully inserted user:", JSON.stringify(data, null, 2));
    console.log("\nIf Database Webhooks are enabled on Supabase, it will now trigger an email to " + emailToInsert);
  }
}

main();
