# Plan v25 — aprovechar Foundry v14

Plan en varias sesiones. Cada sesión arranca con:

> Lee `PLAN_V25.md` y haz la **Fase N**.

Al terminar una fase, la sesión marca su estado acá, anota lo que haya cambiado del plan en "Notas de la fase" y commitea. Así la siguiente sesión no necesita el historial de la anterior.

Base: rama `wip_v14`, versión 24.0 (Foundry 14 build 369). Mundo de pruebas local: `7-sea-pruebas-v14`. La campaña online no se toca.

## Estado

| Fase | Tema | Estado | Quién |
|---|---|---|---|
| 0 | Auditoría de la lógica | hecha y revisada | Claude |
| 1 | Reordenar modelo de datos y documentos | pendiente | Claude (+ Antigravity para lo mecánico) |
| 2 | Active Effects | pendiente | Claude diseña, Antigravity hace las pestañas |
| 3 | Tirada guardada en el mensaje + "Editar tirada" | pendiente | Claude |
| 4 | Secuencia de acción (Combat / Combatant) | pendiente | Claude |
| 5 | Idiomas con `<multi-select>` | pendiente | Antigravity (independiente, en cualquier momento) |
| 6 | Release v25 | pendiente | Claude |

Orden: 0 → 1 → 2 → 3 → 4 → 6. La fase 5 no depende de nada.

## Reglas para todas las fases

- Código en `src/`; `npm run build` y commitear también `svnsea2e.mjs`. `npm test` tiene que pasar antes de cada commit.
- Probar en el Foundry 14 local (usuario `claude`). Lo que no se pudo probar se anota en "Notas de la fase".
- Textos nuevos: claves en los 6 idiomas. Inglés y español bien escritos; en los otros cuatro, inglés como relleno si no hay traducción.
- Todo cambio de esquema lleva su migración en `migrateData` o en `src/migration.js`, y se prueba sobre una copia de la campaña.
- Antigravity: encargo autocontenido en `.claude/handoff/fase-N-<tema>.md` con "NO ejecutes ningún comando de shell; usa solo tus herramientas de archivos". Claude revisa el diff contra HEAD, prueba y commitea.
- Ollama no sirve mientras Foundry esté abierto (GPU).

## Decisiones tomadas

- **Iniciativa (raises):** `system.initiative` se queda como dato interno del actor, **sin controles en la hoja**. Se modifica desde el combat tracker, la toolbox y las tiradas.
- **Hard To Kill:** se quita el interruptor de la hoja. `system.htk` sigue siendo el booleano que leen los datos derivados, pero lo enciende un **Active Effect pasivo** (override `system.htk = true`), normalmente desde la ventaja Hard To Kill.
- **Efectos en las hojas de actor:** pestaña propia "Efectos" al final, como en los ítems. Muestra los efectos propios (editables) y los que vienen de ítems (solo lectura, con enlace al ítem de origen).
- **Tipo de ítem "efecto":** no se crea. Los efectos van en un compendio de tipo ActiveEffect.
- **CombatantGroup:** no se usa.
- **Gastar raises o puntos de héroe desde la tarjeta:** no se hace (los puntos de héroe se usan antes de tirar).

---

## Fase 0 — Auditoría de la lógica

**Objetivo:** saber qué está repetido, qué está mal ubicado y qué está mal antes de mover nada. No se cambia código.

Revisar todo `src/`, las plantillas y `system.json` y responder:

1. **Lógica fuera de lugar:** cálculos derivados en el documento Actor (`SvnSea2EActor.prepareDerivedData`: heridas, villanía, brutos) o en las hojas (`_prepareContext`) que deberían vivir en el TypeDataModel. Lo mismo para los ítems (`item.js` vs `item/models.js`).
2. **Repetición:** esquemas, rangos `value/min/max` que no se usan (¿alguien lee `min`?), helpers duplicados, plantillas casi iguales.
3. **Datos que sobran o faltan:** campos que nada lee ni escribe, campos que se escriben desde dos lugares (ej. `system.initiative` en actor y en combatiente) y límites que no se validan.
4. **Reglas:** comparar con las reglas de 7th Sea 2e lo que calcula el código: heridas dramáticas, Hard To Kill, villanía = fuerza + influencia, fuerza de bruto, tripulación, rangos de habilidad.
5. **Restos de v10–v12:** rutas `data.`, flags viejos y código muerto.

