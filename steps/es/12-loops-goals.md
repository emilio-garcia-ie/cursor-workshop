---
step: 12
title: "Bucles y objetivos"
points: 10
module: "Bonus"
versions: ["short", "medium", "long"]
personas: ["developers", "ai-engineers", "forward-deployed"]
---

# Paso 12 — Bucles y objetivos (10 pts)

## Learn

`/goal` aporta un objetivo de larga duración; `/loop` añade comprobaciones
periódicas[32]. Ninguno sustituye una prueba de aceptación ni la decisión
humana sobre el alcance. Las suscripciones en la nube pueden reaccionar a PRs,
hilos de Slack o programaciones; las suscripciones son solo de nube en la
versión citada[32]. Este kit necesita una única comprobación local supervisada,
no un trabajo recurrente desplegado.

Un modo personalizado respaldado por un skill mantiene ese skill en el contexto
durante toda una sesión; la invocación slash ordinaria es por mensaje[9][32].
Opcionalmente compara esas dos formas de aportar un playbook. Un skill fijado es
contexto, no un programador ni una frontera de autorización.

## Implement

### Exercise kit — una comprobación de salud acotada

#### Starter code path

Usa tu copia de alumno de la consola, con las dependencias instaladas y la rama
actual y su estado limpio/sucio registrados. Lee `package.json`,
`tests/sort-bug.test.ts` y `tests/export-columns.test.ts`: la suite
caracteriza deliberadamente defectos plantados. En verde no significa que esos
defectos de negocio estén corregidos. No alteres el starter compartido ni sus
pruebas. Impulsa la única comprobación supervisada con:

```text
/goal Perform one supervised payments health check in this learner checkout.
Run npm test once. If green, report the command, counts, and "green; no edits".
If red, report the first failed assertion and its source location; stop.
Do not change source, tests, configuration, branches, or remote state.
Do not commit, push, or keep retrying. Completion is one evidence report.
```

#### Expected diff

Un registro de ejecución con el checkout, el comando, el estado de salida, los
recuentos de aserciones, la advertencia de defectos conocidos y un diff
rastreado sin cambios. Registra los recuentos reales, no una línea base
histórica copiada.

#### Hints

- Inspecciona la expectativa de la prueba antes de pedir una reparación.
- Pregunta qué condición detiene el goal antes de considerar una cadencia.
- Mantén esto como una comprobación local supervisada; las suscripciones en la
  nube quedan fuera del alcance de este kit[32].

#### Solution approach

Una caracterización de ordenación de cadenas que pasa es una comprobación de
salud en verde, pero no es evidencia de orden numérico. Tu informe debe decir
ambas cosas: `sort contract passes; numeric-order defect intentionally remains`.
Si el comando no puede iniciarse porque faltan las dependencias, clasifícalo
como un fallo de configuración, no como una aserción de producto fallida. Una
ejecución en verde termina sin un parche; una ejecución en rojo termina con un
handoff de diagnóstico, no con un bucle de reparación ilimitado. Después de
revisar ese resultado, puedes *redactar* una solicitud `/loop` para
comprobaciones periódicas[32]; no la dejes corriendo como parte de este kit.
Especifica un propietario, un momento de revisión, un límite de gasto y una
regla de parada.

#### Expected result

Tienes el informe de comprobación de salud de una sola ejecución, y
`git status --short` reporta un diff rastreado sin cambios desde la revisión
base registrada.

> Screenshot placeholder: el informe de una sola ejecución completado junto al
> estado de diff sin cambios; incluye la condición de parada del goal, no
> credenciales ni detalles de facturación.

#### Stretch goal

Usa el skill `pr` de alumno del Paso 7 con frontmatter válido de
nombre/descripción como modo personalizado opcional a través de **Use as
Mode**[9][32]. Si solo tienes el playbook Markdown heredado, prepara primero una
copia de alumno válida; no afirmes que el archivo original está listo para modo.
Compara la insignia y el contexto de la sesión con una sola invocación[9]. No
envíes un PR; explica por qué un playbook de PR no es necesariamente el
playbook de comprobación de salud adecuado.

