import type {Options} from './types.js';
import unplugin from './main.js';

interface AstroLike {
  config: {
    vite: {
      plugins: unknown[];
    };
  };
}

export default (options: Options): unknown => ({
  name: '@e18e/unplugin-replacements',
  hooks: {
    'astro:config:setup': async (astro: AstroLike) => {
      astro.config.vite.plugins ||= [];
      astro.config.vite.plugins.push(unplugin.vite(options));
    }
  }
});
