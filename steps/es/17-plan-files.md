---
step: 17
title: "Archivos de plan: planes que sobreviven a la sesión"
points: 15
module: "The Fast Loop"
versions: ["medium", "long"]
personas: ["developers", "ai-engineers"]
---

# Paso 17 — Archivos de plan: planes que sobreviven a la sesión (15 pts)

## Learn

El modo Plan investiga el código y produce un plan revisable antes de
programar[8]. Los planes se guardan por defecto en el directorio personal;
**Guardar en el espacio de trabajo** mueve el plan al espacio de trabajo[8]. El
subdirectorio exacto `.cursor/plans/` es un **destino elegido por el taller**,
no un valor predeterminado automático del producto documentado. Guarda o mueve
explícitamente allí tu artefacto de alumno y verifica la ruta real.

Un plan duradero debe sobrevivir a un lector nuevo. Necesita la implementación
actual, un cambio solicitado preciso, decisiones, dependencias, pruebas y
condiciones de parada —no solo una lista de verbos esperanzadores. La pantalla
Pronósticos muestra actualmente tarjetas de métricas en
`src/app/forecasts/page.tsx`, no un gráfico de ocupación.

## Implement

1. Revisa el plan generado contra la página real. Elimina componentes de gráfico
   inventados, endpoints de analítica y afirmaciones de referencia no
   declaradas.
2. Usa Guardar en el espacio de trabajo[8], luego guarda o mueve explícitamente
   el artefacto a `.cursor/plans/occupancy-variance.md` en la copia de alumno.
   Verifica que el archivo exista en esa ruta elegida; no infieras su ubicación
   de la etiqueta del botón.
3. Inicia una conversación nueva y aporta ese archivo exacto como contexto. Pide
   al lector que reformule la fórmula, los desconocidos, el alcance propuesto
   del archivo y la primera prueba sin implementar. Compara la respuesta con los
   bytes guardados.
4. Revisa cualquier ambigüedad en el archivo, no solo en el chat antiguo.
   Inspecciona el diff: el plan debe ser el único artefacto añadido para este
   ejercicio.

### Exercise kit — un plan que otra sesión pueda auditar

#### Starter code path

Lee la pantalla Pronósticos y `src/domains/property/index.ts` en tu copia de
alumno. Pídele al modo Plan[8] solo una propuesta:

```text
Plan an occupancy variance card beside the existing Forecasts metric cards.
Use a workshop target of 95%, labeled as an assumption, not industry data.
Variance is actual occupancy minus target, in percentage points. No chart exists
in the starter. Explain the zero-unit case, data inputs, tests, and exact files.
Do not implement or change the shared starter. Stop for design approval.
```

#### Expected diff

Un plan guardado con rutas de origen, fórmula y unidades, comportamiento de
unidades cero, casos de prueba, un diff propuesto acotado, un revisor y una
puerta de aprobación. Adjunta la respuesta del handoff de la sesión nueva y la
ruta real del archivo.

#### Hints

- Escribe «objetivo proporcionado por el taller» junto al 95%.
- Pídele al segundo lector qué necesita aún antes de programar; los insumos
  faltantes son una salida útil.
- Verifica la ruta real guardada; la etiqueta del botón no garantiza
  `.cursor/plans/`[8].

#### Solution approach

Un `92.5%` real contra el objetivo elegido del `95%` da
`-2.5 percentage points`, no `-2.5% relative change`. El objetivo es un insumo
nuevo del ejercicio, no un campo ya presente en el almacén. Una cartera con
unidades cero necesita una decisión explícita de «N/A» en lugar de división por
cero. Un handoff suficiente nombra las tarjetas existentes, propone un cálculo
puro de variación con un comportamiento explícito para datos no disponibles, y
lista pruebas por debajo, en y por encima del objetivo más las unidades cero. No
crea un gráfico nuevo ni finge que la implementación ya pasó. Guarda o mueve
explícitamente al directorio elegido.

#### Expected result

Tienes el plan guardado en `.cursor/plans/occupancy-variance.md` en la copia de
alumno, y un lector nuevo reformula la fórmula y las decisiones abiertas
correctamente solo a partir del archivo.

