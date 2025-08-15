/* ====== Danh sách Phường/Xã mới (95 đơn vị) tách theo Tỉnh ====== */
import parseDateParts from "./parseDateParts.mjs";
import { ISSUES, detectIssues } from './siteIssues.mjs';
import { computeCanChiAndStars } from './advancedHoroscope.mjs';
import WARDS, { getWardsForProvince } from './wards.mjs';
import getAuspiciousDays from './getAuspiciousDays.mjs';
import lunar from './lunar.js';
import {
  getEffectiveBirthYear,
  tuoiMu,
  checkKimLau,
  checkHoangOc,
  checkTamTai,
  checkXungTuoi,
} from './fortune.mjs';
import { elemYear, elemConflict } from './elements.js';
import { startCompass, stopCompass, applyCompassToDirection } from "./public/compass.js";
import { calculateHoroscope, fetchChart } from "./public/horoscope.js";
import { getProfiles, setProfiles, saveProfile, renderProfiles, exportCSV } from "./public/profiles.js";
const { solarToLunar, lunarToSolar } = lunar;


/* ====== Phong thủy cốt lõi: cung mệnh, bát trạch, cảnh báo ====== */
function calculateNumerology(birth){
  const {year,month,day}=parseDateParts(birth);
  const sumDigits=n=>n.toString().split('').reduce((a,b)=>a+parseInt(b,10),0);
  let total=sumDigits(day)+sumDigits(month)+sumDigits(year);
  while(total>9 && total!==11 && total!==22 && total!==33){ total=sumDigits(total); }
  const meanings={
    1:'Lãnh đạo, độc lập, tiên phong.',
    2:'Hài hòa, hợp tác.',
    3:'Sáng tạo, lạc quan.',
    4:'Kỷ luật, nền tảng vững.',
    5:'Tự do, thay đổi.',
    6:'Trách nhiệm, yêu thương.',
    7:'Tri thức, phân tích.',
    8:'Tham vọng, thành công vật chất.',
    9:'Nhân đạo, lý tưởng.',
    11:'Trực giác mạnh, tâm linh.',
    22:'Kiến tạo lớn, thực tế.',
    33:'Phụng sự vô điều kiện.'
  };
  return {number:total,meaning:meanings[total]||''};
}
const MALE_START=1921, FEMALE_START=1922;
const MALE_SEQ=['Đoài','Càn','Khôn','Tốn','Chấn','Khôn','Khảm','Ly','Cấn'];
const FEMALE_SEQ=['Ly','Khảm','Khôn','Chấn','Tốn','Cấn','Càn','Đoài','Cấn'];
const mod9=n=>((n%9)+9)%9;
function getCungMenh(birth,gender){
  const eff=getEffectiveBirthYear(birth);
  const idx=mod9(eff-(gender==='nam'?MALE_START:FEMALE_START));
  const cung=(gender==='nam'?MALE_SEQ:FEMALE_SEQ)[idx];
  const info={'Càn':{nguyenTo:'Kim',huong:'Tây Bắc'},'Khôn':{nguyenTo:'Thổ',huong:'Tây Nam'},'Cấn':{nguyenTo:'Thổ',huong:'Đông Bắc'},'Chấn':{nguyenTo:'Mộc',huong:'Đông'},'Tốn':{nguyenTo:'Mộc',huong:'Đông Nam'},'Ly':{nguyenTo:'Hỏa',huong:'Nam'},'Khảm':{nguyenTo:'Thủy',huong:'Bắc'},'Đoài':{nguyenTo:'Kim',huong:'Tây'}}[cung];
  const nhom=['Khảm','Ly','Chấn','Tốn'].includes(cung)?'Đông Tứ Trạch':'Tây Tứ Trạch';
  return {effectiveYear:eff,cung,nhomTrach:nhom,...info};
}
function getBatTrachForCung(cung){
  const C={good:{'Sinh Khí':{ten:'Sinh Khí',loai:'good',y:'Tài lộc, thăng tiến.'},'Thiên Y':{ten:'Thiên Y',loai:'good',y:'Sức khỏe, quý nhân.'},'Diên Niên':{ten:'Diên Niên',loai:'good',y:'Hòa thuận.'},'Phục Vị':{ten:'Phục Vị',loai:'good',y:'Ổn định, học hành.'}},
           bad:{'Tuyệt Mệnh':{ten:'Tuyệt Mệnh',loai:'bad',y:'Nặng nhất.'},'Ngũ Quỷ':{ten:'Ngũ Quỷ',loai:'bad',y:'Thị phi.'},'Lục Sát':{ten:'Lục Sát',loai:'bad',y:'Kiện tụng.'},'Họa Hại':{ten:'Họa Hại',loai:'bad',y:'Xui xẻo.'}}};
  const B={'Khảm':{'Đông Nam':C.good['Sinh Khí'],'Đông':C.good['Thiên Y'],'Nam':C.good['Diên Niên'],'Bắc':C.good['Phục Vị'],'Tây Nam':C.bad['Tuyệt Mệnh'],'Đông Bắc':C.bad['Ngũ Quỷ'],'Tây Bắc':C.bad['Lục Sát'],'Tây':C.bad['Họa Hại']},
           'Ly':{'Đông':C.good['Sinh Khí'],'Đông Nam':C.good['Thiên Y'],'Bắc':C.good['Diên Niên'],'Nam':C.good['Phục Vị'],'Tây Bắc':C.bad['Tuyệt Mệnh'],'Tây':C.bad['Ngũ Quỷ'],'Tây Nam':C.bad['Lục Sát'],'Đông Bắc':C.bad['Họa Hại']},
           'Chấn':{'Nam':C.good['Sinh Khí'],'Bắc':C.good['Thiên Y'],'Đông Nam':C.good['Diên Niên'],'Đông':C.good['Phục Vị'],'Tây':C.bad['Tuyệt Mệnh'],'Tây Bắc':C.bad['Ngũ Quỷ'],'Đông Bắc':C.bad['Lục Sát'],'Tây Nam':C.bad['Họa Hại']},
           'Tốn':{'Bắc':C.good['Sinh Khí'],'Nam':C.good['Thiên Y'],'Đông':C.good['Diên Niên'],'Đông Nam':C.good['Phục Vị'],'Đông Bắc':C.bad['Tuyệt Mệnh'],'Tây Nam':C.bad['Ngũ Quỷ'],'Tây':C.bad['Lục Sát'],'Tây Bắc':C.bad['Họa Hại']},
           'Càn':{'Tây':C.good['Sinh Khí'],'Đông Bắc':C.good['Thiên Y'],'Tây Nam':C.good['Diên Niên'],'Tây Bắc':C.good['Phục Vị'],'Nam':C.bad['Tuyệt Mệnh'],'Đông':C.bad['Ngũ Quỷ'],'Bắc':C.bad['Lục Sát'],'Đông Nam':C.bad['Họa Hại']},
           'Khôn':{'Đông Bắc':C.good['Sinh Khí'],'Tây':C.good['Thiên Y'],'Tây Bắc':C.good['Diên Niên'],'Tây Nam':C.good['Phục Vị'],'Bắc':C.bad['Tuyệt Mệnh'],'Đông Nam':C.bad['Ngũ Quỷ'],'Nam':C.bad['Lục Sát'],'Đông':C.bad['Họa Hại']},
           'Cấn':{'Tây Nam':C.good['Sinh Khí'],'Tây Bắc':C.good['Thiên Y'],'Tây':C.good['Diên Niên'],'Đông Bắc':C.good['Phục Vị'],'Đông Nam':C.bad['Tuyệt Mệnh'],'Bắc':C.bad['Ngũ Quỷ'],'Đông':C.bad['Lục Sát'],'Nam':C.bad['Họa Hại']},
           'Đoài':{'Tây Bắc':C.good['Sinh Khí'],'Tây Nam':C.good['Thiên Y'],'Đông Bắc':C.good['Diên Niên'],'Tây':C.good['Phục Vị'],'Đông':C.bad['Tuyệt Mệnh'],'Nam':C.bad['Ngũ Quỷ'],'Đông Nam':C.bad['Lục Sát'],'Bắc':C.bad['Họa Hại']}};
  return B[cung];
}
function analyzeHouseDirection(cung,huong){ const t=getBatTrachForCung(cung); const all=Object.entries(t).map(([h,i])=>({huong:h,...i})); return {selected:t[huong],goods:all.filter(i=>i.loai==='good'),bads:all.filter(i=>i.loai==='bad')}; }
function evaluateBuildTime(birth,gender,year,month){
  const cung=getCungMenh(birth,gender); const age=tuoiMu(cung.effectiveYear,year);
  const kl=checkKimLau(age), ho=checkHoangOc(age), tt=checkTamTai(cung.effectiveYear,year), x=checkXungTuoi(cung.effectiveYear,year);
  const yE=elemYear(year), mE=[null,'Thủy',null,'Hỏa','Thổ','Kim','Mộc',null,'Hỏa','Thổ','Kim','Mộc','Thủy'][month]||null;
  const warnings=[]; if(kl.isKimLau)warnings.push(`Phạm Kim Lâu (${kl.type}).`); if(ho.isBad)warnings.push(`Phạm Hoang Ốc (${ho.name}).`); if(tt.isTamTai)warnings.push(`Phạm Tam Tai (${tt.yearChi}).`); if(x.isXung)warnings.push(`Xung tuổi với năm ${year} (đối xung ${x.opp}).`); if(elemConflict(cung.nguyenTo,yE))warnings.push(`Cung (${cung.nguyenTo}) khắc Ngũ hành năm (${yE}).`);
  const monthWarnings=[]; if(elemConflict(cung.nguyenTo,mE))monthWarnings.push(`Tháng ${month} xung ngũ hành (${mE}) với Cung (${cung.nguyenTo}).`);
  return {cung,ageMu:age,yearElement:yE,monthElement:mE,warnings,monthWarnings};
}

