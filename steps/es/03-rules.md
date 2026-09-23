---
step: 3
title: "Reglas: configura y personaliza"
points: 25
module: "Foundations"
versions: ["short", "medium", "long"]
personas: ["vibecoders", "developers", "data-scientists", "ai-engineers", "forward-deployed"]
---

# Paso 3 — Reglas: configura y personaliza (25 pts)

## Learn

Cursor admite cuatro tipos de reglas: Project Rules en `.cursor/rules`, User
Rules (globales), Team Rules (en el Panel, planes Team/Enterprise) y
`AGENTS.md` — una alternativa en markdown puro para casos simples[1].

Las reglas de proyecto son archivos `.mdc` con frontmatter. Cuatro tipos de
aplicación[1]:

- **Always Apply** (`alwaysApply: true`) — en cada sesión.
- **Apply Intelligently** (description, sin globs) — el agente la solicita
  cuando es relevante.
- **Apply to Specific Files** (`globs`) — se adjunta automáticamente al
  coincidir el archivo.
- **Apply Manually** — solo mediante mención con `@`.

La jerarquía de Hearthline (abre cada archivo — haz clic en cualquier regla
para leer un ejemplo real):

- `.cursor/rules/root.mdc` — estándares del equipo, en cada sesión (`alwaysApply`)
- `.cursor/rules/money.mdc` — centavos enteros (`globs: src/domains/**/lib/**`)
- `.cursor/rules/time.mdc` — almacenamiento y agrupamiento en UTC
- `.cursor/rules/api-routes.mdc` — validación Zod para las rutas
- `.cursor/rules/components.mdc` — pantallas Tremor + Tailwind
- `.cursor/rules/boundaries.mdc` — solo el `index.ts` público
- `AGENTS.md` — la alternativa simple en la raíz del repo[1]

### Subpestaña de marketing

La misma jerarquía en un repo de contenido: reglas amplias de voz en la raíz,
carpetas de canal que llevan solo lo que es cierto allí. Capas, no montones.

## Implement

1. Lee `src/domains/payments/.cursor/rules/` — espera, no existe. Las
   convenciones de pagos viven en los compartidos `money.mdc`/`time.mdc`. Anota
   qué pertenece al nivel raíz y qué merece su propio archivo con alcance.
2. En el chat, ejecuta `/create-rule` y describe la idea de Release Standards
   de abajo. `/create-rule` genera el archivo con el frontmatter adecuado[1].
3. Añade una sección **Release Standards** a `root.mdc`: evidencia de pruebas
   obligatoria, sin commits directos a `main`, un impacto de negocio de una
   línea por cambio. Priya revisa cada PR contra estas tres líneas, de modo que
   la regla mantenga su estándar unido a la base de código.

### Por qué importa el alcance

Una regla provee instrucciones, no un control de permisos en tiempo de
ejecución. Las reglas Always se adjuntan de forma amplia; las reglas con
alcance de archivo se adjuntan cuando se referencian archivos coincidentes, y
las reglas aplicadas manualmente requieren una mención explícita[1]. Una regla
de dinero bien escrita puede seguir ausente en la tarea equivocada. Prueba la
inclusión y la respuesta por separado en lugar de juzgar ambas con una
respuesta afortunada.

### Exercise kit

#### Starter code path

`hearthline-operator-console/.cursor/rules/root.mdc` y
`hearthline-operator-console/.cursor/rules/money.mdc`; usa
`src/domains/payments/lib/fee-calc.ts` como la sonda de alcance de archivo.

#### Minimal working example

Usa `/create-rule`[1] como generador de borradores, no como excusa para
duplicar dos veces los mismos estándares. Compara este ejemplo con alcance de
archivo con `money.mdc`:

```mdc
---
description: Integer-cent arithmetic in domain library functions
globs: src/domains/**/lib/**
alwaysApply: false
---
Store and calculate money as integer cents.
Reject a proposed conversion to floating-point dollars inside domain logic.
```

Los campos `globs` y `alwaysApply` seleccionan el comportamiento de aplicación
de la regla[1]. Para este ejercicio, conserva el starter de dinero y añade solo
el cuerpo de Release Standards solicitado a la regla raíz existente; preserva
su frontmatter actual.

#### Expected diff

Una sección Release Standards en `root.mdc`: comandos de prueba más la salida
real, sin commits directos a main e impacto de negocio de una línea. Si el
comando de creación produjo una regla borrador duplicada, reconcilia ese
borrador antes de hacer staging; no dejes dos versiones en competencia.

#### Hints

- Sonda positiva: pide una explicación de `fee-calc.ts`, no una corrección.
- Sonda negativa: en un chat nuevo, pregunta por `README.md` sin mencionar la
  regla de dinero. Inspecciona las reglas adjuntas, no solo la redacción de la
  respuesta.
- La regla raíz también puede mencionar los centavos. Una respuesta sobre
  centavos no es prueba de que la regla con alcance se haya cargado.

