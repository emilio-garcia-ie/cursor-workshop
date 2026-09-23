---
step: 15
title: "El bot que envía mientras duermes"
points: 10
module: "Bonus"
versions: ["long"]
personas: ["forward-deployed", "ai-engineers"]
---

# Paso 15 — El bot que envía mientras duermes (10 pts)

## Learn

Mencionar `@cursor` en Slack puede lanzar un agente en la nube; en un hilo de
agente existente puede aportar una continuación[26]. El acceso al hilo no es
autoridad universal: **Team follow-ups** controla quién puede continuar el
agente, y Disabled limita las continuaciones al propietario[26]. Los mensajes de
guiado esperan la siguiente llamada de herramienta en lugar de interrumpir la
acción actual[32].

Las suscripciones solo de nube pueden vigilar hilos, PRs y programaciones; la
versión también describe agentes que siguen los PRs que crean[32]. Esto es
capacidad, no permiso para enviar sin revisión. Los primeros turnos de solo
lectura en la nube no tienen hooks, y los hooks locales del directorio personal
no están disponibles allí[31].

## Implement

### Exercise kit — un handoff de Slack revisado

#### Starter code path

Usa un reporte ficticio de Jordan: «La exportación de pagos incluye datos
bancarios; investiga HLN-101.» Lee el ticket real y
`src/app/api/payments/export/route.ts` en la copia de alumno. Este kit usa por
defecto un **borrador sin conexión**. Una app de Slack instalada, un tenant
elegible, la facturación, el acceso al repositorio y la aprobación del
administrador son prerrequisitos para una ejecución en vivo opcional[26]; ninguno
se deduce de un ejemplo de configuración. Impulsa el diagnóstico con:

```text
@cursor autopr=false Investigate HLN-101 in the approved learner repository.
Read the ticket and export route. Return file:line evidence, missing inputs,
and a proposed test. Do not edit, create a PR, push, send messages elsewhere,
or schedule recurring work. Stop after the diagnosis for human review.
```

#### Expected diff

Una hoja de trabajo de handoff con el solicitante, el repositorio y la rama base
aprobados, la acción permitida, la salida esperada, la condición de parada y el
revisor. Para una ejecución en vivo, registra también el runtime seleccionado y
la política de continuación observada; para el camino sin conexión, marca esos
campos como «no probado».

#### Hints

- La selección explícita de repositorio y rama evita depender de la actividad
  reciente del agente[26].
- La opción documentada `autopr=false` desactiva la creación automática de
  PRs[26]; aun así inspecciona el comportamiento real de la ejecución en lugar
  de confiar en la prosa.
- Rastrea `columns` omitidas hasta `DEFAULT_EXPORT_COLUMNS` antes de confiar en
  una respuesta solo de navegador.

#### Solution approach

El diagnóstico esperado rastrea `columns` omitidas hasta
`DEFAULT_EXPORT_COLUMNS` en `src/domains/payments/export.ts`, que contiene
`bank_account_last4` y `routing_number`. Una respuesta que promete una
corrección de CSV solo en navegador pasa por alto el requisito del ticket de
exportación en el lado del servidor más allá de la página visible. Aprueba solo
el artefacto de diagnóstico. Una reparación posterior autorizada pertenece a una
rama de alumno con las pruebas de HLN-101 y revisión humana. No conviertas una
respuesta exitosa en permiso para una suscripción o un cambio en producción.

#### Expected result

Tienes la hoja de trabajo de handoff completada con el solicitante, el
repositorio aprobado, la acción permitida y la condición de parada, y el
artefacto de diagnóstico es la única salida aprobada para revisión.

> Screenshot placeholder: handoff y diagnóstico aprobados censurados, o la
> hoja de trabajo sin conexión claramente etiquetada como "Slack runtime not
> tested".

#### Stretch goal

Redacta un mensaje de guiado que preserve el alcance: «Distingue también las
columnas omitidas de una selección vacía explícita.» Si se aprueba una
ejecución en vivo, observa su manejo en la siguiente llamada de herramienta[32];
no simules una ejecución remota exitosa en el registro de evidencia.