> Screenshot placeholder: árbol de archivos que muestra la ruta elegida del plan
> junto a la fórmula del lector nuevo y el resumen de decisiones sin resolver.

#### Stretch goal

Cambia el objetivo del taller a un insumo de interesado sin resolver. ¿Puede el
plan aún identificar trabajo preparatorio independiente y un punto de parada
honesto? Un plan útil expone la dependencia en lugar de elegir silenciosamente
un valor predeterminado de producción.

### Common mistakes

- **Error 1:** Afirmar que Guardar en el espacio de trabajo selecciona
  necesariamente `.cursor/plans/`[8].
- **Error 2:** Planear una columna de variación en un gráfico que el starter no
  tiene.
- **Error 3:** Mezclar puntos porcentuales con cambio porcentual relativo o
  referencias inventadas.

## Pro tips

- **Consejo 1:** Revisa el archivo guardado de forma independiente del chat que
  lo generó; el contexto puede ocultar omisiones.
- **Consejo 2:** Pon un plan en control de versiones con una funcionalidad
  futura aprobada, pero no hagas commit durante este kit.

## Advanced

Un plan es un artefacto de diseño revisable que debe sobrevivir a un lector
nuevo. Cuando el objetivo es un insumo de interesado abierto, un buen plan nombra
la dependencia y un punto de parada honesto en lugar de elegir silenciosamente un
valor predeterminado de producción.

## Quiz

#### Q1: ¿Qué hace el modo Plan antes de programar?

- [ ] Edita el archivo más pequeño de inmediato
- [x] Investiga el código y produce un plan revisable antes de programar
- [ ] Ejecuta la suite de pruebas para adivinar una corrección
- [ ] Commitea una rama en borrador

**Explanation:** El modo Plan investiga el código y produce un plan revisable antes de escribir cualquier código.

#### Q2: ¿Dónde debe guardarse el artefacto del plan en este taller?

- [ ] La ubicación predeterminada del directorio personal
- [x] `.cursor/plans/occupancy-variance.md` en la copia de alumno
- [ ] `docs/tickets/HLN-102.md`
- [ ] Cualquier carpeta que sugiera la etiqueta del botón

**Explanation:** El subdirectorio exacto `.cursor/plans/` es un destino elegido por el taller, así que el archivo debe guardarse o moverse explícitamente allí y verificarse.

#### Q3: ¿Cómo se expresa un 92.5% real frente a un objetivo del 95%?

- [ ] Como un cambio relativo del -2.5%
- [ ] Como una tasa de ocupación del 2.5%
- [x] Como -2.5 puntos porcentuales, ya que la variación es la ocupación real menos el objetivo
- [ ] Como una referencia de la industria

**Explanation:** La variación es la ocupación real menos el objetivo en puntos porcentuales, así que el resultado es -2.5 puntos porcentuales, no un cambio porcentual relativo.

#### Q4: ¿Por qué está mal planear una columna de variación en un gráfico que el starter no tiene?

- [ ] Porque los gráficos son más rápidos de construir después
- [x] Porque no existe ningún gráfico en el starter, y el plan no debe inventar componentes de gráfico ni referencias no declaradas
- [ ] Porque la variación no puede mostrarse de forma visual
- [ ] Porque el plan debe incluir un endpoint de analítica

**Explanation:** El starter no tiene gráfico de ocupación, así que un plan que invente componentes de gráfico o referencias está fuera de alcance.

#### Q5: ¿Cuándo está completo este kit?

- [x] Cuando el plan esté guardado en la ruta elegida y un lector nuevo reformule la fórmula y las decisiones abiertas solo a partir del archivo
- [ ] Cuando la tarjeta de variación esté implementada y commiteada
- [ ] Cuando el modo Plan termine de escribir un borrador
- [ ] Cuando el objetivo del 95% se trate como datos de la industria

**Explanation:** Completarse exige el plan en la ruta elegida y un lector nuevo que reformule la fórmula y las decisiones abiertas correctamente solo a partir del archivo.

## Complete

- [ ] Mark complete
