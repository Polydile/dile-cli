---
title: g-item
layout: layout.html
tags: commands
---

# `g-item <path>`

Generates an "item" component (typically for lists).

## Output

- `${componentsBase}/<subpath>/<name>.js`

## Options

- `--force` - Overwrite if exists

## Component Prefix

If a `componentPrefix` is configured in your `dile.config.js`, the component name will include this prefix:

```bash
# With componentPrefix: 'my-app' in configuration
dile g-item items/user-item

# Generates file: src/components/items/my-app-user-item.js
# With:
# - Component tag: <my-app-user-item></my-app-user-item>
# - Class name: MyAppUserItem
# - customElements.define('my-app-user-item', MyAppUserItem)
```

## Example

Without prefix:
```bash
dile g-item country/country-item
```

With prefix configured (`componentPrefix: 'dile'`):
```bash
dile g-item country/country-item
# Generates: src/components/country/dile-country-item.js
```
