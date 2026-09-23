---
step: 19
title: "Chats laterales: pregunta sin descarrilar"
points: 10
module: "The Fast Loop"
versions: ["long"]
personas: ["developers", "data-scientists"]
---

# Paso 19 — Chats laterales: pregunta sin descarrilar (10 pts)

## Learn

Los chats laterales son conversaciones hijas duraderas: el historial del padre
es contexto de referencia oculto, no una segunda copia visible de la
transcripción[33]. Abre uno con `/side` y trae sus hallazgos de vuelta
mencionándolo con @ en el padre[33]. Son **solo locales**, no pueden anidarse, y
cerrarlos los archiva en lugar de eliminarlos[33]. No prometas el mismo flujo de
trabajo en un agente en la nube.

Usa una pregunta lateral para resolver la incertidumbre sin convertir la tarea
principal en una discusión sin relación. El contexto oculto del padre aún
necesita verificación contra los archivos actuales; una explicación plausible no
es una prueba que pasa.

## Implement

1. Abre el chat lateral localmente[33]. Inspecciona la función y la regla
   citadas en lugar de aceptar «UTC es más seguro» como la explicación
   completa.
2. Haz una pregunta de seguimiento sobre la política de fin de mes. Manténla
   como requisito abierto si la regla o la prueba no especifican una decisión;
   no inventes comportamiento de acotamiento.
3. Menciona con @ el chat lateral en el padre[33]. Pide al padre que conserve un
   alcance de refactorización que preserve el comportamiento y que liste la
   semántica de fin de mes por separado.
4. Ejecuta `npm test -- tests/renewal-date.test.ts` en la copia de alumno.
   Registra el diff sin cambios y la limitación de cobertura junto al resultado
   real.

### Exercise kit — investiga sin refactorizar en silencio

#### Starter code path

En una sesión local de alumno, lee `src/domains/leasing/lib/renewal-date.ts`,
`tests/renewal-date.test.ts` y `.cursor/rules/time.mdc`. Inicia la tarea
principal como una **propuesta de refactorización**, no como permiso para editar:
«Explica cómo aclarar los nombres de fechas de renovación sin cambiar el
comportamiento; espera la aprobación.» Mantén la línea base compartida sin
cambios. Abre la investigación con:

```text
/side Why does this renewal helper use calendar-day arithmetic rather than
server-local Date arithmetic? Read the time rule and tests. Give one supported
example and one untested edge case. Do not edit files or expand the task.
```

#### Expected diff

Una propuesta del padre, una respuesta lateral citada y un handoff breve que
separe el comportamiento actual, el comportamiento probado y la política sin
resolver. No se requiere ningún parche de producción ni de pruebas.

#### Hints

- Busca cualquier construcción real de Date en el asistente antes de
  explicarlo.
- Una cadena con forma de fecha no es prueba de que cada día generado exista.
- Una transcripción de chat lateral limpia aún hereda el contexto oculto del
  padre; vérificala contra los archivos actuales[33].

#### Solution approach

El caso existente de diciembre mapea `2026-12-01` más dos meses a
`2027-02-01`. El asistente preserva el número de día de la entrada; eso no
establece un comportamiento válido de fin de mes para el 31 de enero más un mes.
Distingue la intención de diseño en la regla de tiempo de la cobertura que
realmente existe en las pruebas. Devuelve el ejemplo de diciembre y la pregunta
de fin de mes sin probar. El padre puede continuar con una planificación solo de
nombres, pero cambiar la semántica de calendario necesita una especificación
separada y pruebas solo de alumno.

#### Expected result

Tienes la propuesta del padre, la respuesta lateral citada y el handoff de
comportamiento frente a política, y `npm test -- tests/renewal-date.test.ts`
pasa con un diff rastreado sin cambios.

> Screenshot placeholder: propuesta del padre, pregunta lateral local y
> conclusión importada; el historial del padre no necesita aparecer en la
> transcripción del hijo[33].

