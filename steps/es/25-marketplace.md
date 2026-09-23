---
step: 25
title: "Marketplace de equipo: estándares que viajan"
points: 10
module: "Team & Scale"
versions: ["medium", "long"]
personas: ["ai-engineers", "forward-deployed"]
---

# Paso 25 — Marketplace de equipo: estándares que viajan (10 pts)

## Learn

Dos formatos reales importan: los **plugins de agente** usan `plugin.json` en
la raíz y empaquetan skills/MCP; los **Cursor Plugins** usan
`.cursor-plugin/plugin.json` y admiten además reglas, agentes, comandos, hooks y
variables[28][35]. Un revisor más un hook necesita por tanto el formato Cursor
Plugin, no un bundle universal inventado.

La distribución no es imposición universal. **Default Off** es opt-in;
**Default On** se instala de forma predeterminada pero permite darse de baja;
**Required** impide la desinstalación para la audiencia configurada[28]. El
acceso es una configuración aparte[28]. La instalación obligatoria no prueba que
un hook empaquetado se ejecute en cada entorno de ejecución ni que bloquee
pushes desde la terminal externa[5][31]. Los metadatos de versión están
documentados[35]; el pinning por consumidor y las versiones instaladas
inmutables no se establecen aquí.

## Implement

### Exercise kit — paquete redactado por el alumno, sin despliegue

#### Starter code path

Revisa la evidencia de tu revisor del Paso 8 y del hook del Paso 9 en la copia
de alumno. Los scripts existentes bajo `.cursor/hooks/` y un ejemplo de registro
opt-in son material de práctica, no prueba de imposición activa en el tenant. No
edites el `.cursor/hooks.json` compartido, no instales un plugin ni aprovisiones
un marketplace. Crea el siguiente paquete solo en un directorio de herramientas
del alumno aparte:

```text
learner-marketplace/
  .cursor-plugin/marketplace.json
  plugins/hearthline-standards/
    .cursor-plugin/plugin.json
    agents/org-standards.md
    hooks/hooks.json
    hooks/pre-push-check.sh
```

El descubrimiento predeterminado de Cursor Plugin incluye `agents/` y
`hooks/hooks.json`[35]. Para
`plugins/hearthline-standards/.cursor-plugin/plugin.json`:

```json
{
  "name": "hearthline-standards",
  "version": "0.1.0"
}
```

Para el `.cursor-plugin/marketplace.json` de la raíz del repositorio del
alumno, usa una fuente local de plugins explícita; el nombre, el nombre del
propietario y los plugins son obligatorios[35]:

```json
{
  "name": "hearthline-workshop",
  "owner": { "name": "Workshop learner" },
  "plugins": [
    { "name": "hearthline-standards", "source": "./plugins/hearthline-standards" }
  ]
}
```

1. Copia solo componentes del alumno ya revisados; inspecciona todas las rutas
   de comandos y evita secretos o rutas absolutas específicas de una máquina. No
   registres el paquete borrador.
2. Analiza ambos manifiestos JSON localmente y verifica que cada componente
   referenciado exista. Compara nombres y disposición con los campos
   documentados[35]. El análisis no es validación de instalación de Cursor.
3. Produce una matriz de aceptación: análisis de manifiestos, descubrimiento de
   componentes, ruta del hook instalado, restricción de solo lectura,
   comportamiento de permitir/denegar/fallo del hook, instalación en una segunda
   cuenta y cobertura en la nube. Marca como superadas solo las comprobaciones
   realmente realizadas; las filas de entorno de ejecución permanecen bloqueadas
   para una aprobación separada.
4. Redacta una elección de distribución **Default Off**, con una audiencia de
   prueba explícita y un responsable de eliminación/recuperación. No ocurre
   ninguna publicación real ni cambios de cuenta.

#### Expected diff

Paquete del alumno, JSON válido, inventario de rutas y una matriz de aceptación
honesta, no una afirmación de que los estándares se apliquen ahora en todas
partes.

#### Hints

- El hook con exit 0 consume las decisiones JSON, exit 2 bloquea, y los demás
  códigos de salida no nulos son fallo abierto por defecto; el intento de
  bloquear fallos requiere `failClosed`[5].
- Revisa estas semánticas por separado del empaquetado y nunca pruebes haciendo
  push de verdad.

#### Solution approach

Usa el manifiesto Cursor Plugin y la fuente de marketplace explícica mostrados
arriba. Copiar un comando de hook del proyecto como
`.cursor/hooks/pre-push-check.sh` a este paquete no prueba que se resuelva desde
un plugin instalado; marca la resolución de la ruta instalada como **no
verificada** en lugar de afirmar que un listado del paquete es una prueba de
ejecución. Del mismo modo, el `readonly: true` del revisor del proyecto tiene
restricciones de escritura documentadas[34], pero su preservación mediante el
empaquetado debe probarse de forma independiente. Conserva las celdas de
entorno de ejecución no verificadas. Una importación privada opcional futura usa
Dashboard → Plugins → Add Marketplace → Import from Repo → Add to Marketplace y
después los ajustes de acceso[28]. El envío a un marketplace público es un
flujo de repositorio público revisado por separado[35]; ninguno de los dos lo
exige este kit.

