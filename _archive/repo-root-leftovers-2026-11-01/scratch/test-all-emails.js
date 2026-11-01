const https = require("https");

const targetUrl = "https://delentia.com/api/webhooks/waitlist";

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
          resolve({ error: "Failed to parse JSON", raw: body, status: res.statusCode });
        }
      });
    });

    req.on("error", (e) => reject(e));
    req.write(postData);
    req.end();
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log("==================================================");
  console.log("   STARTING LIVE DISPATCH TESTING FOR 3 EMAILS     ");
  console.log("==================================================\n");

  const testCases = [
    // --- WELCOME EMAILS (INSERT) ---
    {
      name: "1. Welcome Email -> ittirit720@gmail.com (Developer, TH)",
      payload: {
        type: "INSERT",
        table: "waitlist_users",
        record: {
          email: "ittirit720@gmail.com",
          locale: "th",
          tier: "Developer",
          primary_intent: "เพื่อทดสอบการทำงานของระบบตอบกลับอัตโนมัติบนสถาปัตยกรรม Delentia OS",
          key_constraint: "Local-AI",
          infrastructure: "Docker"
        }
      }
    },
    {
      name: "2. Welcome Email -> ittiritpod@gmail.com (Developer, TH)",
      payload: {
        type: "INSERT",
        table: "waitlist_users",
        record: {
          email: "ittiritpod@gmail.com",
          locale: "th",
          tier: "Developer",
          primary_intent: "เพื่อทดสอบการสมัครและยืนยันว่าระบบสามารถรับส่งอีเมลได้จริง",
          key_constraint: "Local-AI",
          infrastructure: "Docker"
        }
      }
    },
    {
      name: "3. Welcome Email -> founder@delentia.com (Enterprise, TH)",
      payload: {
        type: "INSERT",
        table: "waitlist_users",
        record: {
          email: "founder@delentia.com",
          locale: "th",
          tier: "Enterprise",
          primary_intent: "เพื่อตรวจสอบและอนุมัติความถูกต้องของการสื่อสารกับพาร์ทเนอร์องค์กร",
          key_constraint: "PDPA",
          infrastructure: "Air-Gapped"
        }
      }
    },

    // --- APPROVAL EMAILS (UPDATE) ---
    {
      name: "4. Approval Email -> ittirit720@gmail.com (Developer, TH)",
      payload: {
        type: "UPDATE",
        table: "waitlist_users",
        record: {
          email: "ittirit720@gmail.com",
          locale: "th",
          tier: "Developer",
          primary_intent: "เพื่อทดสอบการทำงานของระบบตอบกลับอัตโนมัติบนสถาปัตยกรรม Delentia OS",
          key_constraint: "Local-AI",
          infrastructure: "Docker",
          status: "Approved"
        },
        old_record: {
          status: "Pending"
        }
      }
    },
    {
      name: "5. Approval Email -> ittiritpod@gmail.com (Developer, TH)",
      payload: {
        type: "UPDATE",
        table: "waitlist_users",
        record: {
          email: "ittiritpod@gmail.com",
          locale: "th",
          tier: "Developer",
          primary_intent: "เพื่อทดสอบการสมัครและยืนยันว่าระบบสามารถรับส่งอีเมลได้จริง",
          key_constraint: "Local-AI",
          infrastructure: "Docker",
          status: "Approved"
        },
        old_record: {
          status: "Pending"
        }
      }
    },
    {
      name: "6. Approval Email -> founder@delentia.com (Enterprise, TH)",
      payload: {
        type: "UPDATE",
        table: "waitlist_users",
        record: {
          email: "founder@delentia.com",
          locale: "th",
          tier: "Enterprise",
          primary_intent: "เพื่อตรวจสอบและอนุมัติความถูกต้องของการสื่อสารกับพาร์ทเนอร์องค์กร",
          key_constraint: "PDPA",
          infrastructure: "Air-Gapped",
          status: "Approved"
        },
        old_record: {
          status: "Pending"
        }
      }
    }
  ];

  for (const tc of testCases) {
    console.log(`Running: ${tc.name}...`);
    try {
      const response = await postRequest(targetUrl, tc.payload);
      console.log(`Response for ${tc.payload.record.email}:`, JSON.stringify(response, null, 2));
    } catch (err) {
      console.error(`Error executing ${tc.name}:`, err);
    }
    console.log("--------------------------------------------------\n");
    await sleep(2500); // 2.5s cooldown delay
  }

  console.log("=== ALL LIVE TESTS DISPATCHED SUCCESSFULLY ===");
}

run();
