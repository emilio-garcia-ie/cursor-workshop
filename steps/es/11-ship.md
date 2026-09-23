---
step: 11
title: "Revisión, commit y envío"
points: 25
module: "Guardrails"
versions: ["short", "medium", "long"]
personas: ["vibecoders", "developers", "data-scientists", "ai-engineers", "forward-deployed"]
---

# Paso 11 — Revisión, commit y envío (25 pts)

## Learn

Cerrando el bucle: inspeccionar los diffs y comprobaciones locales → redactar
el mensaje del porqué → revisar la evidencia → proponer rollback (señales,
disparo, propietario). Las reglas guían el trabajo aplicable; un hook
registrado puede controlar los eventos shell de Cursor cubiertos, no todos los
comandos de Git ni los pushes desde una terminal externa ordinaria[1][5]. El
ejercicio principal termina con revisión y aprobación local, no con
publicación.

## Implement

1. Separa dos historias de revisión: los cambios de funcionalidad de HLN-101 y
   los cambios de tooling creados por el alumno de los Pasos 7–9. Usa los
   checkout(s) de alumno existentes; no se requiere aquí configuración nueva de
   repositorio o worktree. `../hearthline-pr-skill` era la ruta del worktree
   creado por el alumno en el Paso 7, no un repositorio externo preexistente.
   Si no se creó, usa directamente el playbook rastreado
   `.cursor/skills/pr/SKILL.md`. No asumas que un skill `hearthline-pr` ya
   existe o está activo.
2. Prompt de revisión: `Read .cursor/skills/pr/SKILL.md and
   docs/tickets/HLN-101.md. Review committed, working, and staged changes.
   Propose checks and a PR draft with actual evidence. Do not edit, stage,
   commit, push, merge, or deploy. Wait for approval before running local
   checks.`
3. Después de aprobar los comandos de comprobación locales, ejecuta el
   preflight de abajo. Redacta descripciones separadas de funcionalidad y de
   tooling; si no existe un diff de tooling, regístralo como no hecho en lugar
   de inventar un segundo PR. Aprueba solo los artefactos locales revisados.
   No se requiere commit, push, PR enviado, merge ni despliegue.
4. Lee `.cursor/skills/release-note/SKILL.md` como formato para una nota de
   release en **borrador** y una propuesta de rollback. Su disparo de cambios
   publicados no significa que este ejercicio haya publicado. Mantén la
   publicación y la ejecución del rollback sin aprobar.

### Exercise kit

#### Starter code path

`hearthline-operator-console/.cursor/skills/pr/SKILL.md`,
`.cursor/skills/release-note/SKILL.md`, `docs/tickets/HLN-101.md`,
`tests/api.test.ts`, `tests/export-columns.test.ts` y `tests/csv.test.ts`.
Los playbooks rastreados son prosa, no prueba de un frontmatter de skill
descubrible. Si existe el `hearthline-pr` creado por el alumno en el Paso 7,
verifica su checkout e invocación antes de usarlo[9]; de lo contrario lee
explícitamente el playbook rastreado. Mantén separada la evidencia de
aceptación de la funcionalidad y de la propuesta de tooling.

#### Minimal working example

Después de la aprobación local, ejecuta este preflight en el checkout de
consola de alumno previsto e inspecciona la salida. Repite solo para otro
checkout existente cuyo diff forme parte de tu revisión:

```bash
git branch --show-current
git status --short
git diff main...HEAD --stat
git diff main...HEAD
git diff
git diff --cached
npm test
npm run lint -- --no-cache
npm run build
```

Ejecuta build después de que terminen las comprobaciones anteriores, no de
forma concurrente con un typecheck separado. Estos son los scripts de la
consola; no sustituyas las comprobaciones del sitio del taller por la
aceptación de la funcionalidad. El preflight no realiza staging, commit, push,
merge ni despliegue. Las dependencias, la aprobación o las salidas faltantes
siguen siendo bloqueos; un borrador no puede etiquetar como aprobada una
comprobación no ejecutada.

#### Expected diff

Dos historias de revisión separables cuando ambas existen: funcionalidad,
interfaz, ruta y pruebas de HLN-101, y la propuesta de tooling del alumno
(skill/revisor/hook opt-in). Inspecciona los cambios commiteados, de trabajo y
en staged antes de proponer listas de archivos; no los pongas en staged en este
ejercicio principal. Nunca uses un add general para recoger secretos o trabajo
no relacionado. Un worktree comparte su repositorio; no es un repositorio
externo nuevo.

#### Hints

- `main...HEAD` cubre el trabajo de rama commiteado, no las ediciones sin
  commitear. Lee también los diffs de trabajo y en staged antes de decir «todos
  los cambios revisados».
- Las pruebas unitarias existentes de la API y de las columnas predeterminadas
  esperan deliberadamente valores predeterminados sensibles. La funcionalidad
  del alumno debe reemplazar esas expectativas por los valores predeterminados
  seguros del ticket; no conserves aserciones opuestas ni elimines la
  cobertura.
- Un log previamente verde no es evidencia para la edición más reciente. Vuelve
  a ejecutar las comprobaciones aprobadas después de la corrección aceptada
  final y adjunta la salida real al borrador de PR.

#### Solution approach

Mapea cada criterio de HLN-101 a su prueba y su evidencia UI/HTTP. Confirma que
los archivos de tooling no están en la historia de la funcionalidad y que las
correcciones de la funcionalidad no están en la historia de tooling. Ejecuta el
preflight aprobado secuencialmente, registra los bloqueos, y haz que Priya
apruebe el diff local exacto, la lista de archivos propuesta y el mensaje.
Mantén separados el diagnóstico del total mensual de HLN-102 y el hallazgo de
ordenación no reportado del Paso 14; ninguno es permiso para una reparación no
relacionada en esta revisión.

