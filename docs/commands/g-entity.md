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

## Example

```bash
dile g-entity country \
  --endpoint https://example.com/api/countries \
  -i -t
```
