# @e18e/unplugin-replacements

> An unplugin to apply e18e-recommended modernization and performance replacements.

> [!WARNING]
> This plugin is experimental and not yet published publicly. Use at your own risk.

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

## License

MIT