/* ====== UI: Wards theo tỉnh, Issues, La bàn, Lưu hồ sơ ====== */
function populateWardsForProvince(){
  const prov=document.getElementById('bd-province').value;
  const sel=document.getElementById('bd-ward');
  const wards=getWardsForProvince(prov);
  const opts=wards.map(w=>`<option value="${w}">${w}</option>`);
  opts.push('<option value="__other__">Khác (nhập tay)</option>');
  sel.innerHTML=opts.join('');
  sel.value=wards[0]||'__other__';
  document.getElementById('ward-custom-wrap').style.display = (sel.value==='__other__')?'block':'none';
  document.getElementById('bd-full-address').textContent = composeFullAddress();
}
function currentWardValue(){
  const v=document.getElementById('bd-ward').value;
  if(v==='__other__') return document.getElementById('bd-ward-custom').value.trim();
  return v;
}
function composeFullAddress(){
  const prov=document.getElementById('bd-province').value;
  const ward=currentWardValue();
  const huyenEl=document.getElementById('bd-huyen');
  const huyen=huyenEl ? huyenEl.value.trim() : ''; // tùy chọn
  const detail=document.getElementById('bd-address-detail').value.trim();
  const parts=[]; if(detail)parts.push(detail); if(ward)parts.push(ward); if(huyen)parts.push(huyen); parts.push(prov);
  return parts.join(', ');
}

