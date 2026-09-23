# Glosario

Contrato de formato: `specs/glossary-format.md`. Cada entrada enlaza de vuelta
a los pasos donde aparece.

## Centavos (unidades menores de moneda)

Dinero almacenado como enteros: $1,500.00 es `150000`. Nunca flotantes; el
formateo ocurre solo en el borde mediante `formatCents()`.

Aparece en: [Paso 2](steps/02-clone-and-run.md), [Paso 3](steps/03-rules.md), [Paso 14](steps/14-unreported-bug.md)

## Agrupamiento por UTC

Marcas de tiempo almacenadas como instantes UTC y convertidas a un día de
calendario local de la propiedad solo al mostrarlas, mediante
`toPropertyLocalDay()`. Las fechas locales del servidor en la lógica son un
defecto (HLN-102).

Aparece en: [Paso 2](steps/02-clone-and-run.md), [Paso 3](steps/03-rules.md), [Paso 14](steps/14-unreported-bug.md)

## Contexto delimitado

Un dominio con un límite explícito: `Property`, `Leasing`, `Operations`,
`Payments`. Cada uno expone solo su `index.ts`; consulta el diagrama
`10-hearthline-domains`.

Aparece en: [Paso 2](steps/02-clone-and-run.md), [Paso 10](steps/10-abstractions.md), [Paso 30](steps/30-sdd-ddd.md)

## Agregado (DDD)

Un límite de consistencia dentro de un dominio (p. ej. un arrendamiento con sus
renovaciones). Cambia el agregado a través de su raíz; nunca penetres en sus
internos desde otro dominio.

Aparece en: [Paso 10](steps/10-abstractions.md), [Paso 30](steps/30-sdd-ddd.md)

## Lenguaje ubicuo

Un vocabulario compartido entre código, tickets y conversación: rent roll,
morosidad, orden de trabajo, SLA. Si el ticket dice «rent roll» y el código
dice `monthlyRevenue`, renombra el código.

Aparece en: [Paso 5](steps/05-build-a-feature.md), [Paso 30](steps/30-sdd-ddd.md)

## Arrendamiento

El contrato de un arrendatario por una unidad: plazo, centavos mensuales,
estado. ~40 activos en la semilla; las renovaciones aparecen en el Panel.

Aparece en: [Paso 1](steps/01-day-one.md), [Paso 2](steps/02-clone-and-run.md)

## Rent roll

Suma de los alquileres mensuales activos en centavos enteros
(`monthlyRentRoll()`). La métrica principal del Panel.

Aparece en: [Paso 1](steps/01-day-one.md), [Paso 2](steps/02-clone-and-run.md)

## Orden de trabajo

Un trabajo de mantenimiento: título, propiedad, estado, instante de
vencimiento SLA. ~20 abiertos en la semilla; la asignación pasa por
proveedores.

Aparece en: [Paso 1](steps/01-day-one.md), [Paso 18](steps/18-agents-window.md)

## SLA (acuerdo de nivel de servicio)

El instante de vencimiento de una orden de trabajo. Las órdenes abiertas
vencidas muestran PAST SLA en la pantalla de Mantenimiento (`isOverdue()`,
comparación UTC únicamente).

Aparece en: [Paso 1](steps/01-day-one.md), [Paso 9](steps/09-hooks.md)

## Morosidad

Pagos tardíos o parciales. Métrica del Panel; la pantalla de Pagos es donde
el equipo de Jordan los trabaja.

Aparece en: [Paso 1](steps/01-day-one.md), [Paso 5](steps/05-build-a-feature.md)

## Ocupación

Arrendamientos activos sobre el total de unidades, en porcentaje. Pronósticos
la proyecta hacia adelante (el dominio de Maya).

Aparece en: [Paso 1](steps/01-day-one.md), [Paso 17](steps/17-plan-files.md)

## Modo Plan

Modo de Cursor que propone un plan para aprobación antes de cambios de
código[8]. Guardar en el espacio de trabajo mueve un plan al espacio de
trabajo; `.cursor/plans/` es el destino de guardado/movimiento elegido
explícitamente por este taller, no un valor predeterminado automático[8].