**Entrega:** `.claude/handoff/fase-0-auditoria.md` con una tabla `archivo:línea | problema | propuesta | riesgo`, y al final la lista de cambios de esquema que necesita la Fase 1. El usuario revisa el reporte antes de la Fase 1.

## Fase 1 — Reordenar modelo de datos y documentos

**Objetivo:** cada cosa en su lugar, según la auditoría.

- Los datos derivados pasan a `prepareDerivedData` de cada TypeDataModel. El documento Actor se queda solo con lo que necesita al documento (ítems, combates).
- Esquemas comunes en un solo lugar (hoy `baseSchema` / `detailsSchema` / `featuresSchema`), con `migrateData` para los campos que cambien de forma.
- Métodos de reglas en el modelo (ej. `system.woundsMax`, `system.isVillain`) para que las hojas y las tiradas no recalculen nada.
- Quitar de las hojas el campo de iniciativa y sus botones ±1. `system.initiative` se queda en el esquema.
- Ya visto: el interruptor de HtK (`base.js` `#onToggleHtk`) escribe `wounds.max` y `dwounds.max` en la base de datos, pero `actor.js` ya los recalcula como derivados. Esa escritura sobra.
- Antigravity puede hacer los cambios mecánicos (renombres en plantillas, mover helpers) con un encargo por paso.
- Hacer todo lo de la auditoría (`.claude/handoff/fase-0-auditoria.md`, "Cambios de esquema para la Fase 1") con las respuestas anotadas en "Notas de la fase → Fase 0", incluido el arreglo de los tríos del motor de tiradas y de Joie de Vivre.

**Aceptación:** `npm test` pasa; un mundo copiado de la campaña carga sin errores y las hojas muestran los mismos números que antes; las migraciones corren una sola vez.

## Fase 2 — Active Effects

**Datos de v14 verificados en el código de Foundry 14.369:**
- `ActiveEffect` es documento primario y puede ir en compendios (`COMPENDIUM_DOCUMENT_TYPES`). No va en la barra lateral del mundo. Por eso **no hace falta un tipo de ítem "efecto"**: se crea un compendio de tipo ActiveEffect y los efectos se arrastran a ítems y actores.
- Cada cambio tiene `key`, `type` (add, override…), `value`, `phase` y `priority`. La duración se rehízo (puede vencer al inicio de turno).

**Trabajo:**
1. **Diseño (Claude):**
   - qué claves de efecto ofrece el sistema: rasgos, habilidades, heridas máximas, HtK, dados extra en una habilidad, +1 al valor de los dados y umbral;
   - en qué fase se aplica cada una, para que no se mezclen con los datos derivados de la Fase 1;
   - qué efectos se aplican solos al actor y cuáles solo cuando se tira. Los segundos se conectan con la Fase 3.
2. **Pestaña "Efectos" en los ítems**, al final de todas las hojas: crear, editar, activar/desactivar, borrar y soltar un efecto desde un compendio. Es un solo partial repetido en ~13 hojas: encargo para Antigravity.
3. **Pestaña "Efectos" en los actores**, al final (PJ, héroe, villano, monstruo y barco; el bruto según cómo quede su hoja). Dos listas:
   - **propios del actor:** crear, editar, activar/desactivar y borrar desde la hoja, y soltar desde un compendio;
   - **heredados de ítems** (`actor.allApplicableEffects()`): solo lectura, con el nombre del ítem de origen y clic para abrirlo. Se editan o borran desde el ítem, para que no se borre nada por error.
   - Separar activos, temporales (con duración) e inactivos, como hace Foundry.
