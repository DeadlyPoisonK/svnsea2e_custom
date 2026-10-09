# Migración a Foundry VTT v14 — versión 24.0

Este documento resume todo lo que cambió entre la **v23.3** (última para Foundry 13) y la **v24.0** (Foundry 14), qué se verificó automáticamente y qué hay que probar a mano en Foundry.

## Resumen

- El sistema se reescribió sobre **ApplicationV2**, la API de ventanas actual de Foundry. Afecta a las 20 hojas, los diálogos de tirada, los selectores y la caja de herramientas. La API vieja (Application V1) queda deprecada y Foundry la elimina en v16, así que con esto el sistema queda preparado para v15 y v16.
- Se dejaron de usar todas las APIs globales deprecadas (`renderTemplate`, `Actors.registerSheet`, `TextEditor`, `Dialog`, jQuery...).
- Los mensajes de chat usan los **modos de mensaje de v14** (`ChatMessage.applyMode`). Los "roll modes" quedan deprecados en v14.
- El código volvió a tener **fuente legible en `src/`**, separada por archivos, con un build reproducible.
- **El modelo de datos no cambió**: los mundos y compendios existentes no necesitan migrar datos.
- Se corrigieron varios bugs y se mejoró el rendimiento (detalle más abajo).

## Estructura nueva del proyecto

```
src/                      ← código fuente (se edita acá)
  svnsea2e.mjs            punto de entrada: registro de modelos, hojas y hooks
  config.js / enums.js    configuración y constantes
  settings.js             settings del sistema
  templates.js            precarga de partials y helpers de Handlebars
  helpers.js              utilidades (clamp, búsqueda de ventajas con caché...)
  migration.js            migraciones por versión (hoy vacía: el esquema no cambió)
  combat.js / chat.js     iniciativa, botones del combat tracker, botón del chat
  actor/  actor.js        documento Actor (heridas, HtK, villanía, tripulación)
          models.js       modelos de datos de los 7 tipos de actor
          sheets/base.js  hoja base (acciones comunes, trasfondos, drop de ítems)
          sheets/sheets.js PJ, Héroe, Villano, Monstruo, Bruto, Puntos de Peligro
          sheets/ship.js  hoja de barco (tripulación)
  item/   item.js         documento Item (datos para chat, enviar al chat)
          models.js       modelos de datos de los 13 tipos de ítem
          sheets.js       hojas de ítem
  apps/choice-selector.js selector genérico (idiomas, habilidades y ventajas de trasfondo)
  roll/roll.js            motor de tiradas (raises, combos, rerolls, explosiones)
  roll/dialogs.js         diálogos de tirada (habilidad, rasgo, tirada libre)
  toolbox/toolbox.js      caja de herramientas del DJ
templates/                plantillas Handlebars (se usan directo, no pasan por el build)
svnsea2e.css              estilos (se usan directo)
lang/                     traducciones
svnsea2e.mjs (+ .map)     ← GENERADO por el build. No editar a mano.
tools/check.mjs           chequeos estáticos (plantillas, acciones, idiomas, manifest)
tests/                    prueba de ejecución con una simulación de la API de Foundry
```

### Cómo trabajar ahora

```bash
npm install        # una vez
npm run build      # genera svnsea2e.mjs desde src/
npm run watch      # recompila solo al guardar (para desarrollo)
npm test           # lint + build + chequeos + prueba de ejecución
```

**Importante:** los cambios de código van en `src/`, no en `svnsea2e.mjs`. Hay que correr `npm run build` y commitear también el `svnsea2e.mjs` generado, porque Foundry carga ese archivo. Si se olvida, el CI de GitHub avisa con un error.

Las plantillas (`templates/`), el CSS y los idiomas se editan directamente, igual que antes.

## Cambios por la migración a v14

