---
title: Dile CLI
layout: layout.html
---

# Documentation (@dile/cli)

This is the CLI from the [Dile Components catalog](https://dile-components.com/), designed to quickly build the scaffolding for apps and components that require more configuration effort, especially those dedicated to creating [dynamic CRUDs](https://dile-components.com/crud/).

This directory contains the detailed CLI documentation.

## Before you start

Before you start using the CLI, you need to have some essential knowledge of frontend development. You should be familiar with HTML, CSS, and JavaScript. It’s also ideal to feel comfortable using the terminal and to have some understanding of frontend tools like [Vite](https://vite.dev/).

You will also need to have the Node.js platform installed on your computer.

## Installation

It is recommended to install the CLI globally so that it is available in any folder of your command-line terminal.

To install Dile CLI run this command in a terminal window: 

```bash
npm i -g @dile/cli
```

> You'll need [Node.js](https://nodejs.org) installed on your system, version 18+ or higher, for this CLI to work.

## Guides

You can use the CLI both to develop applications from scratch and to add functionality to any project you are currently working on. Since the components it creates are based on Web Components, you can use them in traditional websites, Vanilla JavaScript projects, or applications built with frameworks or libraries such as Angular, React, Vue, and others.

### Creating applications

With Dile CLI you can create applications from scratch, generating the entire initial structure of a new project based on Web Components and Lit, as a starter kit.

The application will already include a series of essential functionality, such as a routing system, components to show feedback to users, components to manage user authentication, etc.

You can find all the details about generating new applications in the [`create-app` command](/commands/create-app/) page.

### Creating components

There is a whole series of commands for creating components that you can then integrate into any application or website you are building.

- [Commands index](/commands/)
- Component generators:
  - [`g-component`](/commands/g-component/)
  - [`g-form`](/commands/g-form/)
  - [`g-item`](/commands/g-item/)
  - [`g-detail`](/commands/g-detail/)
  - [`g-action`](/commands/g-action/)
  - [`g-resource-config`](/commands/g-resource-config/)
  - [`g-crud`](/commands/g-crud/)
  - [`g-single`](/commands/g-single/)
  - [`g-entity`](/commands/g-entity/)

### Other guides

- [Configuration](/configuration/)
- [Debugging](/debugging/)
- [Update notifications](/update-notifications/)
- [Exit codes](/exit-codes/)

