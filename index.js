const express = require("express");
require("dotenv").config();
const { spawn } = require("child_process");
const path = require("path");
// Keep fetch polyfill for any internal future use (AI removed)
const fetch = global.fetch || ((...args) => import("node-fetch").then(({ default: f }) => f(...args)));

// AI features fully removed: no AI endpoints

const app = express();
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from root directory (for JS modules, data files, etc.)
app.use(express.static(__dirname));

app.get("/api/chart", (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: "Missing name" });
  }
  const dbPath = process.env.BIRTH_DB || "birth_info.db";
  const script = path.join(__dirname, "chart_service.py");
  const py = spawn("python", [script, dbPath, name]);
  let out = "";
  let err = "";
  py.stdout.on("data", (d) => (out += d));
  py.stderr.on("data", (d) => (err += d));
  py.on("close", (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: err || "Chart computation failed" });
    }
    try {
      const data = JSON.parse(out);
      if (data.error === "not found") {
        return res.status(404).json({ error: "not found" });
      }
      res.json(data);
    } catch (e) {
      res.status(500).json({ error: "Invalid chart response" });
    }
  });
});

// NOTE: Former AI endpoints (/api/ai-analyze, /api/horoscope) removed entirely

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.get("/api/auspicious-days", async (req, res) => {
  try {
    const { default: getAuspiciousDays } = await import("./getAuspiciousDays.mjs");
    const { default: parseDateParts } = await import("./parseDateParts.mjs");
    const { birth, year, month } = req.query;
    const y = parseInt(year, 10),
      m = parseInt(month, 10);
    if (!birth || Number.isNaN(y) || Number.isNaN(m)) {
      return res.status(400).json({ error: "Missing params" });
    }
    if (y <= 0 || m < 1 || m > 12) {
      return res.status(400).json({ error: "Invalid params" });
    }
    // Validate birth format and logical ranges
    try {
      // Chuẩn hoá ngày sinh cho cả 2 dạng YYYY-MM-DD và DD-MM-YYYY
      let normBirth = String(birth).trim();
      // Nếu dạng dd-mm-yyyy (phần đầu <=31 và phần cuối >= 1900) -> đổi lại yyyy-mm-dd để dễ đọc/ghi thống nhất
      const parts = normBirth.split(/[-/]/).map(p=>p.trim());
      if(parts.length===3){
        const [a,b,c]=parts;
        if(a.length===2 && c.length===4 && parseInt(a,10)<=31){
          // dd-mm-yyyy -> yyyy-mm-dd
          normBirth = `${c}-${b}-${a}`;
        }
      }
      const { year: by, month: bm, day: bd } = parseDateParts(normBirth);
      if (bm < 1 || bm > 12 || bd < 1 || bd > 31) {
        return res.status(400).json({ error: "Invalid birth" });
      }
      // Basic future check (optional): birth year should not exceed target year + 1
      if (by > y + 1) {
        return res.status(400).json({ error: "Invalid birth" });
      }
    } catch (e) {
      return res.status(400).json({ error: "Invalid birth" });
    }
    const days = getAuspiciousDays(birth, y, m);
    res.json({ days });
  } catch (err) {
    res.status(500).json({ error: "Failed to compute" });
  }
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;












