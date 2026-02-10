import { join } from 'path';
import { getContext } from '../context.js';
import { loadTemplate } from '../templates.js';
import { parseNameAndSubpath } from '../utils/paths.js';
import { writeFileSafely } from '../utils/fs.js';

export function createTemplateCommand({
  templateName,
  kindLabel = 'component',
  buildTemplateData,
} = {}) {
  if (!templateName) {
    throw new Error('createTemplateCommand requires templateName');
  }

  const buildData =
    typeof buildTemplateData === 'function'
      ? buildTemplateData
      : ({ name }) => ({ name });

  return async function runTemplateCommand(componentArg, options = {}) {
    const { cwd, componentsBase } = getContext();

    const { name, subpath } = parseNameAndSubpath(componentArg);
    const fullFile = join(cwd, componentsBase, subpath, `${name}.js`);

    console.log(`📦 Generating "${name}" ${kindLabel}`);
    console.log(`📄 File: ${fullFile}`);

    const template = loadTemplate(templateName);
    const content = template(buildData({ name }, options));

    try {
      writeFileSafely(fullFile, content, { force: Boolean(options.force) });
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error && error.code === 'EEXISTS') {
        console.error(`❌ ${error.message}`);
        console.error('   Usa --force para sobreescribir.');
        process.exitCode = 1;
        return;
      }
      throw error;
    }

    console.log(`✅ Generated: ${fullFile}`);
  };
}
