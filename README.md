# @dile/cli

CLI to generate Dile component *scaffolds* (Web Components) from Handlebars templates.

- Binary: `dile`
- Templates: `templates/*.hbs`
- Default outputs:
  - Components: `src/components`
  - Resources/configs: `src/resources`

> Note: this CLI writes `.js` files and creates folders if they do not exist.

***

## Installation

### Global use

```bash
npm i -g @dile/cli
# or
pnpm add -g @dile/cli
```

### Use without installing (npx)

```bash
npx --package @dile/cli dile --help
```

### Local development (repo)

```bash
npm install
npm link
# now you can use:
dile --help
```

***

## Quick start

Show help:

```bash
dile --help
```

Create a new app:

```bash
dile create-app
```

Generate a component:

```bash
dile g-component ui/my-widget
```

***

## Documentation

All detailed docs live in `docs/`:

- [Docs index](https://cli.dile-components.com/)
- [**Commands**](https://cli.dile-components.com/commands/)
- [Configuration](https://cli.dile-components.com/configuration/)
- [Debugging](https://cli.dile-components.com/debugging/)

***

## License

MIT