# 7 Sea System

Fork personal del sistema **7th Sea Second Edition (Unofficial)** para Foundry VTT, basado en [Detailing-the-Realm/svnsea2e](https://github.com/Detailing-the-Realm/svnsea2e).

## Por qué existe este fork

El repo oficial lleva mucho tiempo sin cambios (últimos commits solo de mantenimiento, sin releases nuevas). Envié mensajes y propuestas de cambios (issues/PRs) al equipo original y no obtuve respuesta — el oficial acumula 14 issues y 9 PRs abiertos sin resolver.

Ante eso, tomé el código base y armé mi propio fork para poder seguir arreglando bugs y agregando funcionalidad sin depender de que el mantenedor original responda.

Lo subí porque mis amigos me pidieron permiso para compartirlo entre ellos. Preferí publicarlo yo directamente así todos tienen acceso a las mismas mejoras y correcciones, en vez de andar repartiendo copias sueltas.

## Estado respecto al oficial

Base tomada de `Detailing-the-Realm/svnsea2e` v`4.0.0` (compatibilidad Foundry `13.341`). Historial propio: `Initial commit` (import del oficial) → `v23` → `v23.1` (cambios propios).

Cambios propios agregados sobre esa base:

- **Hard To Kill (HtK):** toggle nuevo en la hoja de personaje jugador y en la de villano (villano suma 1 Herida Dramática extra). No existe en el oficial.
- **Tirada de dados libre ("Roll Dice"):** botón nuevo en la hoja de personaje que abre un diálogo para elegir cantidad de dados y tirarlos al chat, sin depender de una habilidad. No existe en el oficial.
- **Sistema de tiradas de habilidad mejorado:** la tarjeta de resultado en el chat (roll-card) ahora muestra los dados no usados ("UnusedDices") y el conteo de dados explotados ("+N dados explotados"), además de lo que ya mostraba el oficial (combos, rerolls, umbral). Textos en español.
- **Uso de Virtudes/Hubris:** casilla de "usado" agregada a cada Virtud y Hubris en la pestaña Fate, para marcarlas como gastadas en la sesión. El oficial no tenía forma de trackear esto en la hoja.
- **Iniciativa editable:** el campo de iniciativa pasó de estar deshabilitado (solo lectura) a editable directamente, con los botones +1/-1 corregidos para no disparar el submit del formulario.
- Íconos e imágenes propias agregadas (`icons/`) para varias habilidades/estilos de duelo.

Y probablemente algún que otro ajuste menor que ya ni recuerdo — si notás algo raro o distinto avisame.

## Metadata del sistema (`system.json`)

- `authors` ya no lista a los desarrolladores originales del oficial (psychoph, mattraykowski, schmurtz) — queda `DeadlyPoisonK`.
- `url`, `manifest` y `download` apuntaban al repo oficial (`Detailing-the-Realm/svnsea2e`); ahora apuntan a `DeadlyPoisonK/svnsea2e_custom`. **Ojo:** `manifest`/`download` solo van a funcionar si publicás una Release en GitHub con un `system.zip` y un `system.json` como assets — si no hay Release, Foundry no va a poder instalar/actualizar el sistema desde esa URL. Revisalo antes de compartir el link.
- El `LICENSE` **no lo toqué**: mantiene el copyright de Jason "psychoph" Hardin y Matt Raykowski (2021) sobre el código original, bajo MIT. Esa nota de copyright es parte de los términos de la licencia MIT del proyecto original — quitarla de un derivado incumple la licencia bajo la que se te permitió usar y modificar el código. Si querés sumar tu propio copyright por los cambios, se agrega una línea nueva, no se reemplaza la existente.

## Estado de las traducciones (revisión de los 6 idiomas: en/de/fr/es/it/pt-BR)

Ninguna de las funciones nuevas quedó traducida — todas usan texto fijo en vez de `{{localize}}`, así que se ven igual sin importar el idioma configurado en Foundry:

- **HtK (jugador y villano):** los textos "Activar Hard To Kill (25 Heridas)" y "HTK: ON/OFF" están escritos directo en los templates. No existe ninguna clave `SVNSEA2E.Htk*` en ningún `lang/*.json`.
- **Checkbox "usado" de Virtud/Hubris:** el template llama a `{{localize 'SVNSEA2E.Used'}}`, pero esa clave **no existe en ningún idioma** (ni en el oficial). Foundry va a mostrar literalmente "SVNSEA2E.Used" como tooltip hasta que se agregue la clave a los 6 archivos.
- **Diálogo de tirada libre ("Roll Dice"):** el botón y el label "Número de Dados:" están fijos (inglés + español mezclados), sin clave de traducción.
- **Dados no usados / explosiones en el roll-card:** acá sí existen claves oficiales ya traducidas a los 6 idiomas (`SVNSEA2E.UnusedDice`, `SVNSEA2E.UnusedDie`, `SVNSEA2E.RollsExploded`) pero el template nuevo **no las usa** — puso `"UnusedDices"` fijo en inglés y `"(+N dados explotados)"` fijo en español en vez de llamarlas. Es decir, la traducción ya está lista, solo falta conectarla.
- Aparte, y sin relación a los cambios propios: `it.json` (italiano) ya venía sin `SVNSEA2E.UnusedDice` y `SVNSEA2E.UnusedDie` desde el oficial — hueco heredado, no introducido por este fork.

Pendiente si querés que las nuevas funciones respeten el idioma del jugador: agregar las claves que faltan (`SVNSEA2E.Used`, y algunas para HtK/Roll Dice) a los 6 `lang/*.json`, y reemplazar los textos fijos de `roll-card.hbs` por `{{localize "SVNSEA2E.UnusedDice"}}` / `{{localize "SVNSEA2E.RollsExploded"}}`.

## Créditos

Este fork existe gracias al trabajo original de **Jason "psychoph" Hardin**, **Matt Raykowski** y **schmurtz**, creadores de [Detailing-the-Realm/svnsea2e](https://github.com/Detailing-the-Realm/svnsea2e). Todo lo que no está listado en "Estado respecto al oficial" es obra de ellos. `authors` en `system.json` quedó solo con `DeadlyPoisonK` porque ese campo identifica a quién mantiene *este paquete* (para que Foundry sepa a quién reportarle bugs de esta versión), no porque se les quiera restar mérito — el trabajo de base sigue siendo enteramente suyo.

## Contacto

Si encontrás un problema, algo roto, o tenés una sugerencia: hablame por Discord, `deadlypoison#2956`.
