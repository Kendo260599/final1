const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');

const src = fs.readFileSync('./script.js', 'utf8');
const maleStart = parseInt(/const MALE_START=(\d+)/.exec(src)[1], 10);
const femaleStart = parseInt(/FEMALE_START=(\d+)/.exec(src)[1], 10);
const maleSeq = eval(/MALE_SEQ=(\[[^\]]+\])/s.exec(src)[1]);
const femaleSeq = eval(/FEMALE_SEQ=(\[[^\]]+\])/s.exec(src)[1]);
const mod9 = n => ((n % 9) + 9) % 9;

function cung(year, gender) {
  const start = gender === 'nam' ? maleStart : femaleStart;
  const seq = gender === 'nam' ? maleSeq : femaleSeq;
  const idx = mod9(year - start);
  return seq[idx];
}

test('cung mệnh for sample years', () => {
  assert.strictEqual(cung(1990, 'nam'), 'Khảm');
  assert.strictEqual(cung(1990, 'nu'), 'Cấn');
  assert.strictEqual(cung(1989, 'nam'), 'Khôn');
  assert.strictEqual(cung(1984, 'nu'), 'Cấn');
