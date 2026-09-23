---
step: 2
title: "Clónalo y ejecútalo"
points: 30
module: "Foundations"
versions: ["short", "medium", "long"]
personas: ["vibecoders", "developers", "data-scientists", "ai-engineers", "forward-deployed"]
---

# Paso 2 — Clónalo y ejecútalo (30 pts)

## Learn

Clonar un repositorio y ejecutar su instalación son decisiones separadas.
Revisa manifiestos, lockfiles, scripts, hooks y configuración antes de
ejecutarlos.

Este proyecto es una aplicación **Next.js 14** en TypeScript con **Tailwind**
y componentes Tremor. Los datos viven en un almacén en memoria con semilla
determinista al arrancar (`src/data/`), de modo que cada alumno obtiene los
mismos registros y los mismos defectos. Todo lo que crees persiste hasta que el
servidor de desarrollo se reinicia.

Dos convenciones explican casi todo el código, ambas escritas en las reglas del
proyecto: el dinero son **centavos enteros**, y el almacenamiento y el
agrupamiento están en **UTC**. Cada defecto plantado rompe una de ellas.

## Implement

Tu primer ticket es **HLN-101**. Tres cosas te separan de él: el código, una
rama y la aplicación en ejecución.

### 1. Fork, clonar y crear la rama

```bash
git clone ../hearthline-operator-console
cd hearthline-operator-console
git switch -c HLN-101-export-options
```

(Después de la publicación: haz fork en GitHub primero y luego clona tu fork.
La rama se nombra según el ticket — así es como el trabajo queda rastreado
hasta la solicitud.)

### 2. Instala y ejecuta

```bash
npm install
npm run dev
# open http://localhost:3000
```

Recorre las cinco pantallas con clics. Nota lo que falta: **Inspecciones** (y
los huecos al estilo Cards son deliberados — recuérdalos para el Build Battle).

### 3. Lee el ticket

Abre `docs/tickets/HLN-101.md` con `@docs/tickets/HLN-101.md` y resúmelo en
tres líneas: qué pide y de qué advierten las notas. Léelo también tú — las
notas existen porque alguien ya perdió una tarde en la trampa que describen.

### 4. Ubícate

```text
@src I want to understand this codebase. Investigate the project and describe
the four domains (Property, Leasing, Operations, Payments), the tech stack,
and where the payments export flows end to end.
```

Investiga antes de editar: la respuesta nombra las costuras que tocará tu
cambio de HLN-101, de modo que el plan del Paso 5 tenga dónde apoyarse.

### Exercise kit

#### Starter code path

`hearthline-operator-console/package.json`, `package-lock.json`,
`README.md` y `src/app/api/payments/export/route.ts`. Revisa la instalación en
estos archivos antes de aprobarla. Ejecuta los comandos en tu clon, no en el
directorio `site/` del sitio del taller.

#### Minimal working example

Mantén el servidor de desarrollo en una terminal. En una segunda terminal del
mismo clon, recopila una línea base sin editar el código de la aplicación:

```bash
git branch --show-current
npm test
curl -i 'http://localhost:3000/api/payments/export?columns=status,id'
git status --short
```

La solicitud explícita de `columns` es una sonda pequeña y útil incluso antes
de que exista la interfaz de selección de columnas. Estos son datos locales
generados del caso de estudio, no un permiso para exportar los pagos de un
cliente real.

#### Expected diff

Ningún diff de aplicación. La rama debe ser `HLN-101-export-options`; registra
cualquier cambio de lockfile generado por la instalación e investiga en lugar
de incluirlo en silencio en la funcionalidad. Conserva las salidas de la línea
base en tus notas.

#### Hints

- «Connection refused» significa que debes verificar el servidor de desarrollo
  y el puerto que imprimió antes de cambiar la ruta. Si eligió otro puerto, usa
  ese puerto.
- Que una página del navegador cargue no prueba que el punto de conexión de
  exportación funcione. Inspecciona el estado HTTP y la cabecera CSV de forma
  independiente.
- Las pruebas describen la semilla actual, incluidos los defectos
  intencionales; verde es una línea base, no evidencia de que HLN-101 se haya
  implementado.

#### Solution approach

Confirma la rama, aprueba la instalación revisada, arranca la aplicación y
ejecuta la pequeña sonda HTTP. Traza el `GET` desde la ruta de exportación
hasta el servicio de pagos y el helper de CSV. Anota ese recorrido de la ruta
al helper con referencias de archivo antes de pedir un plan de funcionalidad.

#### Expected result

Tienes la consola en ejecución con las cinco pantallas accesibles, y la
solicitud explícita de exportación devuelve HTTP 200 que empieza por
`status,id`, con el estado real, la cabecera y el resumen de pruebas guardados
(o el bloqueo exacto registrado).

