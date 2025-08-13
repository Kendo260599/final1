import test from 'node:test';
import assert from 'node:assert';
import { computeCanChiAndStars } from './advancedHoroscope.mjs';

test('computes can-chi and stars from birth', () => {
  const res = computeCanChiAndStars('1984-02-02T23:30');
  assert.strictEqual(res.canChi.month, 'Bính Dần');
  assert.strictEqual(res.canChi.day, 'Bính Dần');
  assert.strictEqual(res.canChi.hour, 'Mậu Tý');
  assert.strictEqual(res.stars['Tử Vi'], 'Sửu');
  assert.strictEqual(res.stars['Thiên Phủ'], 'Mùi');
  assert.strictEqual(res.cungMenh, 'Sửu');
});
