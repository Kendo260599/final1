import {
  getEffectiveBirthYear,
  tuoiMu,
  checkKimLau,
  checkHoangOc,
  checkTamTai,
  checkXungTuoi,
} from "./fortune.mjs";
import { elemYear, elemConflict } from "./elements.js";
import { ZODIAC } from "./zodiac.js";

export default function getAuspiciousDays(birth, year, month) {
  const eff = getEffectiveBirthYear(birth);
  const age = tuoiMu(eff, year);
  const yE = elemYear(year);
  const mE =
    [
      null,
      "Thủy",
      null,
      "Hỏa",
      "Thổ",
      "Kim",
      "Mộc",
      null,
      "Hỏa",
      "Thổ",
      "Kim",
      "Mộc",
      "Thủy",
    ][month] || null;
  if (
    checkKimLau(age).isKimLau ||
    checkHoangOc(age).isBad ||
    checkTamTai(eff, year).isTamTai ||
    checkXungTuoi(eff, year).isXung ||
    elemConflict(elemYear(eff), yE) ||
    elemConflict(elemYear(eff), mE)
  )
    return [];
  const birthElem = elemYear(eff);
  const daysInMonth = new Date(year, month, 0).getDate();
  const bad = [3, 5, 7, 13, 14, 18, 22, 23, 27, 29];
  const start = new Date(1984, 1, 2);
  const BE = {
    Tý: "Thủy",
    Sửu: "Thổ",
    Dần: "Mộc",
    Mão: "Mộc",
    Thìn: "Thổ",
    Tỵ: "Hỏa",
    Ngọ: "Hỏa",
    Mùi: "Thổ",
    Thân: "Kim",
    Dậu: "Kim",
    Tuất: "Thổ",
    Hợi: "Thủy",
  };
  const list = [];
  for (let d = 1; d <= daysInMonth; d++) {
    if (bad.includes(d)) continue;
    const date = new Date(year, month - 1, d);
    const diff = Math.floor((date - start) / 86400000);
    const branch = ZODIAC[((diff % 12) + 12) % 12];
    const elem = BE[branch];
    if (!elemConflict(birthElem, elem)) list.push(d);
  }
  return list;
}


