export default function parseDateParts(s) {
  if (!s || typeof s !== "string") throw new Error("Ngày sinh không hợp lệ");
  s = s.trim();
  const sep = s.includes("-") ? "-" : s.includes("/") ? "/" : null;
  if (!sep) throw new Error('Định dạng ngày phải có "-" hoặc "/"');
  const a = s.split(sep).map((x) => parseInt(x, 10));
  if (a.length !== 3 || a.some(isNaN))
    throw new Error("Định dạng ngày không đúng");
  if (a[0] > 31) return { year: a[0], month: a[1], day: a[2] };
  return { year: a[2], month: a[1], day: a[0] };
}

