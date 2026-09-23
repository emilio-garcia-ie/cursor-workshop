---
step: 6
title: "MCP: conecta GitHub"
points: 25
module: "Building"
versions: ["short", "medium", "long"]
personas: ["developers", "ai-engineers", "forward-deployed"]
---

# Paso 6 — MCP: conecta GitHub (25 pts)

## Learn

MCP conecta Cursor con sistemas externos — navegadores, bases de datos, tickets,
APIs — mediante `mcp.json` con un envoltorio `mcpServers`[3][4]. Una conexión
**STDIO local** inicia un proceso con `type: "stdio"`, `command` y
`args`/`env` opcionales; una conexión **remota** usa una URL y el esquema de
autenticación del servidor[3]. La configuración, la autenticación y la
autorización son tres comprobaciones separadas: un archivo JSON válido no es
una conexión que funcione, y una conexión que funciona no es un permiso para
publicar. Una CLI puede ser más simple para una tarea única; sus comandos y
salidas aún consumen contexto. No prometas costo cero: la elección del modelo y
el plan determinan los cargos de uso[13].

## Implement

1. Lee `.cursor/mcp.example.json` primero. En tu checkout de alumno, crea
   `.cursor/mcp.json` con solo la conexión de GitHub que piensas usar. Cursor
   documenta el envoltorio y la interpolación de entorno[3]; verifica el
   endpoint del proveedor y los permisos del token antes de conectarte:

```json
{
  "mcpServers": {
    "github": {
      "url": "https://api.githubcopilot.com/mcp",
      "headers": { "Authorization": "Bearer ${env:GITHUB_TOKEN}" }
    }
  }
}
```

   Interpola los secretos desde el entorno (`${env:NAME}`), nunca los escribas
   en duro[3].
2. Autentícate desde Customize → MCP[6]; confirma que el estado muestre
   conectado.
3. Verifica: `Using the GitHub connection, show me the open pull requests on
   this repo.` Luego comprueba qué cuesta el servidor en contexto.
4. Prepara el borrador de PR para `HLN-101-export-options` a partir de
   `.cursor/skills/pr/SKILL.md`, usando solo afirmaciones verificadas. Haz
   push y abre el PR solo después de la aprobación separada del Paso 11.

### Minimal working example: local versus remoto

Para un servidor local, usa la forma STDIO explícita de abajo[3]. Este es el
starter de Playwright ya ilustrado en `.cursor/mcp.example.json`, no una
instrucción para instalarlo en el ejercicio de GitHub. Revisa y aprueba el
ejecutable/paquete por separado; el soporte del esquema no es una prueba de
conexión.

```json
{
  "mcpServers": {
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["@playwright/mcp", "--isolated"]
    }
  }
}
```

### Exercise kit

#### Starter code path

`hearthline-operator-console/.cursor/mcp.example.json`. Trabaja en tu checkout
de alumno; no copies los cuatro servidores ni ningún valor secreto al PR.

#### Expected diff

Una conexión local en `.cursor/mcp.json`, más una nota de verificación saneada
en el borrador de PR. Mantén las credenciales fuera de ambos. Comprueba
`git status --short` y `git diff -- .cursor/mcp.json` antes de compartir; un
archivo sin rastrear no aparecerá en ese diff, así que inspéctalo también
directamente.

#### Hints

- Empieza con `Using GitHub, list open PRs for OWNER/REPO. Read only; do not
  create, comment, merge, or push.` Reemplaza OWNER/REPO por tu fork.
- Si la variable de entorno no está presente, propórcionala a través de tu
  configuración aprobada de secretos; nunca le pidas al agente que la imprima.
  La interpolación es compatible en `url`, `headers`, `command`, `args` y
  `env`[3].
- Trata una llamada denegada como un problema de permisos por investigar, no
  como una invitación a ampliar el acceso. Registra el error saneado y
  detente.

#### Solution approach

Valida el JSON, abre Customize → MCP[6], comprueba la conexión y haz una
solicitud de solo lectura. Compara los números de PR devueltos con la lista de
PR de tu fork. Repite con el servidor desactivado: el agente debe informar que
la conexión no está disponible en lugar de inventar resultados. Registra el
comportamiento esperado y el observado por separado; no reclames que la
autenticación pasó a partir de una captura de un JSON válido.

#### Expected result

Tienes una lista real de PR de solo lectura para tu fork, incluida una lista
honestamente vacía, o un bloqueo de conexión/permiso claramente registrado, y
no se ha realizado ninguna operación de escritura.

