---
step: 14
title: "El defecto que nadie reportó"
points: 20
module: "Bonus"
versions: ["medium", "long"]
personas: ["developers", "data-scientists", "ai-engineers"]
---

# Paso 14 — El defecto que nadie reportó (20 pts)

## Learn

Los defectos de ordenación silenciosos pueden devolver JSON válido y aun así
responder la pregunta de negocio equivocada. Aquí el comparador de importes del
starter compara centavos enteros como cadenas. La pantalla Pagos tiene una
cabecera Amount, no un control de ordenación por importe
(`src/app/payments/page.tsx`). Reproduce a través de la API en lugar de
pretender que existe una interacción de UI.

**Conciliación de tickets:** Lee los archivos reales en `docs/tickets/` antes de
asignar un ID. HLN-101 trata sobre opciones de exportación; HLN-102 trata sobre
los totales mensuales de tres propiedades y es de solo diagnóstico. Ninguno es
un ticket de reparación de ordenación numérica. Los comentarios en `queries.ts`
y `tests/sort-bug.test.ts` etiquetan el defecto de ordenación como «HLN-102 /
Step 12»; esa etiqueta histórica entra en conflicto con el ticket real. Para
este ejercicio, trata la ordenación como el **hallazgo de ordenación no
reportado**, y no reetiquetes ni edites el ticket ni la línea base compartidos.

## Implement

1. Solo en tu rama de alumno, cambia el nombre y el orden esperado de la prueba
   de ordenación a numérico descendente. Conserva la aserción de no mutación.
   Ejecuta `npm test -- tests/sort-bug.test.ts`; captura el fallo de aserción,
   no un error de import o de dependencias.
2. Pide la corrección mínima del comparador, preservando el arreglo de entrada.
   No permitas que el agente debilite ni elimine la nueva aserción de
   aceptación.
3. Cambia la aserción plantada de API, solo de alumno, a monotonía numérica y
   máximo numérico primero. Luego ejecuta
   `npm test -- tests/sort-bug.test.ts tests/api.test.ts` y el `npm test`
   completo. Deja intactos los contratos de defectos de exportación y de
   agrupamiento.
4. Si ya hay un servidor de desarrollo de alumno en ejecución, consulta su
   puerto real con
   `/api/payments?sort=amount&direction=desc&pageSize=100`; compara cada importe
   adyacente, no solo el primero. Redacta una descripción de revisión sin
   inventar un ID de ticket; no se requiere commit, push ni envío de PR.

### Exercise kit — orden numérico, solo copia de alumno

#### Starter code path

Inicia una rama de alumno separada desde la revisión del starter sin modificar.
Lee `src/domains/payments/queries.ts`, `tests/sort-bug.test.ts` y el caso de
orden plantado en `tests/api.test.ts`. Registra la revisión base y ejecuta
`npm test` antes de cambiar nada. Las pruebas existentes afirman
deliberadamente el orden incorrecto; se espera una línea base en verde.

#### Expected diff

El comparador más los dos casos de prueba de alumno relevantes; sin UI de
ordenación, limpieza sin relación, ediciones de ticket ni cambios del starter
compartido.

#### Hints

- Compara números antes de formatear.
- Copia el arreglo antes de ordenar.
- Un fallo de la suite completa por una expectativa plantada antigua significa
  que el contrato de prueba necesita una transición explícita y revisada, no
  que el comparador nuevo esté mal.

#### Solution approach

Para `[900, 150000, 90000, 1500]`, el comparador plantado devuelve
`[90000, 900, 150000, 1500]`. El orden numérico descendente debe devolver
`[150000, 90000, 1500, 900]`; este fixture de cuatro registros es evidencia más
fuerte que inspeccionar a ojo una única fila superior sembrada. La
implementación puede devolver
`[...payments].sort((a, b) => b.amountCents - a.amountCents)`. El fixture
unitario prueba el orden de magnitud; la prueba de API prueba que la ruta lo
usa. Registra los comandos RED y GREEN por separado.

#### Expected result

