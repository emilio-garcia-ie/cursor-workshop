---
step: 9
title: "Hooks: haz que la revisión sea obligatoria"
points: 20
module: "Guardrails"
versions: ["short", "medium", "long"]
personas: ["developers", "ai-engineers", "forward-deployed"]
---

# Paso 9 — Hooks: haz que la revisión sea obligatoria (20 pts)

## Learn

Los hooks observan y controlan el bucle del agente desde `hooks.json`
(`version: 1`) a nivel de proyecto (`.cursor/hooks.json`) o de usuario[5][6].
`beforeShellExecution` maneja los eventos shell disparados por Cursor, con una
cadena de comando disponible para comparar. La salida **0** significa ejecución
exitosa y puede consumir una decisión de permiso JSON; no es permiso
incondicional. La salida **2** bloquea. Otras salidas distintas de cero fallan
con fallo abierto de forma predeterminada a menos que `failClosed: true` esté
definido[5].

Una regla es orientación; un hook de permiso puede controlar una acción
cubierta. El límite de cobertura importa tanto como el script: esto no es un
control del lado servidor de Git ni una garantía sobre pushes desde un terminal
externo[5]. `afterFileEdit` se ejecuta después de una edición, así que es útil
para comprobaciones en lugar de prevenir esa edición[5]. El título es el
objetivo para los eventos cubiertos, no una afirmación de aplicación universal.

## Implement

1. Lee `.cursor/hooks.json`, `.cursor/hooks.opt-in.json` y
   `.cursor/hooks/pre-push-check.sh`. Mantén el registro existente intacto.
   Redacta un ejemplo opt-in separado en tu worktree de tooling; nada en un
   archivo de ejemplo se ejecuta solo porque el archivo exista.
2. Usa el tipo de hook de comando explícito y la política de fallo en el
   borrador[5]:

```json
{
  "version": 1,
  "hooks": {
    "beforeShellExecution": [
      {
        "type": "command",
        "command": ".cursor/hooks/pre-push-check.sh",
        "matcher": "git push",
        "failClosed": true
      }
    ]
  }
}
```

   Los hooks de proyecto se ejecutan desde la raíz del proyecto, así que
   `.cursor/hooks/...` es la forma apropiada relativa al proyecto[5].
   `type: "command"` es explícito aquí por claridad; command ya es el valor
   predeterminado documentado[5]. El matcher es un ejemplo estrecho, no un
   detector completo de cada forma de hacer push.

3. Revisa la respuesta JSON del script y el código de salida por separado. El
   starter ejecuta pruebas para una cadena de push coincidente y reporta
   denegación si las pruebas fallan. No rompas una prueba de dinero ni
   intentes un push real para demostrar esto.
4. Ejecuta el fixture inofensivo de abajo en un checkout de alumno
   desechable, luego compara el comportamiento real de permisos de Cursor con
   la matriz documentada.

### Exercise kit

#### Starter code path

`hearthline-operator-console/.cursor/hooks/pre-push-check.sh`,
`.cursor/hooks.json` y `.cursor/hooks.opt-in.json`. El primero es el script
que debes entender; los dos últimos son ejemplos de registro que comparar, no
archivos que sobrescribir por completo.

#### Minimal working example

En un checkout de alumno desechable, crea `.cursor/hooks/hook-probe.sh`:

```bash
case "$1" in
  allow) printf '%s\n' '{"permission":"allow"}' ;;
  deny) printf '%s\n' '{"permission":"deny","user_message":"Workshop probe denied"}' ;;
  block) exit 2 ;;
  fail) exit 1 ;;
  invalid) printf '%s\n' 'not-json' ;;
  empty) exit 0 ;;
  timeout) sleep 5 ;;
  *) exit 2 ;;
esac
```

Invócalo directamente primero, sin ningún push:

```bash
bash .cursor/hooks/hook-probe.sh deny
printf 'exit=%s\n' "$?"
bash .cursor/hooks/hook-probe.sh block
printf 'exit=%s\n' "$?"
```

El fixture deny imprime JSON y sale con 0; el fixture block sale con 2. Estas
llamadas directas solo prueban la salida/código de salida del script, no la
aplicación por Cursor. Para la sonda del lado de Cursor, registra lo siguiente
**solo en el** `.cursor/hooks.json` **del checkout desechable**, después de
revisar su contenido existente:

```json
{
  "version": 1,
  "hooks": {
    "beforeShellExecution": [
      {
        "type": "command",
        "command": "bash .cursor/hooks/hook-probe.sh deny",
        "matcher": "WORKSHOP_HOOK_PROBE",
        "failClosed": true,
        "timeout": 1
      }
    ]
  }
}
```

Pídele a Cursor que ejecute exactamente
`printf '%s\n' WORKSHOP_HOOK_PROBE` en ese checkout. Solo imprime un marcador
si se permite. Confirma que el hook fue invocado; de lo contrario, la
observación no prueba la semántica de la respuesta. Cambia un argumento de
fixture o un valor de `failClosed` cada vez. Nunca uses `git push` como comando
de sonda. El timeout se especifica en segundos[5].

#### Expected diff

Un registro propuesto separado y un fixture en el trabajo de tooling del
alumno, más una tabla de resultados en tus notas. Sin ediciones de pruebas de
dinero, sin cambios al `.cursor/hooks.json` original y sin push real. El
registro del checkout desechable es temporal; elimina solo tus cambios de
fixture/registro al terminar, preservando cualquier cosa que existiera antes
del ejercicio.

#### Hints

- El JSON `permission: "deny"` puede denegar incluso con salida 0. Registra
  ambos canales[5].
- Define `failClosed` explícitamente en cada ejecución; de lo contrario su
  valor predeterminado es false[5].
