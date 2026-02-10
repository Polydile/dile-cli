import { join } from 'path';
import { createTemplateCommand } from './template-command.js';
import { toCamelCase, toKebabCase } from '../utils/case.js';
import { deduceEntity, ensureResourceConfigExists, toImportPath } from './crud-utils.js';

export const generateCrud = createTemplateCommand({
  templateName: 'component-crud',
  kindLabel: 'crud component',
  buildTemplateData: (parsed, options, ctx) => {
    const entity = deduceEntity(parsed, options);

    const componentFile = join(ctx.cwd, ctx.componentsBase, parsed.subpath, `${parsed.name}.js`);
    const configFile = join(ctx.cwd, ctx.resourcesBase, `${toCamelCase(entity)}Config.js`);

    ensureResourceConfigExists({ ctx, configFile, entity });

    return {
      name: parsed.name,
      entity,
      configImportPath: toImportPath(componentFile, configFile),
      entityKebab: toKebabCase(entity),
    };
  },
});
