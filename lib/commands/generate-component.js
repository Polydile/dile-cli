import { createTemplateCommand } from './template-command.js';

export const generateComponent = createTemplateCommand({
  templateName: 'component',
  kindLabel: 'component',
});
