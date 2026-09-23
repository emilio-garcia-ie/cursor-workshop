---
step: 7
title: "Tu primer skill: el formato de PR"
points: 20
module: "Building"
versions: ["short", "medium", "long"]
personas: ["developers", "ai-engineers", "forward-deployed"]
---

# Paso 7 — Tu primer skill: el formato de PR (20 pts)

## Learn

Un skill agrupa prompts, scripts y referencias en una unidad reutilizable[9]:
`SKILL.md` (obligatorio — name + description lo activan), más `references/`,
`scripts/`, `assets/` cargados bajo demanda. La description es el texto de
activación: description vaga, nunca se activa. El repo trae los skills `pr/`,
`spec/`, `release-note/`; los personales viven fuera del repo.

## Implement

1. Aísla el trabajo con el comando Git crudo
   `git worktree add ../hearthline-pr-skill -b tooling/hearthline-pr-skill main`.
   Comprueba `git worktree list` primero; reutiliza el worktree previsto si ya
   existe. Esto crea una rama de tooling desde `main`, no desde el trabajo de
   funcionalidad. Los worktrees nativos de la interfaz de Cursor pertenecen al
   Agents Window; las IDE Worktree Skills son una interfaz separada para
   checkouts aislados[19].
2. Lee `.cursor/skills/pr/SKILL.md` — activación, pasos, reglas.
3. Crea `hearthline-pr` bajo `.cursor/skills/hearthline-pr/`: título
   `<TICKET-ID>: …`, párrafo de qué cambió, comandos verificados + salida,
   casillas honestas, sección de lo no hecho. Lee diff + log +
   `docs/tickets/`. Nunca inventes verificación.
4. Pruébalo contra `HLN-101-export-options` sin copiar la funcionalidad a la
   rama de tooling. Solo borrador; el Paso 11 es quien aprueba publicar.

### Exercise kit

#### Starter code path

`hearthline-operator-console/.cursor/skills/pr/SKILL.md`. Contiene el formato
de Priya como prosa; úsalo como material fuente, no como prueba de que el
frontmatter obligatorio del skill ya esté presente. Crea el skill nuevo en el
worktree de tooling.

#### Minimal working example

Crea `.cursor/skills/hearthline-pr/SKILL.md` en ese worktree. El frontmatter
obligatorio `name` y `description` sigue el esquema del skill[9]:

```markdown
---
name: hearthline-pr
description: Draft or rewrite a Hearthline PR description from a ticket, diff, and actual verification evidence.
---
Read the supplied ticket and diff. Ask which checkout contains the changes.
Title the draft TICKET-ID: imperative summary.
Include business impact, changes, verified commands with actual output,
and a not-done section. Missing evidence stays explicitly unverified.
Draft only. Do not commit, push, or open a PR.
```

Abre el worktree de tooling como el proyecto de Cursor para que el skill nuevo
de proyecto sea descubrible[9]. Invoca `/hearthline-pr` explícitamente[9].
Proporciona la ruta absoluta del checkout de la funcionalidad, el ticket y las
salidas reales de los comandos. Si la funcionalidad no está commiteada, lee
sus diffs de trabajo y de staged además de los cambios commiteados;
`main...HEAD` por sí solo no incluye el trabajo sin commitear. No revises en
silencio el diff de la propia rama de tooling y lo etiquetes como HLN-101.

#### Expected diff

Un archivo de skill nuevo en `../hearthline-pr-skill/.cursor/skills/hearthline-pr/`.
Sin cambios de aplicación y sin PR publicado. El cuerpo del PR sigue siendo un
borrador con las secciones de verificado y de lo no hecho que reflejan la
evidencia realmente proporcionada.

#### Hints

- Activación positiva: «Redacta la descripción del PR de HLN-101 a partir de
  este diff». Activación negativa: «Explica el agrupamiento UTC; no redactes
  un PR». Ejecútalas por separado.
- Inspecciona si el skill fue invocado; una respuesta que se parece no es
  prueba de descubrimiento. El frontmatter obligatorio importa[9].
- Deja `paths` sin definir para esta tarea de PR de todo el repo. Para skills
  específicos de archivo, usa `paths`; los `globs` legados del skill siguen
  aceptados, no preferidos[9].

#### Solution approach

Ejecuta primero la invocación explícita, luego los prompts de activación
positiva y negativa en chats nuevos. Registra la invocación, el formato del
título, el impacto de negocio, la evidencia real y las comprobaciones
faltantes. Oculta la salida del build una vez: el resultado correcto dice
build sin verificar, nunca «aprobado». Corrige la description o el cuerpo
según el fallo y repite las mismas sondas. Registra un disparo fallido como un
fallo de descubrimiento, no como prueba de que la selección automática esté
garantizada.

