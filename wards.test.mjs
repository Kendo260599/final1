import test from 'node:test';
import assert from 'node:assert/strict';
import { getWardsForProvince, loadWardsFromUrl } from './wards.mjs';

test('load wards when switching province', () => {
  const dn = getWardsForProvince('Đồng Nai');
  const bp = getWardsForProvince('Bình Phước');
  assert.ok(dn.includes('Phường Trấn Biên'));
  assert.ok(bp.includes('Phường Bình Phước'));
  assert.notDeepStrictEqual(dn, bp);
});

test('load wards from external json', async () => {
  const json = encodeURIComponent(JSON.stringify({ 'Tỉnh Test': ['Xã A', 'Xã B'] }));
  await loadWardsFromUrl(`data:application/json,${json}`);
  const wards = getWardsForProvince('Tỉnh Test');
  assert.deepStrictEqual(wards, ['Xã A', 'Xã B']);
});
