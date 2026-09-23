---
step: 29
title: "El arnés: cómo encaja todo"
points: 15
module: "Team & Scale"
versions: ["medium", "long"]
personas: ["ai-engineers", "forward-deployed"]
---

# Paso 29 — El arnés: cómo encaja todo (15 pts)

## Learn

Aquí el arnés designa las instrucciones, el contexto suministrado, las herramientas
disponibles, la selección del modelo y la verificación alrededor de una tarea. Este es
un modelo organizativo del taller, no una afirmación de que un directorio configure
cada runtime. Las reglas del proyecto aportan orientación acotada[1]; los skills
proporcionan instrucciones y recursos reutilizables[9]; los subagentes tienen su
propio contexto[34]; los hooks responden a eventos registrados[5]. Cualquiera de
ellos puede estar presente en disco sin estar activo ni con el alcance correcto.

Mejora un componente a la vez y mide las regresiones. Un prompt más corto no es
automáticamente un mejor arnés, y una suite de defectos plantados en verde no es
prueba de que el agente haya entendido un nuevo criterio de aceptación.

## Implement

### Exercise kit — evaluar un handoff de generación de pruebas

#### Starter code path

Lee `.cursor/skills/test-generator/SKILL.md`, `docs/tickets/HLN-109.md`,
`tests/api.test.ts` y los directorios de solo README `tests/integration/`,
`tests/e2e/` y `tests/contract/` en tu copia de alumno. Haz un inventario de
`.cursor/rules/`, `.cursor/agents/`, `.cursor/hooks/`, `.cursor/hooks.json`,
`.cursor/hooks.opt-in.json` y `.cursor/mcp.example.json`. No confundas scripts o
ejemplos con registro activo o MCP autenticado.

```text
Design tests for HLN-109 without editing code. Read the ticket and existing
route tests first. Return input, expected result, test layer, existing coverage,
and missing implementation for each case. Preserve all planted-bug contracts.
Do not call external tools or claim README-only suites have run.
```

1. Ejecuta el prompt acotado una vez en una sesión de alumno nueva. Puntúa si
   identifica la cobertura existente de selección vacía, el alcance de exportación
   completa frente a página visible, la UI de selección ausente y el comportamiento
   por defecto de los campos sensibles preservado.
2. En una copia del playbook propiedad del alumno, añade un requisito conciso:
   «Antes de proponer una prueba, cita la aserción existente o márcala como ausente;
   separa la caracterización de la nueva aceptación». Los skills usan `SKILL.md` con
   frontmatter descriptivo[9]; conserva la estructura existente de test-generator.
3. Repite con la misma revisión de fuente, el mismo prompt y la misma selección de
   modelo. Registra el único diff del playbook y ambas salidas. No modifiques el
   skill compartido.
4. Evalúa dos prompts reservados: «Documenta el comportamiento de exportación
   existente» y «Explica la política de renovación de fin de mes». El primero debe
   preservar los defectos conocidos; el segundo debe identificar la incertidumbre,
   no fabricar una política de calendario probada.

#### Expected diff

Un inventario con columnas presente, registrado y probado en runtime; un diff del
playbook del alumno; puntuaciones base, revisada y reservada; y una decisión de
conservar o revertir. Registra los fallos reales y la evidencia de runtime ausente.

#### Hints

- Usa una rúbrica de cuatro comprobaciones con evidencia de la fuente, no fluidez
  subjetiva.
- Un skill malformado o un modelo no disponible es un fallo de configuración, no
  una puntuación baja de la tarea.

#### Solution approach

Una respuesta que propone una nueva prueba unitaria de selección vacía que falla
omite `tests/csv.test.ts`. La respuesta mejorada debe etiquetar ese caso como «ya
cubierto; solo regresión» y señalar la cobertura ausente del diálogo del navegador
como trabajo futuro. Una lista pulida de diez pruebas duplicadas puntúa peor que
tres casos clasificados con exactitud. Conserva el cambio solo si mejora la
clasificación de cobertura sin inventar funciones ni debilitar contratos. Si la base
ya pasa todas las comprobaciones, reporta que no hay mejora demostrada en lugar de
fabricar una ganancia. Una configuración de ejemplo sigue siendo un ejemplo hasta
que se active y pruebe por separado.

