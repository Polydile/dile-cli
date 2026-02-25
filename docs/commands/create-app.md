---
layout: layout.html
title: create-app
description: Create a new Dile app
permalink: /commands/create-app/
tags: commands
---

# create-app Command

Create a new Dile app with all necessary scaffolding and configuration files.

## Usage

```bash
dile create-app [options]
```

## Description

The `create-app` command generates a complete new Dile application with:

- A pre-configured Vite setup
- Package.json with Dile dependencies
- HTML entry point with your custom component prefix
- Dile configuration file
- Complete directory structure for development
- Git ignore rules
- Environment example file

The command will prompt you for the app name and component prefix. Both have sensible defaults.

## Interactive Prompts

### App name
**Default:** `Dile App`

The name of your application. This will be used as the folder name (normalized to kebab-case) and displayed in the HTML title.

### Component prefix
**Default:** `dile`

The prefix for your components. This will be automatically normalized to kebab-case. For example, if you enter `MyApp`, it will be converted to `my-app`.

## Examples

### Basic usage (using defaults)

```bash
dile create-app
```

This will create a folder named `dile-app` with:
- App name: "Dile App"
- Component prefix: "dile"

### Custom app name and prefix

```bash
dile create-app
```

Then when prompted:
```
App name (Dile App): My Store App
Component prefix (dile): mystore
```

This will create a folder named `my-store-app` with:
- App name: "My Store App"
- Component prefix: "mystore" (normalized to `mystore`)

### With camelCase prefix

```bash
dile create-app
```

Then when prompted:
```
App name (Dile App): My App
Component prefix (dile): MyApp
```

The prefix will be automatically converted to kebab-case: `my-app`

This will create components like `<my-app-button>`, `<my-app-form>`, etc.

## Output

After running the command, you will see:

1. A list of all generated files
2. Confirmation message with the app folder name
3. Instructions for the next steps:

```
  cd my-app
  npm install
```

### --force
Overwrite the app folder if it already exists.

```bash
dile create-app --force
```

## Output Structure

The created app directory will have the following structure:

```
my-app/
├── .env
├── .env.example
├── .gitignore
├── dile.config.js
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── favicon.png
└── src/
    ├── assets/
    ├── css/
    └── js/
```

> Note: The `.env` file is automatically created as a copy of `.env.example` so you can start configuring your environment variables right away.

## Next Steps

After creating your app:

1. Navigate to the app folder:
   ```bash
   cd my-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Generated Files

### dile.config.js
Configuration file that defines where your components and resources will be located.

### package.json
Pre-configured with necessary Dile dependencies and scripts.

### index.html
Entry point with your custom component prefix in the root app component.

### vite.config.js
Vite configuration optimized for Web Components development.

## Related Commands

- [config-init](/commands/config-init/) - Initialize configuration in an existing project
- [g-component](/commands/g-component/) - Generate individual components
- [g-entity](/commands/g-entity/) - Generate complete entity scaffolds
