---
name: dile-cli-help
description: 'Learn and use dile-cli commands. Help with scaffolding web components, CRUD applications, forms, items, details, resource configs, and entities using the Dile Component Catalog. Use when: generating components, creating CRUD components, building web component applications, setting up Dile projects, understanding dile-cli documentation.'
argument-hint: 'dile-cli command help'
user-invocable: true
---

# dile-cli Help & Reference

Master the Dile CLI for scaffolding Web Components applications. This skill provides comprehensive guidance on all dile-cli commands and workflows for generating components, CRUD structures, and complete applications using the Dile Component Catalog.

## When to Use This Skill

Use this skill when you:

- **Need help with dile-cli commands** — Understanding what a command does or how to use it
- **Generate components** — Creating web components (basic, forms, items, details, actions)
- **Build CRUD applications** — Scaffolding complete CRUD workflows with components and resource configs
- **Set up Dile projects** — Initializing configuration files and creating new applications
- **Generate full entities** — Creating complete entity scaffolds with forms, items, details, and CRUD components
- **Configure resources** — Setting up resource configs for API endpoints
- **Learn best practices** — Understanding the structure and patterns used by dile-cli

## Available Commands

### Application Setup

#### `create-app`
Creates a complete new Dile web application with all necessary configurations and scaffolding.

```bash
dile create-app [options]
```

**Options:**
- `--force` - Overwrite existing app folder

**When to use:**
- Starting a new Dile-based project from scratch
- Setting up a complete application structure with Vite and Dile components

---

#### `config-init`
Initialize a dile configuration file in your project. Supports multiple format options.

```bash
dile config-init [options]
```

**Options:**
- `--cjs` - Generate CommonJS format (dile.config.cjs)
- `--mjs` - Generate ES Module format (dile.config.mjs)
- `--json` - Generate JSON format (dile.config.json)
- `--prefix <prefix>` - Component prefix (e.g., dile)
- `--force` - Overwrite existing configuration file

**When to use:**
- Setting up Dile configuration for an existing project
- Changing component prefixes or configuration formats

---

### Component Generation

#### `g-component`
Generate a basic web component with boilerplate code.

```bash
dile g-component <path> [options]
```

**Arguments:**
- `<path>` - Component path/name, e.g., `ui/multiple-select`

**Options:**
- `--force` - Overwrite existing files

**When to use:**
- Creating standalone web components
- Building UI component libraries
- Generating reusable components outside of CRUD workflows

---

#### `g-form`
Generate a form component for data entry and submission.

```bash
dile g-form <path> [options]
```

**Arguments:**
- `<path>` - Component path/name, e.g., `forms/invoice-form`

**Options:**
- `-i, --input` - Include `<dile-input>` example
- `-c, --checkbox` - Include `<dile-checkbox>` example
- `-s, --select` - Include `<dile-select>` example
- `-r, --radio` - Include `<dile-radio-group>` example
- `-t, --textarea` - Include `<dile-textarea>` example
- `--belongs <name>` - Add belongsTo properties for relations
- `--force` - Overwrite existing files

**When to use:**
- Creating insert/update forms for CRUD operations
- Building standalone form components with pre-selected field types
- Generating forms with form field examples

**Example:**
```bash
dile g-form forms/user-form --input --checkbox --select
```

---

#### `g-item`
Generate an item component for displaying data records in lists.

```bash
dile g-item <path> [options]
```

**Arguments:**
- `<path>` - Component path/name, e.g., `items/user-item`

**Options:**
- `--force` - Overwrite existing files

**When to use:**
- Creating components to display individual items in lists
- Building list item templates for CRUD displays
- Designing reusable item presentation components

---

#### `g-detail`
Generate a detail component for displaying complete record information.

```bash
dile g-detail <path> [options]
```

**Arguments:**
- `<path>` - Component path/name, e.g., `details/user-detail`

**Options:**
- `--force` - Overwrite existing files

**When to use:**
- Creating components for showing full record details
- Building detailed view pages in CRUD applications
- Displaying comprehensive information from data records

---

#### `g-action`
Generate an action component for performing operations on items.

```bash
dile g-action <path> [options]
```

**Arguments:**
- `<path>` - Component path/name, e.g., `actions/demo-change-name-action`

**Options:**
- `-i, --input` - Include `<dile-input>` example
- `-c, --checkbox` - Include `<dile-checkbox>` example
- `-s, --select` - Include `<dile-select>` example
- `-r, --radio` - Include `<dile-radio-group>` example
- `-t, --textarea` - Include `<dile-textarea>` example
- `--force` - Overwrite existing files

**When to use:**
- Creating components for specific actions (edit, delete, custom operations)
- Building interactive components that modify data
- Implementing business logic components

---

### CRUD Components

#### `g-crud`
Generate a complete CRUD component wired to a resource configuration.

```bash
dile g-crud <path> [options]
```

**Arguments:**
- `<path>` - Component path/name, e.g., `country/country-crud`

