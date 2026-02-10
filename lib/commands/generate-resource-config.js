import { join } from 'path';
import { createTemplateCommand } from './template-command.js';
import { toCamelCase, toKebabCase } from '../utils/case.js';

export const generateResourceConfig = createTemplateCommand({
  templateName: 'resource-config',
  kindLabel: 'resource config',
  buildTemplateData: ({ name, subpath }, options) => {
    const resource = name;
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

    return {
      resource,
      endpoint,
      itemComponent,
      detailComponent,
      insertComponent,
      updateComponent,
      subpath,
    };
  },
  resolveOutput: (ctx, parsed) => {
    const fileBase = `${toCamelCase(parsed.name)}Config.js`;
    return join(ctx.cwd, ctx.resourcesBase, parsed.subpath, fileBase);
  },
});
