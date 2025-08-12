const parseDateParts = require("./parseDateParts.cjs");
const { idxZ, nameZ, TTG, ZODIAC } = require("./zodiac");

function getEffectiveBirthYear(b) {
  const { year, month, day } = parseDateParts(b);
  if (month < 3 || (month === 3 && day <= 13)) return year - 1;
  return year;
}

function tuoiMu(eff, year) {
  return year - eff + 1;
}

function checkKimLau(t) {
  let r = t % 9;
  if (r === 0) r = 9;
  const m = {
    1: "Kim Lâu Thân",
    3: "Kim Lâu Thê",
    6: "Kim Lâu Tử",
    8: "Kim Lâu Lục Súc",
  };
  return { isKimLau: [1, 3, 6, 8].includes(r), type: m[r] || null };
}

function checkHoangOc(t) {
  const lb = [
    "Nhất Cát",
    "Nhì Nghi",
    "Tam Địa Sát",
    "Tứ Tấn Tài",
    "Ngũ Thọ Tử",
    "Lục Hoang Ốc",
  ];
  const m = t % 6;
  const i = m === 0 ? 5 : m - 1;
  const n = lb[i];
  return {
    name: n,
    isBad: ["Tam Địa Sát", "Ngũ Thọ Tử", "Lục Hoang Ốc"].includes(n),
  };
}

function checkTamTai(ownerYear, year) {
  const o = nameZ(ownerYear);
  const c = nameZ(year);
  const g = TTG.find((x) => x.group.includes(o));
  return { isTamTai: g ? g.tamTai.includes(c) : false, yearChi: c };
}

function checkXungTuoi(ownerYear, year) {
  const opp = (idxZ(ownerYear) + 6) % 12;
  return { isXung: idxZ(year) === opp, opp: ZODIAC[opp], yearChi: nameZ(year) };
}

module.exports = {
  getEffectiveBirthYear,
  tuoiMu,
  checkKimLau,
  checkHoangOc,
  checkTamTai,
  checkXungTuoi,
};
