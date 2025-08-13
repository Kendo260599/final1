const test = require('node:test');
const assert = require('node:assert');

const parseDateParts = require('./parseDateParts.mjs').default;

test('parseDateParts handles both ISO and slashed dates', () => {
  assert.deepStrictEqual(parseDateParts('1990-12-25'), {
    year: 1990,
    month: 12,
    day: 25,
  });
  assert.deepStrictEqual(parseDateParts('25/12/1990'), {
    year: 1990,
    month: 12,
    day: 25,
  });
});
