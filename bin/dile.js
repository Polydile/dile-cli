#!/usr/bin/env node
import { program } from 'commander';
import { createRequire } from 'node:module';
import updateNotifier from 'update-notifier';
import { registerCommands } from '../lib/commands/index.js';

const require = createRequire(import.meta.url);
const pkg = require('../package.json');
const { version } = pkg;

if (!process.env.DILE_DISABLE_UPDATE_CHECK && !process.env.NO_UPDATE_NOTIFIER) {
  try {
    updateNotifier({ pkg, isGlobal: true }).notify();
  } catch {
    // Never block CLI execution due to update checks
  }
}

program
  .name('dile')
  .description('CLI for generating Dile components')
  .version(version);

registerCommands(program);

await program.parseAsync();
