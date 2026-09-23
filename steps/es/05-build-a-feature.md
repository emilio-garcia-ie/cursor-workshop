---
step: 5
title: "Construye una funcionalidad"
points: 35
module: "Building"
versions: ["short", "medium", "long"]
personas: ["vibecoders", "developers", "data-scientists", "ai-engineers", "forward-deployed"]
---

# Paso 5 — Construye una funcionalidad (35 pts)

## Learn

Solicitud (las palabras de Jordan) vs ticket (`docs/tickets/HLN-101.md` +
criterios de aceptación) vs **modo Plan** (plan propuesto, aprobado antes del
código)[8]. Una frase es barata de corregir en el plan; un diff de 400 líneas
es una tarde.

## Implement

1. Abre el menú de modos con `Cmd+.` en macOS o `Ctrl+.` en Windows/Linux y
   luego selecciona Plan; `Shift+Tab` rota los modos[12]. Confirma la etiqueta
   Plan visible antes de solicitar el plan[8]. Elige un modelo disponible bajo
   tu plan y la política del equipo en lugar de asumir que uno es
   obligatorio[13].
2. Prompt: `@docs/tickets/HLN-101.md read the ticket and propose a plan:
   column selection in the export dialog, sensitive columns excluded by
   default, order preserved, empty selection returns an empty file.`
3. Aprueba el plan. Construye primero la validación del manejador de ruta
   (`src/app/api/payments/export/route.ts` ya valida con Zod — extiéndela),
   luego el diálogo.
4. La corrección de exportación reutiliza el constructor de consultas detrás
   de `GET /api/payments` (la tabla paginada no puede exportar del lado del
   cliente — las notas del ticket lo dicen). El orden del CSV y la selección
   vacía están cubiertos en `tests/csv.test.ts`; la aceptación de columnas
   predeterminadas pertenece a `tests/export-columns.test.ts` y
   `tests/api.test.ts`. Ejecuta `npm test` dos veces.
5. Verifica con el flujo de revisión del repo (la lista de verificación del
   Paso 11).

Estéate atento: mientras pruebas `?sort=amount&direction=desc` puedes notar
que el orden se ve mal (un pago de $9.00 por encima de $1,500.00). Registra el
**hallazgo de ordenación no reportado** para el Paso 14; no lo corrijas aquí.
HLN-102 es el ticket de totales mensuales solo para diagnóstico, no una
reparación de ordenación. La vieja etiqueta de ordenación de HLN-102 en los
comentarios del starter es histórica y entra en conflicto con el ticket real.

### Del plan a la evidencia

Un plan útil mapea cada criterio de aceptación con una costura de código y una
prueba. Aquí la costura está en el lado del servidor: el diálogo elige las
columnas, la ruta valida la solicitud y el helper de CSV preserva esa
elección. Revisa el plan antes de construir[8]; pregunta qué comportamiento
existente ya está cubierto en lugar de reescribir un helper que pasa para que
el diff parezca sustancial.

### Exercise kit

#### Starter code path

`hearthline-operator-console/src/app/api/payments/export/route.ts`,
`src/domains/payments/export.ts`, `src/app/payments/page.tsx`,
`src/lib/csv.ts` y `tests/csv.test.ts`; lee el ticket junto con ellos.
Localiza el control de exportación actual en la pantalla de Pagos antes de
añadir un diálogo.

#### Minimal working example

En el checkout del alumno, este patrón de prueba existente demuestra los dos
contratos de CSV sin requerir un navegador:

```ts
expect(toCSV([{ id: "p1", status: "late" }], ["status", "id"]))
  .toBe("status,id\nlate,p1\n");
expect(toCSV([{ id: "p1" }], [])).toBe("");
```

Usa los imports existentes de Vitest y el import de `toCSV` en
`tests/csv.test.ts`; estas aserciones ilustran comportamiento ya cubierto, no
cobertura nueva. En la funcionalidad del alumno, reemplaza las expectativas
plantadas de valores sensibles por defecto en `tests/export-columns.test.ts` y
`tests/api.test.ts` con aserciones de valor seguro por defecto para ambos
campos bancarios; conserva la cobertura de columnas operativas y el caso de
selección vacía explícita de la API. No conserves pruebas contradictorias ni
elimines la cobertura de regresión. Sonda una aplicación del alumno en
ejecución con:

```bash
npm test -- tests/csv.test.ts
curl -i 'http://localhost:3000/api/payments/export?columns=status,id'
curl -i 'http://localhost:3000/api/payments/export?columns='
npm test
```

#### Expected diff

La lista de columnas predeterminadas excluye ambos campos bancarios; la
interfaz de Pagos expone la selección; la ruta valida los nombres de columna
permitidos y preserva el orden; las pruebas de la funcionalidad cubren los
valores predeterminados, el orden del subconjunto y la selección vacía
explícita. Mantén la reutilización de consultas en el lado del servidor.
Ninguna reparación de ordenación de pagos ni de agrupamiento UTC pertenece a
este diff: deja intacta la narrativa de HLN-102.

#### Hints