| Antes (v13) | Ahora (v14) |
|---|---|
| `ActorSheet` / `ItemSheet` (V1) con `getData` y `activateListeners` + jQuery | `ActorSheetV2` / `ItemSheetV2` con `HandlebarsApplicationMixin`, `_prepareContext` y `data-action` |
| Pestañas V1 (`tabs: [{navSelector...}]`) | `static TABS` + `data-action="tab"` |
| `{{editor}}` (TinyMCE/ProseMirror V1) | elemento `<prose-mirror>` |
| `new Dialog(...)` | `DialogV2.wait(...)` |
| 3 `FormApplication` (idiomas, habilidades, ventajas) | 1 `ChoiceSelector` (ApplicationV2) reutilizado |
| Toolbox `FormApplication` | Toolbox `ApplicationV2` |
| `Actors.registerSheet` / `Items.registerSheet` | `foundry.applications.apps.DocumentSheetConfig.registerSheet` |
| `renderTemplate`, `loadTemplates`, `TextEditor` globales | `foundry.applications.handlebars.*`, `foundry.applications.ux.TextEditor.implementation` |
| `type: CONST.CHAT_MESSAGE_STYLES.OTHER`, `user:`, `rollMode` + whisper manual | `author:`, `ChatMessage.applyMode()` (modos de mensaje de v14) y la tirada adjunta al mensaje |
| `game.dice3d.showForRoll` manual | Dice So Nice anima solo, porque el mensaje lleva la tirada |
| `Math.random()` para el reroll | dado de Foundry (`Roll 1d10`) |
| `$(document).on(...)`, `$(html).find(...)` | DOM nativo |
| `compatibility` 13 | `minimum: 14`, `verified: 14` |

## Bugs corregidos (algunos cambian el comportamiento: revisalos)

1. **Los puntos de héroe gastados en una tirada no se descontaban.** El código actualizaba `data.heropts`, un formato de Foundry 0.x que ya no existe. Ahora descuenta `system.heropts`.
2. **Al borrar un trasfondo no se quitaban sus habilidades ni sus ventajas.** El código revisaba `item.system.type`, que nunca existe. Ahora, al borrar un trasfondo **activo**, se resta 1 a sus habilidades y se borran sus ventajas, igual que al desactivarlo con la casilla. Un trasfondo inactivo se borra sin tocar nada.
3. **El selector de ventajas de un trasfondo no listaba las ventajas de los compendios**, solo las del mundo: el bucle usaba `.length` sobre una Collection. Ahora aparecen todas.
4. **La migración completa del mundo corría en cada carga del DJ.** Se leía la versión migrada pero se ignoraba el resultado: en cada carga se actualizaban todos los actores e ítems. Ahora solo corre cuando cambia la versión del sistema y solo en el cliente del DJ activo.
5. **Al soltar un trasfondo, por cada una de sus ventajas se cargaban enteros todos los ítems-ventaja de todos los compendios.** Ahora se usa el índice liviano de los compendios, en caché, y solo se carga la ventaja encontrada. También se eliminó una precarga de compendios al iniciar que no servía para nada: por el mismo bug de `.length` quedaba vacía.
6. **En cada actualización de cualquier actor** se refrescaba la toolbox y se emitía un mensaje por socket que nadie escuchaba. Ahora la toolbox se refresca solo si muestra a ese actor, y el socket se eliminó.
7. **El texto del interruptor Hard To Kill** leía `actor.system.htk`, que no estaba en los datos de la hoja, así que siempre mostraba "Off". Ahora refleja el estado real.
8. **Islas del Glamour:** la lista de naciones válidas decía `insmore` en vez de `inismore`, así que los personajes de Inismore no podían tomar trasfondos de las Islas del Glamour.
9. **Esquemas en el chat:** la influencia aparecía como `[object Object]`.
10. **Iniciativa negativa:** -1 con iniciativa 0 daba un error de validación. Ahora se queda en 0.
11. **Botones editar/borrar sin tooltip:** usaban `editlabel`/`deletelabel`, que nunca se calculaban. Ahora tienen tooltip traducido.
12. **Tirada sin dados** (0 dados): antes intentaba tirar "0d10". Ahora avisa y no tira.
13. **`system.json`:** los `htmlFields` decían `desciption` en vez de `description`, y apuntaban a campos inexistentes (`arcana.virtue.description`).
14. **Nombres de tipos en "Crear Actor/Ítem":** faltaban las claves `TYPES.Actor.*` / `TYPES.Item.*`. Ahora salen traducidos.
15. **Textos fijos en español** ("10s Explotan", "Tirada Genérica", el tooltip del trasfondo) y en inglés ("Roll Dice" en la hoja de bruto) pasaron a los archivos de idioma.

## Mejoras pequeñas

