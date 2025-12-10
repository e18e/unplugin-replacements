import type * as codemods from '@e18e/web-features-codemods';

export interface Options {
  include?: Array<keyof typeof codemods>;
  exclude?: Array<keyof typeof codemods>;
}