#### Expected result

Tienes el paquete del alumno con JSON válido, un inventario de rutas y una
matriz de aceptación cuyas filas de entorno de ejecución son honestamente no
verificadas, y no se instaló ningún plugin ni se aprovisionó ningún marketplace.

> Screenshot placeholder: árbol del paquete del alumno, resultados de análisis
> de los manifiestos y matriz de aceptación con las filas de
> instalación/imposición visiblemente no verificadas.

#### Stretch goal

Compara la distribución de paquetes con la publicación de skills personales:
publicar una skill personal crea un plugin, los compañeros hacen opt-in y las
skills referenciadas no se empaquetan automáticamente[28]. Explica qué recursos
faltantes harían incompleto un playbook publicado. No lo publiques.

## Pro tips

- **Consejo 1:** Empieza con distribución opt-in y un conjunto revisado de
  componentes antes de ampliar el acceso.
- **Consejo 2:** Registra la revisión del fuente y los metadatos de versión para
  reproducibilidad sin prometer pinning.

### Common mistakes

- **Error 1:** Usar `plugin.json` en la raíz para el paquete revisor/hook[28][35].
- **Error 2:** Llamar a Default On no opcional o equiparar Required con
  imposición universal[28].
- **Error 3:** Reportar éxito en la segunda cuenta sin probar realmente la
  instalación y la ejecución.

## Advanced

El empaquetado es un mecanismo de entrega, no una prueba de imposición. Que un
paquete de estándares sea Default Off, Default On o Required solo describe la
instalación; ejecutar un hook en cada entorno de ejecución, respetar los ajustes
de acceso y sobrevivir a una segunda cuenta aún deben probarse donde realmente
se aplican.

## Quiz

#### Q1: ¿Qué formato de plugin requiere un paquete que combina un agente revisor con un hook?

- [ ] Un formato de bundle universal
- [x] El formato Cursor Plugin que usa .cursor-plugin/plugin.json
- [ ] Los plugins de agente que usan solo plugin.json en la raíz
- [ ] Un paquete solo de skills

**Explanation:** El formato Cursor Plugin admite reglas, agentes, comandos,
hooks y variables, que es lo que requiere un revisor más un hook.

#### Q2: ¿Dónde vive el manifiesto del marketplace en el paquete del alumno?

- [ ] `plugins/hearthline-standards/plugin.json`
- [x] `learner-marketplace/.cursor-plugin/marketplace.json`
- [ ] `.cursor/hooks.json`
- [ ] `src/app/payments/page.tsx`

**Explanation:** La disposición del paquete ubica el manifiesto del marketplace
en `learner-marketplace/.cursor-plugin/marketplace.json` con una fuente local de
plugins explícita.

#### Q3: ¿Por qué una distribución Required no es prueba de que un hook de estándares imponga realmente los estándares?

- [ ] Porque Required solo controla la ruta de exportación
- [ ] Porque los paquetes Required no pueden contener hooks
- [x] Porque Required solo impide la desinstalación y no prueba que un hook empaquetado se ejecute en cada entorno de ejecución
- [ ] Porque Priya debe aprobar cada ejecución de hook

**Explanation:** La instalación Required es una política de instalación, y no
prueba que un hook empaquetado se ejecute en cada entorno de ejecución ni que
bloquee pushes desde la terminal externa.

#### Q4: ¿Qué dice este paso sobre marcar la fila de la matriz de aceptación para la instalación en una segunda cuenta?

- [ ] Puede marcarse como superada según el listado del paquete
- [ ] Debería eliminarse para ahorrar espacio
- [x] Debe permanecer no verificada salvo que la instalación y la ejecución se hayan probado realmente
- [ ] Prueba que el hook se ejecuta en la nube

**Explanation:** Reportar éxito en la segunda cuenta sin probar realmente la
instalación y la ejecución es uno de los errores comunes enumerados.

#### Q5: ¿Qué NO debe ocurrir durante este paso?

- [ ] Analizar ambos manifiestos JSON localmente
- [ ] Redactar una elección de distribución Default Off
- [x] Instalar el plugin o aprovisionar un marketplace
- [ ] Producir una matriz de aceptación

**Explanation:** El resultado esperado exige que no se instale ningún plugin ni
se cree ningún marketplace, con las filas de entorno de ejecución honestamente
no verificadas.

## Complete

- [ ] Mark complete
