---
step: 31
title: "Stack GTM"
points: 15
module: "Bonus"
versions: ["long"]
personas: ["forward-deployed", "ai-engineers"]
---

# Paso 31 — Stack GTM (15 pts)

## Learn

Un brief de acercamiento útil separa a quién dirigirse, qué evidencia respalda el
mensaje y por qué el momento importa. Las reglas pueden expresar la voz[1], los
skills pueden empaquetar un procedimiento de redacción repetible[9], y las
herramientas MCP aprobadas pueden aportar fuentes[3]. Esos mecanismos no
establecen un servidor MCP de Gmail o Slack en particular, credenciales ni permiso
para enviar acercamiento.

La fuente de la integración de Slack describe la invocación de
`Cloud Agent`[26], no una instalación MCP genérica de Slack verificada. Usa aquí la
evidencia ficticia suministrada. No conectes cuentas, extraigas datos de personas,
envíes mensajes ni sugieras que las afirmaciones de muestra son prueba real de
clientes.

## Implement

### Exercise kit — un primer contacto atado a la evidencia

#### Starter code path

`Crestview Properties` es, para este ejercicio, un gestor ficticio de 120
unidades en Portland, no una empresa descubierta en la semilla de la consola. Usa este
paquete de fuentes sintético:

```text
F1 — fictional prospect note: Crestview manages 120 units and wants clearer
monthly payment reporting. No budget, purchase intent, or customer result known.
F2 — code observation: the learner console has a Payments page and a server
CSV export. Default sensitive columns are a planted defect, not a selling point.
V1 — preferred voice: short, specific, one question, no urgency or guarantees.
V2 — rejected voice: "Our proven automation will cut your costs in half today."
```

1. En un artefacto solo de alumno, escribe un borrador de skill
   `hearthline-voice` con frontmatter `name` y `description` y un procedimiento
   corto[9]. Exige una etiqueta de fuente para cada afirmación sobre el prospecto
   o el producto; lo desconocido permanece desconocido.
2. Pide un borrador de primer contacto de menos de 80 palabras usando solo F1/F2
   y V1. Conserva las etiquetas de fuente en la versión de revisión interna. No
   llames a herramientas de correo ni de CRM.
3. Califícalo por el anclaje factual, las promesas sin respaldo, el tono y una
   única pregunta sin presión. Rechaza afirmaciones de ahorros probados o de
   Inspecciones completadas.
4. Añade un contraejemplo: el mismo prospecto sin nota de interés en reportes. El
   borrador debe eliminar esa afirmación en lugar de inferirla del tamaño de la
   empresa.

#### Expected diff

El borrador de skill del alumno, dos mensajes con etiqueta de fuente interna y
una tabla de calificación. F1/F2 son identificadores locales de fixture, no
entradas numeradas de bibliografía ni evidencia de resultados de venta reales. No
se envía nada.

#### Hints

- Separa el comportamiento observado del prototipo de una promesa lista para el
  cliente.
- La fuga de exportación plantada significa que cualquier demo necesita una
  limitación clara y datos sintéticos.

#### Solution approach

«Tu nota de muestra menciona el reporte mensual de pagos. Tenemos una
canalización de CSV en prototipo que podemos recorrer; ¿te resultaría útil una
conversación corta de requisitos?» es un borrador ficticio defendible. «Redujimos
los costos de un par en un 50%» no tiene fuente de respaldo y debe eliminarse, no
decorarse con una cita fabricada. Conserva la frase de interés en reportes solo
cuando F1 la aporta; usa una pregunta de requisitos cuando la nota esté ausente.
No incluyas ningún punto de prueba de cliente a menos que una futura fuente
aprobada aporte realmente uno.

#### Expected result

Tienes un borrador de skill de alumno, dos borradores de mensaje con etiqueta de
fuente y una tabla de calificación, y no se ha enviado ningún mensaje ni conectado
ninguna cuenta.

> Screenshot placeholder: el paquete de fuentes ficticio, dos variantes de
> borrador y las afirmaciones sin respaldo rechazadas; sin datos de contacto
> reales ni tokens de cuenta.

#### Stretch goal

Redacta una lista de verificación de acceso a fuentes para una futura
integración aprobada: propietario, alcance de datos, permisos de lectura y
escritura, retención y aprobación humana de envío. La interpolación de entorno es
compatible con la configuración MCP[3], pero no es evidencia de que un endpoint de
ejemplo esté autenticado o sea seguro.

### Common mistakes

- **Error 1:** Citar la integración de Slack como prueba de un servidor MCP
  genérico de Slack[26].
- **Error 2:** Tratar notas ficticias de prospectos o datos semilla como
  resultados reales de clientes.
- **Error 3:** Enviar automáticamente un borrador pulido antes de que una persona
  verifique la evidencia y el consentimiento.

### Pro tips

- **Consejo 1:** Mantén una lista de «no debe afirmarse» junto al paquete de
  fuentes aprobado.
- **Consejo 2:** Evalúa un caso de evidencia ausente, no solo el brief de
  prospecto del camino feliz.

## Quiz

#### Q1: ¿Qué tres partes separa un brief de acercamiento útil?

- [ ] Presupuesto, cronograma y proveedor
- [x] A quién dirigirse, qué evidencia respalda el mensaje y por qué el momento importa
- [ ] Precio, características y capturas de pantalla
- [ ] Remitente, asunto y firma

**Explanation:** El paso separa a quién dirigirse, qué evidencia respalda el mensaje y por qué el momento importa.

#### Q2: ¿Quién es el prospecto ficticio del paquete de fuentes de este paso?

- [ ] Un cliente real de la semilla de la consola
- [ ] La cohorte de Pronósticos de Maya
- [x] `Crestview Properties`, un gestor de 120 unidades en Portland
- [ ] Una empresa externa de referencia

**Explanation:** `Crestview Properties` es un gestor ficticio de 120 unidades en Portland usado solo para este ejercicio, no una empresa descubierta en la semilla de la consola.

#### Q3: ¿Por qué deben excluirse de los puntos de venta del borrador las columnas de exportación sensibles por defecto?

- [ ] Porque al prospecto no le importan las exportaciones
- [x] Porque son un defecto plantado, no un punto de venta
- [ ] Porque Jordan las ocultó
- [ ] Porque el formato CSV es confidencial

**Explanation:** F2 marca las columnas sensibles por defecto como un defecto plantado, así que no son un punto de venta para el acercamiento.

#### Q4: ¿Qué afirmación debe rechazarse en el borrador de primer contacto?

- [ ] Una única pregunta sin presión
- [x] «Nuestra automatización probada reducirá tus costos a la mitad hoy»
- [ ] Una etiqueta de fuente para una afirmación de producto
- [ ] Un borrador de menos de 80 palabras

**Explanation:** Se rechazan las promesas sin respaldo de ahorros probados, y el borrador no debe inventar prueba de clientes.

#### Q5: ¿Qué NO debe ocurrir durante este paso?

- [ ] Escribir un borrador de skill `hearthline-voice`
- [ ] Calificar el borrador por su anclaje factual
- [x] Enviar un mensaje o conectar una cuenta
- [ ] Añadir un contraejemplo de evidencia ausente

**Explanation:** El resultado esperado indica que no se ha enviado ningún mensaje ni conectado ninguna cuenta.

## Complete

- [ ] Mark complete
