import { generateComponent } from './generate-component.js';
import { generateForm } from './generate-form.js';
import { wrapAction } from '../cli/wrap-action.js';

export function registerCommands(program) {
  program
    .command('g-component')
    .description('Generate a component')
    .argument('<path>', 'Component path/name e.g: ui/multiple-select')
    .option('--force', 'Overwrite existing files')
    .action(wrapAction(generateComponent));

  program
    .command('g-form')
    .description('Generate a form component')
    .argument('<path>', 'Component path/name e.g: forms/invoice-form')
    .option('--force', 'Overwrite existing files')
    .action(wrapAction(generateForm));
}
