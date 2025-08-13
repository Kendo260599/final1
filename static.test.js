const test = require('node:test');
const assert = require('node:assert');
const app = require('./index');

// Ensure files outside the public directory are not served.
test('serves only public directory', async (t) => {
  const server = app.listen(0);
  const port = server.address().port;
  t.after(() => server.close());

  const ok = await fetch(`http://localhost:${port}/style.css`);
  assert.strictEqual(ok.status, 200);

  const res = await fetch(`http://localhost:${port}/index.js`);
  assert.strictEqual(res.status, 404);
});
