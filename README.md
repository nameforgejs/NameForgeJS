# NameForgeJS

A dependency-free random name generator for **Node.js 22+** and **Bun 1.3+**.

## Install

```sh
npm install nameforgejs
# or
bun add nameforgejs
```

## Usage

```js
import NameForgeJS from 'nameforgejs';
// Named imports are also supported: import { NameForgeJS } from 'nameforgejs';

const generator = new NameForgeJS();
console.log(generator.generateNames({ country: 'japan', count: 10 }));
```

CommonJS works with both runtimes:

```js
const NameForgeJS = require('nameforgejs');
console.log(new NameForgeJS().generateNames());
```

## Settings

Pass settings to `generateNames(settings)`. Calls return strings, or `{ name, age }`
objects when `generate_age` is enabled. Names are sampled with replacement.

| Setting | Default | Values |
| --- | --- | --- |
| `name_type` | `'human'` | `'human'`, `'animal'`, `'any'` |
| `starts_with` | `'any'` | Nonempty string or array of strings; case insensitive |
| `ends_with` | `'any'` | Nonempty string or array of strings; case insensitive |
| `generate_last_name` | `true` | Boolean; applies to human names |
| `gender` | `'any'` | `'male'`, `'female'`, `'any'`; applies to human names |
| `country` | `'any'` | Country key or nonempty array; applies to human names |
| `count` | `5` | Nonnegative safe integer |
| `names_with_title` | `0` | Percentage from 0 to 100 |
| `title` | `'Mr.'` | String |
| `generate_age` | `false` | Boolean |
| `min_age` | `0` | Nonnegative safe integer |
| `max_age` | `100` | Nonnegative safe integer, at least `min_age` |

Country keys use lowercase and underscores, for example `united_states`, `japan`
and `united_kingdom`. The existing country keys and name datasets are preserved.
`'any'` in a country or filter array disables that restriction.
Prefix and suffix filters apply to the first word of human and animal names.
Human names are sampled from countries with matching first names and, when
requested, available surnames. Mixed generation chooses equally between humans
and animals when both have matches, and uses the available type otherwise.
Titles are added to the first `Math.round(count * names_with_title / 100)` results.

```js
const names = generator.generateNames({
  country: ['spain', 'italy'],
  starts_with: ['a', 'f'],
  generate_last_name: false,
  generate_age: true,
  min_age: 18,
  max_age: 65,
});
```

## Customize names

Changes belong to the generator instance. They never modify other generators.
`setCustomNames` appends names and can create a country; `removeNames` removes
all matching entries. Each supplied name list must be an array of nonempty strings.
Removing names from an unknown country does nothing.

```js
generator.setCustomNames('custom_country', {
  male: ['Alex'], female: ['Sam'], last_names: ['Smith'],
});
generator.removeNames('custom_country', { male: ['Alex'] });
```

## JSON export

In Node and Bun, await `save()` to write UTF-8 JSON to the provided filename.
File errors reject the promise. The default filename is `generated_names.json`.
Existing files at that path are overwritten.

```js
await generator.createJSONLink(generator.generateNames(), 'names.json').save();
```

In a browser bundle, the same method triggers a download and releases its object
URL. The source ESM entry wraps a CommonJS implementation and requires a bundler
for browser usage.

## Compatibility changes

- Default and named ESM imports and CommonJS `require` now resolve correctly.
- Invalid settings throw `TypeError` or `RangeError` instead of logging and
  returning an empty array. No matching names also throws `RangeError` for a
  positive count; `count: 0` returns an empty array.
- Animal names now obey prefix and suffix filters.
- Surname capitalization is preserved and output has no trailing separator spaces.
- Custom name mutations are isolated per instance.
- `createJSONLink(...).save()` is asynchronous. It writes a file on Node/Bun and
  downloads in a browser. It does not return a URL or expose `.download()`.
- Package version remains unchanged for the maintainer to choose a release version.

## Development

No dependency installation or build step is required.

```sh
npm test
bun run test:bun
npm pack --dry-run
```

CI runs the tests on Node 22, 24 and 26 and Bun 1.3.14 on Linux and Windows.
Tests cover package entry points, every bundled country, filtering, titles, ages,
validation, instance isolation, file export and browser URL cleanup.

## License

MIT. See [LICENSE](LICENSE). Original author: Maze Winther.
