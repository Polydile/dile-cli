import { join } from 'path';
import { getContext } from '../context.js';
import { loadTemplate } from '../templates.js';
import { parseNameAndSubpath } from '../utils/paths.js';
import { writeFileSafely } from '../utils/fs.js';

export function createTemplateCommand({
  templateName,
  kindLabel = 'component',
  buildTemplateData,
  resolveOutput,
} = {}) {
  if (!templateName) {
    throw new Error('createTemplateCommand requires templateName');
  }

  const buildData =
    typeof buildTemplateData === 'function'
      ? buildTemplateData
      : ({ name }) => ({ name });

  const resolveFilePath =
    typeof resolveOutput === 'function'
      ? resolveOutput
      : (ctx, parsed) => join(ctx.cwd, ctx.componentsBase, parsed.subpath, `${parsed.name}.js`);

  return async function runTemplateCommand(componentArg, options = {}) {
    const ctx = getContext();

    const parsed = parseNameAndSubpath(componentArg);
    const templateData = buildData(parsed, options);
    const fullFile = resolveFilePath(ctx, parsed, options, templateData);

    console.log(`📦 Generating "${parsed.name}" ${kindLabel}`);
    console.log(`📄 File: ${fullFile}`);

    const template = loadTemplate(templateName);
    const content = template(templateData);

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