Tienes el comparador numérico descendente y los dos casos de prueba de alumno
actualizados en tu propia rama, y `/api/payments?sort=amount&direction=desc`
devuelve los importes en estricto orden numérico descendente.

> Screenshot placeholder: la salida de aserciones RED/GREEN de cuatro registros
> y el diff revisado del comparador, con los títulos reales de los tickets
> visibles por separado.

#### Stretch goal

Busca comparaciones de cadenas similares y clasifica cada una como ordenación
de texto válida o ordenación numérica sospechosa. No corrijas otros hallazgos.

### Common mistakes

- **Error 1:** Llamar a esto una reparación de HLN-102 por un comentario de
  código obsoleto.
- **Error 2:** Añadir una prueba numérica en verde después de que el comparador
  ya esté corregido y llamarla RED.
- **Error 3:** Eliminar todas las pruebas de defectos plantados en lugar de
  cambiar solo el contrato de este ejercicio de alumno.

### Pro tips

- **Consejo 1:** Incluye tanto un par de prefijo (`900`, `90000`) como un par
  de longitud de dígitos (`900`, `150000`).
- **Consejo 2:** Mantén el starter compartido intacto para que el siguiente
  alumno pueda reproducir el defecto.

## Quiz

#### Q1: ¿Por qué puede ser peligroso un defecto de ordenación silencioso?

- [ ] Siempre hace caer el servidor
- [x] Devuelve JSON válido que responde la pregunta de negocio equivocada
- [ ] Hace fallar cada prueba unitaria
- [ ] Bloquea la ruta de exportación

**Explanation:** Un defecto de ordenación silencioso puede devolver JSON válido y aun así responder la pregunta de negocio equivocada.

#### Q2: ¿Dónde compara el comparador de importes del starter los centavos enteros como cadenas?

- [ ] `src/app/payments/page.tsx`
- [ ] `src/lib/money.ts`
- [x] `src/domains/payments/queries.ts`
- [ ] `tests/sort-bug.test.ts`

**Explanation:** El comparador de importes plantado vive en `src/domains/payments/queries.ts`, mientras que la pantalla Pagos no tiene control de ordenación.

#### Q3: ¿Por qué este defecto de ordenación debe tratarse como un hallazgo no reportado y no como una reparación de HLN-102?

- [ ] Porque HLN-102 ya está corregido
- [ ] Porque la ordenación no es una preocupación de pagos
- [x] Porque el ticket real HLN-102 trata sobre totales mensuales y es de solo diagnóstico, y el comentario de código es una etiqueta histórica
- [ ] Porque HLN-101 cubre la ordenación

**Explanation:** El comentario de código que etiqueta el defecto como HLN-102 entra en conflicto con el ticket real de solo diagnóstico de totales mensuales, así que la ordenación sigue siendo un hallazgo no reportado.

#### Q4: ¿Qué hay de malo en añadir una prueba numérica en verde después de que el comparador ya esté corregido y llamarla RED?

- [ ] Nada, porque el verde es la meta del RED
- [x] La fase RED debe capturar una aserción fallida antes de la corrección; una prueba en verde después de la corrección no demuestra RED
- [ ] Las pruebas no pueden editarse en una rama de alumno
- [ ] La aserción debería debilitarse en su lugar

**Explanation:** El RED debe capturarse antes de la corrección, así que una prueba en verde añadida después de corregir el comparador no prueba una fase RED.

#### Q5: ¿Qué se requiere para completar este paso?

- [ ] Un control de ordenación nuevo en la pantalla Pagos
- [x] Un comparador numérico descendente y los dos casos de prueba de alumno actualizados en tu propia rama, con la API devolviendo orden estrictamente descendente
- [ ] Una edición de los títulos de tickets del starter compartido
- [ ] Un pull request commiteado y con push con un ID de ticket nuevo

**Explanation:** La completación es el comparador solo de alumno y los dos casos de prueba actualizados con la API devolviendo importes en estricto orden numérico descendente.

## Complete

- [ ] Mark complete
