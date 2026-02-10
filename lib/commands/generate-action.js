import { createTemplateCommand } from './template-command.js';

export const generateAction = createTemplateCommand({
  templateName: 'component-action',
  kindLabel: 'action component',
  buildTemplateData: ({ name }, options) => ({
    name,
    input: Boolean(options.input),
    checkbox: Boolean(options.checkbox),
    select: Boolean(options.select),
    radio: Boolean(options.radio),
    textarea: Boolean(options.textarea),
  }),
});
