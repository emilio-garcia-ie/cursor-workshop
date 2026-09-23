---
step: 33
title: "Bucle de mejora"
points: 20
module: "Bonus"
versions: ["long"]
personas: ["forward-deployed", "ai-engineers"]
---

# Paso 33 — Bucle de mejora (20 pts)

## Learn

Mejora un playbook mediante propuestas medidas, no mediante una afirmación
automática de «reentrenar» un modelo. Mantén separadas la evidencia de entrada,
la calidad de la salida, la decisión humana y los resultados posteriores. Las
suscripciones en la nube pueden ejecutar trabajo programado[32]; el coordinador
beta opcional de Projects puede mantener contexto compartido y vigilar canales,
programaciones o PRs[36]. Ninguno de los dos es necesario para un ciclo de
revisión manual.

Una propuesta programada no es autoridad para publicar un skill ni para enviar
acercamiento. Los hooks en la nube excluyen los primeros turnos de solo lectura y
los hooks locales del directorio home[31]. La API de Analytics solo para
Enterprise reporta el uso de Cursor[30], no si un prospecto ficticio convirtió.
Usa tu propia hoja de trabajo de resultados con consentimiento para esa pregunta
separada; este kit usa solo datos sintéticos.

## Implement

### Exercise kit — una revisión medida del playbook

#### Starter code path

Reutiliza el borrador de voz de alumno del Paso 31 y el brief ficticio del Paso
32. Crea una hoja de trabajo de resultados sin conexión con estos campos
obligatorios: ID de registro, etiqueta de fuente o fixture, versión del play,
segmento de audiencia, enviado o solo borrador, respuesta, calidad de la
respuesta, conversión, ventana de observación, revisor y motivo de rechazo.
Mantén desconocidos los resultados desconocidos; no infieras silencio a partir de
datos ausentes.

```text
Synthetic cohort A: 10 fictional sends, 2 replies, 1 conversion, same window.
Synthetic cohort B: 10 fictional sends, 3 replies, 1 conversion, same window.
Held-out brief: no reporting-interest evidence; must not invent a pain point.
Review request: propose exactly one voice-playbook change. Cite supporting
records, calculate metrics, note uncertainty, and return a diff for approval.
No sending, scheduling, publishing, credential access, or shared-file edits.
```

1. Calcula las métricas de la cohorte y anota el recuento idéntico de
   conversiones. Excluye las filas de solo borrador de los denominadores de
   mensajes enviados y documenta la elección.
2. Pide una revisión en una copia de skill propiedad del alumno, preservando las
   afirmaciones atadas a la fuente y la aprobación humana. Revisa el diff antes
   de usarlo en otro borrador.
3. Ejecuta el brief original y el brief reservado de evidencia ausente con ambas
   versiones. Califica la factualidad, el alcance de una sola pregunta, las
   promesas sin respaldo y las ediciones del revisor usando la misma rúbrica.
4. Acepta o rechaza la revisión con un motivo registrado y una copia de
   rollback. Una propuesta rechazada permanece en el registro de revisión; no se
   convierte en silencio en el nuevo valor predeterminado. No publiques ni
   programes nada.
5. Revisa las citas de mecanismo usadas por el playbook contra las rutas de
   evidencia en caché del 16 de septiembre en `FRESHNESS-2026-09.md`. Si una
   afirmación carece de soporte en el cuerpo, márcala para una verificación
   posterior en lugar de inventar una función nueva.

#### Expected diff

Una tabla de resultados sintética, la aritmética, un diff propuesto del alumno,
las puntuaciones reservadas antes y después, y una decisión humana de conservar
o revertir. Registra la revisión de vigencia como inspección de fuentes, no como
una nueva obtención ni una prueba de runtime.

#### Hints

- Un recuento de respuestas más alto puede coexistir con una conversión sin
  cambios.
- Mantén la evaluación de la revisión separada de los resultados de negocio
  futuros y de los datos de precios.

#### Solution approach