#### Solution approach

Ejecuta ambas sondas antes y después de tu edición en el cuerpo raíz. Registra
los archivos referenciados, los nombres de las reglas adjuntas y la respuesta
resultante. Luego menciona explícitamente la regla de dinero y compara. Acepta
el ejercicio solo cuando puedas explicar por qué se adjuntó una regla, o
registra el comportamiento inesperado para revisión.

#### Expected result

Tienes un diff pequeño en la regla raíz y un registro de inclusión de tres
casos (archivo coincidente, archivo no coincidente, mención explícita), y
ningún cálculo de dinero ha cambiado.

[SCREENSHOT: Chat con archivo coincidente y la regla de dinero adjunta junto a la sonda con archivo no coincidente]

#### Stretch goal

Reescribe una instrucción vaga como una solicitud verificable con un
contraejemplo. Pide a un compañero que prediga qué sonda debería adjuntarla
antes de ejecutarla.

### Common mistakes

- **Error 1:** Hacer que todas las reglas sean Always Apply. Acota el alcance
  donde sea posible para que el trabajo sin relación no cargue cada
  instrucción[1].
- **Error 2:** Guardar una regla de proyecto como un archivo `.md` ordinario.
  Usa el formato de regla `.mdc` documentado o la alternativa separada
  `AGENTS.md`[1].
- **Error 3:** Llamar a una respuesta correcta prueba de adjuntado. Inspecciona
  el contexto de la regla y repite con una sonda negativa.

## Pro tips

- **Consejo 1:** Conserva los prompts de las sondas positiva y negativa junto
  con la revisión.
- **Consejo 2:** Revisa los cambios de regla como cambios de comportamiento, no
  solo como pulido de prosa.

- Mantén las reglas por debajo de ~500 líneas; divide las grandes[1].
- Prefiere `globs` a `alwaysApply` — paga contexto solo donde se aplica.
- `@path/to/file` en lugar de pegar el contenido.
- Ejecuta una tarea de sonda y luego verifica qué se cargó realmente antes de
  confiar en ello.

## Advanced

Gestiona las reglas como la CI: la plataforma es dueña de la raíz, los equipos
de servicio son dueños de los archivos con alcance, con revisión en PR. El
archivo debe llegar al checkout del alumno y coincidir con el alcance de
aplicación antes de poder guiar una tarea[1]. Las reglas no se aplican a Tab,
Inline Edit ni a las revisiones de PR de Bugbot[2]. `.cursorrules` es legado
con descontinuación futura anunciada, no ya eliminado; usa reglas de proyecto
para el trabajo nuevo[2].

## Quiz

#### Q1: ¿Qué campo del frontmatter hace que una regla de proyecto se aplique en cada sesión?

- [ ] globs
- [x] alwaysApply: true
- [ ] description
- [ ] apply: manual

**Explanation:** Una regla con `alwaysApply: true` es una regla Always Apply y se adjunta en cada sesión.

#### Q2: ¿Dónde viven las reglas de proyecto de Hearthline?

- [ ] docs/rules/
- [x] .cursor/rules/ como archivos .mdc
- [ ] site/src/lib/
- [ ] src/domains/

**Explanation:** Las reglas de proyecto viven en .cursor/rules como archivos .mdc y están bajo control de versiones.

#### Q3: ¿Por qué la sección Release Standards va a root.mdc y no a un archivo con alcance?

- [ ] Porque las reglas raíz cargan más rápido
- [x] Porque Priya revisa cada PR contra esas tres líneas, de modo que una regla siempre aplicada mantenga su estándar unido a la base de código
- [ ] Porque las reglas con alcance no pueden contener instrucciones
- [ ] Porque root.mdc es la única regla editable

**Explanation:** Los estándares de release se aplican a cada PR, de modo que la regla raíz siempre aplicada mantenga el estándar de Priya unido a la base de código.

#### Q4: ¿Cuál es un error común contra el que advierte este paso?

- [ ] Usar globs para acotar el alcance de la regla
- [ ] Sondear qué reglas se adjuntaron realmente
- [x] Guardar una regla de proyecto como un archivo .md ordinario
- [ ] Usar `/create-rule` como generador de borradores

**Explanation:** Las reglas de proyecto deben usar el formato de regla .mdc documentado o la alternativa separada AGENTS.md, no un archivo .md simple.

#### Q5: ¿Qué tres casos debe cubrir el registro de inclusión?

- [ ] Sondas rápida, lenta y cronometrada
- [x] Un archivo coincidente, un archivo no coincidente y una mención explícita
- [ ] Reglas raíz, de usuario y de equipo
- [ ] Reglas en borrador, en staging y publicadas

**Explanation:** El registro de tres casos cubre una sonda con archivo coincidente, una sonda con archivo no coincidente y una mención explícita de la regla.

## Complete

- [ ] Mark complete
