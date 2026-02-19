---
title: config-init
layout: layout.html
tags: commands
---

# `config-init`

Initialize a Dile CLI configuration file in your project.

## Usage

```bash
dile config-init [options]
```

## Options

- `--cjs` - Generate CommonJS format (`dile.config.cjs`)
- `--mjs` - Generate ES Module format (`dile.config.mjs`)
- `--json` - Generate JSON format (`dile.config.json`)
- `--force` - Overwrite existing configuration file

## Examples

Create default ES Module configuration:

```bash
dile config-init
```

This creates a `dile.config.js` file with default paths.

Create CommonJS configuration:

```bash
dile config-init --cjs
```

Create JSON configuration:

```bash
dile config-init --json
```

Overwrite existing configuration:

```bash
dile config-init --force
```

## Default Configuration

By default, the command creates a `dile.config.js` file with:

```js
export default {
  components: { basePath: 'src/components' },
  resources: { basePath: 'src/resources' },
};
```

For more configuration options and details, see [Configuration](/configuration/).