#### Expected result

Tienes un inventario del arnés, un diff del playbook del alumno, puntuaciones
emparejada y reservada, y una decisión de conservar o revertir, y la configuración
compartida de `.cursor/` permanece sin cambios.

> Screenshot placeholder: estados de activación del inventario, el único diff del
> playbook y la tabla de puntuaciones emparejadas y reservadas con las aserciones
> de fuente enlazadas.

#### Stretch goal

Compara un punto de revisión humano con un hook opcional registrado. Documenta
exactamente qué evento ve y qué fallos bloquean[5]. No ejecutes un push, instales
un hook nuevo ni asumas que la cobertura local de hooks se traslada a los turnos de
solo lectura en la nube[31]. Una hoja de trabajo de medición basta para esta
comparación.

## Pro tips

- **Consejo 1:** Mantén los fixtures de evaluación fuera del prompt que enseña la
  respuesta deseada.
- **Consejo 2:** Cambia una instrucción a la vez para que una regresión tenga una
  causa identificable.

### Common mistakes

- **Error 1:** Afirmar que cada archivo de `.cursor/` es cumplimiento activo.
- **Error 2:** Puntuar el texto generado sin comprobar las aserciones existentes y
  la UI no disponible.
- **Error 3:** Optimizar el ejemplo de entrenamiento mientras se descartan las
  comprobaciones de seguridad o alcance reservadas.

## Advanced

El arnés es un experimento con una variable a la vez. Un único diff del playbook
comparado con entradas reservadas es evidencia; una colección de archivos
habilitados no lo es, hasta que cada uno se active y se mida por separado.

## Quiz

#### Q1: ¿Qué significa el arnés en este paso?

- [ ] Un único directorio que configura cada runtime
- [x] Las instrucciones, el contexto suministrado, las herramientas disponibles, la selección del modelo y la verificación alrededor de una tarea
- [ ] La carpeta de instalación de Cursor
- [ ] Solo una suite de pruebas en verde

**Explanation:** El arnés aquí son las instrucciones, el contexto suministrado, las herramientas disponibles, la selección del modelo y la verificación alrededor de una tarea, no un directorio.

#### Q2: ¿Qué skill lee el alumno antes de diseñar pruebas para el ticket?

- [ ] .cursor/skills/pr/SKILL.md
- [ ] .cursor/skills/spec/SKILL.md
- [x] .cursor/skills/test-generator/SKILL.md
- [ ] .cursor/skills/release-note/SKILL.md

**Explanation:** La ruta de código inicial lee .cursor/skills/test-generator/SKILL.md y docs/tickets/HLN-109.md.

#### Q3: ¿Por qué una suite de defectos plantados en verde no es prueba de que el agente haya entendido un nuevo criterio de aceptación?

- [ ] Porque los defectos plantados se eliminan
- [x] Porque pasar las pruebas existentes no muestra comprensión de un requisito nuevo
- [ ] Porque solo Maya califica las suites
- [ ] Porque las pruebas nunca se ejecutan en este paso

**Explanation:** Un prompt más corto o una suite existente en verde no es automáticamente mejor, así que la comprensión de un nuevo criterio de aceptación debe medirse.

#### Q4: ¿Qué enfoque se señala como error común al evaluar el plan de pruebas generado?

- [ ] Citar aserciones existentes en el plan
- [x] Puntuar el texto generado sin comprobar las aserciones existentes y la UI no disponible
- [ ] Usar una rúbrica de cuatro comprobaciones
- [ ] Registrar la evidencia de runtime ausente

**Explanation:** Puntuar el texto generado sin comprobar las aserciones existentes y la UI no disponible es el error 2.

#### Q5: ¿Qué debe permanecer sin cambios en la consola compartida después de este ejercicio?

- [ ] El diff del playbook del alumno
- [x] La configuración compartida de .cursor/
- [ ] La tabla de puntuaciones reservadas
- [ ] Las columnas del inventario

**Explanation:** El resultado esperado exige que la configuración compartida de .cursor/ permanezca sin cambios, permitiendo que solo difieran los archivos propiedad del alumno.

## Complete

- [ ] Mark complete