async function populateWardSelect(){
  try{
    const res=await fetch('./data/wards.json',{cache:'no-store'});
    if(!res.ok) throw new Error('HTTP '+res.status);
    const data=await res.json();
    if(Array.isArray(data)){
      const map={};
      data.forEach(w=>{
        const p=w.province||'Đồng Nai';
        (map[p]=map[p]||[]).push(w.name);
      });
      Object.assign(WARDS,map);
    }else{
    Object.assign(WARDS,data);
  }
  }catch(err){
    console.error('Failed to load wards',err);
    const sel=document.getElementById('bd-ward');
    if(sel) sel.innerHTML='<option value="">Không tải được dữ liệu</option>';
  }
  populateWardsForProvince();
}

function checkSiteIssues(input){
  let result;
  if(Array.isArray(input)){
    const map=new Map(ISSUES.map(i=>[i.id,i]));
    const problems=[],solutions=[];
    input.forEach(id=>{ const it=map.get(id); if(it){ problems.push(`${it.label}: ${it.impact}`); solutions.push(`Hóa giải: ${it.remedy}`); }});
    result={ids:input,problems,solutions};
  }else{
    result=detectIssues(input||{});
  }
  return result;
}



function ensureSolarBirth(birth){
  if(!birth) return birth;
  const calType=document.getElementById('calendar-type')?.value||'solar';
  if(calType==='lunar' && typeof lunarToSolar==='function'){
    try{
      const parts=birth.split(/[-\/]/).map(x=>parseInt(x,10));
      let y,m,d;
      if(parts[0]>31){[y,m,d]=parts;} else {[d,m,y]=parts;}
      const sol=lunarToSolar({ year:y, month:m, day:d });
      if(sol){
        return `${sol.year}-${String(sol.month).padStart(2,'0')}-${String(sol.day).padStart(2,'0')}`;
      }
    }catch(err){ console.error('lunarToSolar failed',err); }
  }
  return birth;
}

function ensureSolarMonth(year,month){
  if(isNaN(year)||isNaN(month)) return {year,month};
  const calType=document.getElementById('calendar-type')?.value||'solar';
  if(calType==='lunar' && typeof lunarToSolar==='function'){
    try{
      const sol=lunarToSolar({ year, month, day:1 });
      if(sol){ return {year:sol.year,month:sol.month}; }
    }catch(err){ console.error('lunarToSolar failed',err); }
  }
  return {year,month};
}

function updateLunarDisplay(){
  const el=document.getElementById('ngay-am'); if(!el) return;
  const raw=document.getElementById('ngay-sinh').value.trim();
  if(!raw){ el.textContent=''; return; }
  const parts=raw.split(/[-\/]/).map(x=>parseInt(x,10));
  let y,m,d;
  if(parts[0]>31){[y,m,d]=parts;} else {[d,m,y]=parts;}
  const calType=document.getElementById('calendar-type')?.value||'solar';
  if(calType==='lunar'){
  const sol=lunarToSolar({ year:y, month:m, day:d });
    if(sol){ y=sol.year; m=sol.month; d=sol.day; }
  }
  const lun=solarToLunar({ year:y, month:m, day:d });
  if(lun){
    el.textContent=`Âm lịch: ${String(lun.day).padStart(2,'0')}/${String(lun.month).padStart(2,'0')}/${lun.year}`;
  }else{
    el.textContent='';
  }
}

