function splitWords(input) {
  const str = String(input ?? '')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_\s]+/g, ' ')
    .trim();

  return str ? str.split(' ').filter(Boolean) : [];
}

export function upperFirst(str) {
  const s = String(str ?? '');
  return s ? s[0].toUpperCase() + s.slice(1) : s;
}

export function lowerFirst(str) {
  const s = String(str ?? '');
  return s ? s[0].toLowerCase() + s.slice(1) : s;
}

export function toPascalCase(input) {
  const words = splitWords(input);
  return words.map((w) => upperFirst(w.toLowerCase())).join('');
}

export function toCamelCase(input) {
  return lowerFirst(toPascalCase(input));
}

export function toKebabCase(input) {
  const words = splitWords(input);
  return words.map((w) => w.toLowerCase()).join('-');
}