- **Secciones plegables de las listas de ítems:** el plegado ahora se mantiene cuando la hoja se redibuja. Antes se perdía con cualquier cambio.
- **Toolbox:** recuerda los actores entre sesiones (setting del cliente) y tiene un botón ✕ para quitar actores. Antes la lista se perdía al recargar y no había forma de quitarlos.
- **Tiradas privadas o a ciegas:** como el mensaje lleva la tirada, Foundry aplica bien los modos de mensaje. En las tiradas a ciegas los jugadores ven "tirada privada" en lugar de nada.
- **Arrastrar ítems** de la hoja a otra hoja o a la barra de macros.
- **Traducciones:** se completaron las claves faltantes en los 6 idiomas, incluidas algunas que ya faltaban en el original (Héroe, Galdr, Futhark, ficha de muerte...). En español traduje unas 80 cadenas de interfaz que seguían en inglés. Los nombres propios (naciones, magias, idiomas) quedaron como estaban. **Revisá la terminología**: la traducción es mía y no usa necesariamente los términos oficiales de la edición en español.
- **Íconos:** se borraron del repositorio los íconos que el sistema no usa (unos 22 MB de `.webp`).
- **CI en GitHub:** cada push corre `npm test`. Además, al **publicar un release** con tag `vX.Y`, GitHub genera y adjunta `system.json` y `system.zip` automáticamente (ver abajo).

## Lo que se conservó tal cual (verificado)

- **Motor de tiradas:** comparé el motor nuevo contra el de la v23.3 (extraído del `svnsea2e.mjs` viejo) con 30.000 tiradas aleatorias con los mismos dados. Dieron **0 diferencias** en raises, combinaciones, dados sin usar, rerolls, explosiones y umbrales 10/15/20 (incluido "el DJ sube el umbral"), Joie de Vivre y +1 a los dados.
- **Tus funciones propias:** Hard To Kill (PJ y villano), "Roll Dice" (tirada libre con ventajas y Puntos de Peligro), roll-card con dados sin usar y explotados, enviar ítems al chat al hacer clic en el ícono, casilla "usado" en ventajas, estilos, virtudes, hubris, artefactos y hechicería, iniciativa editable con +1/-1 y Enter, interruptor de trasfondos, botones ±1 en el combat tracker, heridas dramáticas que no tocan las normales, y orden alfabético de los ítems.
- **Aspecto:** las hojas mantienen el diseño (pestañas rojas, bordes pintados, retrato redondo, fuente Trade Winds). Se fuerza el **tema claro** en las hojas, porque el diseño es negro sobre pergamino. La toolbox usa el tema oscuro, como antes. El chat conserva el encabezado rojo y el fondo blanco.

## Qué se verificó automáticamente

- `npm run lint`: ESLint sin errores. Además prohíbe los globales deprecados (`renderTemplate`, `Dialog`, `$`, etc.).
- `node tools/check.mjs`:
  - las 41 plantillas compilan, y todos los partials existen y están precargados;
  - cada `data-action` de las plantillas tiene su manejador;
  - las 330 claves de idioma usadas existen en los 6 idiomas;
  - todos los archivos del manifest existen.
- `node tests/run.mjs`: carga el `svnsea2e.mjs` compilado sobre una **simulación** de la API de Foundry v14 con un DOM real (jsdom) y ejecuta unas 90 comprobaciones:
  - init, setup, ready y migración;
  - todas las hojas de actor e ítem;
  - HtK, heridas, rangos e iniciativa;
  - crear, usar, enviar al chat, plegar y arrastrar ítems;
  - trasfondos: soltar, activar, desactivar y borrar, con nación incorrecta y duplicados;
  - tiradas de habilidad, rasgo y libre, puntos de héroe;
  - botón de iniciativa del chat, tripulación del barco, toolbox, botones del combat tracker y botón del directorio de actores.
- La API usada se contrastó con las definiciones de tipos de la comunidad para **Foundry 14.366** (`@league-of-foundry-developers/foundry-vtt-types`). La web de Foundry estaba bloqueada desde el entorno donde trabajé.

**Límite:** nada de esto reemplaza abrir Foundry 14 real. La simulación reproduce el comportamiento de Foundry tal como lo conozco, pero si Foundry 14 hace algo distinto en un detalle (nombres de clases CSS del combat tracker, cómo se ve el editor, etc.), solo se ve probando.

## Checklist de pruebas en Foundry 14

Hacelo en un **mundo de prueba o con backup**. Ordenado de más a menos riesgoso:

1. **Arranque:** el mundo carga sin errores rojos en la consola (F12). Las advertencias de deprecación de módulos de terceros no cuentan.
2. **Hoja de PJ:**
   - las pestañas cambian;
   - el retrato se puede cambiar con clic;
   - nombre, puntos de héroe, riqueza y nación se guardan al editar;
   - el concepto se edita con el botón del editor y se guarda.
