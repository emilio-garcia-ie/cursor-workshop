---
step: 4
title: "Contexto: lo que Cursor recuerda"
points: 20
module: "Foundations"
versions: ["medium", "long"]
personas: ["developers", "data-scientists", "ai-engineers", "forward-deployed"]
---

# Paso 4 — Contexto: lo que Cursor recuerda (20 pts)

## Learn

El contexto son la evidencia y las instrucciones disponibles para esta tarea,
no una promesa de que el agente recuerda todo el repositorio. El contenido de
las reglas aplicadas se incluye al inicio del contexto del modelo[1]. Los
skills se cargan de forma progresiva[9]; los subagentes reciben su propio
contexto suministrado por el padre[34]. Decide lo que necesita cada tarea en
lugar de adjuntar todo el recorrido de incorporación.

Detalles de cada categoría (qué la llena y cómo mantenerla pequeña):

- **Prompt del sistema** — sobrecarga fija. Presupuéstala.
- **Herramientas** — los integrados más los servidores MCP. Desactiva los
  servidores MCP sin usar en Customize[3][6]. Una CLI puede simplificar una
  tarea, pero los comandos y las salidas también se convierten en contexto de
  la tarea; no los presupuestes como gratuitos.
- **Reglas** — las reglas `alwaysApply` se adjuntan de forma amplia; las reglas
  con alcance se adjuntan al coincidir[1]. Por eso el Paso 3 prefirió globs.
- **Skills / subagentes** — las descripciones de los skills favorecen el
  descubrimiento y los cuerpos se cargan cuando se invocan[9]. Un subagente
  necesita su propio handoff acotado[34].
- **Conversación** — prompts, respuestas, archivos leídos y salidas de
  comandos. Mantén un handoff de tarea compacto en lugar de asumir que los
  detalles antiguos siguen siendo utilizables.
- **Espacio libre** — deja espacio para la siguiente investigación y su
  evidencia. Mide el resultado en lugar de inferir calidad solo de un medidor.

## Implement

Después de la exploración que acabas de hacer, haz un balance de la sesión:
¿qué está ocupando espacio ahora y qué del recorrido puede irse? Empieza un
chat nuevo para la próxima tarea. Lleva adelante las decisiones y la evidencia
que necesita la siguiente tarea, no un multiplicador de costo asumido para cada
mensaje antiguo.

### Exercise kit

#### Starter code path

`hearthline-operator-console/docs/tickets/HLN-101.md`,
`src/app/api/payments/export/route.ts`, `src/domains/payments/export.ts`
y `src/lib/csv.ts`. Estos cuatro archivos son un conjunto de evidencia
deliberadamente pequeño.

#### Minimal working example

Abre el panel lateral con `Cmd+I` / `Ctrl+I`[12]. Usa este prompt en un chat
nuevo, adjuntando explícitamente los cuatro archivos de arriba:

```text
Explain the export column flow using only these four files.
Do not edit. Distinguish omitted columns from an explicitly empty selection.
Return a file:line reference for each conclusion and list missing evidence.
Do not infer table pagination behavior from the CSV helper.
```

Repite en un chat nuevo por separado con solo el ticket adjunto. Mantén la
pregunta y el modelo iguales. Pide la evidencia que falta antes de permitir más
lecturas. Esto prueba la suficiencia de la evidencia, no qué modelo suena más
seguro.

#### Expected diff

Ninguno en archivos de aplicación o configuración. Mantén una tabla A/B en el
chat: insumos proporcionados, archivos adicionales leídos realmente,
conclusiones sin respaldo y si la pregunta sobre la selección vacía se
respondió correctamente.

#### Hints

- Estar en el disco no es prueba de que un archivo se haya leído. Inspecciona
  las lecturas de archivos y los pasajes citados antes de aceptar la respuesta.
- Una respuesta solo con el ticket debería identificar la evidencia de
  implementación que falta; una afirmación de implementación segura sin una
  lectura es un fallo.
- Si el agente lee fuera del conjunto permitido, registra la desviación. No
  describas esa ejecución como un experimento de contexto restringido exitoso.

#### Solution approach

Traza el valor predeterminado de columna omitida, la selección explícita y la
salida CSV usando la ejecución con cuatro archivos. Para la ejecución solo con
el ticket, acepta una declaración de requisitos más una petición de inspeccionar
la implementación. Compara primero la corrección y el alcance; registra el uso
de tokens solo si la interfaz lo proporciona. Trata «no leas un archivo» como
una instrucción, no como una frontera de seguridad.

#### Expected result

Tienes un handoff compacto que identifica su evidencia y su incertidumbre, y no
reclama ninguna exclusión de indexación, control de acceso ni ahorro
porcentual de este experimento.

[SCREENSHOT: Selección de contexto con cuatro archivos y tabla A/B de evidencia, incluida una respuesta con evidencia faltante]