### Common mistakes

- **Error 1:** Tratar las pruebas de defectos plantados como pruebas de
  aceptación del comportamiento correcto del negocio.
- **Error 2:** Pedir «volver a ejecutar hasta que esté en verde», lo que oculta
  fallos de configuración y fomenta la deriva de alcance.
- **Error 3:** Asumir que un nombre de rama impide acciones en el remoto;
  revisa los permisos por separado.

### Pro tips

- **Consejo 1:** Mantén silenciosas las comprobaciones exitosas, pero conserva
  el comando y el estado de salida como evidencia.
- **Consejo 2:** Separa la detección de la reparación: un revisor puede
  autorizar después un parche limitado al alumno.

## Quiz

#### Q1: ¿Qué añaden `/goal` y `/loop` a una sesión?

- [ ] Pruebas de aceptación que deciden el alcance
- [ ] Una suscripción en la nube y un trabajo desplegado
- [x] Un objetivo de larga duración y comprobaciones periódicas
- [ ] Autorización automática para cambiar el estado remoto

**Explanation:** `/goal` aporta un objetivo de larga duración y `/loop` añade comprobaciones periódicas, pero ninguno sustituye una prueba de aceptación ni una decisión humana sobre el alcance.

#### Q2: ¿Qué pruebas caracterizan deliberadamente defectos plantados en este kit?

- [x] `tests/sort-bug.test.ts` y `tests/export-columns.test.ts`
- [ ] `src/domains/payments/bucketing.ts` y `src/domains/payments/refund-service.ts`
- [ ] `tests/money.test.ts` y `src/lib/money.ts`
- [ ] `.cursor/rules/root.mdc` y `docs/tickets/HLN-101.md`

**Explanation:** El kit apunta a `tests/sort-bug.test.ts` y `tests/export-columns.test.ts` porque la suite caracteriza deliberadamente defectos plantados.

#### Q3: ¿Por qué una ejecución verde de `npm test` no es prueba de que los defectos de negocio de pagos estén corregidos?

- [ ] Porque la salida en verde siempre es un fallo de configuración
- [x] Porque la suite caracteriza defectos plantados, y en verde solo significa que esas aserciones pasan
- [ ] Porque el comando debe ejecutarse dos veces para contar
- [ ] Porque Hearthline requiere una suscripción en la nube para resultados en verde

**Explanation:** Las pruebas caracterizan deliberadamente defectos plantados, así que en verde significa que las aserciones plantadas pasan, no que los defectos de negocio estén corregidos.

#### Q4: ¿Por qué una ejecución en rojo debe terminar con un handoff de diagnóstico y no con un bucle ilimitado de reejecución hasta el verde?

- [ ] Porque git prohíbe ejecutar la suite más de una vez
- [ ] Porque un resultado en rojo prueba que la suite de pruebas está rota
- [x] Porque reejecutar hasta el verde oculta fallos de configuración y fomenta la deriva de alcance
- [ ] Porque el comando goal solo funciona una vez

**Explanation:** Reejecutar hasta el verde oculta fallos de configuración y fomenta la deriva de alcance, así que una ejecución en rojo termina con un handoff de diagnóstico, no con un bucle de reparación ilimitado.

#### Q5: ¿Qué exige este kit para completarse?

- [ ] Una comprobación recurrente desplegada con un límite de gasto
- [x] Un informe de comprobación de salud y un diff rastreado sin cambios desde la revisión base registrada
- [ ] Un parche commiteado que corrija los defectos plantados
- [ ] Una suscripción en la nube que vigile el pull request

**Explanation:** Completarse consiste en un solo informe de evidencia y un diff rastreado sin cambios, no en un trabajo recurrente desplegado ni en un parche.

## Complete

- [ ] Mark complete
