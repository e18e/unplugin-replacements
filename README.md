# @e18e/unplugin-replacements

> An unplugin to apply e18e-recommended modernization and performance replacements.

> [!WARNING]
> This plugin is experimental and not yet published publicly. Use at your own risk.

## What is this?

This plugin automatically transforms your code at build time to use modern web platform features, improving performance and reducing bundle size.

**Example:**

```js
// before
const lastItem = array[array.length - 1];

// after: modern Array#at() method
const lastItem = array.at(-1);
```

## Install

```bash
npm install @e18e/unplugin-replacements --save-dev
```

## Usage

```ts
import { defineConfig } from 'vite'
import replacements from '@e18e/unplugin-replacements/vite'

export default defineConfig({
  plugins: [
    replacements({
      // plugin options
    })
  ]
})
```

## Options

### `include`

Type: `Array<string>`

Specify which codemods to include. When provided, only the listed transformations will be applied.

```ts
replacements({
  include: ['arrayAt', 'objectHasOwn']
})
```

### `exclude`

Type: `Array<string>`

Specify which codemods to exclude. All transformations will be applied except those listed.

```ts
replacements({
  exclude: ['arrayAt']
})
```

> [!NOTE]
> Available codemod names come from [@e18e/web-features-codemods](https://github.com/e18e/web-features-codemods).

## License

MIT
