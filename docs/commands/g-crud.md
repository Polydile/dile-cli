---
title: g-crud
layout: layout.html
tags: commands
---

# `g-crud <path>`

Generates a CRUD component connected to a resource config.

## Output

- `${componentsBase}/<subpath>/<name>.js`

## Options

- `--entity <name>`: nombre de entidad/recurso (opcional)
- `--force`

## How `entity` is deduced if `--entity` is not passed

1. Si `<path>` tiene subpath, usa el primer segmento del subpath.
2. Si el nombre termina en `-crud`, elimina ese sufijo.
3. Si no, usa el nombre tal cual.

## Requirement (config)

The config must exist at:

- `${resourcesBase}/${entityCamel}Config.js`

If it doesn't exist, the command fails with a message indicating to generate it with `dile g-resource-config <entity>`.

## Component Prefix

If a `componentPrefix` is configured in your `dile.config.js`, the component name will include this prefix:

```bash
# With componentPrefix: 'my-app' in configuration
dile g-crud users/user-crud

# Generates file: src/components/users/my-app-user-crud.js
# With component tag: <my-app-user-crud></my-app-user-crud>
```

## Example

Without prefix:
```bash
# assumes it exists: src/resources/countryConfig.js (or equivalent according to your config)
dile g-crud country/country-crud
```

With prefix configured (`componentPrefix: 'dile'`):
```bash
dile g-crud country/country-crud
# Generates: src/components/country/dile-country-crud.js
```
