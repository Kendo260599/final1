const test = require("node:test");
const assert = require("node:assert");

const parseDateParts = require("../utils/parseDateParts");
const { elemYear, elemConflict } = require("../utils/elements");
const {
  getEffectiveBirthYear,
  tuoiMu,
  checkKimLau,
  checkHoangOc,
  checkTamTai,
  checkXungTuoi,
} = require("../utils/fortune");
const getAuspiciousDays = require("../utils/getAuspiciousDays");

test("parseDateParts handles different formats", () => {
  assert.deepStrictEqual(parseDateParts("1990-12-25"), {
    year: 1990,
    month: 12,
    day: 25,
  });
  assert.deepStrictEqual(parseDateParts("25/12/1990"), {
    year: 1990,
    month: 12,
    day: 25,
  });
});

test("elemYear returns correct element", () => {
  assert.strictEqual(elemYear(1984), "Mộc");
  assert.strictEqual(elemYear(1986), "Hỏa");
  assert.strictEqual(elemYear(1988), "Thổ");
  assert.strictEqual(elemYear(1990), "Kim");
  assert.strictEqual(elemYear(1992), "Thủy");
});

test("getEffectiveBirthYear adjusts for lunar calendar", () => {
  assert.strictEqual(getEffectiveBirthYear("2000-02-10"), 1999);
  assert.strictEqual(getEffectiveBirthYear("2000-03-14"), 2000);
});

test("tuoiMu computes age in lunar years", () => {
  assert.strictEqual(tuoiMu(1990, 2024), 35);
});

test("checkKimLau identifies Kim Lâu years", () => {
  assert.deepStrictEqual(checkKimLau(21), {
    isKimLau: true,
    type: "Kim Lâu Thê",
  });
  assert.deepStrictEqual(checkKimLau(27), {
    isKimLau: false,
    type: null,
  });
});

test("checkHoangOc determines bad houses", () => {
  assert.deepStrictEqual(checkHoangOc(27), {
    name: "Tam Địa Sát",
    isBad: true,
  });
  assert.deepStrictEqual(checkHoangOc(28), {
    name: "Tứ Tấn Tài",
    isBad: false,
  });
});

test("checkTamTai detects Tam Tai years", () => {
  assert.deepStrictEqual(checkTamTai(1992, 2024), {
    isTamTai: true,
    yearChi: "Thìn",
  });
  assert.deepStrictEqual(checkTamTai(1992, 2025), {
    isTamTai: false,
    yearChi: "Tỵ",
  });
});

test("checkXungTuoi detects conflicting zodiacs", () => {
  assert.deepStrictEqual(checkXungTuoi(1992, 2022), {
    isXung: true,
    opp: "Dần",
    yearChi: "Dần",
  });
  assert.deepStrictEqual(checkXungTuoi(1992, 2024), {
    isXung: false,
    opp: "Dần",
    yearChi: "Thìn",
  });
});

test("elemConflict returns true for conflicting elements", () => {
  assert.strictEqual(elemConflict("Mộc", "Thổ"), true);
  assert.strictEqual(elemConflict("Mộc", "Hỏa"), false);
});

test("getAuspiciousDays computes list without bad days", () => {
  const days = getAuspiciousDays("1990-06-15", 2024, 4);
  assert.ok(Array.isArray(days));
  assert.ok(!days.includes(13));
  assert.ok(days.every((d) => d >= 1 && d <= 30));
});
