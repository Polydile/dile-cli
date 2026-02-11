import Handlebars from 'handlebars';
import { existsSync, readFileSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { toPascalCase, toCamelCase } from './utils/case.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const templatesDir = join(__dirname, '../templates');
const partialsDir = join(templatesDir, 'partials');

const helpers = {
  kebabCase: (str) => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
  pascalCase: (str) => str.replace(/[-_]([a-z])/g, (g) => g[1].toUpperCase()),
  properPascalCase: (str) => toPascalCase(str),
  properCamelCase: (str) => toCamelCase(str),
  jsString: (value) => JSON.stringify(String(value ?? '')),
  eq: (a, b) => a === b,
  and: (...args) => {
    const values = args.slice(0, -1);
    return values.every(Boolean);
  },
};

Object.entries(helpers).forEach(([name, fn]) => {
  Handlebars.registerHelper(name, fn);
});

function registerPartials() {
  if (!existsSync(partialsDir)) return;

  for (const fileName of readdirSync(partialsDir)) {
    if (!fileName.endsWith('.hbs')) continue;
    const partialName = fileName.slice(0, -4);
    const source = readFileSync(join(partialsDir, fileName), 'utf8');
    Handlebars.registerPartial(partialName, source);
  }
}

registerPartials();

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