const test = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const app = require('./index');

async function startServer() {
  const server = http.createServer(app);
  await new Promise(resolve => server.listen(0, resolve));
  const port = server.address().port;
  return { server, url: `http://127.0.0.1:${port}` };
}

test('GET /api/horoscope returns text when API key present', async () => {
  process.env.AI_API_KEY = 'test-key';
  const originalFetch = global.fetch;
  global.fetch = async (url, options) => {
    if (String(url).includes('api.openai.com')) {
      return {
        ok: true,
        json: async () => ({ choices: [{ message: { content: 'Mocked' } }] }),
      };
    }
    return originalFetch(url, options);
  };
  const { server, url } = await startServer();
  const res = await fetch(`${url}/api/horoscope?birth=2000-01-01&gender=nam`);
  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.strictEqual(data.text, 'Mocked');
  server.close();
  global.fetch = originalFetch;
  delete process.env.AI_API_KEY;
});

test('GET /api/horoscope errors without API key', async () => {
  delete process.env.AI_API_KEY;
  const { server, url } = await startServer();
  const res = await fetch(`${url}/api/horoscope?birth=2000-01-01&gender=nam`);
  assert.strictEqual(res.status, 500);
  const data = await res.json();
  assert.strictEqual(data.error, 'Missing AI_API_KEY');
  server.close();
});

test('GET /api/horoscope errors with missing params', async () => {
  process.env.AI_API_KEY = 'test-key';
  const { server, url } = await startServer();
  const res = await fetch(`${url}/api/horoscope?birth=2000-01-01`);
  assert.strictEqual(res.status, 400);
  const data = await res.json();
  assert.strictEqual(data.error, 'Invalid parameters');
  server.close();
  delete process.env.AI_API_KEY;
});

test('GET /api/auspicious-days returns day list', async () => {
  const { server, url } = await startServer();
  const res = await fetch(`${url}/api/auspicious-days?birth=1988-02-10&year=2024&month=7`);
  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.ok(Array.isArray(data.days));
  assert.ok(data.days.length > 0);
  assert.ok(data.days.every(d => Number.isInteger(d) && d >= 1 && d <= 31));
  server.close();
});

test('POST /api/ai-analyze returns text when body valid', async () => {
  process.env.AI_API_KEY = 'test-key';
  const originalFetch = global.fetch;
  global.fetch = async (url, options) => {
    if (String(url).includes('api.openai.com')) {
      return {
        ok: true,
        json: async () => ({ choices: [{ message: { content: 'Mocked AI' } }] }),
      };
    }
    return originalFetch(url, options);
  };
  const { server, url } = await startServer();
  const res = await fetch(`${url}/api/ai-analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: 'hello' }),
  });
  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.strictEqual(data.text, 'Mocked AI');
  server.close();
  global.fetch = originalFetch;
  delete process.env.AI_API_KEY;
});

test('POST /api/ai-analyze returns 400 for invalid body', async () => {
  process.env.AI_API_KEY = 'test-key';
  const { server, url } = await startServer();
  const res = await fetch(`${url}/api/ai-analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  assert.strictEqual(res.status, 400);
  const data = await res.json();
  assert.strictEqual(data.error, 'Invalid body');
  server.close();
  delete process.env.AI_API_KEY;
});

test('POST /api/ai-analyze errors without API key', async () => {
  delete process.env.AI_API_KEY;
  const { server, url } = await startServer();
  const res = await fetch(`${url}/api/ai-analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: 'hi' }),
  });
  assert.strictEqual(res.status, 500);
  const data = await res.json();
  assert.strictEqual(data.error, 'Missing AI_API_KEY');
  server.close();
});

test('POST /api/ai-analyze returns timeout error when OpenAI unresponsive', async () => {
  process.env.AI_API_KEY = 'test-key';
  process.env.AI_TIMEOUT_MS = '10';
  const originalFetch = global.fetch;
  global.fetch = (url, options) => {
    if (String(url).includes('api.openai.com')) {
      return new Promise((resolve, reject) => {
        options.signal.addEventListener('abort', () => {
          const err = new Error('aborted');
          err.name = 'AbortError';
          reject(err);
        });
      });
    }
    return originalFetch(url, options);
  };

  const { server, url } = await startServer();
  const res = await fetch(`${url}/api/ai-analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: 'hello' }),
  });
  assert.strictEqual(res.status, 504);
  const data = await res.json();
  assert.strictEqual(data.error, 'AI request timed out');
  server.close();
  global.fetch = originalFetch;
  delete process.env.AI_API_KEY;
  delete process.env.AI_TIMEOUT_MS;
});
