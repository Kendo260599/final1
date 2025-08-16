const test = require('node:test');
const assert = require('node:assert');

const parseDateParts = require('./parseDateParts.mjs').default;

test('parseDateParts handles ISO YYYY-MM-DD', () => {
  assert.deepStrictEqual(parseDateParts('1990-12-25'), {
    year: 1990,
    month: 12,
    day: 25,
  });
});

test('parseDateParts handles D/M/YYYY', () => {
  assert.deepStrictEqual(parseDateParts('25/12/1990'), {
    year: 1990,
    month: 12,
    day: 25,
  });
});

test('parseDateParts handles D-M-YYYY (dash variant)', () => {
  assert.deepStrictEqual(parseDateParts('25-12-1990'), {
    year: 1990,
    month: 12,
    day: 25,
  });
});

test('parseDateParts handles single digit parts D-M-YYYY', () => {
  assert.deepStrictEqual(parseDateParts('1-2-2000'), {
    year: 2000,
    month: 2,
    day: 1,
  });
});

test('parseDateParts handles YYYY/M/D (slash ISO)', () => {
  assert.deepStrictEqual(parseDateParts('2001/7/9'), {
    year: 2001,
    month: 7,
    day: 9,
  });
});
