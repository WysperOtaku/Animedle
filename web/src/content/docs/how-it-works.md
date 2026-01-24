---
title: Cómo funciona
description: Descubre cómo funciona Animedle y sus retos diarios
---

## ¿Qué es Animedle?

Animedle es una API que proporciona **retos diarios** relacionados con el mundo del anime. La idea es simple pero divertida: cada día encontrarás nuevos desafíos donde deberás **adivinar a qué anime nos referimos** a través de diferentes tipos de pistas.

## El concepto

Imagina despertarte cada mañana con un nuevo conjunto de retos sobre anime. Algunos serán fáciles, otros más desafiantes, pero todos te pondrán a prueba tus conocimientos sobre tus series favoritas.

La API está diseñada para que desarrolladores puedan crear aplicaciones, juegos o sitios web donde los usuarios puedan:

- Jugar diariamente con retos nuevos
- Competir con amigos para ver quién sabe mas sobre anime que los demas
- Revisar retos de días anteriores

## Tipos de retos

Para mantener la experiencia variada y emocionante, ofrecemos **cuatro tipos diferentes de retos**:

### Reto de Emojis

Te damos una combinación de emojis que representan elementos clave del anime: la temática, los personajes, la ambientación... ¿Serás capaz de descifrar de qué anime hablamos?

**Ejemplo:** 🗡️👹🌸 → ¿Qué anime podría ser?

### Reto de Opening

¿Reconoces el anime solo escuchando su opening? Te proporcionamos un fragmento de la canción. Los verdaderos fans lo identificarán en segundos. (A tope con el Gatekeeping)

### Reto de Personaje

Te mostramos la imagen de un personaje. Puede ser el protagonista, un secundario o incluso un antagonista o el tio mas random que te puedas echar en cara. ¿Sabrás de qué anime es?

### Reto de Imágenes Progresivas

Este es el más interesante: te ofrecemos **4 niveles de dificultad** de la misma escena del anime:

- **Muy fácil**: Imagen que cualquiera que conozca el anime lo reconoce
- **Fácil**: Imagen que como minimo debes haber visto la serie por encima
- **Medio**: Aqui lo complicamos, si lo reconoces con esta imagen te ha gustado la serie lo suyo.
- **Difícil**: El anime te ha obsesionado durante dias, sabes reconocer hasta el mas minimo detalle en la animacion.

Cuanto más difícil sea el nivel que uses para adivinar, más puntos podrías conseguir si estás creando un sistema de puntuación, queda libre para la posible implementacion de cualquiera.

## ¿Cómo se actualiza?

Los retos se actualizan **automáticamente cada día**. No necesitas hacer nada especial: simplemente consulta el endpoint del reto diario y obtendrás los desafíos del día actual.

## ¿Puedo ver retos anteriores?

¡Por supuesto! La API te permite:

- **Ver el historial** de retos de días pasados
- **Consultar un día específico** si quieres volver a intentar un reto que te perdiste
- **Obtener múltiples días** de historial de una sola vez

Esto es perfecto si quieres crear una sección de "retos perdidos" o permitir que los usuarios practiquen con desafíos anteriores.

## ¿Cómo consumir la API?

La API es muy sencilla de usar. Solo necesitas hacer peticiones HTTP a los endpoints disponibles:

1. **Reto del día**: Obtén todos los retos de hoy
2. **Historial**: Consulta retos de días anteriores
3. **Reto por fecha**: Busca los retos de un día específico

Todas las respuestas vienen en formato JSON, fácil de procesar en cualquier lenguaje de programación o framework.

## ¿Para quién está pensado?

Esta API es ideal para:

- **Desarrolladores** que quieren crear aplicaciones de entretenimiento sobre anime
- **Comunidades de anime** que buscan contenido diario para sus miembros
- **Estudiantes** que quieren practicar consumiendo APIs reales
- **Fans del anime** que disfrutan poniendo a prueba sus conocimientos

## Casos de uso

Aquí hay algunas ideas de lo que podrías crear con esta API:

- Un sitio web con retos diarios de anime
- Una aplicación móvil tipo quiz
- Un bot de Discord que publique retos diarios
- Un sistema de ranking y estadísticas

## ¿Es gratis?

Sí, la API es **completamente gratuita** y está pensada como un proyecto educativo y de entretenimiento para la comunidad de anime.

---

¿Listo para empezar? Consulta la documentación de los endpoints para ver cómo hacer las peticiones y comienza a crear tu propia aplicación de retos de anime. ¡Diviértete!
