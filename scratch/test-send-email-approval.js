const https = require("https");

const targetUrl = "https://delentia.com/api/webhooks/waitlist"; // Real production webhook endpoint (No dryrun!)

function postRequest(url, data) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const postData = JSON.stringify(data);

    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve({ error: "Failed to parse JSON", raw: body });
        }
      });
    });

    req.on("error", (e) => reject(e));
    req.write(postData);
    req.end();
  });
}

async function run() {
  console.log("=== SENDING REAL UPDATE (APPROVAL) WEBHOOK POST TO PRODUCTION ===");
  const payload = {
    type: "UPDATE",
    table: "waitlist_users",
    record: {
      email: "ittirit720@gmail.com",
      locale: "th",
      tier: "Developer",
      primary_intent: "ต้องการรับอีเมลตอบกลับทดสอบระบบ Resend + Supabase Webhook",
      key_constraint: "Local-AI",
      infrastructure: "Docker",
      status: "Approved", // Approved status transition
    },
    old_record: {
      status: "Pending",
    },
  };

  try {
    const result = await postRequest(targetUrl, payload);
    console.log("Response:", JSON.stringify(result, null, 2));
  } catch (err) {
    console.error("Error sending POST:", err);
  }
}

run();