#### Stretch goal

Quita `src/lib/csv.ts` del primer prompt. ¿Puede el agente explicar el análisis
de selección de la ruta mientras se niega honestamente a comprobar las
comillas del CSV?

### Common mistakes

- **Error 1:** Adjuntar todo `src` para una pregunta de cuatro archivos.
  Empieza pequeño y deja que una brecha de evidencia demostrada justifique la
  siguiente lectura.
- **Error 2:** Llamar a una referencia de archivo prueba de recuperación. Abre
  el pasaje citado y verifica que respalda la conclusión.
- **Error 3:** Llevar la respuesta entre los chats A/B. Mantén los experimentos
  independientes o marca la comparación como contaminada.

## Pro tips

- **Consejo 1:** Conserva un handoff de decisión/evidencia, no todo el
  recorrido.
- **Consejo 2:** Pregunta «¿qué no pudiste establecer?» antes de pedir
  ediciones.

- Revisa el contexto antes de iniciar algo grande; límpialo entre tareas sin
  relación.
- Señala archivos específicos con `@` en lugar de un «explora el repo» amplio.
- Nombra las sesiones a las que volverás en lugar de mantenerlas abiertas todo
  el día.
- Revisa lo que te cuestan los servidores MCP y desconecta los pesados que
  están inactivos[3].

## Advanced

El mapa de arquitectura del Paso 2 puede convertirse en un artefacto de
incorporación, pero aún puede quedar obsoleto: conserva las referencias de
archivo y vuelve a comprobarlas después de los cambios. Mide tu propio
experimento de contexto en lugar de asumir un ahorro de 2–3x; la elección del
modelo y el plan afectan los costos de uso[13]. El campo `paths` de un skill
acota el descubrimiento a los archivos coincidentes, y los skills anidados del
proyecto pueden acotarse a su directorio; ninguno implica que todo skill
personal siga una sesión remota[9].

Distinción opcional: **Projects beta** de Cursor mantiene un contexto
compartido y usa un coordinador que delega la implementación[36]. Ese producto
con nombre es diferente al proyecto de este repositorio. El ejercicio local de
cuatro archivos no requiere ninguna configuración de Projects.

## Quiz

#### Q1: ¿Qué significa «contexto» en Cursor?

- [x] La evidencia y las instrucciones disponibles para la tarea, no una promesa de que el agente recuerda todo el repositorio
- [ ] Todo el repositorio cargado en memoria
- [ ] Solo el prompt del sistema
- [ ] El número de tokens en la conversación

**Explanation:** El contexto es la evidencia y las instrucciones disponibles para esta tarea; no es una promesa de que el agente recuerde todo el repositorio.

#### Q2: ¿Qué cuatro archivos componen el conjunto de evidencia deliberadamente pequeño?

- [ ] Todo src más el ticket
- [x] HLN-101.md, la ruta de exportación, `export.ts` y `src/lib/csv.ts`
- [ ] root.mdc, money.mdc, time.mdc y api-routes.mdc
- [ ] package.json, README.md, tests y hooks.json

**Explanation:** El conjunto de evidencia inicial es el ticket, la ruta de exportación, `src/domains/payments/export.ts` y `src/lib/csv.ts`.

#### Q3: ¿Por qué deben desactivarse los servidores MCP sin usar?

- [ ] Porque dejan de funcionar después de una sesión
- [ ] Porque aún no están instalados
- [x] Porque las herramientas forman parte del contexto y los servidores inactivos consumen presupuesto sin ayudar a la tarea
- [ ] Porque solo los planes de pago pueden activarlos

**Explanation:** Las herramientas, los integrados más los servidores MCP, llenan el contexto; desactiva los servidores sin uso y mantén pequeño el presupuesto de la tarea.

#### Q4: ¿Cuál es un error común contra el que advierte este paso?

- [ ] Empezar pequeño y añadir lecturas cuando falta evidencia
- [ ] Mantener independientes los chats A/B
- [x] Adjuntar todo src para una pregunta de cuatro archivos
- [ ] Verificar que los pasajes citados respaldan la conclusión

**Explanation:** Adjuntar todo src para una pregunta de cuatro archivos es un error; empieza pequeño y deja que una brecha de evidencia demostrada justifique la siguiente lectura.

#### Q5: ¿Qué debe evitar reclamar el handoff?

- [ ] Qué evidencia se proporcionó
- [ ] Qué incertidumbre queda
- [x] Una exclusión de indexación o un ahorro porcentual de este experimento
- [ ] Si la pregunta sobre la selección vacía se respondió correctamente

**Explanation:** El handoff no reclama ninguna exclusión de indexación, control de acceso ni ahorro porcentual de este experimento.

## Complete

- [ ] Mark complete
