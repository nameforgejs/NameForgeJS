import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import NameForgeJS, { NameForgeJS as Named } from 'nameforgejs';
import data from '../src/data.cjs';

test('ESM and CommonJS expose the same constructor', () => {
  assert.equal(NameForgeJS, Named);
  assert.equal(createRequire(import.meta.url)('nameforgejs'), Named);
  assert.equal(new Named().generateNames().length, 5);
});
test('all bundled countries generate valid names with intact surnames', () => {
  const generator = new Named();
  for (const [country, names] of Object.entries(data.humanNames)) {
    for (const gender of ['male', 'female']) {
      const result = generator.generateNames({ country, gender, count: 10 });
      for (const name of result) {
        assert.ok(names[gender].some(first => names.last_names.some(last => name === `${first} ${last}`)), `${country}: ${name}`);
      }
    }
  }
});
test('filters apply to humans, animals and mixed names', () => {
  const generator = new Named();
  for (const name_type of ['human', 'animal', 'any']) {
    const names = generator.generateNames({ name_type, starts_with: ['A', 'B'], generate_last_name: false, count: 100 });
    assert.ok(names.every(name => /^[ab]/i.test(name) && name === name.trim()));
  }
  assert.throws(() => generator.generateNames({ starts_with: 'no-such-name' }), /No names match/);
  assert.deepEqual(generator.generateNames({ count: 0, starts_with: 'no-such-name' }), []);
});
test('titles, ages and suffix filters honor settings', () => {
  const names = new Named().generateNames({ count: 10, names_with_title: 50, title: 'Dr.', generate_age: true, min_age: 42, max_age: 42, ends_with: ['a', 'n'], generate_last_name: false });
  assert.equal(names.filter(item => item.name.startsWith('Dr.')).length, 5);
  assert.ok(names.every(item => item.age === 42 && /[an]$/i.test(item.name)));
});
test('custom names and removals stay local to each instance', () => {
  const first = new Named();
  const second = new Named();
  first.setCustomNames('test_country', { male: ['Only'], last_names: ['Surname'] });
  assert.deepEqual(first.generateNames({ country: 'test_country', gender: 'male', count: 1 }), ['Only Surname']);
  assert.throws(() => second.generateNames({ country: 'test_country' }), /Unknown country/);
  first.removeNames('test_country', { male: ['Only'] });
  assert.throws(() => first.generateNames({ country: 'test_country' }), /No names match/);
  first.setCustomNames('__proto__', { male: ['Safe'] });
  assert.deepEqual(first.generateNames({ country: '__proto__', gender: 'male', count: 1, generate_last_name: false }), ['Safe']);
});
test('invalid settings fail explicitly', () => {
  const generator = new Named();
  for (const settings of [{ count: -1 }, { count: 1.5 }, { count: Infinity }, { name_type: 'invalid' }, { gender: 'invalid' }, { country: 'toString' }, { country: [] }, { starts_with: [1] }, { names_with_title: 101 }, { min_age: 10, max_age: 5 }, { generate_age: 'yes' }, { title: null }]) {
    assert.throws(() => generator.generateNames(settings));
  }
  assert.throws(() => generator.setCustomNames('test', { male: [null] }));
  assert.equal(Object.hasOwn(generator.names, 'test'), false);
});
test('JSON export writes a file without browser globals', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'nameforgejs-'));
  try {
    const filename = join(directory, 'names.json');
    const names = new Named().generateNames({ generate_age: true });
    assert.equal(await new Named().createJSONLink(names, filename).save(), filename);
    assert.deepEqual(JSON.parse(await readFile(filename, 'utf8')), names);
  } finally { await rm(directory, { recursive: true, force: true }); }
});
test('browser download revokes its object URL even when clicking fails', async () => {
  const original = globalThis.document;
  const originalCreate = URL.createObjectURL;
  const originalRevoke = URL.revokeObjectURL;
  let removed = false;
  let revoked = false;
  globalThis.document = { body: { appendChild() {} }, createElement() { return { click() { throw new Error('click failed'); }, remove() { removed = true; } }; } };
  URL.createObjectURL = () => 'blob:test';
  URL.revokeObjectURL = url => { assert.equal(url, 'blob:test'); revoked = true; };
  try {
    await assert.rejects(new Named().createJSONLink([]).save(), /click failed/);
    assert.ok(removed && revoked);
  } finally {
    if (original === undefined) delete globalThis.document;
    else globalThis.document = original;
    URL.createObjectURL = originalCreate;
    URL.revokeObjectURL = originalRevoke;
  }
});