#### Stretch goal

Repite la pregunta en una conversación ordinaria nueva con solo los tres archivos
de origen. Compara lo que debe aportarse explícitamente frente al contexto de
referencia del padre del chat lateral[33]. Juzga la precisión de la respuesta,
no el tamaño de la transcripción.

### Common mistakes

- **Error 1:** Esperar que los chats laterales funcionen en los Cloud Agents o
  que generen chats laterales anidados[33].
- **Error 2:** Tratar una transcripción hija limpia como prueba de que no tiene
  contexto de padre[33].
- **Error 3:** Corregir un problema de fin de mes recién notado durante una
  refactorización que conserva el comportamiento.

## Pro tips

- **Consejo 1:** Trae de vuelta la conclusión útil más pequeña más las rutas de
  origen, no cada divagación.
- **Consejo 2:** Archiva deliberadamente un chat lateral respondido; cerrar no
  es eliminar[33].

## Advanced

Los chats laterales mantienen una tarea principal en el camino, pero la misma
pregunta en una conversación nueva tiene que llevar su propio contexto
explícitamente[33]. La comparación juzga la precisión de la respuesta, no el
tamaño de la transcripción.

## Quiz

#### Q1: ¿Cómo abres un chat lateral y traes de vuelta sus hallazgos?

- [x] Abre con `/side` y menciona con @ el chat lateral en el padre
- [ ] Abre con `/ask` y pega una captura de pantalla
- [ ] Abre con una pestaña nueva y copia la transcripción
- [ ] Abre con `/loop` y cierra el padre

**Explanation:** Los chats laterales se abren con `/side`, y los hallazgos vuelven mencionando con @ el chat lateral en el padre.

#### Q2: ¿Qué asistente y regla inspecciona el chat lateral de este paso?

- [x] `src/domains/leasing/lib/renewal-date.ts` y `.cursor/rules/time.mdc`
- [ ] `src/lib/money.ts` y `.cursor/rules/money.mdc`
- [ ] `src/domains/payments/queries.ts` y `docs/tickets/HLN-101.md`
- [ ] `src/app/forecasts/page.tsx` y `src/lib/csv.ts`

**Explanation:** El chat lateral lee el asistente de fechas de renovación, sus pruebas y la regla de tiempo.

#### Q3: ¿Por qué el ejemplo de diciembre no prueba la corrección de fin de mes?

- [ ] Porque diciembre tiene 31 días
- [ ] Porque falta el archivo de pruebas
- [x] Porque el asistente preserva el número de día de la entrada, lo que no establece el comportamiento para el 31 de enero más un mes
- [ ] Porque la regla de tiempo prohíbe la aritmética de calendario

**Explanation:** El asistente preserva el número de día de la entrada, lo que no establece un comportamiento válido de fin de mes para una entrada del 31 de enero más un mes.

#### Q4: ¿Por qué una transcripción hija limpia no es prueba de que no tiene contexto de padre?

- [ ] Porque las transcripciones siempre se censuran
- [x] Porque los chats laterales heredan el historial del padre como contexto de referencia oculto
- [ ] Porque cerrar un chat lateral lo elimina
- [ ] Porque los chats laterales se anidan unos dentro de otros

**Explanation:** El historial del padre es contexto de referencia oculto, así que una transcripción hija limpia no es prueba de que no tenga contexto de padre.

#### Q5: ¿Qué exige la completación en este paso?

- [x] Una propuesta del padre, una respuesta lateral citada y un handoff de comportamiento frente a política, con la prueba de renovación pasando y un diff rastreado sin cambios
- [ ] Una corrección fusionada de la política de fin de mes
- [ ] Una refactorización en producción de los nombres de fechas de renovación
- [ ] Un chat lateral eliminado sin registro

**Explanation:** La completación exige los artefactos del handoff y una prueba de renovación que pasa con un diff rastreado sin cambios, no un parche de comportamiento.

## Complete

- [ ] Mark complete