function gatherInputs(){
  const name=document.getElementById('kh-ten').value.trim();
  const phone=document.getElementById('kh-phone').value.trim();
  let birth=ensureSolarBirth(document.getElementById('ngay-sinh').value.trim());
  const gender=document.getElementById('gioi-tinh').value;
  const huong=document.getElementById('huong-nha').value;
  let yearX=parseInt(document.getElementById('nam-xay').value,10);
  let monthX=parseInt(document.getElementById('thang-xay').value,10);
  ({year:yearX,month:monthX}=ensureSolarMonth(yearX,monthX));

  const province=document.getElementById('bd-province').value;
  const ward=currentWardValue();
  const huyenEl=document.getElementById('bd-huyen');
  const huyen=huyenEl ? huyenEl.value.trim() : '';
  const to=document.getElementById('bd-to').value.trim();
  const thua=document.getElementById('bd-thua').value.trim();
  const price=parseFloat(document.getElementById('bd-price').value)||0;
  const detail=document.getElementById('bd-address-detail').value.trim();
  const note=document.getElementById('bd-note').value.trim();

  const fullAddr=composeFullAddress();
  document.getElementById('bd-full-address').textContent=fullAddr||'—';

  const bds={province,ward,huyen,to,thua,addressDetail:detail,fullAddress:fullAddr,price,note};
  let layout=null;
  if(polygonPoints.length||centerPoint||entrancePoint||stairPoint){
    layout={
      polygon:polygonPoints.map(p=>({x:p.x,y:p.y})),
      center:centerPoint,
      entrance:entrancePoint,
      stair:stairPoint,
      north:northRotation
    };
  }
  return {name,phone,birth,gender,huong,yearX,monthX,bds,layout,issueIds:selectedIssueIds.slice()};
}

function validateInputs(i){
  if(!i.birth) return 'Vui lòng nhập ngày sinh.';
  if(!i.yearX||i.yearX<1900||i.yearX>2099) return 'Năm xây không hợp lệ.';
  if(!i.monthX||i.monthX<1||i.monthX>12) return 'Tháng xây không hợp lệ.';
  return '';
}


async function renderResult(R,i){
  const resEl=document.getElementById('result-content');
  if(resEl) resEl.innerHTML='';
  const dir=analyzeHouseDirection(R.cung.cung,i.huong);
  const site=checkSiteIssues(i.layout || i.issueIds || []);
  const num=calculateNumerology(i.birth);
  const adv=computeCanChiAndStars(i.birth);
  let html='';
  html+=`<div class="ket-luan">
    <div><span class="badge">Cung mệnh</span> <strong>${R.cung.cung}</strong> — Ngũ hành: <strong>${R.cung.nguyenTo}</strong> — Nhóm: <strong>${R.cung.nhomTrach}</strong></div>
    <div><span class="badge">Thần số học</span> <strong>${num.number}</strong> — ${num.meaning}</div>
    <div><span class="badge">Can chi</span> Tháng: <strong>${adv.canChi.month}</strong> — Ngày: <strong>${adv.canChi.day}</strong> — Giờ: <strong>${adv.canChi.hour}</strong></div>
    <div><span class="badge">Sao chính</span> Tử Vi: <strong>${adv.stars['Tử Vi']}</strong> — Thiên Phủ: <strong>${adv.stars['Thiên Phủ']}</strong> — Cung mệnh: <strong>${adv.cungMenh}</strong></div>
  </div>`;
  html+=`<h3 class="block-title">Hướng nhà: ${i.huong} <span class="tag ${dir.selected?.loai||'warn'}">${dir.selected?.ten||'—'}</span></h3>`;
  if(dir.selected){
    const adv = dir.selected.loai==='good'
      ? ['Ưu tiên cửa/ban công hướng này.','Bếp/giường/bàn thờ/bàn làm việc xoay về 1 trong 4 hướng tốt.','Giữ lối vào thông thoáng.']
      : ['Bình phong/hiên/bậc tam cấp để “bẻ” dòng khí xấu.','Bố trí “tọa hung – hướng cát”.','Cân nhắc Bát Quái lồi.','Tăng cây xanh/ánh sáng.'];
    html+=`<p><em>Ý nghĩa:</em> ${dir.selected.y}</p><ul class="clean">`+adv.map(a=>`<li>${a}</li>`).join('')+`</ul>`;
  }
  if(dir.goods.length){
    const pr={'Sinh Khí':1,'Thiên Y':2,'Diên Niên':3,'Phục Vị':4};
    const g=[...dir.goods].sort((a,b)=>(pr[a.ten]||9)-(pr[b.ten]||9));
    html+=`<p><strong>4 hướng tốt nên ưu tiên:</strong></p><ul class="clean">`+g.map(x=>`<li><span class="good">${x.huong}</span> — ${x.ten}: ${x.y}</li>`).join('')+`</ul>`;
  }
  html+=`<hr/><h3 class="block-title">Năm/Tháng xây</h3>`;
  html+=`<p>Tuổi mụ: <strong>${R.ageMu}</strong> — Ngũ hành năm: <strong>${R.yearElement}</strong>${R.monthElement?` — Ngũ hành tháng: <strong>${R.monthElement}</strong>`:''}</p>`;
  if(R.warnings.length===0) html+=`<p><span class="good">Năm ${i.yearX}: Không thấy cảnh báo lớn.</span></p>`; else html+=`<ul class="clean">`+R.warnings.map(w=>`<li><span class="bad">${w}</span></li>`).join('')+`</ul>`;
  if(R.monthWarnings.length===0) html+=`<p><span class="good">Tháng ${i.monthX}: Không thấy cảnh báo lớn.</span></p>`; else html+=`<ul class="clean">`+R.monthWarnings.map(w=>`<li class="warn">${w}</li>`).join('')+`</ul>`;

  html+=`<hr/><h3 class="block-title">Môi trường & lỗi phong thủy</h3>`;
   if(site.problems.length===0) html+=`<p><span class="good">Không phát hiện lỗi đã chọn.</span></p>`;
  else{ html+=`<p><strong>Vấn đề:</strong></p><ul class="clean">`+site.problems.map(p=>`<li><span class="bad">${p}</span></li>`).join('')+`</ul>`;
        html+=`<p><strong>Hóa giải:</strong></p><ul class="clean">`+site.solutions.map(s=>`<li>${s}</li>`).join('')+`</ul>`; }

  html+=`<hr/><h3 class="block-title">Thông tin bất động sản</h3>`;
  html+=`<p><strong>Địa chỉ:</strong> ${i.bds.fullAddress||'—'}</p>`;
  html+=`<p><strong>Tờ/Thửa:</strong> ${i.bds.to||'—'} / ${i.bds.thua||'—'}</p>`;
  html+=`<p><strong>Giá:</strong> ${i.bds.price?new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(i.bds.price):'—'}</p>`;
  html+=`<p><strong>Ghi chú:</strong> ${i.bds.note||'—'}</p>`;
  html+=`<hr/><h3 class="block-title">Phân tích AI</h3><div id="ai-analysis"><em>Đang phân tích…</em></div>`;
  if(resEl) resEl.innerHTML=html;
  try {
    const ai = await getAiAnalysis({input:i, result:R});
    document.getElementById('ai-analysis').textContent = ai.text || 'Không có phản hồi';
  } catch(err) {
    document.getElementById('ai-analysis').textContent = 'Lỗi AI: ' + (err.message || err);
  }
}

