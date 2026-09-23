---
step: 13
title: "Flujos de trabajo dinámicos"
points: 10
module: "Bonus"
versions: ["long"]
personas: ["ai-engineers", "forward-deployed"]
---

# Paso 13 — Flujos de trabajo dinámicos (10 pts)

## Learn

Haz fan-out solo cuando las preguntas sean independientes; sintetiza evidencia,
no votos. Los subagentes reciben su propio contexto proporcionado por el padre,
pero comparten el checkout del padre de forma predeterminada salvo que se
solicite aislamiento[34]. Los subagentes en la nube en máquinas separadas están
documentados[32]; eso no significa que cada tarea delegada tenga automáticamente
un sistema de archivos separado.

Cobertura opcional: la beta **Projects** mantiene un contexto compartido y un
coordinador que delega la implementación en lugar de escribir código ella
misma[36]. Este ejercicio usa una investigación local pequeña; no se requiere
ningún Project ni runtime en la nube. Un humano puede realizar el segundo pase
si la delegación no está disponible.

## Implement

### Exercise kit — handoff de evidencia de HLN-102

#### Starter code path

Lee `docs/tickets/HLN-102.md` en la copia de alumno de la consola. Sus criterios
de aceptación exigen un diagnóstico escrito de los síntomas de totales mensuales
en Honolulu, Anchorage y Guam, con análisis de causa compartida y **sin
corrección en esta sesión**. Lee `src/domains/payments/bucketing.ts` y
`src/domains/payments/refund-service.ts`; no trates sus nombres como prueba de
una canalización completa de reportes de liquidación. Da a dos investigadores
preguntas disjuntas, sin ediciones ni trabajo con herramientas externas:

```text
A: Trace payment-day bucketing. For each property timezone, provide a concrete
UTC instant, expected local day, actual code behavior, and file:line evidence.
B: Trace refund recording and callers. Separate observed implementation from
hypotheses about monthly totals. Identify missing settlement data or call paths.
Both: Report uncertainty. Do not fix code, tests, or the planted baseline.
```

#### Expected diff

Una matriz de síntomas de tres filas más una tabla de hipótesis: ubicación de
origen, observación, causa propuesta, evidencia contraria, confianza y evidencia
faltante. Preserva «no establecido» donde una comparación de liquidación no
puede reproducirse a partir de los fixtures disponibles.

#### Hints

- Pide al escéptico que siga cada arista de llamada reclamada en el código
  fuente.
- Dos agentes repitiendo el mismo comentario cuentan como una sola pieza de
  evidencia.
- Un contexto de modelo limpio no es un checkout aislado[34].

#### Solution approach

`bucketPaymentByDay` ignora ambos argumentos proporcionados y devuelve la fecha
local de hoy del servidor. Para `2027-01-01T08:30:00Z` en Honolulu, el día local
esperado es `2026-12-31`; un informe que solo dice «defecto UTC» es
insuficiente. Una función de reembolso que devuelve un ID sin registrar un
reembolso es una observación separada, no prueba de que causó los tres totales.
Conserva el hallazgo del agrupamiento que ignora argumentos; rechaza la
afirmación de que el comparador de importes es automáticamente la causa raíz de
HLN-102. Mantén cualquier conexión entre el reembolso y el total mensual
condicional hasta que un rastreo de llamador/datos la respalde. El informe final
debe distinguir los tres ejemplos de propiedades de tres causas raíz
independientemente probadas.

#### Expected result

Tienes la matriz de síntomas de tres filas y la tabla de hipótesis para HLN-102,
y cada fila nombra una ubicación de origen con la línea base compartida sin
cambios.

> Screenshot placeholder: informes de los investigadores junto a los hallazgos
> aceptados, rechazados y sin resolver del escéptico; muestra un diff rastreado
> sin cambios.

#### Stretch goal

Redacta un handoff de coordinador que contenga solo los hallazgos aceptados y
las preguntas abiertas. Compáralo con el patrón opcional de contexto compartido
de Projects[36], sin aprovisionar un Project.

### Common mistakes

- **Error 1:** Confundir un contexto de modelo limpio con un checkout
  aislado[34].
- **Error 2:** Fusionar hallazgos por votación mayoritaria en lugar de revisar
  el código fuente y los insumos.
- **Error 3:** Convertir un ticket de solo diagnóstico en una reparación sin
  revisar o una prueba de liquidación fabricada.

### Pro tips

- **Consejo 1:** Dale al escéptico las rutas de código fuente y las
  observaciones, no solo la conclusión del primer agente.
- **Consejo 2:** Limita el fan-out a dos investigadores hasta que la evidencia
  faltante justifique otro.

## Quiz

#### Q1: ¿Cuándo corresponde hacer fan-out a varios investigadores?

- [ ] Siempre que un ticket mencione más de un archivo
- [x] Cuando las preguntas sean independientes y se sintetice evidencia, no votos
- [ ] Siempre que el checkout padre esté limpio
- [ ] Siempre que haya un runtime de nube disponible

**Explanation:** Haz fan-out solo cuando las preguntas sean independientes, y sintetiza evidencia en lugar de contar votos.

#### Q2: ¿Qué ticket investiga este ejercicio y cuál es su restricción?

- [x] HLN-102, una investigación de solo diagnóstico de los totales mensuales en Honolulu, Anchorage y Guam
- [ ] HLN-101, una reparación de opciones de exportación
- [ ] HLN-102, un ticket de reparación de ordenación numérica
- [ ] El hallazgo de ordenación no reportado del Paso 12

**Explanation:** HLN-102 exige un diagnóstico escrito de los síntomas de totales mensuales en tres propiedades sin corrección en esta sesión.

#### Q3: ¿Por qué el comparador de importes no debe declararse automáticamente como la causa raíz de HLN-102?

- [ ] Porque el comparador no lo usa el código de pagos
- [x] Porque tres ejemplos de propiedades no son tres causas raíz independientemente probadas, y la conexión con el reembolso permanece condicional hasta que se rastree
- [ ] Porque el ticket prohíbe nombrar cualquier causa raíz
- [ ] Porque solo el escéptico puede proponer causas

**Explanation:** El informe debe distinguir los tres ejemplos de propiedades de tres causas raíz independientemente probadas, y mantener la conexión entre el reembolso y el total mensual condicional hasta que un rastreo de llamador o de datos la respalde.

#### Q4: ¿Por qué necesita el escéptico seguir cada arista de llamada reclamada en el código fuente?

- [ ] Porque los agentes nunca aportan evidencia de archivo:línea
- [x] Porque dos agentes repitiendo el mismo comentario cuentan como una sola pieza de evidencia, no como confirmación independiente
- [ ] Porque las aristas en el código fuente son más rápidas que leer las pruebas
- [ ] Porque se requiere votación mayoritaria para la aceptación

**Explanation:** Dos agentes repitiendo el mismo comentario cuentan como una sola pieza de evidencia, así que el escéptico debe verificar cada arista de llamada reclamada en el código fuente.

#### Q5: ¿Cuál es el entregable esperado para este paso?

- [ ] Una corrección fusionada del defecto de agrupamiento
- [x] Una matriz de síntomas de tres filas y una tabla de hipótesis para HLN-102 con cada fila nombrando una ubicación de origen y la línea base compartida sin cambios
- [ ] Una prueba de liquidación fabricada que pasa en verde
- [ ] Un handoff de coordinador sin rutas de código fuente

**Explanation:** El entregable es la matriz de síntomas de tres filas y la tabla de hipótesis para HLN-102 con la línea base compartida sin cambios.

## Complete

- [ ] Mark complete
