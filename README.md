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

## Contacto

Si encontrás un problema, algo roto, o tenés una sugerencia: hablame por Discord, `deadlypoison#2956`.
