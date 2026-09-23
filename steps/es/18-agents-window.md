---
step: 18
title: "La ventana de agentes: trabajo paralelo"
points: 15
module: "The Fast Loop"
versions: ["long"]
personas: ["developers", "ai-engineers", "forward-deployed"]
---

# Paso 18 — La ventana de agentes: trabajo paralelo (15 pts)

## Learn

Los worktrees dan a las tareas checkouts de Git aislados. El flujo de worktrees
nativo de la UI de Cursor está en la Agents Window; la IDE usa los comandos
Worktree Skills[19]. Los worktrees de Git crudos son un flujo de trabajo
separado, no evidencia de que una UI particular de Cursor se haya ejercitado.
Los Cloud Agents se ejecutan de forma asíncrona en VMs dedicadas[15]; esa es
otra elección de runtime, no un prerrequisito para dos tareas locales.

El aislamiento reduce las ediciones accidentales de archivos compartidos, pero no
hace que los resultados sean compatibles. Define la propiedad y una comprobación
de integración antes de lanzar los trabajadores. No confundas el contexto
independiente del subagente con el aislamiento del checkout: los subagentes
comparten un checkout de forma predeterminada salvo que se solicite
aislamiento[34].

## Implement

1. Inspecciona el estado y el diff de cada worktree de forma independiente.
   Verifica que no se hayan cambiado rutas fuera de su propiedad y registra
   cualquier sugerencia rechazada.
2. Ejecuta `npm test -- tests/money.test.ts` para B y la suite completa en cada
   checkout de alumno según corresponda. Las dependencias pertenecen a ese
   checkout; no asumas que la instalación del otro trabajador prueba la
   configuración[19].
3. Aplica solo los diffs revisados a un tercer checkout de integración de alumno
   en la misma base. Ejecuta `npm test` e inspecciona las etiquetas de Pagos
   allí.
4. Produce una decisión de conservar/rechazar para cada diff con evidencia de
   integración. No fusiones ni hagas commit en el starter compartido.

### Exercise kit — dos mejoras no superpuestas

#### Starter code path

Usa una revisión limpia de alumno de la consola. Lee `src/app/payments/page.tsx`
y `tests/money.test.ts`. Crea dos worktrees de alumno a través de la Agents
Window si está disponible[19]; registra sus rutas reales, nombres de rama y la
revisión base idéntica. Si no está disponible, realiza las tareas secuencialmente
en copias de alumno separadas y etiqueta el camino de la UI como no probado.
Nunca uses la línea base compartida como checkout de trabajador. Lanza ambos
trabajadores con:

```text
Worker A owns only src/app/payments/page.tsx. Give the search input an explicit
accessible name and use button text "Export CSV" on the existing export link.
Preserve its href, search parameter propagation, data query, and table behavior.
Worker B owns only tests/money.test.ts. Add positive edge-case coverage for
formatCents(1), formatCents(101), and formatCents(123456). No production edits.
Both: no commits, pushes, dependency changes, or planted-bug repairs.
```

#### Expected diff

Una tabla de propiedad de dos trabajadores, evidencia de base/rutas, diffs
individuales, diff combinado y resultados de verificación reales.

#### Hints

- Comprueba `git status --short` en cada checkout real.
- Una captura de dos chats no establece sistemas de archivos aislados.
- Los subagentes comparten el checkout del padre salvo que se solicite
  aislamiento; no los trates como worktrees[34].

#### Solution approach

El diff permitido de A cambia el etiquetado, no la ruta de exportación. Las
salidas esperadas de B son `$0.01`, `$1.01` y `$1,234.56`. Si A también cambia
`money.ts`, rechaza esa edición fuera de alcance antes de combinar resultados.
Dos ejecuciones individuales de pruebas limpias no reemplazan una ejecución en el
checkout combinado. Acepta las etiquetas de A solo si la URL de exportación no
cambia; acepta las aserciones de B solo si comprueban el formateador de centavos
enteros existente. La integración debe contener exactamente las dos rutas en
posesión, con todos los contratos plantados intactos.

#### Expected result

Tienes la tabla de propiedad de dos trabajadores con diffs individuales y
combinado, y el checkout de integración pasa `npm test` con exactamente las dos
rutas en posesión cambiadas.

