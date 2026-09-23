---
step: 1
title: "Día uno: conoce al equipo"
points: 5
module: "Foundations"
versions: ["short", "medium", "long"]
personas: ["vibecoders", "developers", "data-scientists", "ai-engineers", "forward-deployed"]
---

# Paso 1 — Día uno: conoce al equipo (5 pts)

## The project

**Contrato de recorridos:** `../tracks.md` es la fuente de verdad de la pertenencia a los selectores de versión y persona. El frontmatter `versions` refleja esos conjuntos de versiones; los arrays `personas` conservados describen el énfasis didáctico, no los metadatos del selector. Cuando el énfasis difiere, usa el recorrido canónico: los pasos visibles son la versión seleccionada intersectada con la persona seleccionada, incluida long. El énfasis no añade un paso a un recorrido ni cambia sus puntos.

Hearthline es una plataforma de gestión de propiedades residenciales en Austin, Texas — unas 40 personas, Serie A, ~200 clientes de gestión de propiedades. El producto en el que trabajarás se llama **la consola del operador**: la herramienta interna que el personal usa para ver el movimiento del dinero de los pequeños negocios que cobran alquileres.

La consola tiene cinco pantallas. Haz clic en cada una antes de conocer a alguien:

- **Panel** — ocupación, morosidad, renovaciones próximas, órdenes de trabajo abiertas
- **Propiedades** — lista de propiedades con búsqueda, detalle por unidad
- **Pagos** — cada pago, buscable, con exportación. Tu primer ticket vive aquí
- **Mantenimiento** — órdenes de trabajo, asignación de proveedores, seguimiento de SLA
- **Pronósticos** — proyecciones de ocupación e ingresos (el dominio de Maya)

Una pantalla aún no existe: **Inspecciones** (inspecciones programadas con listas de verificación y fotos). Construirla es el Build Battle al final.

## Implement

Bienvenido a Hearthline. Te uniste al equipo que es dueño de la consola del operador.

- **Priya Raman**, líder de ingeniería. Te entrega un ticket el primer día y espera que lo envíes. Es exigente con el formato de los PR. Prefiere especificaciones antes que código.
- **Jordan Osei**, jefa de operaciones de clientes. Su equipo vive en la consola. Presenta las quejas reales y detecta patrones que nadie más ve.
- **Maya Chen**, científica de datos. Construye Pronósticos. Usa notebooks y Python. Tiene curiosidad por cómo Cursor maneja código que no es web.

Cómo trabaja este equipo (Priya lo mantiene breve):

1. Lee `.cursor/rules/root.mdc`, luego `.cursor/rules/money.mdc` y
   `.cursor/rules/time.mdc`. Las reglas del proyecto viven en `.cursor/rules`
   como archivos `.mdc` y están bajo control de versiones[1].
2. Los tickets viven en `docs/tickets/`. El tuyo (HLN-101) lleva tu nombre.
3. ¿Preguntas? Escribe a Priya. Suerte.

### De una solicitud a un límite

Jordan describe un problema; Priya lo convierte en criterios de aceptación. Tu
trabajo no es mejorar toda función de pagos cercana. Es hacer el cambio
solicitado y mostrar evidencia de que funciona. HLN-101 es el ticket de
opciones de exportación; las convenciones de dinero y tiempo son restricciones
sobre ese trabajo, no una licencia para reparar cada defecto plantado durante
la incorporación.

Si la aplicación todavía no está corriendo, usa el recorrido del código aquí y
haz el recorrido de pantallas después del Paso 2. Abre el panel lateral del
agente con `Cmd+I` en macOS o `Ctrl+I` en Windows/Linux[12]. Dale una primera
solicitud acotada:

```text
Read docs/tickets/HLN-101.md and .cursor/rules/root.mdc.
Do not edit or run setup. Tell Priya:
1. What Jordan needs.
2. Which acceptance criteria define done.
3. What the ticket explicitly says about server-side export.
Cite the file and passage for each answer; flag anything you cannot verify.
```

### Exercise kit

#### Starter code path

`hearthline-operator-console/docs/tickets/HLN-101.md`, junto a
`hearthline-operator-console/.cursor/rules/root.mdc`, `money.mdc` y
`time.mdc`. Estos son tus insumos, no archivos que reescribir hoy.

#### Expected diff

Ninguno. Mantén un handoff de tres líneas en el chat. Ejecuta
`git status --short` en tu checkout de la consola del alumno antes y después;
los cambios existentes deben permanecer igual. Priya pidió comprensión antes de
la implementación.

