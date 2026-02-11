# `g-single <path>`

Generates a "single" CRUD component connected to a resource config.

## Output

- `${componentsBase}/<subpath>/<name>.js`

## Options

- `--entity <name>`
- `--force`

## Entity

The `entity` deduction is analogous to `g-crud` (also supports the `-single` suffix).

## Example

```bash
# assumes it exists: src/resources/countryConfig.js (or equivalent according to your config)
dile g-single country/country-single
```
