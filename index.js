const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use(express.static(__dirname));␊
␊
app.post('/api/ai-analyze', async (req, res) => {␊
  try {
    const apiKey = process.env.AI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Missing AI_API_KEY' });
    }

    const prompt = JSON.stringify(req.body);
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Bạn là chuyên gia phong thủy.' },
          { role: 'user', content: `Hãy phân tích phong thủy dựa trên dữ liệu: ${prompt}` }
        ],
        temperature: 0.7
      })
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
    res.status(500).json({ error: 'AI request failed' });
  }
});

app.get('/api/horoscope', async (req, res) => {␊
  try {
    const apiKey = process.env.AI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Missing AI_API_KEY' });
    }
    const { birth, gender } = req.query;
    const prompt = `Sinh ngày ${birth||''}, giới tính ${gender||''}. Hãy phân tích tử vi gồm năm can chi, ngũ hành, cục, sao.`;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Bạn là chuyên gia tử vi.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7
      })
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
    res.status(500).json({ error: 'Horoscope request failed' });
  }
});

function parseDateParts(s){ if(!s||typeof s!=='string') throw new Error('Ngày sinh không hợp lệ'); s=s.trim(); const sep=s.includes('-')?'-':(s.includes('/')?'/':null); if(!sep) throw new Error('Định dạng ngày phải có "-" hoặc "/"'); const a=s.split(sep).map(x=>parseInt(x,10)); if(a.length!==3||a.some(isNaN)) throw new Error('Định dạng ngày không đúng'); if(a[0]>31) return {year:a[0],month:a[1],day:a[2]}; return {year:a[2],month:a[1],day:a[0]}; }
const ZODIAC=['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
const idxZ=y=>((y-4)%12+12)%12; const nameZ=y=>ZODIAC[idxZ(y)];
const TTG=[{group:['Thân','Tý','Thìn'],tamTai:['Dần','Mão','Thìn']},{group:['Dần','Ngọ','Tuất'],tamTai:['Thân','Dậu','Tuất']},{group:['Hợi','Mão','Mùi'],tamTai:['Tỵ','Ngọ','Mùi']},{group:['Tỵ','Dậu','Sửu'],tamTai:['Hợi','Tý','Sửu']}];
function getEffectiveBirthYear(b){ const {year,month,day}=parseDateParts(b); if(month<3||(month===3&&day<=13)) return year-1; return year; }
function tuoiMu(eff,year){ return year-eff+1; }
function checkKimLau(t){ let r=t%9; if(r===0) r=9; const m={1:'Kim Lâu Thân',3:'Kim Lâu Thê',6:'Kim Lâu Tử',8:'Kim Lâu Lục Súc'}; return {isKimLau:[1,3,6,8].includes(r),type:m[r]||null}; }
function checkHoangOc(t){ const lb=['Nhất Cát','Nhì Nghi','Tam Địa Sát','Tứ Tấn Tài','Ngũ Thọ Tử','Lục Hoang Ốc']; const m=t%6; const i=(m===0)?5:m-1; const n=lb[i]; return {name:n,isBad:['Tam Địa Sát','Ngũ Thọ Tử','Lục Hoang Ốc'].includes(n)}; }
function checkTamTai(ownerYear,year){ const o=nameZ(ownerYear), c=nameZ(year), g=TTG.find(x=>x.group.includes(o)); return {isTamTai:g?g.tamTai.includes(c):false,yearChi:c}; }
function checkXungTuoi(ownerYear,year){ const opp=(idxZ(ownerYear)+6)%12; return {isXung:idxZ(year)===opp,opp:ZODIAC[opp],yearChi:nameZ(year)}; }
function elemYear(y){ const s=((y-4)%10+10)%10; if(s===0||s===1)return'Mộc'; if(s===2||s===3)return'Hỏa'; if(s===4||s===5)return'Thổ'; if(s===6||s===7)return'Kim'; return'Thủy'; }
const KHAC={'Mộc':'Thổ','Thổ':'Thủy','Thủy':'Hỏa','Hỏa':'Kim','Kim':'Mộc'};
function elemConflict(a,b){ return a&&b&&(KHAC[a]===b||KHAC[b]===a); }
function getAuspiciousDays(birth,year,month){
  const eff=getEffectiveBirthYear(birth);
  const age=tuoiMu(eff,year);
  const yE=elemYear(year);
  const mE=[null,'Thủy',null,'Hỏa','Thổ','Kim','Mộc',null,'Hỏa','Thổ','Kim','Mộc','Thủy'][month]||null;
  if(checkKimLau(age).isKimLau||checkHoangOc(age).isBad||checkTamTai(eff,year).isTamTai||checkXungTuoi(eff,year).isXung||elemConflict(elemYear(eff),yE)||elemConflict(elemYear(eff),mE)) return [];
  const birthElem=elemYear(eff);
  const daysInMonth=new Date(year,month,0).getDate();
  const bad=[3,5,7,13,14,18,22,23,27,29];
  const start=new Date(1984,1,2);
  const BE={'Tý':'Thủy','Sửu':'Thổ','Dần':'Mộc','Mão':'Mộc','Thìn':'Thổ','Tỵ':'Hỏa','Ngọ':'Hỏa','Mùi':'Thổ','Thân':'Kim','Dậu':'Kim','Tuất':'Thổ','Hợi':'Thủy'};
  const list=[];
  for(let d=1; d<=daysInMonth; d++){
    if(bad.includes(d)) continue;
    const date=new Date(year,month-1,d);
    const diff=Math.floor((date-start)/86400000);
    const branch=ZODIAC[(diff%12+12)%12];
    const elem=BE[branch];
    if(!elemConflict(birthElem,elem)) list.push(d);
  }
  return list;
}

app.get('/api/auspicious-days', (req, res) => {
  try {
    const { birth, year, month } = req.query;
    const y = parseInt(year,10), m = parseInt(month,10);
    if(!birth || !y || !m) return res.status(400).json({ error: 'Missing params' });
    const days = getAuspiciousDays(birth, y, m);
    res.json({ days });
  } catch(err) {
    res.status(500).json({ error: 'Failed to compute' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

});