- Guarda los diagnósticos saneados del hook y si el comando marcador se
  ejecutó. Un modelo que rehúsa llamar a la terminal no es una denegación de
  hook observada.

#### Solution approach

Usa esta matriz respaldada por documentación[5]; rellena tú una columna de
**Observado**. Un caso no ejecutado queda como «no ejercitado», nunca
«aprobado». Construye la matriz a partir de la observación en tiempo de
ejecución; la documentación local o el lint del sitio no pueden sustituirla.

| Fixture | Salida/código | failClosed false | failClosed true |
|---|---|---|---|
| allow | 0, JSON allow válido | Allow | Allow |
| deny | 0, JSON deny válido | Deny | Deny |
| block | 2 | Block | Block |
| fail | 1 | Fallo abierto | Block |
| invalid | 0, JSON inválido | Block permission hook | Block |
| empty | 0, sin respuesta | Block invalid permission response | Block |
| timeout | excede 1 segundo | Fallo abierto | Block |

Los hooks de permiso rechazan JSON/esquema inválidos incluso sin `failClosed`;
`failClosed: true` además bloquea fallos como caídas y timeouts[5]. Si la
observación difiere, detente y captura la configuración, la versión instalada,
el código de salida/la salida y el diagnóstico del hook. No amplíes la
afirmación de aplicación.

#### Expected result

Tienes una matriz de siete casos completada o explícitamente bloqueada, y
demuestra la separación entre éxito, permiso y política de fallo a partir de la
observación en tiempo de ejecución.

[SCREENSHOT: Marcador inofensivo denegado por el hook, con el fixture coincidente y la matriz esperado/observado]

### Common mistakes

- **Error 1:** Decir que todas las salidas distintas de cero bloquean. La
  salida 2 bloquea; otras salidas distintas de cero fallan con fallo abierto de
  forma predeterminada a menos que `failClosed` sea true[5].
- **Error 2:** Decir que la salida 0 siempre permite. Inspecciona la decisión
  de permiso JSON, incluido el manejo de denegación y de respuestas
  inválidas[5].
- **Error 3:** Tratar un hook de Cursor como una garantía del lado servidor de
  Git. Prueba solo los eventos de Cursor cubiertos; usa controles de
  repositorio independientes para una política de release más amplia[5].

### Pro tips

- **Consejo 1:** Usa un marcador inofensivo para las pruebas de fallo, nunca
  un push real.
- **Consejo 2:** Mantén las pruebas directas del script separadas de las
  pruebas de eventos de Cursor; ambas son necesarias para entender un fallo.

#### Stretch goal

Añade un comando inofensivo que no coincida a la tabla de resultados. Muestra
la diferencia entre «el hook no fue invocado» y «el hook se ejecutó y permitió»,
sin intentar eludir un control de release real.

## Advanced

Empieza con un número pequeño de hooks como preferencia del taller, no como
límite del producto. Cada hook añadido necesita un propietario, evidencia de la
ruta de fallo y un procedimiento de recuperación. La cobertura local no es
cobertura en la nube: los hooks de los Cloud Agents arrancan en un entorno con
escritura, no en los primeros turnos de solo lectura, y los hooks locales del
directorio home no están disponibles allí[31]. No infieras aplicación universal
ni comportamiento de fusión multi-fuente de este ejercicio local de fuente
única[5][7].

## Quiz

#### Q1: ¿Qué significa la salida 0 de un hook beforeShellExecution?

- [ ] Permiso incondicional para ejecutar
- [ ] El push siempre procede
- [x] Ejecución exitosa que puede consumir una decisión de permiso JSON; no es permiso incondicional
- [ ] El hook siempre bloquea

**Explanation:** La salida 0 significa ejecución exitosa y puede consumir una decisión de permiso JSON; no es permiso incondicional.

#### Q2: ¿Dónde se configuran los hooks de proyecto?

- [ ] .cursor/rules/hooks.json
- [x] .cursor/hooks.json con version: 1
- [ ] package.json
- [ ] .github/workflows/

**Explanation:** Los hooks de proyecto viven en .cursor/hooks.json con version: 1; los hooks a nivel de usuario son una ubicación separada.

#### Q3: ¿Por qué deben distinguirse la salida 2 y las otras salidas distintas de cero?

- [x] Porque la salida 2 bloquea mientras otras salidas distintas de cero fallan con fallo abierto de forma predeterminada a menos que failClosed sea true
- [ ] Porque la salida 2 permite el comando shell
- [ ] Porque todas las salidas distintas de cero son idénticas
- [ ] Porque la salida 2 es la única salida válida

**Explanation:** La salida 2 bloquea; otras salidas distintas de cero fallan con fallo abierto de forma predeterminada a menos que `failClosed: true` esté definido.

#### Q4: ¿Cuál es un error común contra el que advierte este paso?

- [ ] Definir failClosed explícitamente en cada ejecución
- [ ] Usar un marcador inofensivo para las pruebas de fallo
- [x] Tratar un hook de Cursor como una garantía del lado servidor de Git
- [ ] Registrar tanto el permiso JSON como el código de salida

**Explanation:** Un hook de Cursor controla solo los eventos shell de Cursor cubiertos, no todos los comandos de Git ni los pushes desde un terminal externo.

#### Q5: ¿Qué requiere el resultado esperado?

- [ ] Un push fusionado con las pruebas aprobadas
- [x] Una matriz de siete casos completada o explícitamente bloqueada a partir de la observación en tiempo de ejecución
- [ ] Una regla nueva en root.mdc
- [ ] Una prueba de dinero fallida

**Explanation:** El entregable es una matriz de siete casos completada o explícitamente bloqueada que demuestra la separación de éxito, permiso y política de fallo.

## Complete

- [ ] Mark complete
