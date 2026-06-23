const fs = require("fs");
const path = require("path");
const https = require("https");

const RESEND_API_KEY = "re_JooxqqDS_7YpoSoUmU4q2ghypK4b8UsVy";

const templatesToUpload = [
  { file: "developer-welcome-th.html", name: "delentia-developer-welcome-th", subject: "[Delentia OS] ได้รับคำขอเข้าร่วม Waitlist ของคุณเรียบร้อยแล้ว" },
  { file: "developer-welcome-en.html", name: "delentia-developer-welcome-en", subject: "[Delentia OS] Your Waitlist application has been received" },
  { file: "enterprise-welcome-th.html", name: "delentia-enterprise-welcome-th", subject: "[Delentia OS Enterprise] คำขอสิทธิ์ติดตั้ง Kernel ระดับองค์กรได้รับการบันทึกแล้ว" },
  { file: "enterprise-welcome-en.html", name: "delentia-enterprise-welcome-en", subject: "[Delentia OS Enterprise] Your Enterprise Kernel deployment request has been logged" },
  { file: "developer-approval-th.html", name: "delentia-developer-approval-th", subject: "ยินดีด้วย! คำขอสิทธิ์การใช้งาน Delentia OS Kernel ได้รับการอนุมัติแล้ว" },
  { file: "developer-approval-en.html", name: "delentia-developer-approval-en", subject: "Congratulations! Your Delentia OS Kernel access has been approved" },
  { file: "enterprise-approval-th.html", name: "delentia-enterprise-approval-th", subject: "[Delentia OS Enterprise] อนุมัติสิทธิ์ติดตั้ง Kernel ในระดับองค์กรเรียบร้อยแล้ว" },
  { file: "enterprise-approval-en.html", name: "delentia-enterprise-approval-en", subject: "[Delentia OS Enterprise] Your Enterprise Kernel access credentials have been unlocked" }
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function apiRequest(method, url, data) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const postData = JSON.stringify(data);

    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname,
      method: method,
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
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
          resolve({ raw: body, status: res.statusCode });
        }
      });
    });

    req.on("error", (e) => reject(e));
    req.write(postData);
    req.end();
  });
}

async function uploadAll() {
  console.log("=== STARTING TEMPLATE UPLOAD TO RESEND WITH DELAY ===");
  const distDir = path.join(__dirname, "dist-templates");

  for (const t of templatesToUpload) {
    const filePath = path.join(distDir, t.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }

    const htmlContent = fs.readFileSync(filePath, "utf-8");
    console.log(`Uploading template with delay: ${t.name}...`);

    const payload = {
      name: t.name,
      subject: t.subject,
      html: htmlContent
    };

    try {
      const result = await apiRequest("POST", "https://api.resend.com/templates", payload);
      console.log(`Result for ${t.name}:`, JSON.stringify(result, null, 2));
    } catch (err) {
      console.error(`Error uploading ${t.name}:`, err);
    }
    
    // Wait 1.5 seconds to avoid rate limits
    await sleep(1500);
  }

  console.log("\n=== TEMPLATES UPLOAD PROCESS COMPLETED ===");
}

uploadAll();
