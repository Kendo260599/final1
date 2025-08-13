export const ZODIAC = [
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

export const idxZ = (y) => (((y - 4) % 12) + 12) % 12;
export const nameZ = (y) => ZODIAC[idxZ(y)];

export const TTG = [
  { group: ["Thân", "Tý", "Thìn"], tamTai: ["Dần", "Mão", "Thìn"] },
  { group: ["Dần", "Ngọ", "Tuất"], tamTai: ["Thân", "Dậu", "Tuất"] },
  { group: ["Hợi", "Mão", "Mùi"], tamTai: ["Tỵ", "Ngọ", "Mùi"] },
  { group: ["Tỵ", "Dậu", "Sửu"], tamTai: ["Hợi", "Tý", "Sửu"] },
];

export default { ZODIAC, idxZ, nameZ, TTG };
