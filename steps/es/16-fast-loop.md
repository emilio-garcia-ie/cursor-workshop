---
step: 16
title: "Tab y Cmd+K: el bucle rápido"
points: 15
module: "The Fast Loop"
versions: ["medium", "long"]
personas: ["vibecoders", "developers", "data-scientists"]
---

# Paso 16 — Tab y Cmd+K: el bucle rápido (15 pts)

## Learn

Tab sugiere ediciones de varias líneas y de archivos relacionados; Tab acepta
una sugerencia y Escape la rechaza[10]. Inline Edit apunta al código
seleccionado con Cmd+K en macOS o Ctrl+K en Windows/Linux[11]. Usa la
autocompletación cuando el siguiente patrón sea claro, la edición de rango
seleccionado para una transformación acotada y al agente para una tarea cuyo
alcance requiera investigación. Las reglas del proyecto no se aplican a Tab ni a
Inline Edit, así que declara las restricciones relevantes en la solicitud de
edición[2].

El formateador está en `src/lib/money.ts`, no en `src/lib/csv.ts`. Sus pruebas
viven en `tests/money.test.ts`. El formateo es una cuestión periférica: cambiar
la presentación no debe convertir los centavos enteros almacenados en dólares de
punto flotante.

## Implement

1. En `tests/money.test.ts`, inicia un caso nuevo para `-123456` e inspecciona
   la sugerencia de Tab antes de aceptarla[10]. Exige `($1,234.56)`, no
   `-$1,234.56`. Actualiza la aserción negativa antigua solo en tu copia de
   alumno. Captura RED con `npm test -- tests/money.test.ts` antes de tocar la
   implementación.
2. Selecciona solo `formatCents` e invoca Inline Edit[11]:

```text
Render negative integer cents with parentheses around the existing currency
format. Preserve zero, positives, truncation, grouping, and two decimal digits.
Do not change toCents, callers, imports, or the stored representation.
```

3. Inspecciona el diff completo, no solo el rango resaltado. Ejecuta las pruebas
   puntuales y luego `npm test`. Conserva el parche como tu resultado de Inline
   Edit.
4. En una segunda copia de alumno limpia en la misma base, dale al agente el
   mismo requisito y las mismas pruebas. Compara alcance, ediciones rechazadas,
   tiempo de revisión y corrección; no inventes un ahorro de coste de tokens.

### Exercise kit — compara dos superficies de edición

#### Starter code path

En una rama de alumno desechable, lee `formatCents` y su aserción existente de
valores negativos. Registra la revisión base limpia. El requisito nuevo del
taller son los negativos al estilo contable: `-500` se convierte en `($5.00)`;
el cero y los valores positivos permanecen sin cambios. Este no es un requisito
de línea base existente, y no debes cambiar la consola compartida.

#### Expected diff

`src/lib/money.ts` más aserciones puntuales en `tests/money.test.ts`; `toCents`
y el almacenamiento de pagos permanecen sin cambios byte a byte.

#### Hints

- Comprueba `0`, `900`, `-500` y `-123456`.
- Rechaza explícitamente las completaciones que actualizan la lógica de negocio
  para acomodar un cambio solo de presentación.
- Declara las restricciones relevantes en la solicitud; las reglas del proyecto
  no restringen a Tab ni a Inline Edit[2].

#### Solution approach

Preserva el formateo de valor absoluto y envuelve la cadena final
`$1,234.56` para la entrada negativa. Reemplazar simplemente `-` por `(` deja un
paréntesis de cierre ausente; formatear `Math.abs(cents / 100)` demasiado pronto
puede cambiar el comportamiento de redondeo. Construye la cadena de moneda sin
signo existente y luego devuelve
`cents < 0 ? `(${formatted})` : formatted`. Conserva los pasos originales de
truncamiento, agrupación y relleno. El cambio de prueba del alumno expresa el
nuevo contrato.

#### Expected result

