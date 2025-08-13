const test = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const app = require('./index');

process.env.AI_API_KEY = 'test';

const startServer = () => new Promise((resolve) => {
  const server = http.createServer(app);
  server.listen(0, () => resolve(server));
});

test('rejects invalid birth format', async () => {
  const server = await startServer();
  const port = server.address().port;
  const res = await fetch(`http://127.0.0.1:${port}/api/horoscope?birth=20230101&gender=nam`);
  assert.strictEqual(res.status, 400);
  const body = await res.json();
  assert.deepStrictEqual(body, { error: 'Invalid parameters' });
  server.close();
});

test('rejects invalid gender', async () => {
  const server = await startServer();
  const port = server.address().port;
  const res = await fetch(`http://127.0.0.1:${port}/api/horoscope?birth=2023-01-01&gender=other`);
  assert.strictEqual(res.status, 400);
  const body = await res.json();
  assert.deepStrictEqual(body, { error: 'Invalid parameters' });
  server.close();
});

test('accepts valid params', async () => {
  const server = await startServer();
  const port = server.address().port;

  const realFetch = global.fetch;
  let called = false;
  global.fetch = (url, options) => {
    if (String(url).includes('api.openai.com')) {
      called = true;
      return Promise.resolve(new Response(
        JSON.stringify({ choices: [{ message: { content: 'ok' } }] }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      ));
    }
    return realFetch(url, options);
  };

  const res = await realFetch(`http://127.0.0.1:${port}/api/horoscope?birth=2023-01-01&gender=nam`);
  assert.strictEqual(res.status, 200);
  const body = await res.json();
  assert.deepStrictEqual(body, { text: 'ok' });
  assert.ok(called);

  global.fetch = realFetch;
  server.close();
});
