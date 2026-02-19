---
title: Dile CLI Configuration
layout: layout.html
---

# Configuration

The CLI searches for configuration using `cosmiconfig` in the current directory (`process.cwd()`), in this order:

- `dile.config.js`
- `dile.config.cjs`
- `dile.config.mjs`
- `dile.config.json`
- `package.json`

## Command to generate configuration file

Dile CLI provides a command to generate the configuration file: `dile congig-init`. You will find more information in the [config-init command documentation](/commands/config-init/) page.

## Module format for `dile.config.js`

The module format expected for `dile.config.js` depends on your `package.json` configuration:

- If your `package.json` has `"type": "module"`, use **ES modules** syntax (with `export default`)
- If your `package.json` doesn't have a `type` field or has `"type": "commonjs"`, use **CommonJS** syntax (with `module.exports`)

For explicit control, you can also use `dile.config.cjs` (CommonJS) or `dile.config.mjs` (ES modules) to bypass the `package.json` type detection.

> **Tip:** Use [debug mode](/debugging/) if you're not getting the expected configuration from your config file. This will help you identify which configuration file is being loaded and what values are being resolved.

## Base paths

You can configure the base output paths in two ways:

### 1) Recommended (object with `basePath`)

```js
// dile.config.js
export default {
  components: { basePath: 'src/components' },
  resources: { basePath: 'src/resources' },
};
```

### 2) Short form (string)

```js
// dile.config.js
export default {
  components: 'src/components',
  resources: 'src/resources',
};
```

### In `package.json`

```json
{
  "dile": {
    "components": { "basePath": "src/components" },
    "resources": { "basePath": "src/resources" }
  }
}
```

If there is no configuration, the default values are:

- `componentsBase = "src/components"`
- `resourcesBase = "src/resources"`

## Conventions and validations

- Path-type arguments `<path>` accept subfolders using `/` (also normalizes `\\` → `/`).
- Segments `.` or `..` are not allowed in the path.
- By default, if the file exists, the command fails with an error.
- With `--force`, the existing file is overwritten.
