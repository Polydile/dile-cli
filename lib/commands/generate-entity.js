import { toKebabCase, getPrefixedName } from '../utils/case.js';
import { getContext } from '../context.js';
import { generateDetail } from './generate-detail.js';
import { generateForm } from './generate-form.js';
import { generateItem } from './generate-item.js';
import { generateCrud } from './generate-crud.js';
import { generateSingle } from './generate-single.js';
import { generateResourceConfig } from './generate-resource-config.js';

export async function generateEntity(entityArg, options = {}) {
  if (typeof entityArg !== 'string' || !entityArg.trim()) {
    throw new Error('Entity name is required');
  }

  if (entityArg.includes('/')) {
    throw new Error('Entity name cannot include "/". Usa un nombre simple, por ejemplo: country');
  }

  const ctx = await getContext();
  const entity = toKebabCase(entityArg.trim());
  const prefix = ctx.config?.componentPrefix;

  const force = Boolean(options.force);

  await generateForm(`${entity}/${entity}-form`, {
    input: Boolean(options.input),
    checkbox: Boolean(options.checkbox),
    select: Boolean(options.select),
    radio: Boolean(options.radio),
    textarea: Boolean(options.textarea),
    force,
  });

  await generateItem(`${entity}/${entity}-item`, { force });
  await generateDetail(`${entity}/${entity}-detail`, { force });

  // Create component tags with prefix
  const itemTag = prefix ? getPrefixedName(`${entity}-item`, prefix) : `${entity}-item`;
  const detailTag = prefix ? getPrefixedName(`${entity}-detail`, prefix) : `${entity}-detail`;
  const formTag = prefix ? getPrefixedName(`${entity}-form`, prefix) : `${entity}-form`;

  await generateResourceConfig(entity, {
    endpoint: options.endpoint,
    itemComponent: itemTag,
    detailComponent: detailTag,
    insertComponent: formTag,
    updateComponent: formTag,
    force,
  });

  await generateCrud(`${entity}/${entity}-crud`, { entity, force });
  await generateSingle(`${entity}/${entity}-single`, { entity, force });
}
