import { loadConfigSync, getComponentsPath } from './config.js';

export function getContext() {
  const config = loadConfigSync();
  return {
    cwd: process.cwd(),
    config,
    componentsBase: getComponentsPath(config),
  };
}
