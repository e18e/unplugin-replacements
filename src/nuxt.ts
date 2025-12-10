import type {Options} from './types.js';
import {addVitePlugin, addWebpackPlugin, defineNuxtModule} from '@nuxt/kit';
import vite from './vite.js';
import webpack from './webpack.js';

export type ModuleOptions = Options;

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@e18e/unplugin-replacements',
    configKey: 'e18eReplacements'
  },
  defaults: {},
  setup(options) {
    addVitePlugin(() => vite(options));
    addWebpackPlugin(() => webpack(options));
  }
});
