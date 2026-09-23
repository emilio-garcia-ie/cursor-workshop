---
step: 28
title: "Cursor en la terminal y sin interfaz"
points: 10
module: "Team & Scale"
versions: ["long"]
personas: ["ai-engineers", "forward-deployed"]
---

# Paso 28 — Cursor en la terminal y sin interfaz (10 pts)

## Learn

El ejecutable documentado de Cursor CLI es `agent`, con sesiones interactivas,
modos Ask/Plan y salida no interactiva con `-p`/`--print`[22]. No sustituyas por
un comando de editor `cursor -p` supuesto. El modo print sin `--force` propone
ediciones de archivo en lugar de aplicarlas; `--force` permite cambios directos
en los archivos sin confirmación[24]. No es necesario para este kit de solo
lectura.

La instalación es específica de cada plataforma[23]. Usa la referencia oficial de
instalación y el proceso de aprobación de tu organización en lugar de
canalizar un instalador sin leer hacia un shell. La autenticación sin interfaz
puede usar `CURSOR_API_KEY`[24]; los valores de secreto deben estar fuera del
repo y de los artefactos de salida. No se asume ninguna instalación ni
credenciales a partir del archivo MCP de ejemplo del taller.

## Implement

### Exercise kit — análisis de terminal con una puerta de revisión

#### Starter code path

Usa un checkout de la consola del alumno con una base conocida y un diff
rastreado limpio. Si un CLI aprobado ya está instalado, registra
`agent --version` usando la comprobación de versión documentada[23]. De lo
contrario, envía el prompt y el bloqueador de configuración; no afirmites que se
haya ejecutado un CLI. Lee `docs/tickets/HLN-108.md` y la ruta de exportación
antes de evaluar la documentación generada.

```sh
agent -p --mode=ask "Read src/app/api/payments/export/route.ts and src/lib/csv.ts. Describe omitted columns versus explicit empty columns, response type, and validation failure status. Cite file:line. Do not edit, install, connect tools, or create remote artifacts."
```

El modo Ask y los flags de print de arriba están documentados[22]. Los prompts de
alcance no reemplazan los permisos de ejecución; usa solo acceso local aprobado.

1. Ejecuta el único comando aprobado y registra el estado de salida más la
   salida. Comprueba manualmente las líneas del fuente citadas; el éxito del
   comando no es la corrección de la respuesta.
2. Inspecciona el diff rastreado después. El entregable es el análisis, no un
   parche de código ni una automatización nueva que observe cada ticket.
3. Califica la respuesta contra la ruta real y `tests/api.test.ts`. Ejecuta
   `npm test -- tests/api.test.ts` por separado si las dependencias están
   disponibles.
4. Redacta una canalización manual: ticket seleccionado → análisis acotado →
   revisión humana → parche del alumno autorizado por separado → pruebas. No la
   programes ni hagas push.

#### Expected diff

Estado de versión/configuración, un resultado de comando, resumen del contrato
verificado y diff del fuente sin cambios. Reporta honestamente la autenticación
o la ejecución no disponibles; nunca pegues una API key en la evidencia.

#### Hints

- Un formato de salida estructurado como JSON está documentado[24], pero su
  presencia no hace correctas las afirmaciones sobre el fuente.
- Valida el contenido de forma independiente.

#### Solution approach

Una respuesta correcta distingue `columns` omitidas (valores predeterminados) de
`columns=` (CSV vacío), identifica `text/csv` en el éxito y el estado 400 para
una consulta inválida, y etiqueta los valores sensibles por defecto como un
defecto plantado. Una respuesta que reclame autenticación o un diálogo de
selección nuevo no está soportada por la ruta. Mantén el ejercicio
predeterminado de solo lectura y usa `agent`, no el lanzador del editor. Rechaza
garantías de endpoint alucinadas y conserva la evidencia de ejecución que falte.
Cualquier ejecución futura con `--force` necesita alcance de escritura explícito
y revisión del diff[24], además de una cobertura de hooks verificada de forma
independiente para ese entorno de ejecución[5][31].

