import { cosmiconfigSync } from 'cosmiconfig';

function isDebugEnabled() {
  return Boolean(process.env.DILE_DEBUG) ||
    (typeof process.env.DEBUG === 'string' && process.env.DEBUG.includes('dile'));
}

export function loadConfigSync() {
  try {
    const explorer = cosmiconfigSync('dile', {
      searchPlaces: [
        'dile.config.js',
        'dile.config.mjs',
        'dile.config.json',
        'package.json'
      ]
    });
    const result = explorer.searchSync(process.cwd());
    return result?.config || {};
  } catch (error) {
    if (isDebugEnabled()) {
      const message = error instanceof Error ? error.message : String(error);
      console.warn(`⚠️  Error loading dile config, using defaults: ${message}`);
    }
    return {};
  }
}

export function getComponentsPath(config) {
  return config.components?.basePath || 
         config.components || 
         'src/components';
}
