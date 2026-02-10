import Handlebars from 'handlebars';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const templatesDir = join(__dirname, '../templates');

const helpers = {
  kebabCase: (str) => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
  pascalCase: (str) => str.replace(/[-_]([a-z])/g, (g) => g[1].toUpperCase()),
};

Object.entries(helpers).forEach(([name, fn]) => {
  Handlebars.registerHelper(name, fn);
});

const templateCache = new Map();

export function loadTemplate(name) {
  const cached = templateCache.get(name);
  if (cached) return cached;

  const templatePath = join(templatesDir, `${name}.hbs`);
  const source = readFileSync(templatePath, 'utf8');
  const compiled = Handlebars.compile(source);
  templateCache.set(name, compiled);
  return compiled;
}