import { existsSync } from 'fs';
import { join } from 'path';
import { createTemplateCommand } from './template-command.js';
import { toCamelCase, toKebabCase } from '../utils/case.js';
import { toImportPath } from './crud-utils.js';
import { isDebugEnabled } from '../config.js';

function resolveComponentImportPath({ ctx, parsed, tag, configFile }) {
  if (!tag) return undefined;

  const fileName = tag.endsWith('.js') ? tag : `${tag}.js`;

  const candidates = [
    // If the command arg had a subpath (g-resource-config some/sub/resource)
    join(ctx.cwd, ctx.componentsBase, parsed.subpath, fileName),
    // Common case for g-entity: components live under a folder matching the entity/resource
    join(ctx.cwd, ctx.componentsBase, parsed.name, fileName),
    // Flat structure
    join(ctx.cwd, ctx.componentsBase, fileName),
  ];

  const found = candidates.find((absPath) => existsSync(absPath));
  if (!found) {
    if (isDebugEnabled()) {
      const tried = candidates.map((c) => c.replace(/\\/g, '/')).join(' | ');
      console.warn(`[dile][resource-config] Component "${tag}" not found. Skipping import. Tried: ${tried}`);
    }
    return undefined;
  }

  return toImportPath(configFile, found);
}

export const generateResourceConfig = createTemplateCommand({
  templateName: 'resource-config',
  kindLabel: 'resource config',
  buildTemplateData: (parsed, options, ctx) => {
    const resource = parsed.name;
    const endpoint =
      typeof options.endpoint === 'string' && options.endpoint.trim()
        ? options.endpoint.trim()
        : `https://example.com/api/${toKebabCase(resource)}`;

    const itemComponent =
      (typeof options.itemComponent === 'string' && options.itemComponent.trim()) || undefined;

    const detailComponent =
      (typeof options.detailComponent === 'string' && options.detailComponent.trim()) ||
      undefined;

    const insertComponent =
      (typeof options.insertComponent === 'string' && options.insertComponent.trim()) ||
      undefined;

    const updateComponent =
      (typeof options.updateComponent === 'string' && options.updateComponent.trim()) ||
      undefined;

    const fileBase = `${toCamelCase(parsed.name)}Config.js`;
    const configFile = join(ctx.cwd, ctx.resourcesBase, parsed.subpath, fileBase);

    const itemComponentImportPath = resolveComponentImportPath({
      ctx,
      parsed,
      tag: itemComponent,
      configFile,
    });

    const detailComponentImportPath = resolveComponentImportPath({
      ctx,
      parsed,
      tag: detailComponent,
      configFile,
    });

    const insertComponentImportPath = resolveComponentImportPath({
      ctx,
      parsed,
      tag: insertComponent,
      configFile,
    });

    const updateComponentImportPath = resolveComponentImportPath({
      ctx,
      parsed,
      tag: updateComponent,
      configFile,
    });

    const componentImports = Array.from(
      new Set(
        [
          itemComponentImportPath,
          insertComponentImportPath,
          updateComponentImportPath,
          detailComponentImportPath,
        ].filter(Boolean)
      )
    );

    return {
      resource,
      endpoint,
      itemComponent,
      detailComponent,
      insertComponent,
      updateComponent,
      componentImports,
      itemComponentImportPath,
      detailComponentImportPath,
      insertComponentImportPath,
      updateComponentImportPath,
      subpath: parsed.subpath,
    };
  },
  resolveOutput: (ctx, parsed) => {
    const fileBase = `${toCamelCase(parsed.name)}Config.js`;
    return join(ctx.cwd, ctx.resourcesBase, parsed.subpath, fileBase);
  },
});
