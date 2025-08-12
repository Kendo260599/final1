const ZODIAC = [
  "Tý",
  "Sửu",
  "Dần",
  "Mão",
  "Thìn",
  "Tỵ",
  "Ngọ",
  "Mùi",
  "Thân",
  "Dậu",
  "Tuất",
  "Hợi",
];

const idxZ = (y) => (((y - 4) % 12) + 12) % 12;
const nameZ = (y) => ZODIAC[idxZ(y)];

const TTG = [
  { group: ["Thân", "Tý", "Thìn"], tamTai: ["Dần", "Mão", "Thìn"] },
  { group: ["Dần", "Ngọ", "Tuất"], tamTai: ["Thân", "Dậu", "Tuất"] },
  { group: ["Hợi", "Mão", "Mùi"], tamTai: ["Tỵ", "Ngọ", "Mùi"] },
  { group: ["Tỵ", "Dậu", "Sửu"], tamTai: ["Hợi", "Tý", "Sửu"] },
];

module.exports = { ZODIAC, idxZ, nameZ, TTG };
