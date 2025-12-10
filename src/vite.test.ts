import {describe, it, expect} from 'vitest';
import type {RollupOutput} from 'rollup';
import {build} from 'vite';
import replacements from './vite.js';

describe('vite', () => {
  it('should transform code', async () => {
    const source = `
      const arr = [1, 2, 3];
      console.log(arr[arr.length - 1]);
    `;
    const result = (await build({
      plugins: [
        {
          name: 'test-file',
          resolveId(id) {
            if (id === 'entry.ts') {
              return id;
            }
            return null;
          },
          load(id) {
            if (id === 'entry.ts') {
              return source;
            }
            return null;
          }
        },
        replacements()
      ],
      logLevel: 'silent',
      build: {
        write: false,
        minify: false,
        rollupOptions: {
          input: 'entry.ts'
        }
      }
    })) as RollupOutput;

    const output = result.output[0].code;

    expect(output).toBe(`const arr = [1, 2, 3];
console.log(arr.at(-1));
`);
  });
});