La proporción de respuestas pasa del 20% al 30%, una diferencia de 10 puntos
porcentuales; la conversión permanece en el 10% en ambas cohortes. Esa muestra
sintética diminuta no establece una mejora causal. Una propuesta para hacer la
pregunta más clara puede probarse; una afirmación de que el nuevo play «aumenta
los ingresos» no puede inferirse. Trata la diferencia observada como una
hipótesis. Aprueba solo un cambio acotado de redacción que preserve el anclaje
factual en ambos fixtures; de lo contrario, conserva el original. Registra que
no hay mejora demostrada si ambas versiones ya satisfacen la rúbrica. Esto es
edición de playbook, no entrenamiento de modelos.

#### Expected result

Tienes una tabla de resultados sintética, la aritmética de la cohorte, un diff
propuesto del alumno, las puntuaciones reservadas y una decisión firmada de
conservar o revertir, y no se publicó, programó ni envió nada.

> Screenshot placeholder: los cálculos de la cohorte sintética, el único diff
> propuesto del skill, la evaluación reservada y la decisión firmada de conservar
> o revertir; sin datos reales de prospectos.

#### Stretch goal

Redacta una suscripción semanal futura con propietario, alcance de registro
aprobado, límite de una propuesta, límite de gasto, puerta humana y condición de
parada[32]. Compara con la coordinación opcional de Projects[36], pero no
aprovisiones ninguna de las dos. Una hoja de trabajo manual sigue siendo un
camino completo para el ejercicio.

### Common mistakes

- **Error 1:** Llamar reentrenamiento de modelo o aumento de conversión probado
  a una revisión de prompt o skill.
- **Error 2:** Usar resultados de solo borrador o desconocidos como si fueran
  envíos y fallos observados.
- **Error 3:** Permitir que una revisión automática publique su propia propuesta
  sin aprobación humana.

### Pro tips

- **Consejo 1:** Preserva las revisiones rechazadas y sus motivos para que la
  siguiente revisión no las repita.
- **Consejo 2:** Usa un fixture reservado de evidencia ausente para detectar
  afirmaciones persuasivas pero sin respaldo.

## Quiz

#### Q1: ¿Qué debe mantener separado el alumno al mejorar el playbook?

- [ ] Nombres de ramas y mensajes de commit
- [x] La evidencia de entrada, la calidad de la salida, la decisión humana y los resultados posteriores
- [ ] Nombres de modelos y recuentos de tokens
- [ ] Solo borradores y texto final

**Explanation:** El paso mantiene separadas la evidencia de entrada, la calidad de la salida, la decisión humana y los resultados posteriores.

#### Q2: ¿Dónde comprueba la revisión de vigencia las citas de mecanismo?

- [ ] bibliography.md
- [x] FRESHNESS-2026-09.md
- [ ] docs/tickets/HLN-101.md
- [ ] .cursor/rules/root.mdc

**Explanation:** La revisión comprueba las citas de mecanismo del playbook contra las rutas de evidencia en caché del 16 de septiembre en FRESHNESS-2026-09.md.

#### Q3: Las respuestas suben del 20% al 30% mientras la conversión se mantiene en el 10% en ambas cohortes sintéticas. ¿Qué puede concluirse?

- [ ] El nuevo play aumenta los ingresos en 10 puntos
- [x] El cambio es una hipótesis, no una mejora causal probada en una muestra sintética diminuta
- [ ] El play antiguo debe eliminarse
- [ ] La conversión es irrelevante para el acercamiento

**Explanation:** La muestra sintética diminuta no establece una mejora causal, así que la diferencia observada se trata como una hipótesis.

#### Q4: ¿Qué práctica se señala como error común al puntuar la revisión?

- [ ] Excluir las filas de solo borrador de los denominadores de mensajes enviados
- [x] Usar resultados de solo borrador o desconocidos como si fueran envíos y fallos observados
- [ ] Registrar un motivo de rechazo
- [ ] Conservar una copia de rollback

**Explanation:** Usar resultados de solo borrador o desconocidos como si fueran envíos y fallos observados es el error 2.

#### Q5: ¿Qué NO debe ocurrir aunque el playbook haya cambiado?

- [ ] Registrar la aritmética de la cohorte
- [ ] Proponer exactamente un cambio
- [x] Publicar, programar o enviar algo
- [ ] Conservar la propuesta rechazada en el registro de revisión

**Explanation:** El resultado esperado indica que no se publicó, programó ni envió nada, y la revisión sigue siendo un diff de alumno aprobado por una persona.

## Complete

- [ ] Mark complete
