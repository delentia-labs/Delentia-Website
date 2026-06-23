const https = require("https");

const targetUrl = "https://delentia.com/api/webhooks/waitlist?dryrun=true";

// Helper to make POST request
function postRequest(url, data) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const postData = JSON.stringify(data);

    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname + urlObj.search,
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

async function runTests() {
  console.log("=== STARTING WAITLIST WEBHOOK SIMULATION TESTS ===\n");

  // TEST 1: INSERT Event (Welcome Email) - Thai Language - Enterprise Tier
  console.log("--- 1. Testing INSERT Welcome Email (TH Locale - Enterprise) ---");
  const payloadInsertTh = {
    type: "INSERT",
    table: "waitlist_users",
    record: {
      email: "architect-th@delentia-labs.com",
      locale: "th",
      tier: "Enterprise",
      primary_intent: "ต้องการประเมินสถาปัตยกรรมความปลอดภัยในการจัดการข้อมูล Air-Gapped",
      key_constraint: "PDPA",
      infrastructure: "Air-Gapped",
    },
  };

  try {
    const result1 = await postRequest(targetUrl, payloadInsertTh);
    console.log("Success:", result1.success);
    console.log("Message:", result1.message);
    if (result1.emailDraft) {
      console.log("\n[DRAFT EMAIL CONTENTS]");
      console.log("Subject:", result1.emailDraft.subject);
      console.log("From:", result1.emailDraft.from);
      console.log("To:", result1.emailDraft.to);
      console.log("Attachments count:", result1.emailDraft.attachments.length);
      console.log("HTML Sample (first 500 chars):");
      console.log(result1.emailDraft.html.trim().substring(0, 500) + "...\n");
    }
  } catch (err) {
    console.error("Test 1 error:", err);
  }

  // TEST 2: UPDATE Event (Approval Email) - Thai Language - Enterprise Tier
  console.log("--- 2. Testing UPDATE Approval Email (TH Locale - Enterprise) ---");
  const payloadUpdateTh = {
    type: "UPDATE",
    table: "waitlist_users",
    record: {
      email: "architect-th@delentia-labs.com",
      locale: "th",
      tier: "Enterprise",
      primary_intent: "ต้องการประเมินสถาปัตยกรรมความปลอดภัยในการจัดการข้อมูล Air-Gapped",
      key_constraint: "PDPA",
      infrastructure: "Air-Gapped",
      status: "Approved",
    },
    old_record: {
      status: "Pending",
    },
  };

  try {
    const result2 = await postRequest(targetUrl, payloadUpdateTh);
    console.log("Success:", result2.success);
    console.log("Message:", result2.message);
    if (result2.emailDraft) {
      console.log("\n[DRAFT EMAIL CONTENTS]");
      console.log("Subject:", result2.emailDraft.subject);
      console.log("From:", result2.emailDraft.from);
      console.log("To:", result2.emailDraft.to);
      console.log("Attachments:", JSON.stringify(result2.emailDraft.attachments, null, 2));
      console.log("HTML Sample (first 500 chars):");
      console.log(result2.emailDraft.html.trim().substring(0, 500) + "...\n");
    }
  } catch (err) {
    console.error("Test 2 error:", err);
  }

  console.log("=== SIMULATION TESTS COMPLETED ===");
}

runTests();