async function getAiAnalysis(payload){
  const res = await fetch('./api/ai-analyze', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ text: JSON.stringify(payload) })
  });
  if(!res.ok) throw new Error('Network error');
  return res.json();
}

/* ====== Vẽ đa giác nền nhà ====== */
const polygonPoints=[];
let centerPoint=null, entrancePoint=null, stairPoint=null;
let northRotation=0;
let dragTarget=null, mode='add';
let canvas=null, ctx=null;
let selectedIssueIds=[];

function getMousePos(evt){
  const rect=canvas.getBoundingClientRect();
  return {x:evt.clientX-rect.left,y:evt.clientY-rect.top};
}

function hitTest(pos){
  const r=6;
  for(let i=0;i<polygonPoints.length;i++){
    const p=polygonPoints[i];
    if(Math.hypot(p.x-pos.x,p.y-pos.y)<r) return {type:'poly',index:i};
  }
  if(centerPoint&&Math.hypot(centerPoint.x-pos.x,centerPoint.y-pos.y)<r) return {type:'center'};
  if(entrancePoint&&Math.hypot(entrancePoint.x-pos.x,entrancePoint.y-pos.y)<r) return {type:'entrance'};
  if(stairPoint&&Math.hypot(stairPoint.x-pos.x,stairPoint.y-pos.y)<r) return {type:'stair'};
  return null;
}

function draw(){
  if(!ctx) return;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.save();
  ctx.translate(canvas.width/2,canvas.height/2);
  ctx.rotate(northRotation*Math.PI/180);
  ctx.translate(-canvas.width/2,-canvas.height/2);

  if(polygonPoints.length>1){
    ctx.beginPath();
    ctx.moveTo(polygonPoints[0].x,polygonPoints[0].y);
    for(let i=1;i<polygonPoints.length;i++) ctx.lineTo(polygonPoints[i].x,polygonPoints[i].y);
    ctx.closePath();
    ctx.stroke();
  }

  ctx.fillStyle='#000';
  polygonPoints.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,5,0,Math.PI*2);
    ctx.fill();
  });

  if(centerPoint){
    ctx.fillStyle='red';
    ctx.beginPath();
    ctx.arc(centerPoint.x,centerPoint.y,5,0,Math.PI*2);
    ctx.fill();
  }
  if(entrancePoint){
    ctx.fillStyle='blue';
    ctx.beginPath();
    ctx.arc(entrancePoint.x,entrancePoint.y,5,0,Math.PI*2);
    ctx.fill();
  }
  if(stairPoint){
    ctx.fillStyle='green';
    ctx.beginPath();
    ctx.arc(stairPoint.x,stairPoint.y,5,0,Math.PI*2);
    ctx.fill();
  }

  ctx.restore();
}

