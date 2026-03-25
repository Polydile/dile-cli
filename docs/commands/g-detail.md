---
title: g-detail
layout: layout.html
tags: commands
---

# `g-detail <path>`

Generates a "detail" component (entity detail).

## Output

- `${componentsBase}/<subpath>/<name>.js`

## Options

- `--force` - Overwrite if exists

## Component Prefix

If a `componentPrefix` is configured in your `dile.config.js`, the component name will include this prefix:

```bash
# With componentPrefix: 'my-app' in configuration
dile g-detail details/user-detail

# Generates file: src/components/details/my-app-user-detail.js
# With:
# - Component tag: <my-app-user-detail></my-app-user-detail>
# - Class name: MyAppUserDetail
# - customElements.define('my-app-user-detail', MyAppUserDetail)
```

## Example

Without prefix:
```bash
dile g-detail country/country-detail
```

With prefix configured (`componentPrefix: 'dile'`):
```bash
dile g-detail country/country-detail
# Generates: src/components/country/dile-country-detail.js
```
