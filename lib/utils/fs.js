import { mkdirSync, existsSync, writeFileSync } from 'fs';
import { dirname } from 'path';

export function ensureDirForFile(filePath) {
  const dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

export function writeFileSafely(filePath, content, { force = false } = {}) {
  if (existsSync(filePath) && !force) {
    const error = new Error(`Already exists: ${filePath}`);
    error.code = 'EEXISTS';
    throw error;
  }

  ensureDirForFile(filePath);
  writeFileSync(filePath, content);
}
