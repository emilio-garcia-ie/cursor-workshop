---
step: 8
title: "Subagentes: tu revisor de estándares de la organización"
points: 20
module: "Guardrails"
versions: ["short", "medium", "long"]
personas: ["developers", "ai-engineers", "forward-deployed"]
---

# Paso 8 — Subagentes: tu revisor de estándares de la organización (20 pts)

## Learn

Un subagente maneja una tarea delegada en su propio contexto, con un informe
de vuelta al agente padre. Esa separación compra enfoque, no aislamiento
automático de permisos: los subagentes heredan las herramientas del padre,
incluido MCP, y comparten el checkout de forma predeterminada a menos que se
solicite aislamiento[34]. `readonly: true` restringe las ediciones de archivos
y los comandos shell que cambian el estado; no hace que un informe sea correcto
ni certifica cada herramienta heredada[34]. Los Cloud Agents son una superficie
distinta basada en VM asíncrona, no la fuente de este esquema de archivo[15].

## Implement

1. Ejecuta `/agent-review` manualmente en el checkout de la funcionalidad[20].
   La revisión de agente lee las reglas `BUGBOT.md` del repositorio y ofrece
   profundidades **Quick** y **Deep** con diferentes niveles de costo[20]. No
   asumas una cuota gratuita ni que necesariamente desconoce los estándares de
   la organización. No se requiere ningún añadido a `BUGBOT.md` para este
   ejercicio; registra qué reglas existen.
2. Lee `docs/ORG-STANDARDS.md`, `.cursor/agents/bug-investigator.md` y el
   starter existente `.cursor/agents/org-standards.md`.
3. En el worktree de tooling, reemplaza las viñetas de solo prosa del starter
   con un frontmatter YAML real usando `readonly: true`[34]. Requiere para cada
   hallazgo un estándar, un archivo, una línea, evidencia y una corrección
   sugerida.
4. Abre el worktree de tooling como el proyecto de Cursor para que su definición
   de revisor esté en el alcance del proyecto[34], luego solicita revisión del
   diff del checkout de la funcionalidad por ruta absoluta. Si el acceso no está
   disponible, registra ese bloqueo en lugar de revisar en silencio el diff de
   tooling. Corrige los hallazgos aceptados en la sesión padre de la
   funcionalidad solo después de la revisión humana.

### Exercise kit

#### Starter code path

`hearthline-operator-console/.cursor/agents/org-standards.md` y
`docs/ORG-STANDARDS.md`. La viñeta `- readonly: true` del starter es prosa, no
frontmatter YAML. Guarda la configuración real en el worktree de tooling; deja
la fuente de estándares intacta.

#### Minimal working example

La ubicación documentada de proyecto es `.cursor/agents/`, con cuerpo Markdown
y frontmatter YAML[34]. Usa esta definición mínima de revisor:

```markdown
---
name: org-standards
description: Review a specified Hearthline diff against numbered organizational standards; report findings without fixing them.
model: inherit
readonly: true
---
Read docs/ORG-STANDARDS.md and the specified diff in the supplied checkout.
For each finding give standard number, file:line, observed evidence,
impact, suggested fix, and uncertainty. Do not invent test execution.
Report missing evidence separately. Do not edit files or request remote writes.
```

Usa esta solicitud al agente padre en lugar de asumir que el revisor ve la
conversación completa[34]:

```text
Delegate to org-standards. Review the HLN-101 diff in the feature checkout
at the absolute path I supply, against docs/ORG-STANDARDS.md.
Read working, staged, and committed changes as needed. Report only.
Do not fix HLN-102. Return evidence and unresolved questions to this session.
```

#### Expected diff

Solo el frontmatter y las instrucciones acotadas del revisor en la rama de
tooling. La ejecución de la revisión no debe cambiar archivos de funcionalidad.
Compara `git status --short` y `git diff` en ambos checkouts antes y después;
las ediciones preexistentes deben permanecer intactas.

#### Hints

- Comprueba los números de estándar contra el documento; una numeración
  plausible no es evidencia. Inspecciona cada línea citada en el diff actual.
- `model: inherit` evita nombrar un modelo no disponible para tu equipo; la
  disponibilidad real del modelo sigue dependiendo del plan o de la
  administración[34].
- Separa «no verificado» de «sin hallazgos». Una revisión sin salida de pruebas
  no puede reportar con veracidad que las pruebas pasaron.

#### Solution approach

Valida el descubrimiento y el frontmatter, ejecuta la revisión acotada, luego
inspecciona cada hallazgo tú mismo. Para una sonda de restricción, usa un
checkout de alumno desechable que contenga un archivo desechable: pídele al
revisor que edite ese archivo. Esperado: la restricción de solo lectura evita
la edición[34]. Registra el resultado de la herramienta y verifica que el
archivo permaneció sin cambios; si cambia, detente y reporta la prueba de
restricción fallida. No sondees con datos reales ni con herramientas remotas.
Una petición que el modelo simplemente rechaza no es prueba de que una
restricción a nivel de herramienta se haya ejecutado.

