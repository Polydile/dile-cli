---
title: g-form
layout: layout.html
tags: commands
---


# `g-form <path>`

Generates a form component.

## Output

- `${componentsBase}/<subpath>/<name>.js`

## Options

- `-i, --input`: includes example with `<dile-input>`
- `-c, --checkbox`: includes example with `<dile-checkbox>`
- `-s, --select`: includes example with `<dile-select>`
- `-r, --radio`: includes example with `<dile-radio-group>`
- `-t, --textarea`: includes example with `<dile-textarea>`
- `--belongs <name>`: adds relation support (`belongsTo` and `relationId` properties) and auto-creates a `<dile-input>` with `name/id` set to `<name>`; intended for `<dile-crud-insert>`
- `--force`: overwrites if the file exists

## Component Prefix

If a `componentPrefix` is configured in your `dile.config.js`, the component name will include this prefix:

```bash
# With componentPrefix: 'my-app' in configuration
dile g-form forms/user-form

# Generates file: src/components/forms/my-app-user-form.js
# With:
# - Component tag: <my-app-user-form></my-app-user-form>
# - Class name: MyAppUserForm
# - customElements.define('my-app-user-form', MyAppUserForm)
```

## Example

Without prefix:
```bash
dile g-form forms/invoice-form -i -t
```

With prefix configured (`componentPrefix: 'dile'`):
```bash
dile g-form forms/invoice-form -i -t
# Generates: src/components/forms/dile-invoice-form.js
```

Example with `--belongs`:

```bash
dile g-form forms/invoice-form --belongs customerId -i
```

Notes:

- When using `--belongs <name>`, the generated component includes `belongsTo` and `relationId`, and in `firstUpdated()` it assigns `relationId` to the field with `id="<name>"` when `belongsTo === "<name>"`.
- It also generates a `<dile-input ... id="<name>">` for that field. If you also use `-i/--input` and `--belongs input`, the `<dile-input id="input">` is not duplicated.