Tienes el cambio de formato con paréntesis en `src/lib/money.ts` con el
`tests/money.test.ts` actualizado, y el `npm test` completo pasa con `toCents`
y el almacenamiento de pagos sin cambios byte a byte.

> Screenshot placeholder: el formateador seleccionado, el diff en línea
> propuesto y las cuatro aserciones de entrada/salida; distingue la edición de
> pruebas de Tab de Inline Edit.

#### Stretch goal

Compara un cambio de una función con un requisito hipotético de formateo en todo
el locale. Lista los llamadores y contratos que harían la segunda tarea
inadecuada para la edición ciega de rango seleccionado. No amplíes el parche solo
para demostrar una ejecución mayor de agente.

### Common mistakes

- **Error 1:** Buscar `formatCents` en el helper de CSV en lugar del módulo de
  dinero.
- **Error 2:** Conservar la vieja expectativa `-$5.00` mientras se afirma que el
  nuevo contrato está en verde.
- **Error 3:** Asumir que las reglas restringen automáticamente Inline Edit o
  Tab[2].

## Pro tips

- **Consejo 1:** Guarda la revisión inicial y el prompt de ambas ejecuciones
  para que la comparación sea justa.
- **Consejo 2:** Lee cada completación aceptada: un nombre de prueba plausible
  puede ocultar un valor esperado erróneo.

## Advanced

El alcance decide la herramienta: un cambio de una función encaja en la edición
de rango seleccionado, mientras que un cambio en todo el locale abarca llamadores
y contratos y necesita un agente con un plan revisable, no una completación
ciega.

## Quiz

#### Q1: ¿Cómo aceptas o rechazas una sugerencia de Tab?

- [x] Tab acepta y Escape rechaza
- [ ] Enter acepta y Cmd+K rechaza
- [ ] Escape acepta y Tab rechaza
- [ ] Hacer clic acepta y escribir rechaza

**Explanation:** Tab acepta una sugerencia y Escape la rechaza.

#### Q2: ¿Qué archivo contiene el formateador `formatCents` y sus pruebas?

- [x] `src/lib/money.ts` y `tests/money.test.ts`
- [ ] `src/lib/csv.ts` y `tests/csv.test.ts`
- [ ] `src/domains/payments/queries.ts` y `tests/sort-bug.test.ts`
- [ ] `src/app/payments/page.tsx` y `tests/api.test.ts`

**Explanation:** El formateador está en `src/lib/money.ts` con pruebas en `tests/money.test.ts`, no en el helper de CSV.

#### Q3: ¿Por qué el cambio de formateo no debe alterar la representación almacenada?

- [ ] Porque el formateo se ejecuta antes que cualquier prueba
- [x] Porque los centavos enteros almacenados no deben convertirse en dólares de punto flotante
- [ ] Porque el módulo CSV es dueño de todo el código de dinero
- [ ] Porque Tab no puede editar archivos de producción

**Explanation:** Cambiar la presentación no debe convertir los centavos enteros almacenados en dólares de punto flotante.

#### Q4: ¿Qué error haría parecer el nuevo contrato en verde mientras sigue estando mal?

- [x] Conservar la vieja expectativa `-$5.00` mientras se afirma que el contrato de paréntesis está en verde
- [ ] Comprobar el cero y los valores positivos
- [ ] Inspeccionar el diff completo antes de aceptar
- [ ] Registrar la revisión base antes de editar

**Explanation:** Conservar la vieja expectativa negativa mientras se afirma que el nuevo contrato al estilo contable está en verde oculta el cambio real de contrato.

#### Q5: ¿Qué debe permanecer sin cambios byte a byte después de este paso?

- [ ] El formateador `formatCents`
- [ ] Las aserciones de prueba del alumno
- [x] `toCents` y el almacenamiento de pagos
- [ ] Las líneas de importación de `src/lib/money.ts`

**Explanation:** `toCents` y el almacenamiento de pagos permanecen sin cambios byte a byte mientras el formateador y las pruebas del alumno cambian.

## Complete

- [ ] Mark complete
