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

// Former /api/horoscope endpoint removed (was AI-based)

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

// Former /api/ai-analyze endpoint removed (AI fully excised)
