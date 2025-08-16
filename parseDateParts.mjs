export default function parseDateParts(s) {
  if (!s || typeof s !== 'string') throw new Error('Ngày sinh không hợp lệ');
  s = s.trim().replace(/\s+/g,'');
  // Accepted separators: - or /
  const sep = s.includes('-') ? '-' : s.includes('/') ? '/' : null;
  if(!sep) throw new Error('Định dạng ngày phải có "-" hoặc "/"');
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