Aparece en: [Paso 5](steps/05-build-a-feature.md), [Paso 17](steps/17-plan-files.md)

## Servidor MCP

Una fuente externa de herramientas/datos conectada mediante
`.cursor/mcp.json` (`mcpServers`): comando stdio o URL remota, secretos vía
`${env:NAME}`.

Aparece en: [Paso 6](steps/06-mcp-github.md), [Paso 24](steps/24-knowledge-graphs.md), [Paso 31](steps/31-gtm-stack.md)

## Hook

Un script invocado en un evento de agente registrado: la salida 0 consume un
JSON de permiso, la salida 2 bloquea, y los demás fallos se predeterminan a
fallo abierto salvo que `failClosed` aplique[5]. La cobertura se limita a los
eventos de Cursor compatibles, no a cada push desde un terminal externo; la
cobertura en la nube tiene límites separados[5][31].

Aparece en: [Paso 9](steps/09-hooks.md), [Paso 11](steps/11-ship.md), [Paso 29](steps/29-harness.md)

## Skill

Una unidad reutilizable `SKILL.md` (name + description la activan, cuerpo bajo
demanda): `hearthline-pr`, `spec`, `release-note`, skills de voz.

Aparece en: [Paso 7](steps/07-first-skill.md), [Paso 11](steps/11-ship.md), [Paso 31](steps/31-gtm-stack.md)

## Subagente

Un agente delegado con su propio contexto proporcionado por el padre; hereda
las herramientas del padre y comparte el checkout de forma predeterminada
salvo que se solicite aislamiento[34]. `readonly: true` restringe escrituras,
no errores de informe ni cada herramienta heredada remota; los Agentes de
nube son una superficie de runtime distinta[34][15].

Aparece en: [Paso 8](steps/08-org-reviewer.md), [Paso 13](steps/13-workflows.md), [Paso 18](steps/18-agents-window.md)

## Semilla determinista

Datos generados con semilla fija (`20260911`): registros idénticos y defectos
idénticos en cada arranque. Cualquier cosa que crees persiste hasta el
reinicio.

Aparece en: [Paso 2](steps/02-clone-and-run.md), [Paso 22](steps/22-tdd.md)

## Modo personalizado

Un modo respaldado por un skill mantiene el skill en el contexto durante la
sesión, a diferencia de la invocación slash ordinaria por mensaje[9][32]. La
persistencia es contexto, no programación ni autorización.

Aparece en: [Paso 7](steps/07-first-skill.md), [Paso 12](steps/12-loops-goals.md)

## Beta de Projects

El producto opcional de contexto compartido de Cursor con un coordinador que
delega la implementación[36], distinto de un proyecto de repositorio local.
El taller no requiere aprovisionamiento.

Aparece en: [Paso 4](steps/04-context.md), [Paso 13](steps/13-workflows.md), [Paso 18](steps/18-agents-window.md), [Paso 33](steps/33-improvement-loop.md)

## Worktree

Un checkout de Git aislado para una tarea; un contexto de modelo separado por
sí solo no proporciona uno[19][34]. El flujo nativo de la interfaz de Cursor
pertenece a la ventana de agentes; las IDE Worktree Skills y Git crudo son
flujos de trabajo separados[19].

Aparece en: [Paso 7](steps/07-first-skill.md), [Paso 18](steps/18-agents-window.md)

## Agente de nube

Un runtime de agente asíncrono basado en VM[15], no un sinónimo de cada
subagente. La cobertura de hooks en la nube comienza en entornos con
escritura y excluye los primeros turnos de solo lectura y los hooks locales
del directorio home[31].

Aparece en: [Paso 8](steps/08-org-reviewer.md), [Paso 15](steps/15-slack-bot.md), [Paso 18](steps/18-agents-window.md)

## My Machines y pools de equipo

My Machines conecta una máquina personal; los pools de equipo encolan tareas
para los trabajadores disponibles[36]. Estas ubicaciones de ejecución
opcionales no son requisitos de configuración del taller.