- Omitir `columns` significa valores predeterminados; `columns=` significa la
  selección vacía del usuario. No reduzcas ambos al mismo valor de respaldo.
- Las pruebas de CSV existentes ya cubren el orden y la salida vacía. Una
  prueba del helper en verde no puede probar que el diálogo o la exportación
  predeterminada sean seguros.
- Compara la exportación con más de una página visible de pagos coincidentes;
  un CSV solo del lado del cliente puede pasar un fixture diminuto mientras
  omite la mayoría de las filas.

#### Solution approach

Aprueba un plan de criterio a prueba, añade una aserción que falle para los
sensibles por defecto, luego haz el cambio de implementación más pequeño.
Extiende la validación sin cambiar los nombres públicos de columna. Conecta el
diálogo con la solicitud al servidor y verifica cada criterio en la interfaz y
en la respuesta HTTP. Ejecuta toda la suite dos veces como se pidió arriba y
conserva las salidas reales.

#### Expected result

Ningún campo bancario está seleccionado por defecto; una solicitud `status,id`
produce ese orden de cabecera; una selección vacía explícita produce un cuerpo
de longitud cero, no cabeceras. Una exportación filtrada completa no se limita
a la página visible de la tabla. Registra un fallo como fallo, no como una
casilla marcada en el borrador de PR.

[SCREENSHOT: Diálogo de exportación con los campos sensibles sin marcar junto al CSV ordenado y la evidencia de respuesta vacía]

#### Stretch goal

Añade un caso de columna inválida a nivel de ruta y verifica un rechazo claro
en lugar de una columna CSV vacía en silencio. Mantén la anomalía de
ordenación fuera del alcance.

### Common mistakes

- **Error 1:** Construir antes de revisar el plan. Corrige el límite mientras
  es una frase, no después de que la interfaz esté conectada a los datos
  equivocados.
- **Error 2:** Exportar las filas paginadas del navegador. Reutiliza la ruta de
  consultas del lado del servidor identificada en el ticket.
- **Error 3:** Tratar la selección vacía como «seleccionar los
  predeterminados». Mantén la omisión y la vacuidad explícita distintas en la
  interfaz, la ruta y el helper.

## Pro tips

- **Consejo 1:** Revisa un criterio de aceptación por pasada del diff; anota
  su evidencia de prueba antes de seguir.
- **Consejo 2:** Usa `Shift+Tab` para rotar los modos[12], pero lee la etiqueta
  del modo seleccionado antes de enviar una solicitud de implementación.
- Las teclas de control difieren por plataforma — confirma las tuyas en los
  atajos de teclado[12].

## Advanced

Plan = documento de diseño revisable. Los seniors detectan abstracciones
equivocadas, los juniors aprenden descomposición. Las correcciones viven en el
plan, donde son baratas — no en el diff, donde son caras.

## Quiz

#### Q1: ¿Qué es el modo Plan en este paso?

- [ ] Un resumen del ticket escrito por Jordan
- [x] Un plan propuesto para la funcionalidad que se revisa y aprueba antes del código
- [ ] La descripción final del PR
- [ ] Una lista de defectos plantados para reparar

**Explanation:** El modo Plan es el plan propuesto, aprobado antes del código, de modo que una corrección es barata mientras aún es una frase.

#### Q2: ¿Dónde vive la validación de la solicitud de exportación?

- [ ] src/lib/csv.ts
- [ ] `src/app/payments/page.tsx`
- [x] `src/app/api/payments/export/route.ts`
- [ ] tests/csv.test.ts

**Explanation:** El manejador de ruta ya valida con Zod; extiéndelo ahí primero, luego construye el diálogo.

#### Q3: ¿Por qué la exportación debe reutilizar la ruta de consultas del lado del servidor y no las filas visibles de la tabla?

- [ ] Porque el código del lado del cliente no puede leer los campos de dinero
- [x] Porque la tabla paginada no puede exportar todos los pagos coincidentes, solo la página visible
- [ ] Porque el navegador no tiene soporte de CSV
- [ ] Porque la tabla muestra datos generados

**Explanation:** Las notas del ticket dicen que la tabla paginada no puede exportar del lado del cliente; reutiliza la ruta de consultas para que la exportación filtrada completa esté íntegra.

#### Q4: ¿Cuál es un error común contra el que advierte este paso?

- [ ] Revisar un criterio de aceptación por pasada del diff
- [ ] Registrar la anomalía de ordenación para el Paso 14
- [x] Tratar una selección vacía como «seleccionar los predeterminados»
- [ ] Ejecutar npm test dos veces

**Explanation:** Omitir columnas significa valores predeterminados; columns= significa la selección vacía del usuario, y ambos deben permanecer distintos en la interfaz, la ruta y el helper.

#### Q5: ¿Qué debe producir una selección vacía explícita?

- [ ] Los campos bancarios predeterminados
- [x] Un cuerpo de longitud cero, no cabeceras
- [ ] Un CSV solo con cabeceras
- [ ] Una página de error

**Explanation:** La selección vacía explícita produce un cuerpo de longitud cero, no cabeceras, según el resultado esperado.

## Complete

- [ ] Mark complete
