---
step: 30
title: "SDD + DDD: especificación antes que código, límites antes que la especificación"
points: 10
module: "Team & Scale"
versions: ["long"]
personas: ["developers", "ai-engineers"]
---

# Paso 30 — SDD + DDD: especificación antes que código, límites antes que la especificación (10 pts)

## Learn

Para este taller, el desarrollo guiado por especificación hace explícita la
aceptación antes de la implementación; los límites de dominio determinan a dónde
pertenece ese comportamiento. El `.cursor/rules/boundaries.mdc` de la consola
nombra `Property`, `Leasing`, `Operations` y `Payments`, y exige el uso entre
dominios de las APIs públicas `index.ts`. Los dominios de marcador adicionales no
implican servicios de runtime implementados. Las reglas del proyecto aportan
orientación acotada[1], no una garantía automática de arquitectura correcta ni una
afirmación universal de que el contexto del agente es «flat».

HLN-103 solicita una especificación para inspecciones recurrentes como nuevo
dominio. Menciona un job runner existente; la fuente inspeccionada no establece
dicho runner. Trata su identidad e interfaz como un prerrequisito sin resolver,
no como permiso para inventar una API de cron ni para añadir infraestructura en
silencio.

## Implement

### Exercise kit — una decisión de límite implementable

#### Starter code path

Lee `docs/tickets/HLN-103.md`, `.cursor/rules/boundaries.mdc`,
`.cursor/skills/spec/SKILL.md` y los índices públicos de `Property`, `Leasing` y
`Operations`. Usa el playbook de especificación existente como referencia; no
asumas que este archivo heredado tiene frontmatter de skill válido ni que haya
ocurrido una invocación automática. Crea artefactos solo en una copia de alumno.

```text
Draft specs/inspections/requirements.md, design.md, and tasks.md for HLN-103.
Inspections is a new domain. Cite actual public integration points and distinguish
proposed APIs from existing exports. Identify the job runner as unresolved unless
you find its implementation. Include recurrence, duplicate-run, timezone, and
approval decisions. Do not implement, schedule jobs, or change the shared baseline.
```

1. Escribe requisitos con resultados observables y decisiones abiertas
   explícitas. Distingue los eventos de entrada y salida de la recurrencia
   trimestral y anual.
2. Traza una tabla de dirección de importación: `Inspections` propuesto es dueño
   del estado de inspección; los demás dominios se acceden a través de índices
   públicos. Lista las APIs públicas ausentes como cambios propuestos en lugar de
   importar servicios internos.
3. Escribe tareas mapeadas a criterios de aceptación, cada una con entrada, diff
   esperado, prueba y condición de parada. Bloquea la integración con el scheduler
   hasta que su contrato real o un diseño de reemplazo aprobado estén
   disponibles.
4. Pide al revisor que compruebe solo la especificación y el mapa de límites.
   Resuelve en los archivos las suposiciones no respaldadas; detente antes de la
   aprobación de la implementación.

#### Expected diff

Tres archivos de especificación de alumno, un mapa de integración, una matriz de
pruebas y una lista de prerrequisitos sin resolver. Ninguna implementación de
dominio, trabajo de cron, dependencia nueva ni reparación de defectos plantados
pertenece a este ejercicio.

#### Hints

- Lee los exports en lugar de adivinar a partir de un nombre de dominio.
- Los requisitos pueden ser precisos dejando una dependencia bloqueada; eso es
  mejor que código falso.

#### Solution approach

«Crear una inspección trimestral» es ambiguo sin un ancla de calendario, la zona
horaria de la propiedad y una política de ejecuciones duplicadas. Un contrato
propuesto útil especifica una identidad de ocurrencia estable como propiedad +
calendario + día de vencimiento; eso es una propuesta de diseño, no un esquema
existente. Debe declarar qué ocurre cuando el mismo evento programado se procesa
dos veces. Un diseño defendible mantiene `Inspections` separado, propone pruebas
para una sola ocurrencia, la entrega duplicada y la programación local por
propiedad, y se niega a fabricar el job runner. Las tareas independientes de ese
runner pueden revisarse; la implementación sigue condicionada a la aprobación
explícita y a los contratos resueltos.

