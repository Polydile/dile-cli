import { generateComponent } from './generate-component.js';
import { generateForm } from './generate-form.js';
import { generateItem } from './generate-item.js';
import { generateDetail } from './generate-detail.js';
import { generateResourceConfig } from './generate-resource-config.js';
import { generateAction } from './generate-action.js';
import { generateCrud } from './generate-crud.js';
import { generateSingle } from './generate-single.js';
import { generateEntity } from './generate-entity.js';
import { wrapAction } from '../cli/wrap-action.js';

export function registerCommands(program) {
  program
    .command('g-component')
    .description('Generate a component')
    .argument('<path>', 'Component path/name e.g: ui/multiple-select')
    .option('--force', 'Overwrite existing files')
    .action(wrapAction(generateComponent));

  program
    .command('g-entity')
    .description('Generate a full entity scaffold (form, item, detail, resource-config, crud, single)')
    .argument('<entity>', 'Entity name e.g: country')
    .option('--endpoint <url>', 'Endpoint URL for the resource config')
    .option('-i, --input', 'Include <dile-input> example in the form')
    .option('-c, --checkbox', 'Include <dile-checkbox> example in the form')
    .option('-s, --select', 'Include <dile-select> example in the form')
    .option('-r, --radio', 'Include <dile-radio-group> example in the form')
    .option('-t, --textarea', 'Include <dile-textarea> example in the form')
    .option('--force', 'Overwrite existing files')
    .action(wrapAction(generateEntity));

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

  program
    .command('g-resource-config')
    .description('Generate a CRUD resource config module')
    .argument('<resource>', 'Resource name e.g: User')
    .option('--endpoint <url>', 'Endpoint URL for the resource')
    .option('--item-component <tag>', 'Item component tag e.g: user-item')
    .option('--insert-component <tag>', 'Insert form component tag e.g: insert-user-form')
    .option('--update-component <tag>', 'Update form component tag e.g: update-user-form')
    .option('--detail-component <tag>', 'Detail component tag e.g: user-detail')
    .option('--force', 'Overwrite existing files')
    .action(wrapAction(generateResourceConfig));

  program
    .command('g-action')
    .description('Generate an action component')
    .argument('<path>', 'Component path/name e.g: actions/demo-change-name-action')
    .option('-i, --input', 'Include <dile-input> example')
    .option('-c, --checkbox', 'Include <dile-checkbox> example')
    .option('-s, --select', 'Include <dile-select> example')
    .option('-r, --radio', 'Include <dile-radio-group> example')
    .option('-t, --textarea', 'Include <dile-textarea> example')
    .option('--force', 'Overwrite existing files')
    .action(wrapAction(generateAction));

  program
    .command('g-crud')
    .description('Generate a CRUD component wired to a resource config')
    .argument('<path>', 'Component path/name e.g: country/country-crud')
    .option('--entity <name>', 'Resource entity name (optional)')
    .option('--force', 'Overwrite existing files')
    .action(wrapAction(generateCrud));

  program
    .command('g-single')
    .description('Generate a CRUD single component wired to a resource config')
    .argument('<path>', 'Component path/name e.g: country/country-single')
    .option('--entity <name>', 'Resource entity name (optional)')
    .option('--force', 'Overwrite existing files')
    .action(wrapAction(generateSingle));
}
