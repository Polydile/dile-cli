import { join } from 'path';
import { getContext } from '../context.js';
import { loadTemplate } from '../templates.js';
import { parseNameAndSubpath } from '../utils/paths.js';
import { writeFileSafely } from '../utils/fs.js';
import { getPrefixedName, toPascalCase } from '../utils/case.js';

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

  const defaultResolveFilePath = (ctx, parsed, options, templateData) => {
    const fileName = templateData.tagName || parsed.name;
    return join(ctx.cwd, ctx.componentsBase, parsed.subpath, `${fileName}.js`);
  };

  const resolveFilePath =
    typeof resolveOutput === 'function'
      ? resolveOutput
      : defaultResolveFilePath;

  return async function runTemplateCommand(componentArg, options = {}) {
    const ctx = await getContext();

    const parsed = parseNameAndSubpath(componentArg);
    const prefix = ctx.config?.componentPrefix;
    const prefixedName = prefix ? getPrefixedName(parsed.name, prefix) : parsed.name;
    const prefixedClassName = toPascalCase(prefixedName);

    const templateData = {
      ...buildData(parsed, options, ctx),
      tagName: prefixedName,
      className: prefixedClassName,
    };
    const fullFile = resolveFilePath(ctx, parsed, options, templateData);

    console.log(`📦 Generating "${prefixedName}" ${kindLabel}`);
    console.log(`📄 File: ${fullFile}`);

    const template = loadTemplate(templateName);
    const content = template(templateData);

    try {
      writeFileSafely(fullFile, content, { force: Boolean(options.force) });
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error && error.code === 'EEXISTS') {
        console.error(`❌ ${error.message}`);
        process.exitCode = 1;
        return;
      }
      throw error;
    }

    console.log(`✅ Generated: ${fullFile}`);
  };
}
