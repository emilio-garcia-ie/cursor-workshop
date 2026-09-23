---
step: 22
title: "Desarrollo agéntico guiado por pruebas"
points: 15
module: "Debug & Test"
versions: ["medium", "long"]
personas: ["developers", "ai-engineers"]
---

# Paso 22 — Desarrollo agéntico guiado por pruebas (15 pts)

## Learn

TDD exige una aserción de aceptación observada y fallida antes del cambio de
implementación. Una aserción en verde existente es una útil cobertura de
regresión, no una fase RED. El starter ya pasa la selección vacía, el orden de
columnas solicitado y el escape de CSV en `tests/csv.test.ts`; `src/lib/csv.ts`
los implementa. No afirmes que repetir `toCSV([{ id: "pay-0001" }], [])`
descubre un fallo.

Las columnas predeterminadas sensibles de HLN-101 permanecen deliberadamente
plantadas en `src/domains/payments/export.ts`. Usa ese requisito incumplido para
un ciclo RED/GREEN real solo de alumno. Las pruebas y los hooks tienen alcances
diferentes: los hooks de Cursor cubren los eventos registrados, no cada push
externo ni cada estándar de negocio[5]. Nunca sustituyas un hook asumido por
ejecutar las pruebas tú mismo.

## Implement

Si el Paso 5 ya eliminó la fuga en esta copia, detente y selecciona la base de
alumno intacta. No reintroduzcas un defecto en el starter compartido solo para
conseguir RED.

1. En la copia de alumno, cambia el título y las aserciones de la prueba
   unitaria plantada de columnas predeterminadas existente al contrato de
   aceptación siguiente. Mantén cubiertas las columnas operativas. Cambia
   también solo la aserción de API de exportación predeterminada correspondiente
   para exigir la ausencia de ambas cabeceras sensibles.

```ts
expect(DEFAULT_EXPORT_COLUMNS).not.toContain("bank_account_last4");
expect(DEFAULT_EXPORT_COLUMNS).not.toContain("routing_number");
```

2. Ejecuta `npm test -- tests/export-columns.test.ts tests/api.test.ts`.
   Captura los fallos que muestran que los nombres sensibles fueron
   encontrados. Un import ausente, un error de sintaxis o un fallo de
   dependencias no cuenta como RED.
3. Entrega las aserciones fallidas al agente: «Haz que estas pasen cambiando
   solo la selección de exportación predeterminada. No cambies las pruebas, el
   helper de CSV, la UI, el comparador ni la lógica de agrupamiento. Preserva la
   selección vacía explícita y el orden solicitado.»
4. Inspecciona el parche. Ejecuta las pruebas puntuales,
   `npm test -- tests/csv.test.ts`, y el `npm test` completo. Registra GREEN
   solo después de que la suite completa del alumno pase.

### Exercise kit — un RED honesto después del Paso 5

#### Starter code path

Lee `docs/tickets/HLN-101.md`, `tests/csv.test.ts`,
`tests/export-columns.test.ts`, `tests/api.test.ts` y el helper/ruta de
exportación. Las dependencias deben estar instaladas. Crea una **rama de alumno
aislada y fresca desde la revisión original del starter**, no tu rama del Paso 5
ya completada; registra esa revisión y un diff inicial limpio. No reinicies ni
edites la consola compartida ni sobrescribas el trabajo anterior del alumno.
Ejecuta `npm test` y confirma que las aserciones actuales plantadas de columnas
predeterminadas pasan antes de continuar.

#### Expected diff

El arreglo de columnas predeterminadas y las dos transiciones de contrato de
prueba del alumno. El escape de CSV, la ordenación por importe, el agrupamiento
y la línea base compartida permanecen sin cambios. Envía la revisión base, la
salida RED, la salida GREEN y el diff revisado.

#### Hints

- Lee el ternario en la ruta antes de cambiarlo.
- No conserves a la vez aserciones de «debe contener» y «no debe contener» para
  el mismo contrato de alumno.
- Una aserción que ya pasa es cobertura de regresión, no una fase RED; el RED
  debe fallar en el contrato de aceptación.

#### Solution approach

Un parámetro `columns` omitido toma `DEFAULT_EXPORT_COLUMNS`; `?columns=`
se convierte en una selección vacía explícita. Eliminar los valores
predeterminados sensibles debería cambiar la cabecera del primer caso, no
convertir el segundo en una exportación predeterminada. El `status,id`
solicitado debe permanecer en ese orden. Este ejercicio acotado no completa la
UI de HLN-101 ni autoriza una política de acceso para columnas sensibles
solicitadas explícitamente. Elimina `bank_account_last4` y `routing_number` de
la lista predeterminada del alumno, preservando las columnas operativas y su
orden. Mantén las pruebas existentes de selección vacía y escape como
comprobaciones de regresión, no como pruebas RED reclamadas nuevas.