4. Los efectos de ítems (ventajas, virtudes, hubris, arcanos) se transfieren al actor que los tiene.
5. **Hard To Kill como efecto:**
   - quitar el interruptor (`#onToggleHtk`, `actor-wounds.hbs`);
   - crear el efecto "Hard To Kill" (override `system.htk` = `true`) en el compendio y ponerlo en la ventaja Hard To Kill;
   - comprobar que un override sobre un `BooleanField` se aplica antes de `prepareDerivedData`, para que `dwounds.max` y `wounds.max` salgan bien;
   - **migración:** a cada actor con `system.htk: true` se le pone el efecto. Si tiene la ventaja Hard To Kill, en esa ventaja; si no, directo en el actor. Después se pone `system.htk: false` en la base (el efecto lo vuelve a encender).
   - hay que confirmar con el usuario el nombre exacto de la ventaja en sus compendios (en inglés y en español).
6. Opcional: un compendio de ejemplo con efectos comunes (Asustado, Inspirado…) incluido en el sistema.

**Aceptación:**
- un efecto de compendio soltado en una ventaja pasa al PJ al darle la ventaja, cambia el número en la hoja y en la tirada, y se quita al borrar la ventaja;
- en la pestaña del actor ese efecto aparece como heredado y no se puede borrar desde ahí;
- un PJ y un villano con HtK en la v24 siguen con 5 heridas dramáticas después de migrar, y al desactivar el efecto vuelven a 4.

## Fase 3 — Tirada guardada en el mensaje + "Editar tirada"

**Objetivo:** corregir una tirada ya hecha (alguien olvidó el +1, el umbral era 15…) sin volver a tirar.

- El mensaje de tirada pasa a ser un **tipo de ChatMessage con TypeDataModel**. Guarda la reserva, las opciones (umbral, +1, explotan 10s, ventajas) y los dados obtenidos. La tarjeta se dibuja desde esos datos.
- El motor de `roll/roll.js` se separa en una función pura: (dados obtenidos + opciones) → raises y combinaciones. La usan la tirada nueva y la edición. Sigue verificándose contra la v23.3 como en la migración a v14.
- **Entrada "Editar tirada"** en el menú contextual del mensaje (hook `getChatMessageContextOptions`, donde hoy están "Make Private" y "Delete"). Abre una ventana con todas las opciones; al guardar se recalcula y se actualiza el mismo mensaje. Solo la ven el autor y el DJ.
- Para añadir dados (ej. un dado que se olvidó) se tiran solo los nuevos y se suman a los existentes. Los ya tirados no se vuelven a tirar.
- Sin botones para gastar raises ni puntos de héroe después de tirar (por regla se usan antes).
- Los mensajes viejos (v24 y anteriores) se siguen viendo como hoy, pero no se pueden editar.

**Aceptación:** editar el umbral o el +1 cambia raises y combinaciones igual que si se hubiera tirado así; con Dice So Nice no se vuelve a animar al editar; un jugador no puede editar la tirada de otro.

## Fase 4 — Secuencia de acción

**Hoy:**
- La tarjeta de tirada tiene un botón que **reemplaza** la iniciativa con los raises.
- Los botones ±1 del combat tracker y de la hoja escriben a la vez en el combatiente y en `actor.system.initiative`.
- Foundry ya reordena el tracker cuando cambia la iniciativa.

**Propuesta (confirmar con el usuario al empezar):**
- Tipos propios de `Combat` y `Combatant`. `actor.system.initiative` es el dato interno (decidido) y se sincroniza con sus combatientes. Lo editan el tracker, la toolbox (columna "raises", ya usa `updateInitiative`) y las tiradas.
- Ojo, ya visto: `updateInitiative` escribe en `game.actors.get(actorId)`, el actor base. Con tokens no vinculados, todos los tokens de un mismo bruto o villano comparten el dato y se pisan entre sí. Durante el combate la fuente debería ser el combatiente (o el actor del token); el actor queda como espejo.
- **Asignación automática:** la primera tirada de un combatiente en cada ronda fija sus raises. Las siguientes tiradas de esa ronda **no** los reemplazan. El botón de la tarjeta queda para reemplazar a propósito.
- Editar la tirada que fijó los raises (Fase 3) actualiza al combatiente, descontando los raises ya gastados.
- Al pasar de ronda se limpian los raises y la marca de "ya tiró".
- `CombatantGroup`: no se usa por ahora (ver la explicación en la conversación del plan; Foundry 14 lo guarda pero el tracker no lo dibuja).

