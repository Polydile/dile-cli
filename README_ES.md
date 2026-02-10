# @dile/cli

CLI para generar *scaffolds* de componentes Dile (Web Components) a partir de plantillas Handlebars.

- Binario: `dile`
- Plantillas: `templates/*.hbs`
- Salidas por defecto:
  - Componentes: `src/components`
  - Recursos/configs: `src/resources`

> Nota: este CLI escribe archivos `.js` y crea carpetas si no existen.

---

## Instalación

### Uso global

```bash
npm i -g @dile/cli
# o
pnpm add -g @dile/cli
```

### Uso sin instalar (npx)

```bash
npx --package @dile/cli dile --help
```

### Desarrollo local (repo)

```bash
npm install
npm link
# ahora puedes usar:
dile --help
```

---

## Configuración

El CLI busca configuración con `cosmiconfig` en el directorio actual (`process.cwd()`), en este orden:

- `dile.config.js`
- `dile.config.cjs`
- `dile.config.mjs`
- `dile.config.json`
- `package.json`

### Rutas base

Puedes configurar las rutas base de salida de dos formas:

**1) Forma recomendada (objeto con `basePath`)**

```js
// dile.config.js
export default {
  components: { basePath: 'src/components' },
  resources: { basePath: 'src/resources' },
};
```

**2) Forma corta (string)**

```js
// dile.config.js
export default {
  components: 'src/components',
  resources: 'src/resources',
};
```

**En `package.json`**

```json
{
  "dile": {
    "components": { "basePath": "src/components" },
    "resources": { "basePath": "src/resources" }
  }
}
```

Si no hay configuración, los valores por defecto son:

- `componentsBase = "src/components"`
- `resourcesBase = "src/resources"`

---

## Convenciones y validaciones

