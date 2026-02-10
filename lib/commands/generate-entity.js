import { toKebabCase } from '../utils/case.js';
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

  const entity = toKebabCase(entityArg.trim());

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

  await generateResourceConfig(entity, {
    endpoint: options.endpoint,
    itemComponent: `${entity}-item`,
    detailComponent: `${entity}-detail`,
    insertComponent: `${entity}-form`,
    updateComponent: `${entity}-form`,
    force,
  });

  await generateCrud(`${entity}/${entity}-crud`, { entity, force });
  await generateSingle(`${entity}/${entity}-single`, { entity, force });
}