/* ====== Vẽ lên ảnh ====== */
let drawCanvas, drawCtx, drawImg, drawEnabled=false, drawing=false, currentPath=[], paths=[];
function initCanvasDrawing(){
  drawCanvas=document.getElementById('canvas');
  if(!drawCanvas) return;
  drawCtx=drawCanvas.getContext('2d');
  drawImg=new Image();

  document.getElementById('fileInput').addEventListener('change',e=>{
    const file=e.target.files[0]; if(!file) return;
    const reader=new FileReader();
    reader.onload=ev=>{ drawImg.onload=()=>{
        const maxW=document.getElementById('draw-section').clientWidth||window.innerWidth;
        const scale=Math.min(maxW/drawImg.width,1);
        drawCanvas.width=drawImg.width*scale;
        drawCanvas.height=drawImg.height*scale;
        redrawCanvas();
      }; drawImg.src=ev.target.result; };
    reader.readAsDataURL(file);
  });

  document.getElementById('btn-start-draw').addEventListener('click',()=>{drawEnabled=true;});
  document.getElementById('btn-finish-draw').addEventListener('click',()=>{drawEnabled=false; drawing=false;});
  document.getElementById('btn-undo').addEventListener('click',()=>{paths.pop(); redrawCanvas();});
  document.getElementById('btn-clear').addEventListener('click',()=>{paths=[]; currentPath=[]; redrawCanvas();});

  const getPos=e=>{
    const rect=drawCanvas.getBoundingClientRect();
    return {x:(e.clientX-rect.left), y:(e.clientY-rect.top)};
  };

  const start=e=>{ if(!drawEnabled) return; drawing=true; currentPath=[getPos(e)]; };
  const move=e=>{ if(!drawing) return; currentPath.push(getPos(e)); redrawCanvas(); };
  const end=()=>{ if(drawing){ paths.push(currentPath); drawing=false; currentPath=[]; redrawCanvas(); } };

  drawCanvas.addEventListener('mousedown',start);
  drawCanvas.addEventListener('mousemove',move);
  drawCanvas.addEventListener('mouseup',end);
  drawCanvas.addEventListener('mouseleave',end);
  drawCanvas.addEventListener('touchstart',e=>{start(e.touches[0]);});
  drawCanvas.addEventListener('touchmove',e=>{move(e.touches[0]); e.preventDefault();});
  drawCanvas.addEventListener('touchend',end);
}

function redrawCanvas(){
  if(!drawCtx) return;
  drawCtx.clearRect(0,0,drawCanvas.width,drawCanvas.height);
  if(drawImg&&drawImg.complete) drawCtx.drawImage(drawImg,0,0,drawCanvas.width,drawCanvas.height);
  drawCtx.lineWidth=2; drawCtx.strokeStyle='red'; drawCtx.lineJoin='round'; drawCtx.lineCap='round';
  const all=[...paths]; if(currentPath.length) all.push(currentPath);
  all.forEach(path=>{ if(path.length){ drawCtx.beginPath(); drawCtx.moveTo(path[0].x,path[0].y); for(let i=1;i<path.length;i++) drawCtx.lineTo(path[i].x,path[i].y); drawCtx.stroke(); }});
}

