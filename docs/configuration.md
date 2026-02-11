# Configuration

The CLI searches for configuration using `cosmiconfig` in the current directory (`process.cwd()`), in this order:

- `dile.config.js`
- `dile.config.cjs`
- `dile.config.mjs`
- `dile.config.json`
- `package.json`

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