**Options:**
- `--entity <name>` - Resource entity name (optional)
- `--force` - Overwrite existing files

**When to use:**
- Creating full CRUD interfaces with list, insert, update, and delete functionality
- Building complete data management components
- Integrating with resource configs for API communication

---

#### `g-single`
Generate a CRUD single component for managing a single record.

```bash
dile g-single <path> [options]
```

**Arguments:**
- `<path>` - Component path/name, e.g., `country/country-single`

**Options:**
- `--entity <name>` - Resource entity name (optional)
- `--force` - Overwrite existing files

**When to use:**
- Creating components for single record management (like user profile)
- Building forms connected to specific resource endpoints
- Creating edit/update interfaces for individual records

---

### Resource Configuration

#### `g-resource-config`
Generate a resource configuration module for CRUD operations connected to an API.

```bash
dile g-resource-config <resource> [options]
```

**Arguments:**
- `<resource>` - Resource name, e.g., `User`

**Options:**
- `--endpoint <url>` - Endpoint URL for the resource
- `--item-component <tag>` - Item component tag, e.g., `user-item`
- `--insert-component <tag>` - Insert form component tag, e.g., `insert-user-form`
- `--update-component <tag>` - Update form component tag, e.g., `update-user-form`
- `--detail-component <tag>` - Detail component tag, e.g., `user-detail`
- `--force` - Overwrite existing files

**When to use:**
- Setting up API connection configuration for CRUD components
- Defining resource endpoints and associated components
- Creating the bridge between components and backend API

**Example:**
```bash
dile g-resource-config User --endpoint https://api.example.com/users --item-component user-item --insert-component user-insert-form --update-component user-update-form --detail-component user-detail
```

---

### Full Entity Scaffolding

#### `g-entity`
Generate a complete entity scaffold including form, item, detail, resource-config, CRUD, and single components in one command.

```bash
dile g-entity <entity> [options]
```

**Arguments:**
- `<entity>` - Entity name, e.g., `country`

**Options:**
- `--endpoint <url>` - Endpoint URL for the resource config
- `-i, --input` - Include `<dile-input>` example in the form
- `-c, --checkbox` - Include `<dile-checkbox>` example in the form
- `-s, --select` - Include `<dile-select>` example in the form
- `-r, --radio` - Include `<dile-radio-group>` example in the form
- `-t, --textarea` - Include `<dile-textarea>` example in the form
- `--force` - Overwrite existing files

**When to use:**
- Creating complete CRUD workflows for an entity in one command
- Quick scaffolding of entities with associated components
- Building out entire feature modules with all necessary components

**Example:**
```bash
dile g-entity product --endpoint https://api.example.com/products --input --select
```

This generates:
- `product-form.js` (form component)
- `product-item.js` (item display component)
- `product-detail.js` (detail view component)
- `product-resource-config.js` (API configuration)
- `product-crud.js` (CRUD component)
- `product-single.js` (single record component)

---

## Common Workflows

### Workflow 1: Building a Complete CRUD Application
1. Start with `create-app` to set up your application
2. Use `g-entity` to scaffold your first entity with all components
3. Optional: `config-init` to customize your Dile configuration

### Workflow 2: Adding Entities to an Existing Project
1. Run `config-init` if not already configured
2. Use `g-entity` for each data entity you need to manage
3. Or manually create individual components with `g-form`, `g-item`, `g-detail`, etc.

### Workflow 3: Building Custom Components
1. Use `g-component` for standalone components
2. Use `g-form`, `g-item`, `g-detail` for specific purposes
3. Use `g-resource-config` to connect components to APIs

### Workflow 4: Creating a Resource-Connected CRUD
1. Generate your components individually or use `g-entity`
2. Generate resource-config with appropriate endpoint and component references
3. Use `g-crud` or `g-single` to create the final CRUD interface

---

## File Structure

After using dile-cli commands, you'll have a project structure like:

```
my-project/
├── dile.config.mjs           # Configuration file
├── src/
│   ├── forms/
│   │   └── user-form.js
│   ├── items/
│   │   └── user-item.js
│   ├── details/
│   │   └── user-detail.js
│   ├── config/
│   │   └── user-resource-config.js
│   ├── pages/
│   │   └── users-page.js     # Contains CRUD or Single component
│   └── index.js
├── dile.config.mjs
└── package.json
```

---

## Tips & Best Practices

- **Start with `g-entity`** for complete scaffolding of new data types
- **Use `--force`** cautiously — it overwrites existing files
- **Entity names** should be singular (e.g., `user`, `product`, `invoice`)
- **Component paths** use kebab-case (e.g., `forms/user-form`)
- **Resource endpoints** should be complete API URLs
- **Component tags** in resource-config should match generated component names

---

## Additional Resources

- Learn more about [Dile Components](https://dile-components.com)
- Check the [Dile CLI Documentation](https://cli.dile-components.com)
- Check the [Dile Component Skill](https://dile-components.com/ai-skill/)
