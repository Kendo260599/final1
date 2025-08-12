const test = require('node:test');
const assert = require('node:assert');

const load = async () => await import('./siteIssues.mjs');

test('detects triangular lot', async () => {
  const { detectIssues } = await load();
  const res = detectIssues({ polygon: [{x:0,y:0},{x:100,y:0},{x:0,y:100}] });
  assert.ok(res.ids.includes('lot_triangle'));
});

test('detects door facing stair', async () => {
  const { detectIssues } = await load();
  const res = detectIssues({ entrance:{x:0,y:0}, stair:{x:0,y:50} });
  assert.ok(res.ids.includes('door_stair'));
});
