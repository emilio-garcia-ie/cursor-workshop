---
step: 10
title: "Elige la abstracción correcta"
points: 5
module: "Guardrails"
versions: ["medium", "long"]
personas: ["developers", "ai-engineers", "forward-deployed"]
---

# Paso 10 — Elige la abstracción correcta (5 pts)

## Learn

Cinco mecanismos, cinco trabajos — elige la capacidad que falta, no el nombre
más impresionante. Una regla puede describir un estándar de revisión sin
realizar una revisión; una conexión de herramienta puede recuperar un PR sin
autorizar un merge. Mantén separadas las instrucciones, la ejecución y la
verificación.

| Mecanismo | Función | Ejemplo de Hearthline | Límite |
|---|---|---|---|
| Reglas | Contexto y convenciones aplicables[1] | Centavos enteros | Orientación, no un control de ejecución; el alcance importa[1][2] |
| Skills | Procedimiento de tarea reutilizable[9] | Redactar el formato de PR de Priya | La invocación no es prueba de que la lista de verificación se completara |
| MCP | Capacidades externas[3] | Leer PR de GitHub | La conexión no es autorización para cada operación |
| Hooks | Comprobaciones de ciclo de vida y decisiones de permiso[5] | Controlar un evento shell de Cursor cubierto | La política de salida/JSON/fallo y la cobertura de eventos importan[5] |
| Subagentes | Trabajo delegado en un contexto separado[34] | Informe de estándares | Un contexto separado no es un checkout separado ni verdad garantizada[34] |

Cuándo recurrir a cuál: convención → regla; tarea repetida → skill; sistema
externo → MCP; comprobación en un evento compatible → hook; investigación
enfocada → subagente. A veces la respuesta correcta es una prueba ordinaria
más revisión humana, no una sexta capa de configuración de agente.

## Implement

Paso de solo lectura: sin ediciones de aplicación o configuración. Compara el
skill `hearthline-pr`, el subagente org-standards y la revisión de agente en
el mismo diff de funcionalidad. No son tres revisores idénticos: el formato de
PR, un informe de estándares y una revisión de código dedicada tienen trabajos
diferentes. La revisión de agente lee `BUGBOT.md` y ofrece profundidades
Quick/Deep[20]; la restricción de solo lectura del revisor personalizado es
separada de la corrección del informe[34].

### Exercise kit

#### Starter code path

`hearthline-operator-console/.cursor/skills/pr/SKILL.md`,
`.cursor/agents/org-standards.md`, `.cursor/hooks.json` y
`docs/ORG-STANDARDS.md`. Usa las versiones creadas por el alumno en los Pasos
7–9 cuando estén disponibles; si esos kits están incompletos, compara solo las
definiciones y etiqueta los resultados de invocación como sin verificar.

#### Minimal working example

Ejecuta `git diff main...HEAD --stat`, `git diff` y `git diff --cached` en el
checkout de la funcionalidad para identificar los cambios commiteados, de
trabajo y en staged. Proporciona el mismo diff elegido y la misma evidencia a
cada comparación. Usa `/hearthline-pr` para el skill[9] y solicita
explícitamente la delegación a org-standards[34] desde el proyecto de tooling
donde viven sus definiciones, proporcionando la ruta de la funcionalidad.
Ejecuta `/agent-review` manualmente en el checkout de la funcionalidad[20].
Registra la profundidad de revisión, el diff accesible y los estándares
disponibles en lugar de asumir entradas iguales.

```text
For the supplied HLN-101 diff, identify which checks you actually performed.
Separate formatting, standard violations, and functional correctness.
Cite evidence for findings. Mark missing test output unverified.
Do not edit, commit, push, or open a PR.
```

#### Expected diff

Ninguno. Produce una comparación en el chat con columnas: mecanismo, entradas
reales, acciones tomadas, hallazgos útiles, afirmaciones sin soporte, evidencia
faltante y uso observado si está disponible. No inventes cifras de dólares ni
de tokens.

#### Hints

- Un PR correctamente formateado aún puede describir código roto. Evalúa el
  skill por su formato honesto, no por atrapar cada error funcional.
- Un hook puede ejecutar un comando de prueba sin que un revisor lea el
  requisito de negocio. Mantén esas comprobaciones separadas en la comparación.
- Si `BUGBOT.md` está ausente, regístralo; no digas que la revisión de agente
  es incapaz de instrucciones específicas de la organización[20].

#### Solution approach

Primero clasifica tres necesidades: «el dinero debe estar en centavos»,
«redacta este PR» y «comprueba este evento shell compatible». Selecciona regla,
skill y hook respectivamente, y nombra la evidencia que cada uno no puede
proporcionar. Añade «recuperar metadatos de PR externos» (MCP) y «revisión en
contexto independiente» (subagente). Compara salidas reales solo después de
esta clasificación, de modo que la novedad no elija por ti.

