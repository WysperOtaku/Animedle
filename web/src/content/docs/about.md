---
title: Sobre el proyecto
description: Información sobre la API de Animedle
---

## ¿Qué es Animedle?

Animedle es una API REST que proporciona retos diarios relacionados con animes. La API permite a los desarrolladores crear aplicaciones y juegos interactivos donde los usuarios pueden adivinar animes a través de diferentes tipos de pistas.

## Características principales

- **Retos diarios**: Nuevos desafíos cada día actualizados automáticamente
- **Múltiples tipos de retos**: Emojis, openings, personajes e imágenes
- **Historial completo**: Acceso a retos de días anteriores
- **Respuestas estructuradas**: Formato JSON consistente y fácil de consumir
- **Sin autenticación**: API pública y gratuita para uso libre

## Tecnologías utilizadas

### Backend

- **Node.js** con Express
- **TypeScript** para tipado estático
- **PostgreSQL** como base de datos
- **Pino** para logging
- **Helmet** y rate limiting para seguridad

### Frontend (Documentación)

- **Astro** para generación de sitio estático
- **Markdown** para contenido

## Tipos de retos disponibles

### 1. Emoji

Los usuarios deben adivinar el anime basándose en una combinación de emojis que representan la temática, personajes o eventos de la serie.

### 2. Opening

Se proporciona un fragmento del opening del anime para que los usuarios identifiquen la serie.

### 3. Personaje

Se muestra una imagen de un personaje del anime que los usuarios deben reconocer.

### 4. Imágenes

Reto con múltiples niveles de dificultad:

- **Muy fácil**: Imagen clara y reconocible
- **Fácil**: Imagen algo mas dificil de reconocer
- **Medio**: Imagen que solo aquellos que hayan prestado bastante atencion a la serie identificaran
- **Difícil**: Imagen muy dificil de reconocer, incluso para algunos que amen la serie

## Uso y licencia

Esta API es un proyecto educativo desarrollado para aprender sobre:

- Desarrollo de APIs REST
- Gestión de bases de datos
- Documentación técnica
- Buenas prácticas de desarrollo

Puedes usar esta API libremente para proyectos personales o educativos.

## Contribuir

Si encuentras algún error en la documentación o tienes sugerencias para mejorar la API, no dudes en contactar con el equipo de desarrollo.

## Contacto y soporte

Para dudas, sugerencias o reportar problemas, puedes:

- Revisar la documentación completa en esta web
- Probar los endpoints en la zona de pruebas
- Consultar los ejemplos de código en TypeScript y JavaScript
