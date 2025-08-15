const express = require("express");
require("dotenv").config();
const { spawn } = require("child_process");
const path = require("path");
const fetch = (...args) =>
  import("node-fetch").then(({ default: f }) => f(...args));

// helper fetchWithTimeout using AbortController
async function fetchWithTimeout(url, options = {}, ms) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    return response;
  } finally {
    clearTimeout(timeout);
  }
}

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
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

app.post("/api/ai-analyze", async (req, res) => {
  try {
    const apiKey = process.env.AI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing AI_API_KEY" });
    }

    if (
      !req.body ||
      typeof req.body !== "object" ||
      Array.isArray(req.body) ||
      typeof req.body.text !== "string"
    ) {
      return res.status(400).json({ error: "Invalid body" });
    }

    const prompt = JSON.stringify(req.body);
    const timeout = parseInt(process.env.AI_TIMEOUT_MS, 10) || 10000;
    const response = await fetchWithTimeout(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "Bạn là chuyên gia phong thủy." },
            {
              role: "user",
              content: `Hãy phân tích phong thủy dựa trên dữ liệu: ${prompt}`,
            },
          ],
          temperature: 0.7,
        }),
      },
      timeout
    );

    if (!response.ok) {
      const errText = await response.text();
      return res.status(500).json({ error: errText });
    }

    const data = await response.json();
    const text = data.choices && data.choices[0]?.message?.content?.trim();
    res.json({ text });
  } catch (err) {
    if (err.name === "AbortError") {
      return res.status(504).json({ error: "AI request timed out" });
    }
    console.error(err);
    res.status(500).json({ error: "AI request failed" });
  }
});

app.get("/api/horoscope", async (req, res) => {
  try {
    const apiKey = process.env.AI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing AI_API_KEY" });
    }
    const { birth, gender } = req.query;
    const birthRegex = /^\d{4}-\d{2}-\d{2}$/;
    const allowedGenders = new Set(["nam", "nu", "khac"]);
    if (!birthRegex.test(birth) || !allowedGenders.has(gender)) {
      return res.status(400).json({ error: "Invalid parameters" });
    }
    const prompt = `Sinh ngày ${birth}, giới tính ${gender}. Hãy phân tích tử vi gồm năm can chi, ngũ hành, cục, sao.`;
    const timeout = parseInt(process.env.AI_TIMEOUT_MS, 10) || 10000;
    const response = await fetchWithTimeout(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "Bạn là chuyên gia tử vi." },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
        }),
      },
      timeout
    );
    if (!response.ok) {
      const errText = await response.text();
      return res.status(500).json({ error: errText });
    }
    const data = await response.json();
    const text = data.choices && data.choices[0]?.message?.content?.trim();
    res.json({ text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Horoscope request failed" });
  }
});

app.get("/api/auspicious-days", async (req, res) => {
  try {
    const { default: getAuspiciousDays } = await import("./getAuspiciousDays.mjs");
    const { birth, year, month } = req.query;
    const y = parseInt(year, 10),
      m = parseInt(month, 10);
    if (!birth || Number.isNaN(y) || Number.isNaN(m)) {
      return res.status(400).json({ error: "Missing params" });
    }
    if (y <= 0 || m < 1 || m > 12) {
      return res.status(400).json({ error: "Invalid params" });
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