> Screenshot placeholder: dos rutas de worktree distintas y diffs acotados, más
> el resultado de pruebas del checkout de alumno combinado.

#### Stretch goal

Explica cuándo ayudaría el coordinador/contexto compartido opcional de la beta
**Projects** para un conjunto mayor de tareas[36]. Estas son alternativas de
runtime opcionales, no nuevos requisitos de infraestructura del taller.

### Common mistakes

- **Error 1:** Lanzar dos chats en un solo checkout y llamar a eso
  aislamiento.
- **Error 2:** Comparar revisiones base distintas o perder dependencias en
  silencio.
- **Error 3:** Aceptar ejecuciones aisladas en verde sin comprobar el resultado
  combinado.

## Pro tips

- **Consejo 1:** Asigna rutas antes que los prompts; revisa cualquier solicitud
  de un trabajador de ampliar su propiedad.
- **Consejo 2:** Mantén un checkout de integración separado para que ninguno de
  los trabajadores se convierta silenciosamente en la base.

## Advanced

**My Machines** conecta una máquina personal; los pools de equipo encolan tareas
para los trabajadores disponibles[36]. Origin puede alojar trabajo sin control de
versiones de terceros, y los repositorios alojados en Origin y los repositorios
de GitHub sincronizados tienen diferentes fuentes de verdad[36]. Estas son
alternativas de runtime opcionales, no nuevos requisitos de infraestructura del
taller. Retén el caso de estudio de GitHub de este taller y no lo migres.

## Quiz

#### Q1: ¿Qué dan los worktrees a las tareas paralelas?

- [ ] Un checkout compartido con una sola instalación de dependencias
- [x] Checkouts de Git aislados que reducen las ediciones accidentales de archivos compartidos
- [ ] Fusión automática a la línea base compartida
- [ ] Un único diff combinado sin paso de integración

**Explanation:** Los worktrees dan a las tareas checkouts de Git aislados, y el aislamiento reduce las ediciones accidentales de archivos compartidos.

#### Q2: ¿Qué archivos poseen los trabajadores A y B en este kit?

- [x] A posee `src/app/payments/page.tsx`; B posee `tests/money.test.ts`
- [ ] A posee `src/lib/money.ts`; B posee `src/app/payments/page.tsx`
- [ ] Ambos trabajadores poseen `tests/money.test.ts`
- [ ] A posee la ruta de exportación; B posee `src/lib/money.ts`

**Explanation:** El trabajador A posee solo la pantalla de Pagos y el trabajador B posee solo las pruebas de dinero, sin ediciones de producción para B.

#### Q3: ¿Por qué el checkout de integración combinado debe reemplazar dos ejecuciones individuales limpias?

- [ ] Porque las ejecuciones individuales siempre mienten
- [x] Porque el aislamiento no hace que los resultados sean compatibles, y la evidencia de integración necesita la ejecución combinada
- [ ] Porque la línea base compartida no puede ejecutar pruebas
- [ ] Porque los revisores solo aceptan capturas de pantalla

**Explanation:** El aislamiento reduce las ediciones accidentales de archivos compartidos pero no hace que los resultados sean compatibles, así que la ejecución en el checkout combinado es la evidencia de integración.

#### Q4: ¿Por qué lanzar dos chats en un solo checkout no es aislamiento?

- [ ] Porque los chats siempre son seriales
- [x] Porque los subagentes comparten el checkout del padre de forma predeterminada salvo que se solicite aislamiento
- [ ] Porque los worktrees están prohibidos aquí
- [ ] Porque una captura de dos chats prueba el aislamiento

**Explanation:** Los subagentes comparten un checkout de forma predeterminada salvo que se solicite aislamiento, así que dos chats en un solo checkout no están aislados.

#### Q5: ¿Qué debe mostrar el checkout de integración al completarse?

- [x] `npm test` pasando con exactamente las dos rutas en posesión cambiadas y todos los contratos plantados intactos
- [ ] Una fusión en el starter compartido
- [ ] Ambos trabajadores editando los mismos archivos
- [ ] Una tercera ruta en posesión del paso de integración

**Explanation:** El checkout de integración pasa `npm test` con exactamente las dos rutas en posesión cambiadas y todos los contratos plantados intactos.

## Complete

- [ ] Mark complete
