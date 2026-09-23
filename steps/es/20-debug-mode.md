---
step: 20
title: "Modo Debug: hipótesis antes de la corrección"
points: 15
module: "Debug & Test"
versions: ["medium", "long"]
personas: ["developers", "data-scientists"]
---

# Paso 20 — Modo Debug: hipótesis antes de la corrección (15 pts)

## Learn

El modo Debug sigue hipótesis → instrumentación → reproducción → análisis de
registros → corrección dirigida → verificación y limpieza[18]. Puede ayudar a
investigar problemas de tiempos, pero no garantiza un tamaño de parche
particular[18]. Primero establece que el comportamiento supuesto existe
realmente en el código.

La ruta de exportación de la consola es síncrona en
`src/app/api/payments/export/route.ts`; no contiene la carrera del contador
global descrita previamente por este ejercicio. No inventes ese defecto de
runtime ni plantes uno nuevo. Usa el defecto existente de orden de importe en
una copia de alumno desechable, preservando la línea base compartida y el
alcance de solo diagnóstico de HLN-102.

## Implement

1. Revisa la instrumentación propuesta antes de ejecutarla. El modo Debug
   documenta un servidor de debug local para sus registros[18]; restringe los
   campos capturados a importes sintéticos, tipos, el resultado de rama y un ID
   de hipótesis.
2. Reproduce con `[900, 150000, 90000, 1500]` a través del fixture unitario
   existente. Conserva la traza y acepta, rechaza o pospone explícitamente cada
   hipótesis.
3. Después de la revisión, realiza la transición de contrato de prueba solo de
   alumno del Paso 14: primero el orden esperado numérico (RED), después el
   comparador (GREEN), y la aserción de API correspondiente. No repares defectos
   de exportación ni de agrupamiento.
4. Vuelve a ejecutar la misma reproducción y el `npm test` completo. Elimina la
   instrumentación temporal e inspecciona el diff final; verifica de nuevo
   después de la limpieza[18].

### Exercise kit — explicaciones en competencia para un orden incorrecto

#### Starter code path

Usa una rama de alumno fresca en la revisión original del starter, no la rama
ya corregida del Paso 14. Lee `src/domains/payments/queries.ts`,
`tests/sort-bug.test.ts` y el caso de orden de importe en `tests/api.test.ts`.
Ejecuta `npm test -- tests/sort-bug.test.ts` para establecer el contrato
plantado, luego impulsa la investigación con:

```text
In Debug Mode, investigate why 900 cents can appear before 150000 cents in
amount-descending results. Before editing behavior, propose at least three
hypotheses and the observation that would distinguish each. Instrument only
synthetic amount comparisons. No full payment objects, secrets, or remote calls.
Stop after reproduction so I can review the evidence before a learner-only fix.
```

#### Expected diff

Una tabla de hipótesis/evidencia, la salida RED/GREEN y un parche mínimo de
alumno limitado al asistente de ordenación y las aserciones relevantes. Sin
ediciones de la consola compartida. Si la instrumentación de runtime no está
disponible, envía un diagnóstico solo de código fuente marcado explícitamente
como tal, no una ejecución de Debug completada.

#### Hints

- Registra los valores brutos antes de la moneda formateada.
- Congela el fixture; cambiar tanto los datos como el comparador destruye la
  comparación.
- Confirma que el defecto plantado de orden de importe existe en la rama actual
  antes de hipotetizar sobre él.

#### Solution approach

Distingue (A) la comparación de cadenas, (B) la dirección invertida y (C) el
error de presentación solo de formateo. Una traza de `900` y `150000` que entran
como números, se convierten en `"900"` y `"150000"` y luego toman la rama léxica
respalda A. Si el arreglo crudo de la API ya está mal, C no puede explicarlo por
sí solo. El orden numérico invertido no produciría la secuencia completa
plantada de cuatro registros. Reemplaza la comparación léxica por una resta
numérica en un arreglo copiado. Muestra la nueva secuencia
`[150000, 90000, 1500, 900]`, el orden de entrada sin cambios y ninguna
sentencia de transporte o de registro de debug en el diff final del alumno.

#### Expected result

Tienes la tabla de hipótesis con evidencia RED/GREEN y un parche de ordenación
solo de alumno, y el diff final no contiene instrumentación de debug ni
sentencias de transporte.

