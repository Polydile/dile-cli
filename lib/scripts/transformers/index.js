import * as appPrefixTransformer from './app-prefix.js';
import * as appNameTransformer from './app-name.js';

export const transformers = [
  {
    name: 'app-prefix',
    transform: appPrefixTransformer.transform
  },
  {
    name: 'app-name',
    transform: appNameTransformer.transform
  }
];