#### Expected result

Tienes un informe de revisión respaldado por evidencia y un resultado de
restricción claramente etiquetado (bloqueo observado, restricción fallida o no
ejercitado), y el revisor no ha escrito ningún diff de funcionalidad.

[SCREENSHOT: Configuración del revisor y hallazgo numerado con evidencia archivo:línea; comprobación separada de restricción de archivo sin cambios]

#### Stretch goal

Compara la revisión Quick de agente con el revisor personalizado en el mismo
diff y los estándares disponibles[20]. Clasifica hallazgos verdaderos, falsos
positivos y evidencia faltante; no equipares un informe más largo con uno
mejor.

### Common mistakes

- **Error 1:** Escribir `readonly` como una viñeta Markdown. Usa el booleano
  YAML documentado en el frontmatter[34].
- **Error 2:** Asumir que la revisión integrada no puede usar los estándares
  del equipo. Lee `BUGBOT.md`; compara las entradas reales en lugar de una
  etiqueta genérica o personalizada[20].
- **Error 3:** Confiar en un informe porque el agente no puede editar. Verifica
  el razonamiento y la evidencia citada de forma independiente.

## Pro tips

- **Consejo 1:** Dale a cada hallazgo un requisito de evidencia y a cada
  comprobación faltante una etiqueta explícita de sin verificar.
- **Consejo 2:** Entrega la ruta del checkout y el alcance del diff, no «revisa
  lo que hicimos». Un contexto separado necesita una entrada de tarea
  explícita[34].

- Elige la profundidad de revisión y los modelos según la complejidad de la
  tarea y el presupuesto disponible; mide los hallazgos útiles en lugar de
  asumir que el costo compra precisión[13][20].

## Advanced

Los estándares escritos se convierten en criterios revisables, no en verdad
aplicada automáticamente. Solo lectura restringe las escrituras; no valida
conclusiones[34]. Un agente padre aún debe inspeccionar el informe antes de
autorizar correcciones. El contexto separado tampoco es un checkout separado
por defecto[34]. Los agentes de plugin empaquetados tienen su propio formato de
referencia[35]; no asumas que esta prueba local de restricción demuestra que
solo lectura sobrevive al empaquetado y a la instalación de otro usuario. Esa
integración sigue fuera de este kit.

## Quiz

#### Q1: ¿Qué hace `readonly: true` para un subagente?

- [ ] Hace que cada informe sea correcto
- [ ] Elimina todas las herramientas MCP
- [x] Restringe las ediciones de archivos y los comandos shell que cambian el estado
- [ ] Crea un checkout separado automáticamente

**Explanation:** `readonly: true` restringe las escrituras y los comandos shell que cambian el estado; no valida conclusiones ni certifica las herramientas heredadas.

#### Q2: ¿Dónde se define el revisor org-standards?

- [ ] docs/ORG-STANDARDS.md
- [x] .cursor/agents/org-standards.md
- [ ] .cursor/rules/root.mdc
- [ ] .cursor/hooks.json

**Explanation:** Las definiciones de subagente viven en .cursor/agents/ con cuerpo Markdown y frontmatter YAML.

#### Q3: ¿Por qué el agente padre aún debe inspeccionar el informe antes de autorizar correcciones?

- [ ] Porque el revisor se niega a leer diffs
- [x] Porque solo lectura restringe las escrituras, no la corrección del informe, y los estándares se convierten en criterios revisables, no en verdad aplicada
- [ ] Porque el revisor edita archivos de funcionalidad
- [ ] Porque las herramientas del padre están deshabilitadas

**Explanation:** Solo lectura restringe las escrituras, no la validación; un agente padre debe inspeccionar el informe y su evidencia citada antes de autorizar correcciones.

#### Q4: ¿Cuál es un error común contra el que advierte este paso?

- [ ] Dar a cada hallazgo un requisito de evidencia
- [ ] Registrar un bloqueo en lugar de adivinar
- [x] Escribir `readonly` como una viñeta Markdown en lugar de frontmatter YAML
- [ ] Verificar que el archivo permaneció sin cambios

**Explanation:** La viñeta `- readonly: true` del starter es prosa; usa el booleano YAML documentado en el frontmatter.

#### Q5: ¿Cómo debe etiquetarse el resultado de la restricción?

- [ ] Solo aprobado o fallido
- [ ] Oculto en el informe
- [x] Bloqueo observado, restricción fallida o no ejercitado
- [ ] Estimado a partir de la redacción del modelo

**Explanation:** El resultado de la restricción se etiqueta como bloqueo observado, restricción fallida o no ejercitado, y el revisor no ha escrito ningún diff de funcionalidad.

## Complete

- [ ] Mark complete
