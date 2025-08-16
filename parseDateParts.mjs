export default function parseDateParts(s) {
  if (!s || typeof s !== 'string') throw new Error('Ngày sinh không hợp lệ');
  s = s.trim().replace(/\s+/g,'');
  // Compact numeric forms (no separators):
  // 6 digits: d m yyyy  (e.g. 111990 -> 1/1/1990)
  // 8 digits: dd mm yyyy (e.g. 25121990 -> 25/12/1990)
  // 7 digits: dd m yyyy  (e.g. 1121990 -> 11/2/1990) OR d mm yyyy (e.g. 1221990 -> 1/22/1990 invalid -> fallback)
  if(/^[0-9]+$/.test(s)) {
    if(s.length === 6) {
      const day = parseInt(s[0],10);
      const month = parseInt(s[1],10);
      const year = parseInt(s.slice(2),10);
      return { year, month, day };
    }
    if(s.length === 7) {
      // Try dd m yyyy (2-1-4)
      const d2 = parseInt(s.slice(0,2),10);
      const m1 = parseInt(s.slice(2,3),10);
      const y4 = parseInt(s.slice(3),10);
      if(d2>=1 && d2<=31 && m1>=1 && m1<=12) return { year:y4, month:m1, day:d2 };
      // Try d mm yyyy (1-2-4)
      const d1 = parseInt(s.slice(0,1),10);
      const m2 = parseInt(s.slice(1,3),10);
      if(d1>=1 && d1<=31 && m2>=1 && m2<=12) return { year:y4, month:m2, day:d1 };
      throw new Error('Định dạng ngày nén 7 chữ số không hợp lệ');
    }
    if(s.length === 8) {
      const day = parseInt(s.slice(0,2),10);
      const month = parseInt(s.slice(2,4),10);
      const year = parseInt(s.slice(4),10);
      return { year, month, day };
    }
    throw new Error('Định dạng ngày nén không hỗ trợ');
  }
  // Replace dot or space separators with dash for normalization
  s = s.replace(/[.]/g,'-');
  // Accepted separators: - or /
  const sep = s.includes('-') ? '-' : s.includes('/') ? '/' : null;
  if(!sep) throw new Error('Định dạng ngày phải có "-" hoặc "/" hoặc "."');
  const raw = s.split(sep);
  if(raw.length!==3) throw new Error('Định dạng ngày không đúng');
  const nums = raw.map(x=>{ const n = parseInt(x,10); return Number.isFinite(n)?n:NaN; });
  if(nums.some(isNaN)) throw new Error('Định dạng ngày không đúng');
  let [p1,p2,p3] = nums;
  // Heuristics:
  // If first part > 1900 assume YYYY-[M]-[D]
  // Else if last part > 1900 assume DD-MM-YYYY
  // Else if first part <=31 and second<=12 and third<=31 and third<100 -> ambiguous -> treat third as year ( <100 invalid )
  if(p1 > 1900) { // YYYY-M-D
    return { year: p1, month: p2, day: p3 };
  }
  if(p3 > 1900) { // D-M-YYYY
    return { year: p3, month: p2, day: p1 };
  }
  // Fallback: treat as YYYY-M-D if length of first token is 4
  if(String(raw[0]).length===4) {
    return { year: p1, month: p2, day: p3 };
  }
  return { year: p3, month: p2, day: p1 };
}
