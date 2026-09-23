---
step: 24
title: "Grafos de conocimiento: cuándo merecen la pena"
points: 10
module: "Debug & Test"
versions: ["long"]
personas: ["data-scientists", "ai-engineers"]
---

# Paso 24 — Grafos de conocimiento: cuándo merecen la pena (10 pts)

## Learn

Un grafo de código representa entidades y relaciones: los archivos importan
módulos, las funciones llaman a funciones, los registros referencian otros
registros. Son tipos de arista distintos. Un resultado de grafo es una hipótesis
derivada del índice hasta que lo verificas contra el fuente; no puede
establecer intención de negocio ni alcanzabilidad en tiempo de ejecución solo
porque dos nombres estén conectados.

Cursor admite herramientas MCP y otras capacidades del protocolo, incluidos
prompts, recursos, roots, elicitation y MCP Apps interactivas[3]. Eso no
proporciona un servidor de grafos de código integrado. El
`.cursor/mcp.example.json` de la consola es un ejemplo, no una configuración
activa ni una conexión verificada. Este ejercicio no requiere ningún proveedor
de grafos, indexer, credenciales ni servicio remoto.

## Implement

### Exercise kit — construye y cuestiona un pequeño mapa de relaciones

#### Starter code path

En la copia de alumno, lee `src/data/store.ts`,
`src/domains/payments/payment-service.ts`, `src/domains/payments/queries.ts`,
`src/domains/payments/export.ts`, `src/app/api/payments/export/route.ts` y
`src/lib/csv.ts`. Produce primero un mapa basado solo en el fuente. No subas el
repositoritorio ni modifiques la línea base compartida.

```text
Map how the export route gets payments, chooses columns, and serializes cells.
For every edge give type (import, call, or data reference) and file:line evidence.
Then explain Payment.leaseId without claiming it is a runtime join. Return
missing edges and uncertainties. Do not install tools or change configuration.
```

1. Dibuja una pequeña tabla de adyacencia con nodo, tipo de arista, destino y
   ubicación en el fuente. Mantén el formateo (`formatCents`) separado del CSV
   crudo `amount_cents`.
2. Responde «¿Qué cambia si cambia la lista de columnas predeterminadas?» usando
   el mapa. Inspecciona los llamantes reales y las pruebas para confirmar el
   impacto propuesto.
3. Compara opcionalmente con una herramienta de grafos de código **ya
   aprobada**. Registra proveedor/versión, revisión indexada, exclusiones,
   aristas devueltas y comprobaciones del fuente. No instales un servidor sin
   especificar solo para completar la tabla.
4. Puntúa ambos enfoques por aristas correctas, aristas falsas, aristas
   ausentes y tiempo de inspección. Sin una herramienta de grafos, envía el mapa
   del fuente y etiqueta explícitamente la comparación de herramientas como no
   probada.

#### Expected diff

Un mapa de relaciones tipado, dos preguntas de impacto respondidas y una
decisión de mantener/posponer con evidencia. No hace falta ningún archivo MCP
activo ni cambios en el código de producción.

#### Hints

- Traza la importación real aunque salte un índice público de dominio;
  regístralo como estructura existente, no como un patrón a copiar.
- Comprueba la frescura del índice antes de juzgar una arista aparentemente
  ausente.

#### Solution approach

La ruta de exportación llama a `listPayments` y `toCSV`, y lee
`DEFAULT_EXPORT_COLUMNS`. `Payment.leaseId` es una referencia de datos; no
demuestra que exportar invoque un servicio de arrendamiento. Un grafo que
etiquete cada relación como «llamada» contaría la historia equivocada incluso
con los nombres de archivo correctos. Conserva las relaciones confirmadas de la
ruta al listado, a los valores predeterminados y al CSV; rechaza una llamada
inventada de la exportación al servicio de arrendamiento salvo que el fuente la
establezca. Un repositorio pequeño puede no justificar el coste ni la superficie
de acceso de un indexer nuevo.

Si un proveedor aprobado posterior usa STDIO local, la forma documentada del
proyecto usa `mcpServers`, `type: "stdio"` explícito y `command`; la
interpolación de entorno es compatible[3]. Una forma compatible no es un
servidor probado, y los campos de STDIO no son un requisito universal de
transporte remoto[3][4].

#### Expected result

Tienes un mapa de adyacencia del fuente tipado, dos preguntas de impacto
respondidas y una decisión de mantener/posponer con evidencia, y no se cambió
ningún archivo MCP ni código de producción.