Para el ensayo de rollback, registra el propietario previsto, la señal de
disparo y la verificación de restauración. Si ya existe un cambio fusionado,
inspecciona su commit y despliegue reales antes de redactar comandos de
reversión coincidentes; de lo contrario deja esos identificadores pendientes.
Un commit squash y un commit merge requieren consideraciones diferentes.
Revisa la propuesta sin ejecutar un hash o una línea principal adivinados.

#### Expected result

Tienes un borrador de PR de funcionalidad revisado y un borrador de tooling
separado donde existan cambios de tooling, cada uno con impacto de negocio,
diffs acotados, salida real de comprobaciones, elementos explícitamente no
hechos y una propuesta de rollback, y cada comprobación está marcada solo con
evidencia.

[SCREENSHOT: Borrador local de funcionalidad y borrador de tooling o entrada de no hecho, con salidas de verificación y propietario del rollback]

### Common mistakes

- **Error 1:** Mezclar tooling con la funcionalidad del cliente. Revisa listas
  de archivos separadas, incluso cuando las propuestas compartan actualmente un
  checkout de alumno.
- **Error 2:** Aprobar un mensaje de commit sin revisar su diff exacto.
  Empareja primero el snapshot propuesto con la evidencia y el ticket.
- **Error 3:** Llamar despliegue a un log de build. Registra la aprobación
  local, la publicación y las comprobaciones posteriores al release por
  separado; los pasos no ejecutados quedan sin marcar.

### Hábitos de trabajo

- **Consejo 1:** Lee el diff una vez por comportamiento y otra por alcance;
  esas pasadas atrapan errores diferentes.
- **Consejo 2:** Escribe las señales de rollback y la propiedad antes de
  solicitar aprobación, mientras el cambio y sus riesgos aún están frescos.

#### Stretch goal

Haz que un compañero use solo tu borrador de PR para explicar qué se
publicaría, qué no, y cómo verificar un rollback. Revisa las frases que
requieren historia oral. Esto sigue siendo una revisión local, no autorización
para publicar.

## Terminology

- **Commit** — instantánea local. **Push** — transferir commits a un remoto. **PR** — solicitud de revisión.
- **Worktree** — otro checkout/rama en el mismo repositorio[19].
- **Diff** — evidencia. **Staging** — seleccionar el snapshot del siguiente commit.

## Advanced

La revisión de agente puede ofrecer un primer pase, pero sus hallazgos aún
necesitan validación humana[20]. Para un hook registrado y coincidente de
`beforeShellExecution`, la salida 0 usa la decisión de permiso JSON, la salida
2 deniega, y otras salidas distintas de cero fallan con fallo abierto a menos
que `failClosed: true`[5]. Que las pruebas pasen por sí solo no es permiso
universal de push. Los comandos ordinarios de la CLI de Git fuera de Cursor no
están cubiertos por este hook de evento de Cursor; los controles de Git del
lado servidor son separados. No se afirma aquí ninguna barrera de ejecución por
hook. Un commit, push, envío de PR, merge o despliegue futuros requieren su
propia aprobación explícita y evidencia real, fuera de este kit principal.

## Quiz

#### Q1: ¿Con qué termina el ejercicio principal?

- [ ] Un pull request fusionado
- [ ] Una funcionalidad desplegada
- [x] Revisión y aprobación local, no publicación
- [ ] Una rama con push

**Explanation:** El ejercicio principal termina con revisión y aprobación local; commit, push, PR, merge y despliegue siguen sin aprobar.

#### Q2: ¿Dónde deben ejecutarse las comprobaciones de preflight?

- [ ] El directorio del sitio del taller
- [x] El checkout de consola de alumno previsto
- [ ] Un repositorio externo nuevo
- [ ] Una canalización de CI en GitHub

**Explanation:** El preflight usa los propios scripts de la consola en el checkout de alumno, no las comprobaciones del sitio del taller.

#### Q3: ¿Por qué los cambios de tooling deben mantenerse fuera de la historia de la funcionalidad?

- [ ] Porque los archivos de tooling nunca pasan lint
- [ ] Porque HLN-102 los requiere
- [x] Porque Priya debe aprobar el diff exacto de la funcionalidad y las propuestas de tooling necesitan su propia evidencia
- [ ] Porque los worktrees prohíben las ediciones

**Explanation:** Revisa listas de archivos separadas; mezclar tooling con la funcionalidad del cliente confunde dos historias de aprobación y arriesga recoger trabajo no relacionado.

#### Q4: ¿Cuál es un error común contra el que advierte este paso?

- [ ] Leer también los diffs de trabajo y en staged
- [ ] Volver a ejecutar las comprobaciones aprobadas después de la corrección final
- [x] Llamar despliegue a un log de build
- [ ] Redactar un rollback con un propietario

**Explanation:** Registra la aprobación local, la publicación y las comprobaciones posteriores al release por separado; un log de build no es un despliegue.

#### Q5: ¿Con qué debe marcarse cada comprobación en los borradores de PR?

- [ ] El recuento de palabras del borrador
- [ ] La opinión del revisor
- [x] La evidencia real de la ejecución, con los elementos no hechos explícitos
- [ ] La fecha del ticket

**Explanation:** Cada comprobación se marca solo con evidencia; los elementos no hechos son explícitos y la propuesta de rollback registra propietario, señal y disparo.

## Complete

- [ ] Mark complete
