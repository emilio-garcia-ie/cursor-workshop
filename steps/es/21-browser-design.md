---
step: 21
title: "Navegador y modo Diseño: corrige lo que ves"
points: 15
module: "Debug & Test"
versions: ["long"]
personas: ["vibecoders", "developers"]
---

# Paso 21 — Navegador y modo Diseño: corrige lo que ves (15 pts)

## Learn

El navegador nativo de Cursor admite navegación, interacción, capturas de
pantalla e inspección de la consola sin instalar una herramienta de navegador
externa[16]. El modo Diseño vive en el navegador de la Agents Window:
selecciona un elemento y haz un prompt sobre él y su contexto de código[17]. La
inspección de red tiene una limitación de superficie en la documentación citada;
no asumas que cada diseño de navegador la expone[16].

Una captura de pantalla prueba la apariencia en un viewport particular, no la
corrección de la exportación. La exportación de Pagos del starter es un ancla en
`src/app/payments/page.tsx`, ya con estilo oscuro. No hay diálogo de exportación
hasta que el alumno implemente HLN-101. Elige una mejora concreta en lugar de
pedir construir un flujo inexistente.

## Implement

1. Captura la página inicial en un viewport estrecho y otro ancho registrados.
   Usa la selección de elementos del modo Diseño para apuntar al enlace[17],
   luego revisa el diff del código fuente.
2. Vuelve a la navegación normal. Verifica la etiqueta, la visibilidad del foco
   de teclado y la preservación de la consulta de búsqueda. Comprueba que la
   tabla y la búsqueda sigan siendo utilizables.
3. Sigue el enlace de exportación con datos sintéticos con semilla. Registra la
   URL solicitada, el tipo de contenido de la respuesta y el contenido real del
   CSV. Si una descarga del navegador es inaccesible, inspecciona por separado
   la respuesta de la ruta local y etiqueta esa evidencia como solo-API; no
   afirmes que el navegador la descargó.
4. Ejecuta `npm test -- tests/api.test.ts` y el `npm test` completo en el
   checkout de alumno. No «corrijas» en este kit la caracterización de valores
   predeterminados sensibles.

### Exercise kit — acción de exportación accesible con evidencia

#### Starter code path

Usa una copia de alumno con sus dependencias y su servidor de desarrollo en
ejecución. Lee la pantalla Pagos y la ruta de exportación. Registra el puerto y
la rama reales del servidor; no abras el servidor de otro propietario ni
inicies uno duplicado. El archivo `.cursor/mcp.example.json` es solo un ejemplo,
no una configuración de navegador activa; este kit usa el navegador
nativo[16]. Impulsa el cambio con:

```text
On /payments, select the existing Export link. Rename it Export CSV, add a
visible keyboard-focus treatment, and retain its search-aware href. Preserve
server-side export behavior and the planted defaults. Do not add a dialog,
change API routes, or alter data. Work only in this learner checkout.
```

#### Expected diff

Un parche solo de la pantalla Pagos, evidencia de viewport antes/después,
comprobación de foco y registro del comportamiento de exportación. Marca
explícitamente como no verificadas las capacidades del navegador que falten o
la evidencia de descarga.

#### Hints

- Inspecciona el `href` del ancla antes y después.
- Mantén constantes el viewport y la semilla al juzgar el cambio visual.
- Los campos CSV pueden contener saltos de línea entre comillas; un conteo
  ingenuo de líneas no es un analizador general de registros CSV.

#### Solution approach

La búsqueda por un ID de pago sintético debe seguir presente en la URL de
exportación después del cambio de etiqueta. La pantalla Pagos solicita 20 filas;
la ruta de exportación solicita hasta 10000. Un archivo descargado con más filas
que la página visible puede ser correcto. Compara contra el resultado completo
del mismo filtro, no contra el número de filas de tabla renderizadas
actualmente. Cambia el etiquetado de la acción y la presentación del foco sin
cambiar la consulta ni el endpoint de exportación. Las pruebas de la ruta sin
cambios establecen el comportamiento de línea base; una captura y una
comprobación de teclado establecen la aceptación visual separada.

#### Expected result

