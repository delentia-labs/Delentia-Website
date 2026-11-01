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

function apiRequest(method, url, data = null) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const postData = data ? JSON.stringify(data) : "";

    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname + urlObj.search,
      method: method,
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
    };

    if (data) {
      options.headers["Content-Length"] = Buffer.byteLength(postData);
    }

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
    if (data) {
      req.write(postData);
    }
    req.end();
  });
}

// Fetch all templates using pagination
async function getAllTemplates() {
  let allTemplates = [];
  let hasMore = true;
  let after = "";

  while (hasMore) {
    let url = "https://api.resend.com/templates?limit=100";
    if (after) {
      url += `&after=${after}`;
    }
    
    console.log(`Fetching templates page... (after: ${after || "start"})`);
    const res = await apiRequest("GET", url);
    
    if (res && res.data) {
      allTemplates = allTemplates.concat(res.data);
      hasMore = res.has_more;
      if (res.data.length > 0) {
        after = res.data[res.data.length - 1].id;
      } else {
        hasMore = false;
      }
    } else {
      hasMore = false;
    }
    // Rate limit safeguard
    await sleep(500);
  }
  
  return allTemplates;
}

async function main() {
  try {
    console.log("=== STARTING RESEND TEMPLATES CLEANUP & PUBLISH ===");
    
    // 1. Fetch all templates
    const templates = await getAllTemplates();
    console.log(`Found ${templates.length} templates on Resend.`);
    
    // 2. Delete all existing templates
    console.log("Deleting all existing templates to perform a clean sync...");
    for (const t of templates) {
      console.log(`Deleting template: ${t.name} (ID: ${t.id})...`);
      const delRes = await apiRequest("DELETE", `https://api.resend.com/templates/${t.id}`);
      console.log(`Delete response:`, JSON.stringify(delRes));
      // Sleep a bit to prevent hitting rate limits
      await sleep(1000);
    }
    
    console.log("\n=== ALL OLD TEMPLATES DELETED ===");
    
    // 3. Upload latest templates
    const distDir = path.join(__dirname, "dist-templates");
    const uploadedTemplates = [];
    
    console.log("\nUploading updated templates (containing 'API Key')...");
    for (const t of templatesToUpload) {
      const filePath = path.join(distDir, t.file);
      if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${filePath}`);
        continue;
      }
      
      const htmlContent = fs.readFileSync(filePath, "utf-8");
      console.log(`Creating draft template: ${t.name}...`);
      
      const payload = {
        name: t.name,
        subject: t.subject,
        html: htmlContent
      };
      
      const createRes = await apiRequest("POST", "https://api.resend.com/templates", payload);
      console.log(`Create response for ${t.name}:`, JSON.stringify(createRes));
      
      if (createRes && createRes.id) {
        uploadedTemplates.push({ id: createRes.id, name: t.name });
      }
      
      await sleep(1500);
    }
    
    console.log("\n=== ALL TEMPLATES UPLOADED ===");
    
    // 4. Publish all templates to transition them from Draft to Published
    console.log("\nPublishing all uploaded templates...");
    for (const ut of uploadedTemplates) {
      console.log(`Publishing template: ${ut.name} (ID: ${ut.id})...`);
      const pubRes = await apiRequest("POST", `https://api.resend.com/templates/${ut.id}/publish`);
      console.log(`Publish response for ${ut.name}:`, JSON.stringify(pubRes));
      await sleep(1000);
    }
    
    console.log("\n=== RESEND TEMPLATES CLEANUP & PUBLISH PROCESS COMPLETED SUCCESSFULLY ===");
  } catch (error) {
    console.error("Error running cleanup and publish script:", error);
  }
}

main();
