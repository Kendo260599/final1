function elemYear(y) {
  const s = (((y - 4) % 10) + 10) % 10;
  if (s === 0 || s === 1) return "Mộc";
  if (s === 2 || s === 3) return "Hỏa";
  if (s === 4 || s === 5) return "Thổ";
  if (s === 6 || s === 7) return "Kim";
  return "Thủy";
}

const KHAC = { Mộc: "Thổ", Thổ: "Thủy", Thủy: "Hỏa", Hỏa: "Kim", Kim: "Mộc" };

function elemConflict(a, b) {
  return a && b && (KHAC[a] === b || KHAC[b] === a);
}

module.exports = { elemYear, elemConflict, KHAC };