#### Expected result

Tienes un análisis de CLI registrado con citas del fuente verificadas, un diff
rastreado sin cambios y un reporte honesto de configuración/versión, y no se
editó ningún archivo ni se expuso ninguna credencial.

> Screenshot placeholder: versión del CLI, análisis redactado con ubicaciones
> del fuente, estado de salida y diff sin cambios; nunca muestres valores de
> autenticación.

#### Stretch goal

Solicita el mismo análisis en JSON usando `--output-format json`[24]. Compara
los fallos de análisis con los errores sustantivos y define una condición de
parada para cada uno. No inventes comportamiento de SDK o ACP a partir de un
enlace de navegación no inspeccionado.

## Pro tips

- **Consejo 1:** Prueba un ticket seleccionado antes de diseñar un vigilante por
  lotes.
- **Consejo 2:** Separa el éxito del proceso, la validez del esquema, la
  precisión del fuente y el éxito de las pruebas.

### Common mistakes

- **Error 1:** Usar el comando `cursor -p` supuesto del editor en lugar del
  `agent` documentado[22].
- **Error 2:** Añadir `--force` a un análisis de solo lectura o asumir que el
  texto de salida prueba que no hay efectos secundarios[24].
- **Error 3:** Afirmar que todos los hooks y revisores interactivos bloquean
  automáticamente una canalización sin interfaz.

## Advanced

Una canalización sin interfaz sigue siendo un proceso revisado por humanos.
Automatizar el comando no automatiza la puerta de revisión, y un estado de
salida satisfactorio no es una respuesta satisfactoria; mantén ambos separados
en cada canalización borrador.

## Quiz

#### Q1: ¿Cuál es el ejecutable documentado de Cursor CLI para la salida no interactiva?

- [ ] `cursor -p`
- [x] `agent` con `-p/--print`
- [ ] `code --print`
- [ ] `cursor --cli`

**Explanation:** El ejecutable documentado es `agent`, con sesiones
interactivas, modos Ask/Plan y salida no interactiva con `-p/--print`.

#### Q2: ¿Qué ticket lee el análisis de CLI antes de evaluar la documentación generada?

- [ ] HLN-101
- [ ] HLN-103
- [x] HLN-108
- [ ] HLN-109

**Explanation:** La ruta de código inicial lee `docs/tickets/HLN-108.md` y la
ruta de exportación antes de evaluar la documentación generada.

#### Q3: ¿Por qué un estado de salida satisfactorio no prueba que la respuesta del CLI sea correcta?

- [ ] Porque el CLI siempre devuelve exit 0
- [x] Porque el éxito del proceso y la precisión del fuente son comprobaciones separadas
- [ ] Porque HLN-108 no está relacionado con la ruta
- [ ] Porque el modelo nunca lee archivos

**Explanation:** El éxito del comando no es la corrección de la respuesta, así
que las líneas del fuente citadas deben verificarse manualmente.

#### Q4: ¿Qué sustitución de comando es un error documentado en este paso?

- [ ] `agent -p --mode=ask`
- [ ] `agent -p --mode=plan`
- [x] `cursor -p` en lugar del ejecutable documentado `agent`
- [ ] `agent --version`

**Explanation:** Usar el comando `cursor -p` supuesto del editor en lugar del
ejecutable documentado `agent` es el error 1.

#### Q5: ¿Qué debe seguir siendo cierto del diff rastreado después del análisis de CLI?

- [ ] Que muestre un archivo de automatización nuevo
- [x] Que esté sin cambios, porque el entregable es el análisis, no un parche
- [ ] Que contenga el CSV exportado
- [ ] Que debe incluir ediciones con --force

**Explanation:** El resultado esperado mantiene el diff rastreado sin cambios y
entrega el análisis, no un parche de código ni una automatización nueva.

## Complete

- [ ] Mark complete
