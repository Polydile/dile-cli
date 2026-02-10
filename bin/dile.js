#!/usr/bin/env node
import { program } from 'commander';
import { createRequire } from 'node:module';
import { registerCommands } from '../lib/commands/index.js';

const require = createRequire(import.meta.url);
const { version } = require('../package.json');

program
  .name('dile')
  .description('CLI for generating Dile components')
  .version(version);

registerCommands(program);

await program.parseAsync();
