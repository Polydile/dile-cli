# @dile/cli

CLI to generate Dile component *scaffolds* (Web Components) from Handlebars templates.

- Binary: `dile`
- Templates: `templates/*.hbs`
- Default outputs:
  - Components: `src/components`
  - Resources/configs: `src/resources`

> Note: this CLI writes `.js` files and creates folders if they do not exist.

***

## Installation

### Global use

```bash
npm i -g @dile/cli
# or
pnpm add -g @dile/cli
```

### Use without installing (npx)

```bash
npx --package @dile/cli dile --help
```

### Local development (repo)

```bash
npm install
npm link
# now you can use:
dile --help
```

***

## Configuration

The CLI searches for configuration using `cosmiconfig` in the current directory (`process.cwd()`), in this order:

- `dile.config.js`
- `dile.config.cjs`
- `dile.config.mjs`
- `dile.config.json`
- `package.json`

### Base paths

You can configure the base output paths in two ways:

**1) Recommended way (object with `basePath`)**

```js
// dile.config.js
export default {
  components: { basePath: 'src/components' },
  resources: { basePath: 'src/resources' },
};
```

**2) Short form (string)**

```js
// dile.config.js
export default {
  components: 'src/components',
  resources: 'src/resources',
};
```

**In `package.json`**

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

***

## Conventions and validations

- Path-type arguments `<path>` accept subfolders using `/` (also normalizes `\\` → `/`).
- Segments `.` or `..` are not allowed in the path.
- By default, if the file exists, the command fails with an error.
- With `--force`, the existing file is overwritten.

***

## Debugging

Enable debug logs with:

- `DILE_DEBUG=1` **or**
- `DEBUG` containing the word `dile` (e.g., `DEBUG=dile`)

Example:

```bash
DILE_DEBUG=1 dile g-component ui/my-widget
```

---

## Update notifications

This CLI checks npm occasionally and prints a message if a newer version is available.

Disable it by setting one of these environment variables:

- `DILE_DISABLE_UPDATE_CHECK=1`
- `NO_UPDATE_NOTIFIER=1`

***

## Commands

To see general help:

```bash
dile --help
```

For command help:

```bash
dile g-form --help
```

### `g-component <path>`

Generates a generic component.

- Output: `${componentsBase}/<subpath>/<name>.js`
- Options:
  - `--force`: overwrites if it exists

Example:

```bash
dile g-component ui/multiple-select
```

### `g-form <path>`

Generates a form component.

- Output: `${componentsBase}/<subpath>/<name>.js`
- Options:
  - `-i, --input`: includes example with `<dile-input>`
  - `-c, --checkbox`: includes example with `<dile-checkbox>`
  - `-s, --select`: includes example with `<dile-select>`
  - `-r, --radio`: includes example with `<dile-radio-group>`
  - `-t, --textarea`: includes example with `<dile-textarea>`
  - `--force`: overwrites if it exists

Example:

```bash
dile g-form forms/invoice-form -i -t
```

### `g-item <path>`

Generates an "item" component (typically for lists).

- Output: `${componentsBase}/<subpath>/<name>.js`
- Options:
  - `--force`

Example:

```bash
dile g-item country/country-item
```

### `g-detail <path>`

Generates a "detail" component (entity detail).

- Output: `${componentsBase}/<subpath>/<name>.js`
- Options:
  - `--force`

Example:

```bash
dile g-detail country/country-detail
```

### `g-action <path>`

Generates an "action" component.

- Output: `${componentsBase}/<subpath>/<name>.js`
- Options:
  - `-i, --input`
  - `-c, --checkbox`
  - `-s, --select`
  - `-r, --radio`
  - `-t, --textarea`
  - `--force`

Example:

```bash
dile g-action actions/demo-change-name-action -i
```

### `g-resource-config <resource>`

Generates a resource configuration module for CRUD.

- Output: `${resourcesBase}/<subpath>/<resourceCamel>Config.js`
  - `resourceCamel` is the passed resource converted to *camelCase*.
- Options:
  - `--endpoint <url>`: resource endpoint (default: `https://example.com/api/<resource-kebab>`)
  - `--item-component <tag>`: item component tag (e.g., `user-item`)
  - `--insert-component <tag>`: insert form tag
  - `--update-component <tag>`: update form tag
  - `--detail-component <tag>`: detail component tag
  - `--force`

**Auto-import of components (if they exist)**

If you provide `--item-component`, `--insert-component`, etc., the CLI attempts to locate the component file to generate the `import` automatically. For each tag, it searches (in this order):

1. `${componentsBase}/<subpath>/<tag>.js`
2. `${componentsBase}/<resource>/<tag>.js`
3. `${componentsBase}/<tag>.js`

- You can pass the tag with or without `.js`.
- If it doesn't find it, it omits the import (and in debug mode shows which paths it tried).

Example:

```bash
dile g-resource-config country \
  --endpoint https://example.com/api/countries \
  --item-component country-item \
  --detail-component country-detail \
  --insert-component country-form \
  --update-component country-form
```

### `g-crud <path>`

Generates a CRUD component connected to a resource config.

- Output: `${componentsBase}/<subpath>/<name>.js`
- Options:
  - `--entity <name>`: entity/resource name (optional)
  - `--force`

**How `entity` is deduced if `--entity` is not passed:**

1. If `<path>` has a subpath, uses the first segment of the subpath.
2. If the name ends in `-crud`, removes that suffix.
3. Otherwise, uses the name itself.

**Requirement:** the config must exist at:

- `${resourcesBase}/${entityCamel}Config.js`

If it doesn't exist, the command fails with a message indicating to generate it with `dile g-resource-config <entity>`.

Example:

```bash
# assumes it exists: src/resources/countryConfig.js
# (or the equivalent path according to your config)
dile g-crud country/country-crud
```

### `g-single <path>`

Generates a "single" CRUD component connected to a resource config.

- Output: `${componentsBase}/<subpath>/<name>.js`
- Options:
  - `--entity <name>`
  - `--force`

The `entity` deduction is analogous to `g-crud` (also supports `-single` suffix).

Example:

```bash
# assumes it exists: src/resources/countryConfig.js
dile g-single country/country-single
```

### `g-entity <entity>`

Generates the complete *scaffold* for an entity:

- Form
- Item
- Detail
- Resource config
- CRUD
- Single

Restrictions:

- `<entity>` must be a simple name (cannot include `/`).
- Internally normalized to *kebab-case*.

Options:

- `--endpoint <url>`: endpoint for the resource config
- `-i, --input`, `-c, --checkbox`, `-s, --select`, `-r, --radio`, `-t, --textarea`: examples inside the form
- `--force`

**Files it generates (by default):**

In components (`componentsBase`):

- `<entity>/<entity>-form.js`
- `<entity>/<entity>-item.js`
- `<entity>/<entity>-detail.js`
- `<entity>/<entity>-crud.js`
- `<entity>/<entity>-single.js`

In resources (`resourcesBase`):

- `<entityCamel>Config.js`

Example:

```bash
dile g-entity country \
  --endpoint https://example.com/api/countries \
  -i -t
```

***

## Exit codes

- If you try to write an existing file without `--force`, the CLI exits with `process.exitCode = 1`.

***

## License

MIT