[SCREENSHOT: La pantalla Pagos junto al nombre de rama de la terminal, el resumen de pruebas y la cabecera de respuesta CSV]

#### Stretch goal

Reinicia el servidor de desarrollo y repite la misma solicitud de solo lectura.
Compara las respuestas para entender la semilla determinista sin depender de
que un registro creado sobreviva a un reinicio.

### Common mistakes

- **Error 1:** Ejecutar la instalación en `cursor-workshop/site`. Verifica el
  nombre del paquete y el directorio actual antes de instalar.
- **Error 2:** Editar antes de crear la rama. Confirma primero la rama del
  ticket; no muevas ni descartes cambios existentes de otra persona.
- **Error 3:** Tratar una línea base verde como evidencia de aceptación del
  nuevo diálogo. Captura la línea base ahora y compara después del Paso 5.

## Pro tips

- **Consejo 1:** Mantén una segunda terminal para las sondas, de modo que los
  registros del servidor sigan visibles.
- **Consejo 2:** Guarda los comandos exactos y sus salidas; «funcionó» no es
  una línea base.

- Lectura de seguridad antes de `npm install`: qué scripts se ejecutan, qué
  acceso a red necesitan, si existe algún hook de postinstall.
- Crea la rama antes de la primera edición, siempre — nombrada según el ticket.
- Referencia el archivo del ticket con `@` en lugar de pegarlo.
- Lee las propias reglas del repo antes de escribir el prompt (`root.mdc` es
  `alwaysApply`[1]).
- `git log --oneline -20` — estilo de commits y áreas de código activas.

## Advanced

El prompt orientado a resultados («instala y ejecuta») reduce el tiempo hasta
la primera ejecución de una mañana a minutos. La parte revisable importa más:
lee qué ejecuta la instalación antes de aprobarla — ese hábito, más un
lockfile, es la diferencia entre un agente que acelera a tu equipo y uno que
amplía la superficie de la cadena de suministro.

Distinción opcional de alojamiento: Cloud Agents puede iniciarse sin control de
versiones de terceros y guardar el trabajo en Origin. Los repositorios
alojados en Origin usan Origin como fuente de verdad; los repositorios de
GitHub sincronizados conservan GitHub como fuente de verdad[36]. Este taller
sigue usando el flujo de trabajo del caso de estudio con GitHub; no se requiere
ninguna migración de alojamiento.

## Quiz

#### Q1: ¿Cómo almacena el dinero Hearthline?

- [ ] Dólares en coma flotante
- [x] Centavos enteros
- [ ] Cadenas decimales
- [ ] Puntos porcentuales

**Explanation:** El dinero son centavos enteros; cada defecto plantado rompe esta convención o la convención UTC.

#### Q2: ¿Qué archivo es el punto de conexión de exportación de pagos?

- [ ] `src/app/payments/page.tsx`
- [x] `src/app/api/payments/export/route.ts`
- [ ] `src/lib/csv.ts`
- [ ] `README.md`

**Explanation:** El punto de conexión de exportación vive en `src/app/api/payments/export/route.ts`, uno de los archivos que hay que revisar antes de aprobar la instalación.

#### Q3: ¿Por qué cada alumno ve los mismos registros y los mismos defectos?

- [ ] Porque hay una base de datos de producción compartida
- [x] Porque un almacén en memoria recibe una semilla determinista al arrancar
- [ ] Porque los datos de producción se copian localmente
- [ ] Porque el servidor de desarrollo genera datos aleatorios

**Explanation:** Los datos viven en un almacén en memoria con una semilla determinista al arrancar, de modo que cada alumno obtiene los mismos registros y los mismos defectos.

#### Q4: ¿Cuál es un error común contra el que advierte este paso?

- [ ] Leer el ticket con una referencia @
- [ ] Crear la rama antes de la primera edición
- [x] Ejecutar la instalación en el directorio del sitio del taller
- [ ] Mantener una segunda terminal para las sondas

**Explanation:** Ejecutar la instalación en `cursor-workshop/site` es un error común; ejecuta los comandos en tu clon, no en el directorio del sitio.

#### Q5: ¿Qué cuenta como resultado esperado para la sonda de solo lectura?

- [ ] Una página del navegador que carga
- [ ] Un npm test que pasa
- [x] Una respuesta HTTP 200 que empieza por status,id, con el estado real, la cabecera y el resumen de pruebas guardados
- [ ] Un archivo nuevo creado en la aplicación

**Explanation:** La solicitud explícita de exportación debe devolver HTTP 200 que empieza por status,id, y la evidencia debe guardarse o registrarse el bloqueo exacto.

## Complete

- [ ] Mark complete
