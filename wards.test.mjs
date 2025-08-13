import test from 'node:test';
import assert from 'node:assert/strict';
import { getWardsForProvince } from './wards.mjs';

test('load wards when switching province', () => {
  const dn = getWardsForProvince('Đồng Nai');
  const bp = getWardsForProvince('Bình Phước');
  assert.ok(dn.includes('Phường Trấn Biên'));
  assert.ok(bp.includes('Phường Bình Phước'));
  assert.notDeepStrictEqual(dn, bp);
});