Aparece en: [Paso 18](steps/18-agents-window.md), [Paso 26](steps/26-security.md)

## Origin

Alojamiento opcional para trabajo de Agente de nube sin control de versiones
de terceros; los repositorios alojados en Origin y los repositorios de
GitHub sincronizados tienen diferentes fuentes de verdad[36]. Este taller
retiene GitHub.

Aparece en: [Paso 2](steps/02-clone-and-run.md), [Paso 15](steps/15-slack-bot.md), [Paso 18](steps/18-agents-window.md)

## Revisión de agentes

Revisión integrada que puede leer los estándares `BUGBOT.md` del repositorio y
ofrece niveles de costo Quick/Deep[20]. El taller usa `/agent-review` manual,
no una promesa de disparo automático ni de cuota gratuita sin verificar[20].

Aparece en: [Paso 8](steps/08-org-reviewer.md), [Paso 10](steps/10-abstractions.md)

## Chat lateral

Una conversación hija solo local que usa el historial del padre como contexto
de referencia oculto; no puede anidarse[33]. Cerrarla la archiva, y
mencionarla con @ trae su contexto de vuelta al padre[33].

Aparece en: [Paso 10](steps/10-abstractions.md), [Paso 19](steps/19-side-chats.md)

## MCP Apps

Respuestas MCP que incluyen una interfaz interactiva junto a la salida de la
herramienta[3]. El soporte del protocolo no establece un servidor instalado
ni autenticado.

Aparece en: [Paso 6](steps/06-mcp-github.md), [Paso 24](steps/24-knowledge-graphs.md)

## Plugin de Cursor

Un paquete que usa `.cursor-plugin/plugin.json`, compatible con agentes y
hooks además de skills/MCP; el `plugin.json` de la raíz identifica el formato
distinto `Agent Plugin`[28][35]. El empaquetado no es prueba de restricciones
instaladas.

Aparece en: [Paso 8](steps/08-org-reviewer.md), [Paso 25](steps/25-marketplace.md)

## Tab y Inline Edit

Tab sugiere completaciones; Inline Edit apunta al código seleccionado con
Cmd+K o Ctrl+K[10][11]. Las reglas del proyecto no se aplican a ninguna de
las dos superficies, así que las solicitudes de edición deben declarar las
restricciones relevantes[2].

Aparece en: [Paso 3](steps/03-rules.md), [Paso 16](steps/16-fast-loop.md)

## Suscripción de nube

Trabajo recurrente solo de nube activado por programaciones, PRs o hilos de
Slack en la versión citada[32]. Una suscripción no otorga aprobación para
publicar.

Aparece en: [Paso 12](steps/12-loops-goals.md), [Paso 15](steps/15-slack-bot.md), [Paso 33](steps/33-improvement-loop.md)

## Canvas

Un artefacto interactivo junto al chat; los canvases compartidos son
instantáneas de solo lectura para compañeros con requisitos de plan de pago,
equipo y privacidad[25]. Un artefacto renderizado no verifica sus datos ni
autoriza compartirlo públicamente.

Aparece en: [Paso 10](steps/10-abstractions.md), [Paso 23](steps/23-images.md), [Paso 32](steps/32-customer-canvas.md)

## API de analítica

Métricas de uso de Cursor exclusivas de Enterprise[30], no una fuente de
todos los resultados de entrega, calidad o ventas. El taller mantiene esas
medidas en hojas de trabajo separadas y permite que los campos de uso no
disponibles permanezcan desconocidos.

Aparece en: [Paso 10](steps/10-abstractions.md), [Paso 27](steps/27-models-cost.md), [Paso 33](steps/33-improvement-loop.md)

## Arnés

El término organizativo del taller para las instrucciones, el contexto, las
herramientas, la elección del modelo y la verificación alrededor de una tarea,
no una garantía de activación en todo el producto. Un inventario de
componentes debe distinguir presente, registrado y probado en runtime.

Aparece en: [Paso 29](steps/29-harness.md)
