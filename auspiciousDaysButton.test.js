const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');

// Ensure clicking the auspicious days button no longer throws ReferenceError
// due to undefined `days` variable.
test('btn-auspicious click handler does not throw', () => {
  const src = fs.readFileSync('./script.js', 'utf8');
  const match = /btnGood\.addEventListener\('click',\(\)=>\{([\s\S]*?)\n\s*}\);/.exec(src);
  assert.ok(match, 'handler not found');

  const handlerBody = match[1];
  const handler = new Function(
    'ensureSolarBirth',
    'ensureSolarMonth',
    'getAuspiciousDays',
    'document',
    'alert',
    handlerBody
  );

  const elements = {
    'ngay-sinh': { value: '2000-01-01' },
    'ad-month': { value: '2024-07' },
    'auspicious-days': { innerHTML: '' }
  };
  const document = { getElementById: id => elements[id] || null };

  const ensureSolarBirth = v => v;
  const ensureSolarMonth = (y, m) => ({ year: y, month: m });
  const getAuspiciousDays = () => ['01'];

  assert.doesNotThrow(() => {
    handler(ensureSolarBirth, ensureSolarMonth, getAuspiciousDays, document, () => {});
  });
});