#### Expected result

Tienes tres archivos de especificación de alumno con un mapa de integración y una
lista de prerrequisitos sin resolver, y no se hizo ninguna implementación, trabajo
de cron ni cambio de la línea base compartida.

> Screenshot placeholder: el mapa de requisitos a tareas junto a los imports de
> dominio públicos y la dependencia del scheduler visiblemente sin resolver.

#### Stretch goal

Compara un diseño rechazado que pone `Inspections` dentro de `Property` con la
propuesta de dominio separado. Explica quién es dueño de cada parte, la
prevención de duplicados y los compromisos de integración usando los exports
reales; evita afirmar que las reglas por sí solas harán cumplir la arquitectura
elegida[1].

## Pro tips

- **Consejo 1:** Marca cada API como existente o propuesta en el propio diseño.
- **Consejo 2:** Resuelve los cambios de aceptación en la especificación antes de
  pedir a un trabajador que codee a su alrededor.

### Common mistakes

- **Error 1:** Implementar de inmediato a pesar de la puerta de aprobación del
  playbook de especificación.
- **Error 2:** Importar el servicio interno de otro dominio porque su API pública
  es inconveniente.
- **Error 3:** Tratar la frase «job runner existente» de un ticket como prueba de
  una implementación disponible.

## Advanced

Una especificación es un contrato para la revisión, no una licencia para
construir. El mapa de límites y la fila del scheduler sin resolver son la
superficie honesta del diseño; aprobar código antes de que esas filas se resuelvan
traslada la decisión al diff, donde es costoso cambiarla.

## Quiz

#### Q1: ¿Qué hace explícito el desarrollo guiado por especificación antes de la implementación en este taller?

- [ ] La fecha de despliegue
- [x] Los criterios de aceptación
- [ ] El nombre del modelo
- [ ] El texto de marketing

**Explanation:** El desarrollo guiado por especificación hace explícita la aceptación antes de la implementación, mientras que los límites de dominio determinan a dónde pertenece ese comportamiento.

#### Q2: ¿Qué archivo de reglas nombra los límites de dominio de la consola?

- [ ] .cursor/rules/root.mdc
- [x] .cursor/rules/boundaries.mdc
- [ ] .cursor/rules/components.mdc
- [ ] .cursor/hooks.json

**Explanation:** La ruta de código inicial lee .cursor/rules/boundaries.mdc, que nombra `Property`, `Leasing`, `Operations` y `Payments`.

#### Q3: ¿Por qué el job runner mencionado en HLN-103 debe tratarse como un prerrequisito sin resolver?

- [ ] Porque los tickets nunca mencionan infraestructura existente
- [ ] Porque el runner es privado de Maya
- [x] Porque la fuente inspeccionada no establece dicho runner
- [ ] Porque cron está deshabilitado en la consola

**Explanation:** HLN-103 menciona un job runner existente, pero la fuente inspeccionada no establece ninguno, así que su identidad e interfaz siguen sin resolver.

#### Q4: ¿Qué acción se señala como error común cuando una API pública es inconveniente?

- [ ] Pedir al revisor que compruebe solo la especificación
- [x] Importar el servicio interno de otro dominio
- [ ] Listar la API ausente como un cambio propuesto
- [ ] Marcar la fila del scheduler como bloqueada

**Explanation:** Importar el servicio interno de otro dominio porque su API pública es inconveniente es el error 2.

#### Q5: ¿Qué entregable pertenece al resultado esperado de este paso?

- [ ] Un trabajo de cron programado para inspecciones
- [ ] Un defecto plantado reparado
- [x] Tres archivos de especificación de alumno con un mapa de integración y una lista de prerrequisitos sin resolver
- [ ] Una rama de implementación fusionada

**Explanation:** El resultado esperado son tres archivos de especificación de alumno, un mapa de integración y una lista de prerrequisitos sin resolver, sin implementación ni trabajo de cron.

## Complete

- [ ] Mark complete
