#!/usr/bin/env node

import path from "node:path";
import minimist from "minimist";
import { Plop, run } from "plop";

const argv = minimist(process.argv.slice(2));
const __dirname = path.dirname(new URL(import.meta.url).pathname);

Plop.prepare({
  cwd: argv.cwd || process.cwd(),
  configPath: path.join(__dirname, 'plopfile.js'),
}, (env) => Plop.execute(env, run));
