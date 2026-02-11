---
title: Dile CLI Debugging
layout: layout.html
---

# Debugging

Enable debug logs with:

- `DILE_DEBUG=1` **or**
- `DEBUG` containing the word `dile` (e.g. `DEBUG=dile`)

Example:

```bash
DILE_DEBUG=1 dile g-component ui/my-widget
```

For commands that perform automatic lookups (for example `g-resource-config` when trying to locate components for auto-import), debug mode shows which paths were tried.