3. **Heridas:**
   - clic en corazones normales y dramáticos, HtK on/off en PJ y en villano (25/5 y (Fuerza+1)×5);
   - las dramáticas no tocan las normales;
   - la barra se ve agrupada como antes.
4. **Tiradas:**
   - habilidad: elegir rasgo, bonus y punto de héroe (**verificá que ahora sí se descuenta**);
   - rasgo, tirada de villano y "Roll Dice";
   - con Dice So Nice, que anime una sola vez;
   - en modo "tirada privada al DJ" y "a ciegas", que se vea bien desde un jugador.
5. **Iniciativa:**
   - +1/-1 y escribir + Enter en la hoja;
   - botón "Añadir al tracker" del chat;
   - botones ±1 en el combat tracker (**revisá que aparezcan y se vean bien**).
6. **Ítems en la hoja:**
   - crear, editar, borrar;
   - clic en el ícono para enviar al chat;
   - clic en el nombre para ver el resumen;
   - casilla "usado";
   - plegar secciones;
   - arrastrar de un actor a otro.
7. **Trasfondos:**
   - soltar uno con ventajas (de ítems del mundo **y de compendios**) y habilidades;
   - activar y desactivar;
   - **borrar uno activo: ahora quita sus bonus** (bug corregido);
   - nación incorrecta.
8. **Hojas de ítem:** abrir cada tipo y editar descripción, peculiaridad, bonus, etc. En trasfondos, los selectores de habilidades y ventajas.
9. **Barco:** arrastrar actores a un rol de la tripulación, moverlos de rol y quitarlos.
10. **Toolbox (DJ):**
    - se abre sola y con el botón del directorio de actores;
    - soltar actores, que se actualice al cambiar sus puntos, quitar con ✕;
    - recargar y que siga la lista.
11. **Idiomas:** selector de idiomas del personaje.
12. **Aspecto general:** revisá que nada se vea roto con tu tema de interfaz, sobre todo el combat tracker y el chat.

Si algo falla, lo más útil es copiar el error de la consola (F12) y decirme qué estabas haciendo.

## Cómo publicar la v24.0

1. Fusionar esta rama en `main`.
2. En GitHub, crear un **release** con tag `v24.0` y publicarlo.
3. El workflow **Release** compila, prueba y adjunta `system.json` y `system.zip` al release solo. El `download` del manifest queda apuntando a ese release.
4. El `manifest` de `system.json` apunta a `releases/latest/download/system.json`, así las instalaciones en v14 se actualizan solas. Las que siguen en v13 quedan en la v23.3: el manifest de la v23.3 apuntaba a su propio release y tenía `maximum: 13`.

Si preferís seguir subiendo los archivos a mano, sirve igual. El zip tiene que incluir `system.json`, `svnsea2e.mjs`, `svnsea2e.mjs.map`, `svnsea2e.css`, `templates/`, `lang/`, `icons/`, `imgs/`, `LICENSE` y `README.md`. **No** tiene que incluir `src/`, `node_modules/`, `tests/` ni `tools/`.

## Decisiones para que revises

- **Tema claro forzado en las hojas.** Si preferís que sigan el tema del usuario, se quitan las clases `themed theme-light` en `src/actor/sheets/base.js` y `src/item/sheets.js`, pero el CSS está pensado para fondo claro.
- **Estilo global del chat** (encabezado rojo y fondo blanco en *todos* los mensajes, combinaciones de aumentos en fichas): es lo que pretendía el CSS original, pero en Foundry 13 no se veía porque sus selectores usaban `#chat-log`, que ya no existía; los jugadores de la v23.3 veían el chat con el estilo base de Foundry. Se decidió mantenerlo en la v24. Si choca con algún módulo, está al principio de la sección "Chat" de `svnsea2e.css`.
- **Preferencias de hoja:** los identificadores internos de las hojas cambiaron. Si alguien había elegido a mano una hoja para un actor concreto, vuelve a la hoja por defecto, que es la del sistema.
- **`item.ItemThrow()`** sigue existiendo como alias de `item.sendToChat()` por si alguna macro lo usa.
- **Las hojas de virtud, hubris, cualidad de monstruo, aventura de barco y trasfondo de barco** comparten una plantilla (`templates/items/simple.hbs`), porque eran idénticas.