#### Hints

- Separa a quien solicita de quien revisa: Jordan es dueña de la queja;
  Priya es dueña de la conversación de entrega.
- Lee las Notes del ticket con el mismo cuidado que sus casillas.
- Si el agente añade un requisito, pregunta qué pasaje lo respalda.

#### Solution approach

Lee el ticket tú mismo, compara sus cuatro criterios de aceptación con el
resumen del agente y corrige cualquier alcance inventado. Menciona la ruta de
exportación como punto de partida de una investigación, no como una solución
que ya hayas verificado.

#### Expected result

Tienes un handoff de tres líneas que cubre las columnas seleccionables, los
campos sensibles excluidos por defecto, el orden solicitado y un archivo vacío
para la selección vacía, y explica por qué exportar solo la página visible de
la tabla no basta.

[SCREENSHOT: HLN-101 junto al handoff de tres líneas, con visible la nota sobre la exportación en el lado del servidor]

### Common mistakes

- **Error 1:** Empezar con ediciones. Hoy el entregable es un handoff preciso,
  no una rama de funcionalidad sorpresa.
- **Error 2:** Tratar el resumen del modelo como si fuera el ticket. Verifica
  cada criterio contra la fuente antes de decir que lo entiendes.
- **Error 3:** Corregir de inmediato una anomalía de ordenación cercana.
  Regístrala como el hallazgo de ordenación no reportado para el Paso 14, no
  como HLN-102. El ticket real HLN-102 trata sobre totales mensuales y permite
  solo diagnóstico; mantén esta solicitud rastreable hasta HLN-101.

### Hábitos de trabajo

- **Consejo 1:** Pide una frase explícita de «fuera del alcance» antes de
  programar.
- **Consejo 2:** Mantén juntos la solicitud de negocio y la restricción de
  ingeniería; cualquiera de las dos por separado produce un handoff incompleto.

#### Stretch goal

Explica el mismo ticket una vez a Jordan sin jerga de implementación y otra
vez a Priya con la restricción del lado del servidor. Ninguna versión puede
ampliar el alcance.

## Quiz

#### Q1: ¿Qué es la consola del operador de Hearthline?

- [ ] Un sitio web público que los clientes usan para pagar el alquiler
- [x] Una herramienta interna que el personal usa para ver el movimiento del dinero de los clientes de gestión de propiedades
- [ ] Un entorno de notebooks de ciencia de datos
- [ ] Un marketplace de listados de propiedades

**Explanation:** La consola del operador es la herramienta interna que el personal usa para ver el movimiento del dinero de los pequeños negocios que cobran alquileres.

#### Q2: ¿Qué pantalla aún no existe?

- [ ] Pagos
- [ ] Pronósticos
- [x] Inspecciones
- [ ] Mantenimiento

**Explanation:** Inspecciones, las inspecciones programadas con listas de verificación y fotos, es la pantalla que aún no existe y se convierte en el Build Battle.

#### Q3: ¿Por qué las convenciones de dinero y tiempo deben tratarse como restricciones de HLN-101 y no como una licencia para reparar cada defecto plantado?

- [ ] Porque reparar defectos plantados está prohibido en el taller
- [x] Porque el ticket define un cambio acotado y las convenciones lo respaldan, no un mandato para reparar defectos sin relación durante la incorporación
- [ ] Porque las convenciones de dinero y tiempo son guías opcionales
- [ ] Porque solo Maya puede tocar el código de dinero

**Explanation:** HLN-101 es el ticket de opciones de exportación; las convenciones de dinero y tiempo restringen ese trabajo, no autorizan a reparar cada defecto plantado.

#### Q4: ¿Cuál es el entregable correcto para el primer día?

- [ ] Un diálogo de exportación totalmente implementado
- [ ] Una rama de funcionalidad sorpresa
- [x] Un handoff de tres líneas que resume el ticket y su evidencia
- [ ] Una lista de todos los defectos del código

**Explanation:** El entregable del primer día es un handoff de tres líneas preciso, no una rama de funcionalidad sorpresa.

#### Q5: ¿Qué punto debe cubrir el handoff de tres líneas?

- [ ] Una auditoría completa de todos los defectos plantados
- [ ] Una reescritura de la pantalla de Pagos
- [x] Por qué exportar solo la página visible de la tabla no basta
- [ ] Una implementación de exportación en el lado del servidor

**Explanation:** El handoff debe explicar por qué exportar solo la página visible de la tabla no basta, junto con los puntos de columnas y sensibilidad del ticket.

## Complete

- [ ] Mark complete
