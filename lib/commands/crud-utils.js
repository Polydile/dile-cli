import { existsSync } from 'fs';
import { dirname, relative } from 'path';

export function toImportPath(fromFile, toFile) {
  let rel = relative(dirname(fromFile), toFile);
  rel = rel.replace(/\\/g, '/');
  if (!rel.startsWith('.')) rel = `./${rel}`;
  return rel;
}

export function deduceEntity(parsed, options) {
  if (typeof options.entity === 'string' && options.entity.trim()) {
    return options.entity.trim();
  }

  if (parsed.subpath) {
    const parts = parsed.subpath.split('/').filter(Boolean);
    if (parts.length) return parts[0];
  }

  if (parsed.name.endsWith('-crud')) {
    return parsed.name.slice(0, -'-crud'.length);
  }

  if (parsed.name.endsWith('-single')) {
    return parsed.name.slice(0, -'-single'.length);
  }

  return parsed.name;
}

export function ensureResourceConfigExists({ ctx, configFile, entity }) {
  if (existsSync(configFile)) return;

  const rel = relative(ctx.cwd, configFile).replace(/\\/g, '/');
  throw new Error(
    `Resource config not found: ${rel}. ` +
      `Genera el config con: dile g-resource-config ${entity}`
  );
}
