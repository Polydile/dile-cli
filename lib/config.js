import { cosmiconfig } from 'cosmiconfig';

export function isDebugEnabled() {
  return (
    Boolean(process.env.DILE_DEBUG) ||
    (typeof process.env.DEBUG === 'string' && process.env.DEBUG.includes('dile'))
  );
}

export async function loadConfig() {
  try {
    const explorer = cosmiconfig('dile', {
      searchPlaces: [
        'dile.config.js',
        'dile.config.cjs',
        'dile.config.mjs',
        'dile.config.json',
        'package.json'
      ]
    });
    const result = await explorer.search(process.cwd());

    if (isDebugEnabled()) {
      if (result?.filepath) {
        console.warn(`[dile][config] Loaded config from: ${result.filepath}`);
      } else {
        console.warn(`[dile][config] No config found. Using defaults. cwd=${process.cwd()}`);
      }
      const keys = result?.config && typeof result.config === 'object' ? Object.keys(result.config) : [];
      console.warn(`[dile][config] Config keys: ${keys.join(', ') || '(none)'}`);
    }

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

export function getResourcesPath(config) {
  return config.resources?.basePath ||
         config.resources ||
         'src/resources';
}
