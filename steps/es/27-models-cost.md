---
step: 27
title: "Enrutamiento de modelos y coste"
points: 10
module: "Team & Scale"
versions: ["medium", "long"]
personas: ["developers", "ai-engineers", "forward-deployed"]
---

# Paso 27 — Enrutamiento de modelos y coste (10 pts)

## Learn

La fuente del 16 de septiembre nombra los modos de Auto como **Cost, Balance,
Intelligence** —no Balanced— y factura las solicitudes al precio de lista del
modelo enrutado[13]. La disponibilidad y la facturación dependen del plan. Pro,
Pro Plus y Ultra tienen pools de Cursor Models y Other Models; Start excluye
Other Models y Auto[13]. Las solicitudes de terceros de Teams y Enterprise
añaden una tarifa de tokens de Cursor, incluidas las rutas de Auto
aplicables[13]. No conviertas una tabla de tarifas fechada en una promesa de
precio atemporal.

Compara el coste por resultado aceptado, no solo la respuesta más barata. Separa
el uso del modelo, la asignación incluida, el excedente facturado, la latencia y
el tiempo de revisión humana. La Analytics API exclusiva de Enterprise
proporciona métricas de uso[30]; no suministra todas las medidas de calidad de
entrega y no es obligatoria para esta hoja de trabajo.

## Implement

### Exercise kit — una comparación justa de dos ejecuciones

#### Starter code path

Usa la misma revisión del alumno y el prompt de solo lectura dos veces. Lee
`src/domains/payments/queries.ts` y `tests/sort-bug.test.ts`. Elige un
presupuesto de uso supervisado y pequeño antes de ejecutar nada. Si la
visibilidad del modelo elegible o del uso no está disponible, completa la rúbrica
y marca las medidas como ausentes en lugar de inventarlas.

```text
Explain the amount comparator for [900, 150000, 90000, 1500]. Return actual
order, correct numeric order, source evidence, and a non-mutation check.
Do not edit files or call remote services. Distinguish the unreported sort
finding from the actual HLN-102 monthly-total ticket.
```

1. En una cuenta elegible, usa Auto **Balance** para una ejecución[13]. Registra
   la selección mostrada, el modelo real si se expone, la fecha, el plan y la
   evidencia de uso.
2. Ejecuta el prompt idéntico con un modelo explícito disponible[13] en una
   sesión nueva con los mismos archivos. No compares una corrección de erratas
   con un diagnóstico difícil y llames a la diferencia un resultado de calidad
   del modelo.
3. Califica cada uno contra cuatro comprobaciones: orden léxico, orden numérico,
   no mutación y alcance correcto del ticket. Registra el tiempo transcurrido y
   el esfuerzo de revisión humana.
4. Inspecciona el uso disponible en los ajustes del editor o en el panel de
   uso[13]. Registra los valores medidos con unidades; etiqueta como desconocido
   un coste por ejecución no disponible.

#### Expected diff

Dos filas de ejecución comparables con prompt/revisión, selección del modelo,
puntuación de corrección, tiempo de revisión, evidencia de uso fechada y una
decisión de enrutamiento tentativa. Deja los campos no disponibles en blanco con
una explicación.

#### Hints

- Lee las tarifas del fuente y los requisitos de plan[13] en el momento de la
  evaluación.
- No infieras ahorros de caché ni identidad oculta del modelo a partir de una
  respuesta rápida.

#### Solution approach

Supón que dos intentos hipotéticos cuestan $0.03 y $0.09. Si solo el segundo
cumple las cuatro comprobaciones, el coste total por resultado aceptado es
$0.12, no $0.03. Estos son números de la hoja de trabajo, no precios de Cursor
ni resultados observados. El consumo del uso incluido tampoco tiene por qué
igualar una factura inmediata. Selecciona la opción de menor coste solo entre
las ejecuciones que cumplan la aceptación. Si la atribución de costes no está
disponible o la muestra es demasiado pequeña, concluye «evidencia insuficiente»
y conserva una política provisional en lugar de una afirmación de ahorro.