**Aceptación:**
- la primera tirada de la ronda llena el tracker;
- una segunda tirada no lo pisa;
- ±1 sigue funcionando;
- la ronda nueva limpia los raises;
- funciona con tokens no vinculados (brutos y villanos sin vincular).

## Fase 5 — Idiomas con `<multi-select>`

Reemplazar el `ChoiceSelector` de idiomas por el elemento nativo `<multi-select>` en la hoja. El selector se mantiene para las habilidades y ventajas de trasfondo si sigue haciendo falta. Revisar que las claves de idioma estén en inglés y español. Encargo autocontenido para Antigravity.

## Fase 6 — Release v25

- Probar la migración completa sobre una copia de la campaña (exportada del servidor online, sin tocarlo).
- `MIGRACION_V25.md` con los cambios y el checklist de pruebas.
- `version: 25.0` y release con tag `v25.0` (el CI adjunta `system.json` y `system.zip`).

---

## Notas de la fase

(Cada sesión agrega acá lo que decidió, lo que cambió del plan y lo que quedó pendiente.)

### Fase 0 (2026-10-09)

- Reporte: `.claude/handoff/fase-0-auditoria.md` (local: `.claude/` está en `.gitignore`). No se cambió código.
- Verificado en Node con el mock y en el Foundry 14 local (mundo `7-sea`, solo lectura).
- Hallazgos que cambian el plan:
  - **Bug heredado del motor de tiradas:** los tríos `[a, b, b]` (`1+7+7`, `2+9+9`, `4+8+8`, `6+7+7`) cuentan un dado dos veces y borran el último dado. Arreglarlo cambia raises respecto de la v23.3, así que la comparación "igual que v23.3" de la Fase 3 debe excluir esos casos.
  - **Datos que se pierden (heredado):** "Redención" del villano y la pestaña Concepto del monstruo escriben campos que el esquema no tiene. `callupon`/`favor` de la sociedad secreta tienen los tipos cruzados.
  - **Active Effects en v14:** fase `initial` antes de `prepareDerivedData` y `final` después. Un efecto que sume a habilidades o a heridas máximas lo pisa el recorte/cálculo derivado: la Fase 1 debe dejar los máximos como "base + bono".
  - **Migración HtK (Fase 2):** `migration.js` no recorre los tokens no vinculados de las escenas; hay que añadirlo.
  - `system.json` usa `gridDistance`/`gridUnits`, que v14 ignora (grilla queda en 1 sin unidades).
- Respuestas del usuario (entran en la Fase 1):
  1. **Barcos:** sí llevan heridas y heridas dramáticas. Se quedan `wounds`/`dwounds`; el barco no usa HtK.
  2. **Monstruo:** la pestaña Concepto guarda sus datos: el monstruo recibe los campos de concepto (y `concept` va a `htmlFields`).
  3. **`servants` del villano:** se muestra en la hoja, debajo de Fuerza, como los demás campos.
  4. **`favor`:** siempre es un número → `NumberField` con migración (`"2"` → 2, `""` → 0).
  5. **Reglas** (manuales en `E:\ROL\7 Mar\Manuales`):
     - vida del villano = Fuerza × 4 + 4; con HtK = Fuerza × 5 + 5. Es lo que ya calcula el código ((Fuerza + 1) por dramática, 4 o 5 dramáticas): correcto.
     - los monstruos **no** tienen Influencia: se quita del monstruo (rasgos: Fuerza; más Miedo). Su villanía, si se muestra, es solo Fuerza.
     - Joie de Vivre (texto del manual): cuesta 1 punto de héroe, justo antes de una confrontación con un villano; los héroes que lo oyen cuentan como 10 los dados de su **siguiente** tirada con valor igual o inferior a **su habilidad**. Se compara el dado sin el +1 contra el rango de habilidad, nunca contra el número de dados. En la tirada de rasgo no aplica (rango 0); en la tirada libre hace falta pedir el rango de habilidad si se marca.
  6. **Bug de los tríos:** se arregla en la Fase 1.
