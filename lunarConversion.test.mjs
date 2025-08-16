import test from 'node:test';
import assert from 'node:assert';
import lunar from './lunar.mjs';
const { solarToLunar, lunarToSolar } = lunar;

test('solar to lunar back to solar', () => {
  const cases = [
    { day: 19, month: 2, year: 2024 },
    { day: 29, month: 12, year: 2023 },
    { day: 1, month: 1, year: 2000 }
  ];
  for (const c of cases) {
    const lunarDate = solarToLunar(c);
    const solarDate = lunarToSolar(lunarDate);
    assert.deepStrictEqual(solarDate, c);
  }
});