#### Expected result

Tienes dos filas de ejecución comparables y correctamente puntuadas con
evidencia de uso fechada y una decisión de enrutamiento, y cualquier medida no
disponible queda en blanco con una explicación.

> Screenshot placeholder: etiquetas de enrutamiento redactadas y evidencia de
> uso junto a la tabla de puntuación de la misma tarea; oculta los
> identificadores de cuenta y los detalles de pago.

#### Stretch goal

Repite algunas tareas pareadas antes de proponer una política de equipo. Rastrea
los fallos de calidad de forma independiente de las métricas de adopción. Max
Mode está documentado solo para planes antiguos basados en solicitudes[13]; no
lo añadas como requisito universal del taller ni lo describas como eliminado
globalmente.

## Pro tips

- **Consejo 1:** Incluye los reintentos y el esfuerzo de revisión al decidir si
  una ejecución barata fue económica.
- **Consejo 2:** Fecha los supuestos de tarifa y distingue el coste medido de un
  cálculo ilustrativo.

### Common mistakes

- **Error 1:** Escribir Auto/Balanced en lugar de la etiqueta Balance
  documentada[13].
- **Error 2:** Asumir que Auto, ambos pools de uso o recargos idénticos existen
  en cada plan[13].
- **Error 3:** Declarar un modelo superior después de comparar tareas distintas
  o faltar datos de coste.

## Advanced

Las decisiones de coste son provisionales. Una preferencia de enrutamiento que
vale para una tarea y un plan no se generaliza a otro sin una medida nueva y
comparable; las tablas de tarifas son evidencia fechada, no un contrato
atemporal.

## Quiz

#### Q1: ¿Cuáles son los modos de Auto documentados en la fuente del 16 de septiembre?

- [ ] Standard, Plus, y Ultra
- [ ] Balanced, Cost, y Speed
- [x] Cost, Balance, e Intelligence
- [ ] Auto, Balance, y Max

**Explanation:** La fuente nombra los modos de Auto como Cost, Balance e
Intelligence, no «Balanced», y factura al precio de lista del modelo enrutado.

#### Q2: ¿Qué archivo y prueba lee el alumno para la comparación de dos ejecuciones?

- [ ] `src/app/api/payments/export/route.ts` y `tests/api.test.ts`
- [x] `src/domains/payments/queries.ts` y `tests/sort-bug.test.ts`
- [ ] `docs/tickets/HLN-101.md` y `tests/csv.test.ts`
- [ ] `src/lib/csv.ts` y `tests/money.test.ts`

**Explanation:** La ruta de código inicial lee `src/domains/payments/queries.ts`
y `tests/sort-bug.test.ts` para el prompt de solo lectura.

#### Q3: Dos ejecuciones cuestan $0.03 y $0.09, y solo la ejecución de $0.09 cumple las cuatro comprobaciones. ¿Cuál es el coste por resultado aceptado?

- [ ] $0.03
- [ ] $0.09
- [x] $0.12
- [ ] Evidencia insuficiente

**Explanation:** Este paso calcula el coste total por resultado aceptado en
$0.12 porque se cuentan ambos intentos, no el precio más barato de una sola
ejecución.

#### Q4: ¿Qué etiqueta se señala como error documentado en este paso?

- [ ] Auto Balance
- [ ] Auto Cost
- [x] Auto Balanced
- [ ] Auto Intelligence

**Explanation:** Escribir «Auto/Balanced» en lugar de la etiqueta Balance
documentada se enumera como error 1.

#### Q5: ¿Qué debe hacer el alumno cuando la visibilidad del coste por ejecución no está disponible?

- [ ] Estimar el coste a partir de la longitud de la respuesta
- [x] Dejar el campo en blanco con una explicación
- [ ] Usar la factura del mes anterior
- [ ] Inferirlo del nombre del plan

**Explanation:** El resultado esperado deja las medidas no disponibles en blanco
con una explicación en lugar de inventarlas.

## Complete

- [ ] Mark complete
