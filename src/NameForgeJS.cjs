'use strict';
const { humanNames, animalNames } = require('./data.cjs');
const defaults = Object.freeze({ name_type: 'human', starts_with: 'any', ends_with: 'any', generate_last_name: true, gender: 'any', country: 'any', count: 5, names_with_title: 0, title: 'Mr.', generate_age: false, min_age: 0, max_age: 100 });
const pick = values => values[Math.floor(Math.random() * values.length)];
function strings(value, key) {
  const values = Array.isArray(value) ? value : [value];
  if (!values.length || values.some(item => typeof item !== 'string' || !item.length)) throw new TypeError(`${key} must contain nonempty strings`);
  return values;
}
function nameLists(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new TypeError('Names must be an object');
  for (const key of ['male', 'female', 'last_names']) {
    if (value[key] !== undefined && (!Array.isArray(value[key]) || value[key].some(name => typeof name !== 'string' || !name.trim()))) throw new TypeError(`${key} must be an array of nonempty names`);
  }
}
class NameForgeJS {
  constructor() { this.names = structuredClone(humanNames); }
  generateNames(settings = {}) {
    if (!settings || typeof settings !== 'object' || Array.isArray(settings)) throw new TypeError('Settings must be an object');
    const s = { ...defaults, ...settings };
    for (const [key, choices] of [['name_type', ['human', 'animal', 'any']], ['gender', ['male', 'female', 'any']]]) {
      if (!choices.includes(s[key])) throw new RangeError(`Invalid ${key}`);
    }
    for (const key of ['count', 'min_age', 'max_age']) {
      if (!Number.isSafeInteger(s[key]) || s[key] < 0) throw new RangeError(`${key} must be a nonnegative safe integer`);
    }
    if (s.min_age > s.max_age) throw new RangeError('min_age must not exceed max_age');
    if (!Number.isFinite(s.names_with_title) || s.names_with_title < 0 || s.names_with_title > 100) throw new RangeError('names_with_title must be between 0 and 100');
    for (const key of ['generate_age', 'generate_last_name']) {
      if (typeof s[key] !== 'boolean') throw new TypeError(`${key} must be a boolean`);
    }
    if (typeof s.title !== 'string') throw new TypeError('title must be a string');
    const countries = strings(s.country, 'country');
    const starts = strings(s.starts_with, 'starts_with').map(value => value.toLowerCase());
    const ends = strings(s.ends_with, 'ends_with').map(value => value.toLowerCase());
    const filter = names => names.filter(name => {
      const first = name.split(' ')[0].toLowerCase();
      return (starts.includes('any') || starts.some(prefix => first.startsWith(prefix))) && (ends.includes('any') || ends.some(suffix => first.endsWith(suffix)));
    });
    const humanPools = [];
    if (s.name_type !== 'animal') {
      for (const country of countries) {
        if (country !== 'any' && !Object.hasOwn(this.names, country)) throw new RangeError(`Unknown country: ${country}`);
      }
      for (const country of countries.includes('any') ? Object.keys(this.names) : countries) {
        const names = this.names[country];
        const first = filter(s.gender === 'any' ? [...names.male, ...names.female] : names[s.gender]);
        if (first.length && (!s.generate_last_name || names.last_names.length)) humanPools.push({ first, last: names.last_names });
      }
    }
    const animals = s.name_type === 'human' ? [] : filter(animalNames);
    if (s.count && !humanPools.length && !animals.length) throw new RangeError('No names match the requested settings');
    const titled = Math.round(s.count * s.names_with_title / 100);
    return Array.from({ length: s.count }, (_, i) => {
      const human = humanPools.length && (!animals.length || Math.random() < 0.5);
      const pool = human ? pick(humanPools) : null;
      const first = human ? pick(pool.first) : pick(animals);
      const last = human && s.generate_last_name ? pick(pool.last) : '';
      const name = [i < titled ? s.title : '', first, last].filter(Boolean).join(' ');
      return s.generate_age ? { name, age: Math.floor(Math.random() * (s.max_age - s.min_age + 1)) + s.min_age } : name;
    });
  }
  createJSONLink(names, filename = 'generated_names.json') {
    const json = JSON.stringify(names, null, 2);
    if (json === undefined) throw new TypeError('Names must be JSON serializable');
    return {
      async save() {
        if (typeof document === 'undefined') {
          const { writeFile } = await import('node:fs/promises');
          await writeFile(filename, json, 'utf8');
          return filename;
        }
        const url = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        try { document.body.appendChild(link); link.click(); }
        finally { link.remove(); URL.revokeObjectURL(url); }
      },
    };
  }
  setCustomNames(country, names) {
    if (typeof country !== 'string' || !country) throw new TypeError('country must be a nonempty string');
    nameLists(names);
    if (!Object.hasOwn(this.names, country)) Object.defineProperty(this.names, country, { value: { male: [], female: [], last_names: [] }, enumerable: true });
    for (const key of ['male', 'female', 'last_names']) this.names[country][key].push(...(names[key] ?? []));
  }
  removeNames(country, names) {
    if (typeof country !== 'string' || !country) throw new TypeError('country must be a nonempty string');
    nameLists(names);
    if (!Object.hasOwn(this.names, country)) return;
    for (const key of ['male', 'female', 'last_names']) {
      const removed = new Set(names[key] ?? []);
      this.names[country][key] = this.names[country][key].filter(name => !removed.has(name));
    }
  }
}
module.exports = NameForgeJS;
module.exports.NameForgeJS = NameForgeJS;