> Screenshot placeholder: IDs de hipótesis junto a los valores de traza
> sintéticos, la verificación del orden numérico y el diff final sin
> instrumentación.

#### Stretch goal

Mantén el comparador sin cambios en otra copia de alumno y cambia solo el
fixture a importes iguales. Explica por qué ese caso no puede distinguir la
ordenación léxica de la numérica; añade un par discriminante en lugar de más
logs.

### Common mistakes

- **Error 1:** Afirmar una carrera de contadores sin encontrar un contador ni
  una ruta de escritura asincrónica.
- **Error 2:** Empezar desde la rama reparada del Paso 14 y reportar un defecto
  de línea base no reproducido.
- **Error 3:** Registrar registros de pago completos cuando cuatro enteros
  sintéticos responden la pregunta.

## Pro tips

- **Consejo 1:** Pregunta qué observación refutaría la hipótesis favorita antes
  de recolectar logs.
- **Consejo 2:** Verifica después de la limpieza igual que antes; los
  diagnósticos temporales forman parte del diff.

## Advanced

El modo Debug secuencia hipótesis, instrumentación, reproducción, análisis de
registros y verificación; una corrección solo es creíble con la evidencia que
distingue las explicaciones en competencia[18]. Primero establece que el
comportamiento supuesto existe realmente en el código.

## Quiz

#### Q1: ¿Cuál es la secuencia del modo Debug?

- [x] Hipótesis, instrumentación, reproducción, análisis de registros, corrección dirigida, verificación y limpieza
- [ ] Corrección, prueba, log, reproducción, verificación
- [ ] Instrumentación, corrección, limpieza, hipótesis
- [ ] Reproducción, hipótesis, parche, despliegue

**Explanation:** El modo Debug sigue las hipótesis hacia la instrumentación, la reproducción, el análisis de registros y la corrección dirigida, y luego la verificación y la limpieza.

#### Q2: ¿Qué dice el ejercicio sobre la ruta de exportación de la consola?

- [x] `src/app/api/payments/export/route.ts` es síncrona y no contiene la carrera del contador global
- [ ] `src/app/api/payments/export/route.ts` es dueña de la carrera de contadores
- [ ] `src/domains/payments/queries.ts` es la ruta de exportación
- [ ] La ruta debe hacerse asincrónica

**Explanation:** La ruta de exportación es síncrona y no contiene la carrera del contador global descrita previamente, así que ese defecto no debe inventarse.

#### Q3: ¿Qué evidencia respalda mejor la hipótesis de comparación de cadenas para un orden de importe incorrecto?

- [x] Una traza de 900 y 150000 que entran como números, se convierten en cadenas y luego toman la rama léxica
- [ ] Una captura de la pantalla Pagos
- [ ] Una hipótesis sin valores observados
- [ ] Una diferencia de presentación de moneda formateada por sí sola

**Explanation:** Una traza que muestra números convirtiéndose en cadenas y tomando luego la rama léxica respalda la hipótesis A, mientras que un error solo de presentación no puede explicar un arreglo crudo incorrecto.

#### Q4: ¿Por qué no debes afirmar una carrera de contadores sin encontrar un contador ni una ruta de escritura asincrónica?

- [x] Porque la ruta de exportación es síncrona, y primero el comportamiento supuesto debe existir realmente en el código
- [ ] Porque las carreras son imposibles en JavaScript
- [ ] Porque los contadores nunca se registran
- [ ] Porque el ticket requiere una afirmación de carrera

**Explanation:** La ruta es síncrona y no tiene contador global, así que la afirmación de carrera debe descartarse e investigarse el defecto que realmente existe.

#### Q5: ¿Qué debe contener el diff final del alumno?

- [ ] Objetos de pago completos y sentencias de transporte de debug
- [ ] Un contador asincrónico nuevo
- [x] El parche de ordenación sin instrumentación de debug ni sentencias de transporte después de la limpieza
- [ ] Una línea base compartida modificada

**Explanation:** Después de la limpieza el diff final no contiene instrumentación de debug ni sentencias de transporte, solo el parche de ordenación del alumno y su evidencia.

## Complete

- [ ] Mark complete
