export function normalizeCliPath(input) {
  return String(input ?? '').replace(/\\/g, '/');
}

export function parseNameAndSubpath(input) {
  const normalized = normalizeCliPath(input);
  const parts = normalized.split('/').filter(Boolean);

  if (parts.length === 0) {
    throw new Error('Invalid component path: empty');
  }

  if (parts.some((p) => p === '.' || p === '..')) {
    throw new Error('Invalid component path: "." and ".." are not allowed');
  }

  const name = parts.at(-1);
  const subpath = parts.slice(0, -1).join('/');
  return { name, subpath };
}