#### Expected result

Tienes un skill `hearthline-pr` descubrible y un borrador de PR que Priya puede
rastrear hasta el checkout correcto, y ninguna casilla reclama evidencia que
no se haya proporcionado.

[SCREENSHOT: Invocación de hearthline-pr junto a un borrador con evidencia real de pruebas y una entrada de build sin verificar]

#### Stretch goal

Usa el skill como modo personalizado y compara una solicitud de seguimiento con
la invocación con slash ordinaria. Un modo personalizado conserva el skill
durante toda la sesión[9]; registra la insignia activa y si esa persistencia
ayuda a esta tarea.

### Common mistakes

- **Error 1:** Copiar prosa sin frontmatter YAML. Proporciona el name y la
  description documentados y verifica el descubrimiento[9].
- **Error 2:** Revisar la rama de tooling como si fuera la funcionalidad.
  Nombra el checkout de origen e inspecciona todos los estados de diff
  relevantes.
- **Error 3:** Rellenar una plantilla de verificación con resultados
  plausibles. La salida que falta significa sin verificar; vuelve a ejecutar la
  comprobación o déjala sin marcar.

## Pro tips

- **Consejo 1:** Escribe las description alrededor de la tarea que debería
  activarlas, luego conserva un prompt positivo y uno negativo como sondas de
  regresión.
- **Consejo 2:** Haz de «sin evidencia proporcionada» un caso de evaluación de
  primera clase.

- Las raíces de los skills se buscan recursivamente en busca de `SKILL.md`;
  los skills anidados de proyecto pueden acotarse al directorio[9]. Comprueba
  el alcance previsto, no solo el nombre de archivo.

## Advanced

Un skill es un estándar que viaja (commiteado en `.cursor/skills/`). Haz
primero los aburridos y repetitivos — formato de PR, notas de release, listas
de verificación de migración. Un buen skill vence a diez prompts ingeniosos.

No confundas el control de versiones con la disponibilidad remota. La
sincronización de los Cloud Agents personales es opt-in, se limita a
`~/.cursor/skills/` y está sujeta a controles del equipo[9]. Publicar un skill
personal para el equipo produce un plugin alojado; los compañeros activan la
opción y los skills referenciados no se empaquetan automáticamente[28]. Este
kit no requiere ni sincronización ni publicación.

## Quiz

#### Q1: ¿Qué activa un skill?

- [ ] Cualquier mención del nombre de su carpeta
- [x] Su frontmatter de name y description
- [ ] Su directorio de scripts
- [ ] El permiso de un compañero

**Explanation:** SKILL.md es obligatorio con name y description; la description es el texto de activación, así que una description vaga nunca se activa.

#### Q2: ¿Dónde se crea el skill nuevo hearthline-pr?

- [ ] docs/tickets/
- [ ] src/app/
- [x] .cursor/skills/hearthline-pr/SKILL.md en el worktree de tooling
- [ ] site/src/lib/

**Explanation:** El skill se crea bajo .cursor/skills/hearthline-pr/ en el worktree de tooling para que sea descubrible.

#### Q3: ¿Por qué el borrador de PR debe rastrearse hasta el checkout de la funcionalidad?

- [ ] Porque la rama de tooling formatea mejor los borradores
- [ ] Porque main contiene más archivos
- [x] Porque Priya debe poder rastrear el PR hasta el checkout que contiene el cambio de HLN-101
- [ ] Porque los worktrees no se pueden compartir

**Explanation:** El resultado esperado es un borrador que Priya pueda rastrear hasta el checkout correcto, no el diff de la propia rama de tooling etiquetado como HLN-101.

#### Q4: ¿Cuál es un error común contra el que advierte este paso?

- [ ] Invocar el skill explícitamente
- [ ] Registrar un disparo fallido como un fallo de descubrimiento
- [x] Rellenar una plantilla de verificación con resultados plausibles
- [ ] Usar la salida real de los comandos en el borrador

**Explanation:** La salida que falta significa sin verificar; vuelve a ejecutar la comprobación o déjala sin marcar, y nunca inventes verificación.

#### Q5: ¿Qué debe reflejar el cuerpo del borrador de PR?

- [x] Las secciones de verificado y de lo no hecho que coincidan con la evidencia realmente proporcionada
- [ ] Todas las casillas marcadas como completas
- [ ] El historial completo de la rama de tooling
- [ ] Un estado de build aprobado sin haberlo ejecutado

**Explanation:** El borrador tiene las secciones de verificado y de lo no hecho que reflejan la evidencia proporcionada; ninguna casilla reclama evidencia que no se haya proporcionado.

## Complete

- [ ] Mark complete
