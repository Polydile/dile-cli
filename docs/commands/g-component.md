---
title: g-component
layout: layout.html
tags: commands
---

# `g-component <path>`

Generates a generic component.

## Output

- `${componentsBase}/<subpath>/<name>.js`

## Options

- `--force`: Overwrite if exists

## Component Prefix

If a `componentPrefix` is configured in your `dile.config.js`, the component name will include this prefix:

```bash
# With componentPrefix: 'my-app' in configuration
dile g-component ui/button

# Generates file: src/components/ui/my-app-button.js
# With:
# - Component tag: <my-app-button></my-app-button>
# - Class name: MyAppButton
# - customElements.define('my-app-button', MyAppButton)
```

## Example

Without prefix:
```bash
dile g-component ui/multiple-select
```

With prefix configured (`componentPrefix: 'dile'`):
```bash
dile g-component ui/multiple-select
# Generates: src/components/ui/dile-multiple-select.js
```
