---
step: 23
title: "Entrada y generación de imágenes"
points: 10
module: "Debug & Test"
versions: ["long"]
personas: ["vibecoders", "developers"]
---

# Paso 23 — Entrada y generación de imágenes (10 pts)

## Learn

Los modelos capaces de visión pueden leer imágenes, y las herramientas
documentadas de Composer 2.5 incluyen la generación de imágenes a partir de
texto o de imágenes de referencia[14]. La disponibilidad sigue teniendo que
comprobarse en tu sesión. Canvas es una superficie de artefactos distinta[25];
no es la fuente de ninguna afirmación sobre generación de imágenes o sobre la
ruta de salida de una imagen.

Para este taller, **solicita, guarda o mueve explícitamente** una imagen
generada hacia `assets/` en tu copia de alumno. Ese es un **destino elegido por
el taller**, no un valor predeterminado de Cursor[14]. Un archivo ahí no es
automáticamente un recurso web servido públicamente. Mantén la creación de
artefactos separada de la integración en la aplicación.

## Implement

### Exercise kit — un brief visual acotado

#### Starter code path

Usa una captura de tu página Pagos de la copia de alumno en un viewport
registrado, solo con datos sintéticos. Lee `.cursor/rules/components.mdc` y
`src/app/payments/page.tsx`. No rompas la UI compartida para fabricar un
defecto. Marca una mejora deseable en una copia de la captura, como un
etiquetado más claro de la acción `Export`; separa el estado observado del
diseño solicitado.

```text
Read this synthetic Payments screenshot. Identify the Export action and propose
one clarity improvement without changing behavior. Separately generate a muted,
rounded clipboard/checkmark concept for a proposed Inspections feature. No text,
customer logos, or claims that Inspections already exists. Save or move the image
to my learner assets/inspections-concept.png only if the actual format is PNG;
otherwise retain its real extension and report the actual path. Do not wire it
into the application or claim assets/ is publicly served.
```

1. Envía la captura a un modelo capaz de visión disponible[14]. Compara su
   descripción con la página real antes de aceptar cualquier parche de UI
   propuesto.
2. Solicita la imagen conceptual[14]. Inspecciona las dimensiones reales, el
   formato, la legibilidad a tamaño pequeño y si la forma cumple el brief. Si la
   generación no está disponible, conserva el prompt y marca la salida como
   «no generada».
3. Coloca el archivo explícitamente en el destino elegido para el alumno y
   verifica su existencia. No afirmites que el directorio de salida inicial del
   modelo fuera `assets/`.
4. Escribe una revisión del artefacto con la propiedad de la fuente/referencia,
   las propiedades solicitadas frente a las reales, los detalles
   aceptados/rechazados y la integración aún pendiente.

#### Expected diff

Anotación de la captura, prompt de generación, imagen revisada u honesto
bloqueador por indisponibilidad, y la ruta elegida real. Sin ediciones de la
consola compartida, sin ruta nueva ni afirmación de servir recursos en
producción.

#### Hints

- Usa tu propia referencia sintética en lugar de la pantalla de clientes de un
  tercero.
- Comprueba el archivo en sí, no solo una vista previa de la imagen en el chat.

#### Solution approach

Una atractiva imagen de portapapeles es un concepto de diseño, no una pantalla
de Inspecciones que funcione; HLN-103 dice que esa función todavía no existe. Si
la salida es WebP, renombrar el sufijo a `.png` no la convierte; conserva el
formato real y registra la discrepancia con el entregable solicitado. Acepta un
concepto solo después de revisar el brief y el archivo real, guárdalo o muévelo
explícitamente al `assets/` del alumno y mantén la aplicación sin cambios. Una
tarea de integración posterior debe decidir la ruta de servicio, el
dimensionamiento, la accesibilidad y el comportamiento de respaldo antes de
cambiar la UI.

#### Expected result

Tienes una captura anotada, un prompt de generación y una imagen conceptual
revisada (u honesto bloqueador por indisponibilidad) colocados en una ruta de
alumno registrada, y la consola compartida y su aplicación permanecen sin
cambios.

