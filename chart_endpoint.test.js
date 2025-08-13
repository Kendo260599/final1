const test = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const { spawnSync } = require('node:child_process');
const app = require('./index');
const fs = require('node:fs');

const DB_PATH = 'chart_test.db';

// create sample record using python
spawnSync('python', ['-c', `from storage import BirthInfoRepository; from validate import validate; repo=BirthInfoRepository('${DB_PATH}'); repo.save(validate('Alice','2000-01-01')); repo.close()`]);

process.env.BIRTH_DB = DB_PATH;

test('GET /api/chart returns planets', async () => {
  const server = http.createServer(app);
  await new Promise(resolve => server.listen(0, resolve));
  const port = server.address().port;
  const res = await fetch(`http://127.0.0.1:${port}/api/chart?name=Alice`);
  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.ok(data.planets);
  assert.ok(typeof data.planets.Sun.sign === 'string');
  server.close();
  fs.unlinkSync(DB_PATH);
});
