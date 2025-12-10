import {createUnplugin, type UnpluginFactory} from 'unplugin';
import * as codemods from '@e18e/web-features-codemods';
import type {Options} from './types.js';

type CodemodName = keyof typeof codemods;

export const unpluginFactory: UnpluginFactory<Options | undefined> = (
  options
) => {
  const includedCodemods = options?.include;
  const excludedCodemods = options?.exclude;

  return {
    name: '@e18e/unplugin-replacements',
    transform: {
      filter: {
        id: /\.ts$/
      },
      handler(code) {
        let output: string = code;
        for (const [codemodName, codemod] of Object.entries(codemods)) {
          if (
            includedCodemods &&
            !includedCodemods.includes(codemodName as CodemodName)
          ) {
            continue;
          }
          if (
            excludedCodemods &&
            excludedCodemods.includes(codemodName as CodemodName)
          ) {
            continue;
          }
          output = codemod.apply({
            source: output
          });
        }
        return output;
      }
    }
  };
};

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory);

export default unplugin;
