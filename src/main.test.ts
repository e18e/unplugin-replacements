import {describe, it, expect} from 'vitest';
import {unpluginFactory, unplugin} from './main.js';
import type {HookFnMap, ObjectHook} from 'unplugin';

describe('unpluginFactory', () => {
  it('should transform basic code & have correct info', async () => {
    const plugin = unpluginFactory(undefined, {
      framework: 'vite'
    });
    expect(plugin.name).toBe('@e18e/unplugin-replacements');

    const transform = plugin.transform as ObjectHook<
      HookFnMap['transform'],
      'code' | 'id'
    >;
    const idFilter = transform.filter?.id as RegExp;
    const handler = transform.handler;

    expect(idFilter.test('foo.ts')).toBe(true);
    const source = `const arr = [1, 2, 3]; console.log(arr[arr.length - 1]);`;

    const result = await handler.call(null as never, source, 'foo.ts');

    expect(result).toBe(`const arr = [1, 2, 3]; console.log(arr.at(-1));`);
  });

  it('should respect include option', async () => {
    const plugin = unpluginFactory(
      {
        include: ['arrayAt']
      },
      {
        framework: 'vite'
      }
    );
    const transform = plugin.transform as ObjectHook<
      HookFnMap['transform'],
      'code' | 'id'
    >;
    const handler = transform.handler;

    const source = `
      const arr = [1, 2, 3];
      console.log(arr[arr.length - 1]);

      const includes = arr.indexOf(1) !== -1;
    `;

    const result = await handler.call(null as never, source, 'foo.ts');

    expect(result).toBe(`const arr = [1, 2, 3];
      console.log(arr.at(-1));

      const includes = arr.indexOf(1) !== -1;
    `);
  });

  it('should respect exclude option', async () => {
    const plugin = unpluginFactory(
      {
        exclude: ['arrayAt']
      },
      {
        framework: 'vite'
      }
    );
    const transform = plugin.transform as ObjectHook<
      HookFnMap['transform'],
      'code' | 'id'
    >;
    const handler = transform.handler;

    const source = `
      const arr = [1, 2, 3];
      console.log(arr[arr.length - 1]);

      const includes = arr.indexOf(1) !== -1;
    `;

    const result = await handler.call(null as never, source, 'foo.ts');

    expect(result).toBe(`const arr = [1, 2, 3];
      console.log(arr[arr.length - 1]);

      const includes = arr.includes(1);
    `);
  });

  it('should transform multiple codemods', async () => {
    const plugin = unpluginFactory(undefined, {
      framework: 'vite'
    });
    const transform = plugin.transform as ObjectHook<
      HookFnMap['transform'],
      'code' | 'id'
    >;
    const handler = transform.handler;

    const source = `
      const arr = [1, 2, 3];
      console.log(arr[arr.length - 1]);

      const includes = arr.indexOf(1) !== -1;
    `;

    const result = await handler.call(null as never, source, 'foo.ts');

    expect(result).toBe(`const arr = [1, 2, 3];
      console.log(arr.at(-1));

      const includes = arr.includes(1);
    `);
  });
});

describe('unplugin', () => {
  it('should be defined', () => {
    expect(unplugin).toHaveProperty('rollup');
    expect(unplugin).toHaveProperty('raw');
  });
});
