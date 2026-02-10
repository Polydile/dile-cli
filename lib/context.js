import { loadConfig, getComponentsPath, getResourcesPath, isDebugEnabled } from './config.js';

export async function getContext() {
  const config = await loadConfig();
  const componentsBase = getComponentsPath(config);
  const resourcesBase = getResourcesPath(config);

  if (isDebugEnabled()) {
    console.warn(`[dile][context] componentsBase=${componentsBase}`);
    console.warn(`[dile][context] resourcesBase=${resourcesBase}`);
  }
  return {
    cwd: process.cwd(),
    config,
    componentsBase,
    resourcesBase,
  };
}