### Common mistakes

- **Error 1:** Asumir que cualquiera que pueda leer un hilo de Slack puede
  dirigir su agente[26].
- **Error 2:** Tratar una integración de Slack como una configuración genérica
  de servidor MCP de Slack.
- **Error 3:** Permitir que un flujo de PR sin supervisión cambie los defectos
  plantados del taller compartido.

### Pro tips

- **Consejo 1:** Mantén el diagnóstico y la autorización de escritura como
  handoffs separados con revisores con nombre.
- **Consejo 2:** Registra el entorno seleccionado; los prompts pueden nombrar
  entornos, workers y pools de equipo, pero el taller no requiere ninguno de
  ellos[26].

Nota de alojamiento opcional: los Cloud Agents pueden iniciarse sin control de
versiones de terceros y guardar el trabajo en Origin[36]. Mantén la elección de
caso de estudio de GitHub de este taller; no migres ni crees un repositorio
alojado nuevo para este kit.

## Quiz

#### Q1: ¿Qué controla quién puede continuar un agente en la nube en un hilo de Slack existente?

- [ ] Cualquiera que pueda leer el hilo
- [x] El ajuste Team follow-ups, donde Disabled limita las continuaciones al propietario
- [ ] El nombre de la rama del repositorio
- [ ] Solo el administrador del espacio de trabajo de Slack

**Explanation:** El acceso al hilo no es autoridad universal; Team follow-ups controla quién puede continuar el agente, y Disabled limita las continuaciones al propietario.

#### Q2: ¿Dónde encuentra el diagnóstico esperado las columnas predeterminadas sensibles?

- [ ] En el CSV visible en el navegador
- [x] En `DEFAULT_EXPORT_COLUMNS` dentro de `src/domains/payments/export.ts`
- [ ] En los ajustes del hilo de Slack
- [ ] Solo en `src/app/api/payments/export/route.ts`

**Explanation:** El diagnóstico rastrea `columns` omitidas hasta `DEFAULT_EXPORT_COLUMNS` en `src/domains/payments/export.ts`, que contiene `bank_account_last4` y `routing_number`.

#### Q3: ¿Por qué una respuesta de CSV solo en navegador es insuficiente para el reporte HLN-101 de Jordan?

- [ ] Porque los navegadores no pueden descargar archivos CSV
- [ ] Porque el ticket requiere una respuesta en Slack
- [x] Porque las columnas sensibles provienen de la selección de exportación predeterminada del lado del servidor más allá de la página visible
- [ ] Porque Jordan solo acepta capturas de pantalla

**Explanation:** Las columnas omitidas se rastrean hasta una lista de exportación predeterminada del lado del servidor, así que el diagnóstico debe abordar el requisito de ir más allá de la página visible.

#### Q4: ¿Por qué es un error asumir que cualquiera que pueda leer un hilo de Slack puede dirigir su agente?

- [ ] Porque leer un hilo siempre está permitido
- [x] Porque Team follow-ups controla la continuación, y Disabled limita las continuaciones al propietario
- [ ] Porque los agentes ignoran los mensajes de Slack
- [ ] Porque los hilos se eliminan tras una respuesta

**Explanation:** El acceso al hilo no es autoridad universal, así que el acceso de lectura no otorga permiso para continuar el agente.

#### Q5: Para el camino sin conexión, ¿qué debe registrar la hoja de trabajo de handoff en los campos de runtime?

- [ ] La salida de consola de la ejecución en vivo
- [x] Marcarlos como no probados y aprobar solo el artefacto de diagnóstico
- [ ] Una ejecución remota simulada y exitosa
- [ ] Los nombres reales de worker y pool de equipo

**Explanation:** Para el camino sin conexión, los campos de runtime se marcan como no probados y el artefacto de diagnóstico es la única salida aprobada para revisión.

## Complete

- [ ] Mark complete
