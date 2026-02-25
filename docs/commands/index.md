---
title: Dile CLI Commands
layout: layout.html
---

# Commands

To see general help:

```bash
dile --help
```

For command help:

```bash
dile g-form --help
```

## Project Setup

The CLI can help you create a new project, generating the entire application structure with essential general-use components.

- [`create-app`](/commands/create-app/)

## Configuration

There are some configuration options so you can adapt the CLI to your project's needs. Through this command, you can automatically create the configuration file with default options that you can then override.

- [`config-init`](/commands/config-init/)

## Generators

These are the component generators available in the CLI, specifically designed for creating [CRUD components](https://dile-components.com/crud/) that require detailed configurations.

- [`g-component <path>`](/commands/g-component/)
- [`g-form <path>`](/commands/g-form/)
- [`g-item <path>`](/commands/g-item/)
- [`g-detail <path>`](/commands/g-detail/)
- [`g-action <path>`](/commands/g-action/)
- [`g-resource-config <resource>`](/commands/g-resource-config/)
- [`g-crud <path>`](/commands/g-crud/)
- [`g-single <path>`](/commands/g-single/)
- [`g-entity <entity>`](/commands/g-entity/)
