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
- `--prefix <prefix>` - Set the component prefix (e.g. `dile`)
- `--force` - Overwrite existing configuration file

## Examples

Create default ES Module configuration:

```bash
dile config-init
```

This creates a `dile.config.js` file with default paths.

Create configuration with component prefix:

```bash
dile config-init --prefix dile
```

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

With the `--prefix` option:

```bash
dile config-init --prefix my-prefix
```

This creates a configuration with:

```js
export default {
  components: { basePath: 'src/components' },
  resources: { basePath: 'src/resources' },
  componentPrefix: 'my-prefix',
};
```

For more configuration options and details, see [Configuration](/configuration/).
