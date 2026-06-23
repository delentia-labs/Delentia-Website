const https = require("https");

const RESEND_API_KEY = "re_JooxqqDS_7YpoSoUmU4q2ghypK4b8UsVy";

function apiRequest(method, url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);

    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname,
      method: method,
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
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
    req.end();
  });
}

async function run() {
  try {
    const result = await apiRequest("GET", "https://api.resend.com/templates");
    console.log("TEMPLATES:");
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error("Error:", err);
  }
}

run();