#### Expected result

Tienes cinco elecciones de mecanismo justificadas con una alternativa
rechazada para cada una, y la comparación de tres ejecuciones registra
cualquier brecha honesta en lugar de una garantía automática de corrección o
de aplicación.

[SCREENSHOT: Tabla de decisión de cinco mecanismos junto a la comparación de tres ejecuciones con la evidencia faltante marcada]

### Common mistakes

- **Error 1:** Usar una regla como prueba de que una comprobación se ejecutó.
  Exige la salida real.
- **Error 2:** Llamar genérica por necesidad a una revisión integrada.
  Comprueba su entrada disponible de `BUGBOT.md` y la profundidad
  seleccionada[20].
- **Error 3:** Asumir que la configuración local sigue a cada runtime.
  Verifica el alcance, la política del equipo y la disponibilidad específica de
  la superficie antes del despliegue.

### Pro tips

- **Consejo 1:** Elige un propietario y un resultado observable por
  mecanismo.
- **Consejo 2:** Compara en el mismo diff; entradas cambiantes invalidan una
  conclusión segura de «este revisor es mejor».

#### Stretch goal

Elimina un mecanismo propuesto de tu propia elección de adopción. Explica qué
riesgo sigue cubierto por pruebas ordinarias o revisión humana y cuál no.

## Advanced

Trata la secuencia de adopción como una sugerencia: primero reglas, luego una
integración útil, luego skills/hooks medidos, luego revisores enfocados.
Rastrea el tiempo de ciclo de PR y los bugs escapados de tus propios registros
de entrega, y recoge comentarios de los desarrolladores directamente. La API de
Analytics de Cursor proporciona métricas de uso y es **exclusiva de
Enterprise**; no establece cada métrica en esa hoja de trabajo[30]. No se
requiere aquí ninguna llamada a API con credenciales.

La disponibilidad no se deduce de la matriz. Los chats laterales son solo
locales y no se anidan[33]. Los canvas compartidos son instantáneos de solo
lectura del equipo con requisitos de privacidad compatibles con plan de pago,
membresía del equipo y almacenamiento[25]. La autoridad de seguimiento en Slack
depende de la política del equipo[26]. Los hooks en la nube no cubren los
primeros turnos de solo lectura y no reciben los hooks locales del directorio
home[31]. Estas calificaciones importan al elegir un runtime; ninguna es una
integración obligatoria para este paso de solo lectura.

## Quiz

#### Q1: ¿Qué mecanismo encaja con la convención «el dinero debe estar en centavos enteros»?

- [ ] Un hook
- [ ] Un subagente
- [x] Una regla
- [ ] Un servidor MCP

**Explanation:** Una convención como los centavos enteros es orientación, así que una regla proporciona contexto aplicable; no es un control de ejecución.

#### Q2: ¿Dónde encuentra la revisión de agente las instrucciones específicas de la organización?

- [ ] .cursor/agents/
- [x] BUGBOT.md
- [ ] .cursor/hooks.json
- [ ] docs/tickets/

**Explanation:** La revisión de agente lee las reglas BUGBOT.md del repositorio y ofrece profundidades Quick y Deep con diferentes niveles de costo.

#### Q3: ¿Por qué un equipo debe elegir la capacidad que falta en lugar del nombre de mecanismo más impresionante?

- [ ] Porque los nombres determinan el costo
- [ ] Porque los mecanismos más nuevos siempre ganan
- [x] Porque cada mecanismo tiene un trabajo, y una regla, una conexión o un hook no pueden sustituir la capacidad que realmente falta
- [ ] Porque solo los subagentes pueden ser revisados

**Explanation:** Una regla puede describir una revisión sin realizarla, y una conexión puede recuperar un PR sin autorizar un merge; elige la capacidad que falta.

#### Q4: ¿Cuál es un error común contra el que advierte este paso?

- [ ] Comparar en el mismo diff
- [x] Usar una regla como prueba de que una comprobación se ejecutó
- [ ] Registrar la salida de pruebas faltante como sin verificar
- [ ] Elegir un propietario por mecanismo

**Explanation:** Una regla es orientación, no prueba de ejecución; exige la salida real antes de afirmar que una comprobación se ejecutó.

#### Q5: ¿Qué requiere el resultado esperado?

- [x] Cinco elecciones de mecanismo justificadas con una alternativa rechazada cada una
- [ ] Una configuración fusionada para los cinco mecanismos
- [ ] Una cifra de uso de tokens para cada ejecución
- [ ] Un sexto mecanismo añadido a la matriz

**Explanation:** El entregable es cinco elecciones justificadas, cada una con una alternativa rechazada, y una comparación honesta de tres ejecuciones que registra brechas.

## Complete

- [ ] Mark complete