> Screenshot placeholder: anotación de entrada redactada y vista previa del
> concepto generado junto al formato/dimensiones verificados del archivo y la
> ruta de alumno elegida.

#### Stretch goal

Usa una imagen de referencia propia para solicitar una segunda variante[14].
Compara silueta, paleta y legibilidad a tamaño pequeño con una rúbrica fija. No
equipares la similitud visual con permiso para reutilizar el diseño de un
tercero.

## Pro tips

- **Consejo 1:** Combina una región anotada con una solicitud medible, como una
  etiqueta de acción legible.
- **Consejo 2:** Revisa la imagen generada como material de fuente, no como
  evidencia automática de una función publicada.

### Common mistakes

- **Error 1:** Citar Canvas[25] para la generación en lugar de la evidencia de
  la herramienta de imágenes[14].
- **Error 2:** Tratar `assets/` como destino automático de Cursor o como
  directorio web público.
- **Error 3:** Afirmar que existe una UI de Inspecciones porque se generó un
  concepto de icono.

## Advanced

La generación de imágenes y la integración en la aplicación son pasos distintos.
El concepto va al `assets/` del alumno para su revisión; conectarlo a una ruta,
elegir el servicio y el dimensionamiento, y añadir accesibilidad y respaldos son
decisiones separadas y futuras. Nada de este kit cambia la consola compartida.

## Quiz

#### Q1: ¿Qué superficie documentada de Cursor admite la generación de imágenes a partir de texto o imágenes de referencia?

- [ ] Canvas
- [x] La evidencia de la herramienta de imágenes de Composer 2.5
- [ ] La ruta de Pagos
- [ ] El servidor web público

**Explanation:** Las herramientas documentadas de Composer 2.5 incluyen la
generación de imágenes a partir de texto o de imágenes de referencia, mientras
que Canvas es una superficie de artefactos distinta.

#### Q2: ¿Dónde coloca explícitamente el alumno la imagen conceptual revisada en este paso?

- [ ] `src/app/assets/`
- [x] `assets/` en la copia de alumno
- [ ] `.cursor/rules/`
- [ ] El directorio público de la consola compartida

**Explanation:** El kit indica solicitar, guardar o mover explícitamente la
imagen generada a `assets/` en la copia de alumno, un destino elegido por el
taller y no un valor predeterminado de Cursor.

#### Q3: ¿Por qué el concepto generado de portapapeles/verificación no es evidencia de que exista una pantalla de Inspecciones?

- [ ] Porque las imágenes generadas siempre son marcas de agua de marcador de posición
- [ ] Porque solo Maya puede previsualizar pantallas nuevas
- [x] Porque HLN-103 indica que la función Inspecciones todavía no existe
- [ ] Porque los renders de Canvas se rechazan automáticamente

**Explanation:** Una imagen conceptual es un artefacto de diseño, no una
pantalla que funcione, y HLN-103 dice que la función Inspecciones todavía no
existe.

#### Q4: ¿Qué debes hacer si la herramienta de generación devuelve un archivo WebP pero el entregable espera un PNG?

- [ ] Renombrar el sufijo a .png y reportar éxito
- [x] Conservar el formato real y registrar la discrepancia con el entregable solicitado
- [ ] Convertirlo al volver a guardarlo en la vista previa del chat
- [ ] Descartarlo y afirmar que la generación no estaba disponible

**Explanation:** Renombrar el sufijo WebP a .png no convierte el archivo, así
que hay que conservar el formato real y registrar la discrepancia.

#### Q5: ¿Qué debe permanecer sin cambios después de completar este paso?

- [ ] La carpeta `assets/` del alumno
- [ ] El prompt de generación
- [x] La consola compartida y su aplicación
- [ ] La captura anotada

**Explanation:** El resultado esperado mantiene la consola compartida y su
aplicación sin cambios, añadiendo solo artefactos del alumno.

## Complete

- [ ] Mark complete