/* ====== Sự kiện UI ====== */
document.addEventListener('DOMContentLoaded', async ()=>{
  const root=document.querySelector('.page-enter');
  if(root) root.classList.remove('page-enter');
  initCanvasDrawing();
  document.getElementById('bd-province').addEventListener('change',populateWardsForProvince);
  await populateWardSelect();

    const birthEl=document.getElementById('ngay-sinh');
  const calEl=document.getElementById('calendar-type');
  if(birthEl) birthEl.addEventListener('input',updateLunarDisplay);
  if(calEl) calEl.addEventListener('change',updateLunarDisplay);
  updateLunarDisplay();

  document.getElementById('bd-ward').addEventListener('change',e=>{
    document.getElementById('ward-custom-wrap').style.display = (e.target.value==='__other__')?'block':'none';
    document.getElementById('bd-full-address').textContent = composeFullAddress();
  });
  ['bd-ward-custom','bd-huyen','bd-address-detail','bd-to','bd-thua','bd-price','bd-note'].forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.addEventListener('input',()=>{ document.getElementById('bd-full-address').textContent=composeFullAddress(); });
  });
  document.getElementById('btn-save-ward').addEventListener('click',()=>{
    const prov=document.getElementById('bd-province').value;
    const custom=document.getElementById('bd-ward-custom').value.trim();
    if(!custom) return alert('Nhập tên phường/xã.');
    // Lưu bổ sung tạm thời vào danh sách của tỉnh hiện tại
    getWardsForProvince(prov).push(custom);
    populateWardsForProvince();
    document.getElementById('bd-ward').value=custom;
    document.getElementById('ward-custom-wrap').style.display='none';
    document.getElementById('bd-full-address').textContent=composeFullAddress();
    alert('Đã lưu phường/xã mới vào danh sách cục bộ.');
  });

  const issuesWrap=document.getElementById('issues-container');
  if(issuesWrap){
    issuesWrap.innerHTML='';
    selectedIssueIds=[];
    try{
      ISSUES.forEach(it=>{
        const label=document.createElement('label');
        label.className='issue-item';
        const cb=document.createElement('input');
        cb.type='checkbox';
        cb.value=it.id;
        cb.addEventListener('change',e=>{
          if(e.target.checked){
            if(!selectedIssueIds.includes(it.id)) selectedIssueIds.push(it.id);
          }else{
            selectedIssueIds=selectedIssueIds.filter(id=>id!==it.id);
          }
        });
        label.appendChild(cb);
        const span=document.createElement('span');
        span.innerHTML=`<strong>[${it.cat}]</strong> ${it.label}`;
        label.appendChild(span);
        issuesWrap.appendChild(label);
      });
    }catch(err){
      console.error('Failed to render issues:', err);
      issuesWrap.innerHTML='<div class="error">Không thể tải danh sách lỗi phong thủy.</div>';
    }
    const search=document.getElementById('issues-search');
    if(search){
      search.addEventListener('input',e=>{
        const q=e.target.value.toLowerCase();
        issuesWrap.querySelectorAll('.issue-item').forEach(lbl=>{
          lbl.style.display=lbl.textContent.toLowerCase().includes(q)?'':'none';
        });
      });
    }
      }else{
    console.error('Missing #issues-container in DOM.');
    const errDiv=document.createElement('div');
    errDiv.className='error';
    errDiv.textContent='Không tìm thấy vùng hiển thị lỗi phong thủy.';
    document.body.appendChild(errDiv);
  }
  
  // Compass
  document.getElementById('btn-compass-start').addEventListener('click',startCompass);
  document.getElementById('btn-compass-stop').addEventListener('click',stopCompass);
  document.getElementById('btn-compass-apply').addEventListener('click',applyCompassToDirection);

   // Canvas polygon
  canvas=document.getElementById('fengCanvas');
  if(canvas){
    ctx=canvas.getContext('2d');
    draw();
    canvas.addEventListener('mousedown',e=>{
      const pos=getMousePos(e);
      if(mode==='center'){ centerPoint=pos; mode='add'; draw(); return; }
      if(mode==='entrance'){ entrancePoint=pos; mode='add'; draw(); return; }
      if(mode==='stair'){ stairPoint=pos; mode='add'; draw(); return; }
      const hit=hitTest(pos);
      if(hit) dragTarget=hit; else { polygonPoints.push(pos); draw(); }
    });
    canvas.addEventListener('mousemove',e=>{
      if(!dragTarget) return;
      const pos=getMousePos(e);
      if(dragTarget.type==='poly') polygonPoints[dragTarget.index]=pos;
      else if(dragTarget.type==='center') centerPoint=pos;
      else if(dragTarget.type==='entrance') entrancePoint=pos;
      else if(dragTarget.type==='stair') stairPoint=pos;
      draw();
    });
    const endDrag=()=>{dragTarget=null;};
    canvas.addEventListener('mouseup',endDrag);
    canvas.addEventListener('mouseleave',endDrag);
    document.getElementById('btn-set-center').addEventListener('click',()=>{mode='center';});
    document.getElementById('btn-set-entrance').addEventListener('click',()=>{mode='entrance';});
    const stairBtn=document.getElementById('btn-set-stair');
    if(stairBtn) stairBtn.addEventListener('click',()=>{mode='stair';});
    document.getElementById('northAngle').addEventListener('input',e=>{
      northRotation=parseFloat(e.target.value)||0;
      const dial=document.querySelector('.dial');
      if(dial) dial.style.transform=`rotate(${northRotation}deg)`;
      draw();
    });
  }

  // Profiles
  renderProfiles();
  document.getElementById('profiles-search').addEventListener('input',e=>renderProfiles(e.target.value));

  // Horoscope
  const btnHs=document.getElementById('btn-horoscope');
  if(btnHs){
    btnHs.addEventListener('click',async()=>{
      let birth=ensureSolarBirth(document.getElementById('ngay-sinh').value.trim());
      const gender=document.getElementById('gioi-tinh').value;
      if(!birth) return alert('Vui lòng nhập ngày sinh.');
      const data=await calculateHoroscope(birth,gender);
      const el=document.getElementById('horoscope-result');
      if(data.error){ el.textContent=data.error; return; }
      let html=`<p><strong>Năm:</strong> ${data.namCanChi||'—'}</p>`;
      html+=`<p><strong>Ngũ hành:</strong> ${data.nguHanh||'—'}</p>`;
      if(data.cuc) html+=`<p><strong>Cục:</strong> ${data.cuc}</p>`;
      if(data.sao) html+=`<p><strong>Sao:</strong> ${data.sao}</p>`;
      if(data.text) html+=`<p>${data.text}</p>`;
      el.innerHTML=html;
    });
  }

  const btnChart=document.getElementById('btn-chart');
  if(btnChart){
    btnChart.addEventListener('click',async()=>{
      const name=document.getElementById('chart-name').value.trim();
      if(!name) return alert('Vui lòng nhập tên.');
      const data=await fetchChart(name);
      const el=document.getElementById('chart-result');
      if(data.error){ el.textContent=data.error; return; }
      el.innerHTML=Object.entries(data.planets).map(([p,pos])=>`${p}: ${pos.sign} ${pos.degree.toFixed(2)}`).join('<br>');
    });
  }

  // Analyze
  const btnAnalyze=document.getElementById('analyzeBtn');
  if(btnAnalyze){
    btnAnalyze.addEventListener('click',async()=>{
      const i=gatherInputs();
      const err=validateInputs(i);
      const resultEl=document.getElementById('result-content');
      if(resultEl) resultEl.innerHTML='';
      if(err){ alert(err); return; }
      try{
         const R=evaluateBuildTime(i.birth,i.gender,i.yearX,i.monthX);
        await renderResult(R,i);
        const days=getAuspiciousDays(i.birth,i.yearX,i.monthX);
        const el=document.getElementById('auspicious-days');
        if(el) el.innerHTML = days.length?`<strong>Ngày đẹp:</strong> ${days.join(', ')}`:'Không có ngày phù hợp.';
        const inp=document.getElementById('ad-month');
        if(inp) inp.value=`${i.yearX}-${String(i.monthX).padStart(2,'0')}`;
      }catch(err){ alert('Lỗi: '+(err.message||err)); }
    });
  }
  const btnGood=document.getElementById('btn-auspicious');
  if(btnGood){
    btnGood.addEventListener('click',()=>{
      try{
        let birth=ensureSolarBirth(document.getElementById('ngay-sinh').value.trim());
        const ym=document.getElementById('ad-month').value;
        if(!birth) return alert('Vui lòng nhập ngày sinh.');
        if(!ym) return alert('Vui lòng chọn tháng.');
        let [y,m]=ym.split('-').map(Number);
        ({year:y,month:m}=ensureSolarMonth(y,m));
        const days = getAuspiciousDays(birth, y, m);
        const el=document.getElementById('auspicious-days');
        if(el) el.innerHTML = days.length?`<strong>Ngày đẹp:</strong> ${days.join(', ')}`:'Không có ngày phù hợp.';
      }catch(err){ alert('Lỗi: '+(err.message||err)); }
    });
  }

  // Save / Export
  document.getElementById('btn-save').addEventListener('click',()=>{ try{ saveProfile(gatherInputs, null, evaluateBuildTime, calculateNumerology, detectIssues); }catch(err){ alert('Lỗi: '+(err.message||err)); }});
  document.getElementById('btn-export').addEventListener('click',exportCSV);

  // Row actions