Tienes el parche solo de la pantalla Pagos con evidencia de viewport
antes/después y un registro del comportamiento de exportación, y `npm test`
pasa en el checkout de alumno.

> Screenshot placeholder: la acción `Export CSV` antes/después en el mismo
> viewport y el foco de teclado, acompañados de evidencia de respuesta
> censurada de datos sintéticos.

#### Stretch goal

Revisa el mismo parche de alumno en un viewport estrecho con un valor de
búsqueda largo. Si aparece desbordamiento, propón un cambio de diseño acotado y
nueva evidencia de aceptación; no rediseñes todo el panel.

### Common mistakes

- **Error 1:** Probar un diálogo del Paso 5 que no se ha implementado en esta
  rama de alumno.
- **Error 2:** Equiparar 20 filas visibles con toda la exportación filtrada.
- **Error 3:** Afirmar que una descarga o una inspección de red tuvo éxito a
  partir solo de una captura de pantalla.

## Pro tips

- **Consejo 1:** Mantén la aceptación visual y la aceptación de datos como
  filas separadas de la lista de verificación.
- **Consejo 2:** Registra el puerto, la rama, el viewport y el filtro reales
  junto a cada captura.

## Advanced

El navegador nativo y el modo Diseño hacen de la apariencia una superficie
inspeccionable, pero la apariencia no es corrección de datos[16][17]. Mantén la
aceptación visual y la aceptación de datos como filas de evidencia separadas.

## Quiz

#### Q1: ¿Qué admite el navegador nativo de Cursor sin una herramienta de navegador externa?

- [x] Navegación, interacción, capturas de pantalla e inspección de la consola
- [ ] Solo capturas en un viewport
- [ ] Solo inspección de red
- [ ] Solo relleno de formularios

**Explanation:** El navegador nativo admite navegación, interacción, capturas de pantalla e inspección de la consola sin instalar una herramienta de navegador externa.

#### Q2: ¿Qué elemento de qué archivo tiene como objetivo el ejercicio de modo Diseño de este paso?

- [x] El enlace Exportar existente en `src/app/payments/page.tsx`
- [ ] Un diálogo de exportación del Paso 5 que no se ha implementado
- [ ] La ruta de exportación en `src/app/api/payments/export/route.ts`
- [ ] La configuración de navegador `.cursor/mcp.example.json`

**Explanation:** El ejercicio apunta al enlace Exportar existente en la pantalla Pagos, que ya tiene estilo oscuro, y no hay diálogo de exportación hasta que se implemente HLN-101.

#### Q3: ¿Por qué un CSV descargado con más filas que la página visible puede ser correcto?

- [ ] Porque la página oculta filas extra
- [x] Porque la página solicita 20 filas mientras que la ruta de exportación solicita hasta 10000 para el mismo filtro
- [ ] Porque los archivos CSV nunca se filtran
- [ ] Porque las exportaciones ignoran las consultas de búsqueda

**Explanation:** La página visible solicita 20 filas mientras que la ruta de exportación solicita hasta 10000, así que compara contra el resultado completo del mismo filtro.

#### Q4: ¿Por qué está mal afirmar que una descarga del navegador tuvo éxito a partir solo de una captura de pantalla?

- [x] Porque una captura prueba la apariencia en un viewport, no la descarga ni la corrección de datos
- [ ] Porque las capturas siempre se eliminan
- [ ] Porque las descargas no pueden verificarse
- [ ] Porque el panel de red siempre está disponible

**Explanation:** Una captura de pantalla prueba la apariencia en un viewport particular, no la corrección de la exportación, así que la evidencia de descarga que falte debe marcarse como no verificada.

#### Q5: ¿Qué debe contener el parche completado?

- [x] Un cambio solo de la pantalla Pagos con evidencia de viewport antes/después y un registro del comportamiento de exportación, con `npm test` pasando
- [ ] Un diálogo de exportación nuevo con cambios de API
- [ ] Un diseño de panel rediseñado
- [ ] Un cambio en la caracterización plantada de valores predeterminados sensibles

**Explanation:** La completación es un parche solo de la pantalla Pagos con evidencia visual y de exportación, sin añadir un diálogo, cambiar rutas ni alterar los valores predeterminados plantados.

## Complete

- [ ] Mark complete
