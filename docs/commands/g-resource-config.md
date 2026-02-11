---
title: g-resource-config
layout: layout.html
tags: commands
---


# `g-resource-config <resource>`

Generates a resource configuration module for CRUD.

## Output

- `${resourcesBase}/<subpath>/<resourceCamel>Config.js`
  - `resourceCamel` is the passed resource converted to *camelCase*.

## Options

- `--endpoint <url>`: resource endpoint (default: `https://example.com/api/<resource-kebab>`)
- `--item-component <tag>`: item component tag (e.g. `user-item`)
- `--insert-component <tag>`: insert form tag
- `--update-component <tag>`: update form tag
- `--detail-component <tag>`: detail component tag
- `--force`

## Auto-import of components (if they exist)

If you provide `--item-component`, `--insert-component`, etc., the CLI attempts to locate the component file to generate the `import` automatically. For each tag it searches (in this order):

1. `${componentsBase}/<subpath>/<tag>.js`
2. `${componentsBase}/<resource>/<tag>.js`
3. `${componentsBase}/<tag>.js`

Notes:

- You can pass the tag with or without `.js`.
- If it doesn't find it, it omits the import (and in debug mode shows which paths it tried).

## Example

```bash
dile g-resource-config country \
  --endpoint https://example.com/api/countries \
  --item-component country-item \
  --detail-component country-detail \
  --insert-component country-form \
  --update-component country-form
```