#### Expected result

Tienes el cambio de columnas predeterminadas solo de alumno con sus salidas RED
y GREEN, y el `npm test` completo del alumno pasa con el helper de CSV y la
línea base compartida sin cambios.

> Screenshot placeholder: aserciones de cabeceras sensibles que fallan antes de
> la edición del arreglo, ejecuciones puntuales y completas que pasan después, y
> el ID de base aislado del alumno.

#### Stretch goal

Añade una regresión de ruta para una cabecera `status,id` solicitada y una
consulta inválida demasiado larga, usando el estilo de prueba de ruta existente
de Vitest. Declara si cada una ya estaba admitida; que pase la cobertura nueva
no es evidencia de una funcionalidad implementada recientemente. Los directorios
README de e2e y contratos futuros no son suites de pruebas ejecutadas.

### Common mistakes

- **Error 1:** Reutilizar la rama reparada del Paso 5 y llamar RED a una prueba
  que ya pasa.
- **Error 2:** Debilitar aserciones o eliminar contratos plantados sin relación
  para poner la suite en verde.
- **Error 3:** Afirmar que faltaban pruebas de selección vacía cuando ya
  existen y pasan.

## Pro tips

- **Consejo 1:** Nombra los artefactos RED por el requisito violado, no solo
  por el color rojo de la terminal.
- **Consejo 2:** Mantén explícitas en el diff de revisión las transiciones de
  prueba de caracterización a aceptación.

## Advanced

TDD exige una aserción de aceptación observada y fallida antes del cambio de
implementación. Las pruebas y los hooks tienen alcances diferentes: los hooks de
Cursor cubren los eventos registrados, no cada push externo ni cada estándar de
negocio[5]. Nunca sustituyas un hook asumido por ejecutar las pruebas tú mismo.

## Quiz

#### Q1: ¿Qué exige TDD antes del cambio de implementación?

- [x] Una aserción de aceptación observada y fallida
- [ ] Un hook asumido que reporte el fallo
- [ ] Una suite de regresión en verde
- [ ] Un título de prueba renombrado

**Explanation:** TDD exige una aserción de aceptación observada y fallida antes del cambio de implementación; un hook asumido o una prueba en verde no es RED.

#### Q2: ¿Dónde están deliberadamente plantadas las columnas predeterminadas sensibles de HLN-101?

- [x] En la selección de exportación predeterminada en `src/domains/payments/export.ts`
- [ ] En `src/lib/csv.ts`
- [ ] En `tests/csv.test.ts`
- [ ] En `docs/tickets/HLN-101.md`

**Explanation:** Las columnas predeterminadas sensibles permanecen plantadas en la selección de exportación predeterminada en `src/domains/payments/export.ts`.

#### Q3: ¿Por qué una aserción que ya pasa es útil pero no es una fase RED?

- [ ] Porque las pruebas que pasan aún pueden fallar después
- [x] Porque es cobertura de regresión, y el RED debe fallar en el contrato de aceptación, como los valores predeterminados sensibles
- [ ] Porque las pruebas nunca deben editarse
- [ ] Porque verde siempre significa implementado

**Explanation:** Una aserción que ya pasa es cobertura de regresión, no una fase RED; el RED debe fallar en el contrato de aceptación de HLN-101 aún incumplido.

#### Q4: ¿Qué hay de malo en reutilizar la rama reparada del Paso 5 y llamar RED a una prueba que ya pasa?

- [x] Una aserción que ya pasa es cobertura de regresión, no una fase RED en el contrato de aceptación
- [ ] El nombre de la rama es demasiado largo
- [ ] Las ramas reparadas se ejecutan más rápido
- [ ] La suite completa debe permanecer en verde durante RED

**Explanation:** Reutilizar una rama reparada no puede producir un RED real, porque la aserción ya pasa; el RED debe fallar en el contrato de aceptación.

#### Q5: ¿Qué exige la completación en este paso?

- [x] Un cambio de columnas predeterminadas solo de alumno con salidas RED y GREEN y el `npm test` completo del alumno pasando con el helper de CSV y la línea base compartida sin cambios
- [ ] Una fuga reintroducida en el starter compartido para forzar RED
- [ ] Aserciones debilitadas para mantener la suite en verde
- [ ] Un hook nuevo para reemplazar la ejecución de las pruebas

**Explanation:** La completación es el cambio de columnas predeterminadas solo de alumno con salidas RED y GREEN, dejando el helper de CSV y la línea base compartida sin cambios.

## Complete

- [ ] Mark complete
