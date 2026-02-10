import { generateComponent } from './generate-component.js';
import { generateForm } from './generate-form.js';
import { generateItem } from './generate-item.js';
import { generateDetail } from './generate-detail.js';
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
    .option('-i, --input', 'Include <dile-input> example')
    .option('-c, --checkbox', 'Include <dile-checkbox> example')
    .option('-s, --select', 'Include <dile-select> example')
    .option('-r, --radio', 'Include <dile-radio-group> example')
    .option('-t, --textarea', 'Include <dile-textarea> example')
    .option('--force', 'Overwrite existing files')
    .action(wrapAction(generateForm));

  program
    .command('g-item')
    .description('Generate an item component')
    .argument('<path>', 'Component path/name e.g: items/user-item')
    .option('--force', 'Overwrite existing files')
    .action(wrapAction(generateItem));

  program
    .command('g-detail')
    .description('Generate a detail component')
    .argument('<path>', 'Component path/name e.g: details/user-detail')
    .option('--force', 'Overwrite existing files')
    .action(wrapAction(generateDetail));
}