> Screenshot placeholder: tabla de adyacencia del fuente junto a las
> importaciones verificadas; etiqueta cualquier resultado indexado opcional con
> su revisión y sus aristas no verificadas.

#### Stretch goal

Pregunta qué pruebas notarían un cambio de columna predeterminada frente a un
cambio de formateo de moneda. Verifica la respuesta contra
`tests/export-columns.test.ts`, `tests/api.test.ts` y `tests/money.test.ts`;
identifica las limitaciones de un grafo de importaciones puro para predecir la
cobertura de comportamiento.

## Pro tips

- **Consejo 1:** Distingue las referencias de datos de las llamadas ejecutables
  antes de contar la precisión del grafo.
- **Consejo 2:** Registra la revisión indexada para que una respuesta obsoleta
  no se haga pasar por un defecto del fuente.

### Common mistakes

- **Error 1:** Asumir que la disponibilidad de MCP significa que un servicio de
  grafos de código ya está instalado.
- **Error 2:** Tratar un campo `leaseId` como prueba de un join en tiempo de
  ejecución.
- **Error 3:** Afirmar ahorros de tokens sin medir tareas comparables y la
  sobrecarga del índice.

## Advanced

El grafo es una ayuda de búsqueda, no un veredicto. Cada arista que reportes
debe ser reverificable en el fuente, y cada afirmación de ahorro o de cobertura
debe provenir de una comparación medida en la misma tarea, no de la forma del
diagrama.

## Quiz

#### Q1: ¿Qué representa una arista en el grafo de código basado en el fuente en este paso?

- [ ] Una afirmación de que dos funciones comparten un objetivo de negocio
- [x] Una relación tipada como importación, llamada o referencia de datos con evidencia del fuente
- [ ] Una garantía en tiempo de ejecución de que un servicio alcanza a otro
- [ ] Prueba de que dos nombres comparten intención

**Explanation:** El grafo de este paso usa aristas tipadas como importación,
llamada y referencia de datos que se verifican contra el fuente, y no puede
establecer por sí solo intención de negocio ni alcanzabilidad en tiempo de
ejecución.

#### Q2: ¿Qué archivo lee el alumno para trazar el flujo de datos de la exportación?

- [ ] `docs/tickets/HLN-103.md`
- [x] `src/app/api/payments/export/route.ts`
- [ ] `.cursor/mcp.example.json`
- [ ] `src/app/forecasts/page.tsx`

**Explanation:** La ruta de código inicial lista
`src/app/api/payments/export/route.ts` entre los archivos que hay que leer al
construir el mapa de relaciones.

#### Q3: ¿Por qué debe reportarse Payment.leaseId como referencia de datos y no como prueba de un join en tiempo de ejecución?

- [ ] Porque leaseId no se usa nunca en ninguna parte de la consola
- [ ] Porque las referencias de datos son menos importantes que las importaciones
- [x] Porque una referencia de datos no demuestra que exportar invoque un servicio de arrendamiento
- [ ] Porque Jordan pidió que los datos de arrendamiento se mantuvieran privados

**Explanation:** La ruta de exportación no llama a un servicio de
arrendamiento, así que etiquetar esa relación como «llamada» describiría mal el
flujo real.

#### Q4: Un compañero afirma que el ejemplo `.cursor/mcp.example.json` prueba que un servicio de grafos de código está disponible. ¿Qué dice este paso?

- [ ] Es una conexión verificada y activa
- [x] Es un ejemplo, no una configuración activa ni una conexión verificada
- [ ] Es necesario para que el ejercicio pase
- [ ] Prueba que un indexer remoto está instalado

**Explanation:** El `.cursor/mcp.example.json` de la consola es material de
ejemplo, no una configuración activa ni una conexión verificada, y no se
requiere ningún proveedor de grafos.

#### Q5: ¿Qué entregable pertenece al resultado esperado de este paso?

- [ ] Un servidor de grafos de código recién instalado con credenciales
- [ ] Una ruta de exportación de producción reescrita
- [x] Un mapa de adyacencia del fuente tipado con una pregunta de impacto respondida y una decisión de mantener/posponer
- [ ] Un archivo de configuración MCP activo

**Explanation:** El resultado esperado es un mapa del fuente tipado, preguntas
de impacto respondidas y una decisión de mantener/posponer sin ningún archivo
MCP ni código de producción cambiado.

## Complete

- [ ] Mark complete
