---
title: g-entity
layout: layout.html
tags: commands
---


# `g-entity <entity>`

Generates the complete *scaffold* for an entity:

- Form
- Item
- Detail
- Resource config
- CRUD
- Single

## Restrictions

- `<entity>` must be a simple name (cannot include `/`).
- Internally normalized to *kebab-case*.

## Options

- `--endpoint <url>`: endpoint for the resource config
- `-i, --input`, `-c, --checkbox`, `-s, --select`, `-r, --radio`, `-t, --textarea`: examples inside the form
- `--force`

## Files it generates (by default)

In components (`componentsBase`):

- `<entity>/<entity>-form.js`
- `<entity>/<entity>-item.js`
- `<entity>/<entity>-detail.js`
- `<entity>/<entity>-crud.js`
- `<entity>/<entity>-single.js`

In resources (`resourcesBase`):

- `<entityCamel>Config.js`

## Component Prefix

If a `componentPrefix` is configured in your `dile.config.js`, all generated components will include this prefix:

```bash
# With componentPrefix: 'my-app' in configuration
dile g-entity user --endpoint https://example.com/api/users -i

# Generates:
# - src/components/user/my-app-user-form.js
# - src/components/user/my-app-user-item.js
# - src/components/user/my-app-user-detail.js
# - src/components/user/my-app-user-crud.js
# - src/components/user/my-app-user-single.js
# - src/resources/userConfig.js
```

## Example

Without prefix:
```bash
dile g-entity country \
  --endpoint https://example.com/api/countries \
  -i -t
```

With prefix configured (`componentPrefix: 'dile'`):
```bash
dile g-entity country \
  --endpoint https://example.com/api/countries \
  -i -t
# Generates all components prefixed with 'dile-country-*'
```
