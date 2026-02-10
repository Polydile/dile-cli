import { createTemplateCommand } from './template-command.js';

export const generateForm = createTemplateCommand({
  templateName: 'component-form',
  kindLabel: 'form component',
  buildTemplateData: ({ name }, options) => ({
    name,
    input: Boolean(options.input),
    checkbox: Boolean(options.checkbox),
    select: Boolean(options.select),
    radio: Boolean(options.radio),
    textarea: Boolean(options.textarea),
  }),
});
