export const STORAGE_KEY='ptpro_profiles_wards2025';
export const getProfiles=()=>JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');
export const setProfiles=a=>localStorage.setItem(STORAGE_KEY,JSON.stringify(a));
export const uuid=()=> (crypto?.randomUUID ? crypto.randomUUID() : 'id_'+Date.now()+Math.random().toString(16).slice(2));
export function normalizePhone(p){ p=(p||'').replace(/[^\d+]/g,'').trim(); if(p.startsWith('+84'))return p; if(p.startsWith('0')&&p.length>=9)return '+84'+p.slice(1); return p; }
export function isValidPhone(p){ p=normalizePhone(p); const vn=/^\+?84(3|5|7|8|9)\d{8}$/; const g=/^\+?\d{8,13}$/; return vn.test(p)||g.test(p); }

export function saveProfile(gatherInputs,currentResult,evaluateBuildTime,calculateNumerology,detectIssues){
  const i=gatherInputs();
  if(!i.name) return alert('Vui lòng nhập họ tên.');
  if(!i.phone) return alert('Vui lòng nhập SĐT.');
  if(!isValidPhone(i.phone)) return alert('SĐT chưa đúng định dạng.');
  if(!i.birth) return alert('Vui lòng nhập ngày sinh.');
  if(!i.yearX||i.yearX<1900||i.yearX>2099) return alert('Năm xây không hợp lệ.');
  if(!i.monthX||i.monthX<1||i.monthX>12) return alert('Tháng xây không hợp lệ.');
  const R=currentResult||evaluateBuildTime(i.birth,i.gender,i.yearX,i.monthX);
  const numerology=calculateNumerology(i.birth);
  const site=i.layout?detectIssues(i.layout):{ids:i.issueIds||[]};
  const list=getProfiles(); const phoneKey=normalizePhone(i.phone); const idx=list.findIndex(p=>p.customer.phoneKey===phoneKey);
  const profile={
    id:idx>=0?list[idx].id:uuid(),
    createdAt:idx>=0?list[idx].createdAt:new Date().toISOString(),
    updatedAt:new Date().toISOString(),
    customer:{name:i.name,phone:i.phone,phoneKey},
    input:{birth:i.birth,gender:i.gender,huong:i.huong,year:i.yearX,month:i.monthX,issueIds:site.ids},
    bds:i.bds,
    result:{...R,numerology},
    summary:{cung:R.cung.cung,menh:R.cung.nguyenTo,nhom:R.cung.nhomTrach,dir:i.huong,fullAddress:i.bds.fullAddress,to:i.bds.to,thua:i.bds.thua,price:i.bds.price,issues:site.ids.length,numerology:numerology.number}
  };
  if(idx>=0) list[idx]=profile; else list.unshift(profile);
  setProfiles(list); renderProfiles(); alert('Đã lưu hồ sơ.');
}

export function renderProfiles(filter=''){
  const tbody=document.getElementById('profiles-tbody');
  const list=getProfiles().filter(p=> (p.customer.name+' '+p.customer.phone).toLowerCase().includes((filter||'').toLowerCase()));
  const fmt=s=>new Date(s).toLocaleString();
  tbody.innerHTML=list.map((p,idx)=>`
    <tr data-id="${p.id}" style="animation-delay:${idx*0.05}s">
      <td>${p.customer.name}</td>
      <td>${p.customer.phone}</td>
      <td>${p.summary.cung} (${p.summary.menh})</td>
      <td>${p.summary.numerology||''}</td>
      <td>${p.summary.dir}</td>
      <td>${p.summary.fullAddress||''}</td>
      <td>${(p.summary.to||'')}${p.summary.thua?(' / '+p.summary.thua):''}</td>
      <td>${p.summary.price?new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(p.summary.price):''}</td>
      <td>${p.summary.issues||0}</td>
      <td>${fmt(p.createdAt)}</td>
      <td class="row-actions"><button class="view">Xem</button><button class="delete">Xóa</button></td>
    </tr>`).join('');
}

export function exportCSV(){
  const rows=getProfiles(); if(rows.length===0) return alert('Chưa có dữ liệu để xuất.');
  const header=['id','name','phone','birth','gender','huong','year','month','cung','menh','nhom','numerology','address','ward','huyen','province','to','thua','price','issues','note','createdAt'];
  const csv=[header.join(',')];
  rows.forEach(p=>{
    const b=p.bds||{};
    const r=[p.id,`"${(p.customer.name||'').replace(/"/g,'""')}"`,p.customer.phone,p.input.birth,p.input.gender,p.input.huong,p.input.year,p.input.month,
      p.result?.cung?.cung||'',p.result?.cung?.nguyenTo||'',p.result?.cung?.nhomTrach||'',p.result?.numerology?.number||'',
      b.fullAddress||'',b.ward||'',b.huyen||'',b.province||'',b.to||'',b.thua||'',b.price||'',(p.input.issueIds||[]).length,(b.note||'').replace(/,/g,';'),p.createdAt];
    csv.push(r.join(','));
  });
  const blob=new Blob([csv.join('\n')],{type:'text/csv;charset=utf-8;'}); const url=URL.createObjectURL(blob);
  const a=document.createElement('a'); a.href=url; a.download='ho_so_khach_bds.csv'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}
