import {describe, it, expect} from 'vitest';
import replacements from './rollup.js';
import {rollup} from 'rollup';

describe('rollup', () => {
  it('should transform code correctly', async () => {
    const code = `
      const arr = [1, 2, 3];
      const last = arr[arr.length - 1];
      const includes = arr.indexOf(2) !== -1;
      export { last, includes };
    `;

    const bundle = await rollup({
      input: 'entry.ts',
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
              return code;
            }
            return null;
          }
        },
        replacements()
      ]
    });

    const {output} = await bundle.generate({
      format: 'es'
    });

    const transformedCode = output[0].code;

    expect(transformedCode).toBe(`const arr = [1, 2, 3];
      const last = arr.at(-1);
      const includes = arr.includes(2);

export { includes, last };
`);
  });
});
