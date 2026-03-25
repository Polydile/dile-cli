---
title: g-action
layout: layout.html
tags: commands
---

# `g-action <path>`

Generates an "action" component.

## Output

- `${componentsBase}/<subpath>/<name>.js`

## Options

- `-i, --input` - Include `<dile-input>` example
- `-c, --checkbox` - Include `<dile-checkbox>` example
- `-s, --select` - Include `<dile-select>` example
- `-r, --radio` - Include `<dile-radio-group>` example
- `-t, --textarea` - Include `<dile-textarea>` example
- `--force` - Overwrite if exists

## Component Prefix

If a `componentPrefix` is configured in your `dile.config.js`, the component name will include this prefix:

```bash
# With componentPrefix: 'my-app' in configuration
dile g-action actions/delete-action

# Generates file: src/components/actions/my-app-delete-action.js
# With:
# - Component tag: <my-app-delete-action></my-app-delete-action>
# - Class name: MyAppDeleteAction
# - customElements.define('my-app-delete-action', MyAppDeleteAction)
```

## Example

Without prefix:
```bash
dile g-action actions/demo-change-name-action -i
```

With prefix configured (`componentPrefix: 'dile'`):
```bash
dile g-action actions/demo-change-name-action -i
# Generates: src/components/actions/dile-demo-change-name-action.js
```
