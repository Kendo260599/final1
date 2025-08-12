const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use(express.static(__dirname));
const getAuspiciousDays = require("./utils/getAuspiciousDays");

app.post("/api/ai-analyze", async (req, res) => {
  try {
    const apiKey = process.env.AI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing AI_API_KEY" });
    }

    const prompt = JSON.stringify(req.body);
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
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
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(500).json({ error: errText });
    }

    const data = await response.json();
    const text = data.choices && data.choices[0]?.message?.content?.trim();
    res.json({ text });
  } catch (err) {
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
    const prompt = `Sinh ngày ${birth || ""}, giới tính ${gender || ""}. Hãy phân tích tử vi gồm năm can chi, ngũ hành, cục, sao.`;
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
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
    });
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

app.get("/api/auspicious-days", (req, res) => {
  try {
    const { birth, year, month } = req.query;
    const y = parseInt(year, 10),
      m = parseInt(month, 10);
    if (!birth || !y || !m)
      return res.status(400).json({ error: "Missing params" });
    const days = getAuspiciousDays(birth, y, m);
    res.json({ days });
  } catch (err) {
    res.status(500).json({ error: "Failed to compute" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
