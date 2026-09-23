---
step: 32
title: "Canvas del cliente"
points: 15
module: "Bonus"
versions: ["long"]
personas: ["forward-deployed", "vibecoders"]
---

# Paso 32 — Canvas del cliente (15 pts)

## Learn

Los canvases son artefactos interactivos renderizados junto al chat, con una
vista guardada que puede reabrirse y revisarse[25]. Un artefacto útil de
discusión con el cliente aún necesita etiquetas de fuente, unidades, fechas y
limitaciones. Renderizar un gráfico no verifica las cifras ni convierte un
prototipo en un producto operativo.

Los canvases compartidos son instantáneas de solo lectura para los compañeros de
equipo. Compartir requiere un plan de pago, membresía de equipo, ajustes de
privacidad compatibles y una política de equipo habilitada[25]. No prometas que
un prospecto externo pueda abrir un enlace compartido. El kit produce por defecto
un borrador interno ficticio, no una publicación ni una automatización de reunión
reservada.

## Implement

### Exercise kit — un canvas sin benchmarks inventados

#### Starter code path

Reutiliza el Crestview ficticio del Paso 31. Define una hoja de trabajo sintética
explícita, independiente de la semilla real de la consola:

```text
Snapshot label: fictional demo, not customer telemetry
Units: 120; active leases: 108
Payment records this sample period: 100; late records: 12
Open work orders at snapshot: 18
External industry benchmark: unavailable
Workshop discussion target: 95% occupancy, not an industry statistic
```

Lee `src/data/store.ts` para las formas reales de los campos
`Property`/`Lease`/`Payment`/`WorkOrder`, y `src/app/forecasts/page.tsx` para
sus cálculos actuales de tarjetas de métricas. No llames a los números de la
hoja de trabajo datos semilla de Crestview ni infieras una automatización de
recargos por retraso implementada a partir de un campo de estado de pago.

1. Redacta un brief de canvas de una página: etiquetas de instantánea y fuente,
   tres medidas, limitaciones y tres acciones de discusión propuestas. Pide un
   canvas si está disponible[25]; de lo contrario, envía el mismo contenido como
   una hoja de trabajo sin conexión.
2. Recalcula manualmente todos los valores mostrados. Usa los denominadores en
   las etiquetas, no solo una insignia de porcentaje. Mantén vacía de forma
   explícita la comparación con la industria no disponible.
3. Mapea cada acción de discusión a la fuente actual o etíquetala como propuesta:
   revisar suposiciones de ocupación (Pronósticos), investigar registros tardíos
   (Pagos) y priorizar el trabajo abierto (Mantenimiento). No afirmes una
   optimización automática.
4. Revisa internamente sin publicar. Registra la disponibilidad de renderizado y
   compartido por separado; un borrador de contenido puede estar completo mientras
   el compartido en runtime no se haya probado.

#### Expected diff

Un canvas renderizado o un diseño sin conexión claramente etiquetado, una hoja
de cálculo, tres acciones de discusión atadas a la evidencia y una decisión de
audiencia y compartido. Sin analítica real de prospectos ni disparador automático
de reuniones.

#### Hints

- Añade «demo ficticia» a cada panel, no solo al pie de página.
- No compares valores sintéticos con un benchmark de la industria que no tenga
  fuente.

#### Solution approach

La ocupación es `108 / 120 = 90%`; el hueco hasta el objetivo elegido del 95% es
`-5 puntos porcentuales`. La proporción de registros tardíos es `12 / 100 = 12%`,
no una tasa en dólares de morosidad de alquiler. Dieciocho órdenes abiertas son
un recuento, no una tasa de incumplimiento de SLA sin fechas de vencimiento y un
tiempo de observación definido. Muestra las tres medidas correctamente
etiquetadas y el objetivo del taller como una suposición. Usa las pantallas
disponibles como ayudas de discusión, no como garantías de automatización de
recargos, triaje de mantenimiento o funciones de pronóstico predictivo.

#### Expected result

Tienes un canvas o un diseño sin conexión con denominadores etiquetados, una hoja
de cálculo manual, tres acciones atadas a la evidencia y una decisión de
audiencia y compartido, y no ocurrió ninguna analítica real de prospectos ni
ninguna publicación.

> Screenshot placeholder: el canvas ficticio con denominadores etiquetados,
> cálculos manuales y el benchmark no disponible; sin afirmación de compartido
> con clientes externos.

#### Stretch goal

Reemplaza el denominador de ocupación por «desconocido». El canvas debe mostrar
datos insuficientes en lugar de cero o un porcentaje seguro. Si más adelante
compartes internamente, verifica primero la elegibilidad y el acceso del
revisor[25].

### Common mistakes

- **Error 1:** Presentar la hoja de trabajo ficticia de 120 unidades como
  telemetría real de clientes obtenida de la semilla.
- **Error 2:** Convertir la proporción de registros de pago en una afirmación de
  morosidad en dólares.
- **Error 3:** Asumir que un enlace de Canvas compartido es público o está
  disponible en cada cuenta[25].

### Pro tips

- **Consejo 1:** Pon la fuente, la marca de tiempo, la unidad y el denominador
  junto a cada número mostrado.
- **Consejo 2:** Separa las superficies actuales del prototipo de las acciones de
  optimización para el cliente propuestas.

## Quiz

#### Q1: ¿Qué es un Canvas en este paso?

- [ ] Un informe público que cualquiera puede abrir
- [x] Un artefacto interactivo renderizado junto al chat con una vista guardada, reabrible y revisable
- [ ] Un panel del editor de código
- [ ] Una página web publicada

**Explanation:** Los canvases son artefactos interactivos renderizados junto al chat con una vista guardada que puede reabrirse y revisarse.

#### Q2: ¿Qué pantalla lee el alumno para sus cálculos actuales de tarjetas de métricas?

- [ ] `src/app/payments/page.tsx`
- [ ] `src/app/maintenance/page.tsx`
- [x] `src/app/forecasts/page.tsx`
- [ ] `src/app/inspections/page.tsx`

**Explanation:** El kit lee `src/app/forecasts/page.tsx` para sus cálculos actuales de tarjetas de métricas.

#### Q3: ¿Por qué no debe describirse la hoja de trabajo ficticia como telemetría de clientes?

- [ ] Porque 120 unidades es muy poco
- [ ] Porque la semilla de la consola lo incluye
- [x] Porque es una hoja de trabajo sintética explícita, independiente de la semilla real de la consola
- [ ] Porque Maya se negó a etiquetarla

**Explanation:** La hoja de trabajo es una hoja de trabajo sintética explícita etiquetada como demo ficticia, independiente de la semilla real de la consola.

#### Q4: ¿Qué interpretación se señala como error común respecto a los registros tardíos?

- [ ] Contar 12 registros tardíos
- [ ] Etiquetar el denominador
- [x] Convertir la proporción de registros de pago en una afirmación de morosidad en dólares
- [ ] Usar 108 arrendamientos activos como denominador

**Explanation:** La proporción de registros tardíos es 12/100, es decir, 12%, y no es una tasa en dólares de morosidad de alquiler.

#### Q5: ¿Qué debe seguir siendo cierto sobre el compartido después de la revisión interna?

- [ ] El canvas es público para el prospecto
- [ ] Se reservó una reunión automáticamente
- [x] No ocurrió ninguna publicación y la disponibilidad de compartido se registra por separado de la completación del contenido
- [ ] Se rellenó el benchmark externo

**Explanation:** El resultado esperado registra que no hubo publicación, con la disponibilidad de renderizado y compartido registrada por separado del borrador de contenido completado.

## Complete

- [ ] Mark complete