[SCREENSHOT: Conexión MCP de Customize y resultado saneado de PR de solo lectura; sin token ni cabecera Authorization visible]

#### Stretch goal

Compara la misma tarea de solo lectura con tu flujo de trabajo aprobado con la
CLI de GitHub. Registra el esfuerzo de configuración y la calidad de la
evidencia, no un ahorro de tokens asumido.

### Common mistakes

- **Error 1:** Copiar un token al JSON. Usa la interpolación de entorno[3] e
  inspecciona el diff en staged en busca de credenciales accidentales.
- **Error 2:** Tratar la configuración de URL remota como un proceso STDIO.
  Mantén separadas las formas de transporte; el tipo STDIO explícito no es un
  requisito universal para cada transporte remoto[3].
- **Error 3:** Llamar a un servidor conectado un despliegue para el equipo.
  Verifica por separado el acceso y la instalación de cada usuario
  destinatario[28].

## Pro tips

- **Consejo 1:** Conecta un servidor a la vez para que un fallo tenga un solo
  responsable probable.
- **Consejo 2:** Mantén la primera solicitud de solo lectura y comprobable de
  forma independiente.

- Usa Customize → MCPs para activar y desactivar servidores; inspecciona los
  MCP Logs en el panel Output con `Cmd+Shift+U` en macOS o `Ctrl+Shift+U` en
  Windows/Linux[4].
- Define los tokens con grano fino; desactiva los servidores inactivos en
  lugar de borrarlos[3].
- Pregunta a tu administrador qué endpoints y operaciones están permitidos; no
  infieras una política universal de URL para el equipo gestionado a partir de
  una conexión local exitosa.

## Advanced

Las primeras integraciones que la mayoría de los equipos quieren: Git,
alojamiento, bases de datos (solo lectura), chat, tickets, APIs internas — con
alcance de proyecto en `.cursor/mcp.json`, secretos mediante interpolación de
entorno[3]. Los administradores del equipo pueden vincular los Team MCPs al
marketplace Default, pero solo vincularlos no los instala ni los activa para
todos[28]. MCP también admite recursos, prompts y MCP Apps interactivos; este
ejercicio solo necesita una llamada de herramienta de solo lectura, no otra
instalación de servidor[3].

## Quiz

#### Q1: ¿Cuáles son las dos formas de transporte para los servidores MCP?

- [ ] Público y privado
- [ ] Gratuito y de pago
- [x] STDIO local y URL remota
- [ ] Push y pull

**Explanation:** STDIO local usa type stdio con command y args opcionales; el remoto usa una URL y el esquema de autenticación del servidor.

#### Q2: ¿Dónde se configura la conexión de GitHub?

- [ ] .cursor/rules/mcp.json
- [x] .cursor/mcp.json con un envoltorio mcpServers
- [ ] package.json
- [ ] docs/tickets/HLN-101.md

**Explanation:** MCP se conecta mediante .cursor/mcp.json con un envoltorio mcpServers; la conexión de GitHub usa el endpoint documentado y la interpolación de entorno.

#### Q3: ¿Por qué el token debe interpolarse desde el entorno y no escribirse en duro?

- [ ] Porque JSON no puede contener cadenas
- [ ] Porque GitHub requiere una URL
- [x] Porque escribir en duro arriesga dejar una credencial en el repo y en el PR
- [ ] Porque la interpolación de entorno es más rápida

**Explanation:** Los secretos provienen del entorno con ${env:NAME} y nunca se escriben en duro, de modo que las credenciales se mantienen fuera de la configuración y del PR.

#### Q4: ¿Cuál es un error común contra el que advierte este paso?

- [ ] Mantener la primera solicitud de solo lectura
- [ ] Inspeccionar el git diff de mcp.json antes de compartir
- [ ] Tratar una llamada denegada como un problema de permisos
- [x] Copiar un token al archivo JSON

**Explanation:** Copiar un token al JSON es un error; usa la interpolación de entorno e inspecciona el diff en staged en busca de credenciales accidentales.

#### Q5: ¿Qué requiere el resultado esperado?

- [ ] Una GitHub Action publicada
- [ ] Un PR fusionado con el cambio de exportación
- [x] Una lista real de PR de solo lectura para tu fork, o un bloqueo registrado, sin ninguna operación de escritura
- [ ] Una conexión que funcione a cada servidor de ejemplo

**Explanation:** El resultado esperado es una lista real de PR de solo lectura para tu fork, o un bloqueo registrado, y no se ha realizado ninguna operación de escritura.

## Complete

- [ ] Mark complete
