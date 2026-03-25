---
title: g-single
layout: layout.html
tags: commands
---

# `g-single <path>`

Generates a "single" CRUD component connected to a resource config.

## Output

- `${componentsBase}/<subpath>/<name>.js`

## Options

- `--entity <name>` - Entity/resource name (optional)
- `--force` - Overwrite if exists

## Entity

The `entity` deduction is analogous to `g-crud` (also supports the `-single` suffix).

## Component Prefix

If a `componentPrefix` is configured in your `dile.config.js`, the component name will include this prefix:

```bash
# With componentPrefix: 'my-app' in configuration
dile g-single users/user-single

# Generates file: src/components/users/my-app-user-single.js
# With component tag: <my-app-user-single></my-app-user-single>
```

## Example

Without prefix:
```bash
# assumes it exists: src/resources/countryConfig.js (or equivalent according to your config)
dile g-single country/country-single
```

With prefix configured (`componentPrefix: 'dile'`):
```bash
dile g-single country/country-single
# Generates: src/components/country/dile-country-single.js
```
