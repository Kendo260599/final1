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

test('detects L-shaped lot', async () => {
  const { detectIssues } = await load();
  const poly = [
    {x:0,y:0}, {x:100,y:0}, {x:100,y:40},
    {x:60,y:40}, {x:60,y:100}, {x:0,y:100}
  ];
  const res = detectIssues({ polygon: poly });
  assert.ok(res.ids.includes('lot_L'));
});

test('detects trapezoid lot', async () => {
  const { detectIssues } = await load();
  const poly = [
    {x:0,y:0}, {x:40,y:0}, {x:60,y:60}, {x:-20,y:60}
  ];
  const res = detectIssues({ polygon: poly });
  assert.ok(res.ids.includes('lot_trapezoid'));
});

test('detects door alignment front to back', async () => {
  const { detectIssues } = await load();
  const res = detectIssues({ entrance:{x:0,y:0}, backDoor:{x:0,y:80} });
  assert.ok(res.ids.includes('door_back'));
});

test('detects door facing WC', async () => {
  const { detectIssues } = await load();
  const res = detectIssues({ entrance:{x:0,y:0}, wc:{x:0,y:30} });
  assert.ok(res.ids.includes('door_wc'));
});

test('checkSiteIssues renders issues', async () => {
  const { detectIssues, ISSUES } = await load();
  const fs = require('node:fs');
  const vm = require('node:vm');
  const src = fs.readFileSync('./public/script.js','utf8');
  const fn = /function checkSiteIssues[\s\S]*?return result;\n}/.exec(src)[0];
  const container = { innerHTML: '' };
  const sandbox = {
    ISSUES,
    detectIssues,
    document: { getElementById: id => id === 'issues-container' ? container : null }
  };
  vm.runInNewContext(fn, sandbox);
  sandbox.checkSiteIssues({ polygon: [{x:0,y:0},{x:50,y:0},{x:0,y:50}] });
  assert.ok(container.innerHTML.includes('Đất hình tam giác'));
});
