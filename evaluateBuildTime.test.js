const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');

// Ensure evaluateBuildTime uses helper functions and returns expected structure
// after refactoring to import utilities from fortune.mjs and elements.js.
test('evaluateBuildTime integrates helper modules', () => {
  const src = fs.readFileSync('./script.js', 'utf8');
  const match = /function evaluateBuildTime[\s\S]*?\n}/.exec(src);
  assert.ok(match, 'function evaluateBuildTime not found');
  const fnBody = match[0];

  const flags = {
    tuoiMu: false,
    checkKimLau: false,
    checkHoangOc: false,
    checkTamTai: false,
    checkXungTuoi: false,
    elemYear: false,
    elemConflict: 0,
  };

  const getCungMenh = () => ({ effectiveYear: 1990, nguyenTo: 'Kim' });
  const tuoiMu = () => { flags.tuoiMu = true; return 36; };
  const checkKimLau = () => { flags.checkKimLau = true; return { isKimLau: false }; };
  const checkHoangOc = () => { flags.checkHoangOc = true; return { name: 'Nhất Cát', isBad: false }; };
  const checkTamTai = () => { flags.checkTamTai = true; return { isTamTai: false, yearChi: 'Tý' }; };
  const checkXungTuoi = () => { flags.checkXungTuoi = true; return { isXung: false, opp: 'Ngọ', yearChi: 'Ngọ' }; };
  const elemYear = () => { flags.elemYear = true; return 'Thủy'; };
  const elemConflict = () => { flags.elemConflict++; return false; };

  const evaluateBuildTime = new Function(
    'getCungMenh','tuoiMu','checkKimLau','checkHoangOc','checkTamTai','checkXungTuoi','elemYear','elemConflict',
    `return (${fnBody});`
  )(getCungMenh, tuoiMu, checkKimLau, checkHoangOc, checkTamTai, checkXungTuoi, elemYear, elemConflict);

  const res = evaluateBuildTime('1990-01-01', 'nam', 2025, 5);

  assert.ok(flags.tuoiMu, 'tuoiMu not called');
  assert.ok(flags.checkKimLau, 'checkKimLau not called');
  assert.ok(flags.checkHoangOc, 'checkHoangOc not called');
  assert.ok(flags.checkTamTai, 'checkTamTai not called');
  assert.ok(flags.checkXungTuoi, 'checkXungTuoi not called');
  assert.ok(flags.elemYear, 'elemYear not called');
  assert.strictEqual(flags.elemConflict, 2, 'elemConflict not called twice');
  assert.strictEqual(res.ageMu, 36);
  assert.strictEqual(res.yearElement, 'Thủy');
  assert.strictEqual(res.monthElement, 'Kim');
  assert.deepStrictEqual(res.warnings, []);
  assert.deepStrictEqual(res.monthWarnings, []);
});