document.getElementById('profiles-tbody').addEventListener('click',e=>{
    const tr=e.target.closest('tr'); if(!tr) return; const id=tr.getAttribute('data-id');
    const list=getProfiles(); const p=list.find(x=>x.id===id); if(!p) return;
    if(e.target.classList.contains('view')){
      // fill form
        document.getElementById('kh-ten').value=p.customer.name;
        document.getElementById('kh-phone').value=p.customer.phone;
        document.getElementById('ngay-sinh').value=p.input.birth;
        updateLunarDisplay();
        document.getElementById('gioi-tinh').value=p.input.gender;
      document.getElementById('huong-nha').value=p.input.huong;
      document.getElementById('nam-xay').value=p.input.year;
      document.getElementById('thang-xay').value=p.input.month;

      document.getElementById('bd-province').value=p.bds.province||'Đồng Nai';
      populateWardsForProvince();
      const wards=getWardsForProvince(p.bds.province);
      if(wards.includes(p.bds.ward)){ document.getElementById('bd-ward').value=p.bds.ward; document.getElementById('ward-custom-wrap').style.display='none'; }
      else { document.getElementById('bd-ward').value='__other__'; document.getElementById('ward-custom-wrap').style.display='block'; document.getElementById('bd-ward-custom').value=p.bds.ward||''; }
      const huyenEl=document.getElementById('bd-huyen');
      if(huyenEl) huyenEl.value=p.bds.huyen||'';
      document.getElementById('bd-to').value=p.bds.to||'';
      document.getElementById('bd-thua').value=p.bds.thua||'';
      document.getElementById('bd-address-detail').value=p.bds.addressDetail||'';
      document.getElementById('bd-price').value=p.bds.price||'';
      document.getElementById('bd-note').value=p.bds.note||'';
      document.getElementById('bd-full-address').textContent=p.bds.fullAddress||'—';

      renderResult(p.result,{...p.input,bds:p.bds,issueIds:p.input.issueIds||[]});
      selectedIssueIds=(p.input.issueIds||[]).slice();
      const ad=document.getElementById('auspicious-days');
      if(ad){
        const days=getAuspiciousDays(p.input.birth,p.input.yearX,p.input.monthX);
        ad.innerHTML=days.length?`<strong>Ngày đẹp:</strong> ${days.join(', ')}`:'Không có ngày phù hợp.';
      }
      const inp=document.getElementById('ad-month');
      if(inp) inp.value=`${p.input.yearX}-${String(p.input.monthX).padStart(2,'0')}`;
      window.scrollTo({top:0,behavior:'smooth'});
    }
    if(e.target.classList.contains('delete')){
      if(confirm('Xóa hồ sơ này?')){ setProfiles(list.filter(x=>x.id!==id)); renderProfiles(document.getElementById('profiles-search').value); }
    }
  });
});