- Los argumentos tipo `<path>` aceptan subcarpetas usando `/` (se normaliza también `\` → `/`).
- No se permiten segmentos `.` o `..` en el path.
- Por defecto, si el archivo existe, el comando falla con error.
- Con `--force` se sobreescribe el archivo existente.

---

## Depuración

Activa logs de depuración con:

- `DILE_DEBUG=1` **o**
- `DEBUG` conteniendo la palabra `dile` (por ejemplo `DEBUG=dile`)

Ejemplo:

```bash
DILE_DEBUG=1 dile g-component ui/my-widget
```

---

## Aviso de actualizaciones

Este CLI consulta npm ocasionalmente y muestra un mensaje si hay una versión más nueva disponible.

Puedes desactivarlo definiendo una de estas variables de entorno:

- `DILE_DISABLE_UPDATE_CHECK=1`
- `NO_UPDATE_NOTIFIER=1`

---

## Comandos

Para ver ayuda general:

```bash
dile --help
```

Para ayuda de un comando:

```bash
dile g-form --help
```

### `g-component <path>`

Genera un componente genérico.

- Output: `${componentsBase}/<subpath>/<name>.js`
- Opciones:
  - `--force`: sobreescribe si existe

Ejemplo:

```bash
dile g-component ui/multiple-select
```

### `g-form <path>`

Genera un componente de formulario.

- Output: `${componentsBase}/<subpath>/<name>.js`
- Opciones:
  - `-i, --input`: incluye ejemplo con `<dile-input>`
  - `-c, --checkbox`: incluye ejemplo con `<dile-checkbox>`
  - `-s, --select`: incluye ejemplo con `<dile-select>`
  - `-r, --radio`: incluye ejemplo con `<dile-radio-group>`
  - `-t, --textarea`: incluye ejemplo con `<dile-textarea>`
  - `--force`: sobreescribe si existe

Ejemplo:

```bash
dile g-form forms/invoice-form -i -t
```

### `g-item <path>`

Genera un componente “item” (normalmente para listas).

- Output: `${componentsBase}/<subpath>/<name>.js`
- Opciones:
  - `--force`

Ejemplo:

```bash
dile g-item country/country-item
```

### `g-detail <path>`

Genera un componente “detail” (detalle de una entidad).

- Output: `${componentsBase}/<subpath>/<name>.js`
- Opciones:
  - `--force`

Ejemplo:

```bash
dile g-detail country/country-detail
```

### `g-action <path>`

Genera un componente “action”.

- Output: `${componentsBase}/<subpath>/<name>.js`
- Opciones:
  - `-i, --input`
  - `-c, --checkbox`
  - `-s, --select`
  - `-r, --radio`
  - `-t, --textarea`
  - `--force`

Ejemplo:

```bash
dile g-action actions/demo-change-name-action -i
```

### `g-resource-config <resource>`

Genera un módulo de configuración de recurso para CRUD.

- Output: `${resourcesBase}/<subpath>/<resourceCamel>Config.js`
  - `resourceCamel` es el recurso pasado convertido a *camelCase*.
- Opciones:
  - `--endpoint <url>`: endpoint del recurso (por defecto: `https://example.com/api/<resource-kebab>`)
  - `--item-component <tag>`: tag del componente item (por ejemplo `user-item`)
  - `--insert-component <tag>`: tag del form de inserción
  - `--update-component <tag>`: tag del form de edición
  - `--detail-component <tag>`: tag del componente detail
  - `--force`

**Auto-import de componentes (si existen)**

Si proporcionas `--item-component`, `--insert-component`, etc., el CLI intenta localizar el archivo del componente para generar el `import` automáticamente. Para cada tag busca (en este orden):

1. `${componentsBase}/<subpath>/<tag>.js`
2. `${componentsBase}/<resource>/<tag>.js`
3. `${componentsBase}/<tag>.js`

- Puedes pasar el tag con o sin `.js`.
- Si no lo encuentra, omite el import (y en modo debug muestra qué rutas probó).

Ejemplo:

```bash
dile g-resource-config country \
  --endpoint https://example.com/api/countries \
  --item-component country-item \
  --detail-component country-detail \
  --insert-component country-form \
  --update-component country-form
```

### `g-crud <path>`

Genera un componente CRUD conectado a un resource config.

- Output: `${componentsBase}/<subpath>/<name>.js`
- Opciones:
  - `--entity <name>`: nombre de entidad/recurso (opcional)
  - `--force`

**Cómo se deduce `entity` si no se pasa `--entity`:**

1. Si `<path>` tiene subpath, usa el primer segmento del subpath.
2. Si el nombre termina en `-crud`, elimina ese sufijo.
3. Si no, usa el propio nombre.

**Requisito:** debe existir el config en:

- `${resourcesBase}/${entityCamel}Config.js`

Si no existe, el comando falla con un mensaje indicando que lo generes con `dile g-resource-config <entity>`.

Ejemplo:

```bash
# asume que existe: src/resources/countryConfig.js
# (o la ruta equivalente según tu config)
dile g-crud country/country-crud
```

### `g-single <path>`

Genera un componente CRUD “single” conectado a un resource config.

- Output: `${componentsBase}/<subpath>/<name>.js`
- Opciones:
  - `--entity <name>`
  - `--force`

La deducción de `entity` es análoga a `g-crud` (también soporta sufijo `-single`).

Ejemplo:

```bash
# asume que existe: src/resources/countryConfig.js
dile g-single country/country-single
```

### `g-entity <entity>`

Genera el *scaffold* completo de una entidad:

- Form
- Item
- Detail
- Resource config
- CRUD
- Single

Restricciones:

- `<entity>` debe ser un nombre simple (no puede incluir `/`).
- Internamente se normaliza a *kebab-case*.

Opciones:

- `--endpoint <url>`: endpoint para el resource config
- `-i, --input`, `-c, --checkbox`, `-s, --select`, `-r, --radio`, `-t, --textarea`: ejemplos dentro del form
- `--force`

**Archivos que genera (por defecto):**

En componentes (`componentsBase`):

- `<entity>/<entity>-form.js`
- `<entity>/<entity>-item.js`
- `<entity>/<entity>-detail.js`
- `<entity>/<entity>-crud.js`
- `<entity>/<entity>-single.js`

En recursos (`resourcesBase`):

- `<entityCamel>Config.js`

Ejemplo:

```bash
dile g-entity country \
  --endpoint https://example.com/api/countries \
  -i -t
```

---

## Códigos de salida

- Si intentas escribir un archivo existente sin `--force`, el CLI termina con `process.exitCode = 1`.

---

## Licencia

MIT
