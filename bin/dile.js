#!/usr/bin/env node
import { program } from 'commander';
import { registerCommands } from '../lib/commands/index.js';

program
  .name('dile')
  .description('CLI for generating Dile components')
  .version('0.0.1');

registerCommands(program);

await program.parseAsync();
