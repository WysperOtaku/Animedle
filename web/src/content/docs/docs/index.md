---
title: Documentación de la API
description: Bienvenido a la documentación de la API de Animedle
---

## Bienvenido a la API de Animedle

Esta documentación te guiará a través de todos los endpoints y funcionalidades de la API de Animedle, tu fuente de retos diarios sobre anime.

## ¿Por dónde empezar?

### Endpoints disponibles

Explora los diferentes endpoints que ofrece la API:

- **[Reto diario](/docs/endpoints/daily-challenge)** - Obtén los retos del día actual
- **[Historial](/docs/endpoints/history)** - Consulta retos de días anteriores
- **[Reto por fecha](/docs/endpoints/anime-id)** - Busca retos de una fecha específica

### Ejemplos de código

Aprende a consumir la API con ejemplos prácticos:

- **[JavaScript](/docs/examples/javascript)** - Ejemplos con vanilla JS, fetch, jQuery y más
- **[TypeScript](/docs/examples/typescript)** - Ejemplos tipados con interfaces y clientes completos

### Prueba la API

- **[Zona de pruebas](/playground)** - Prueba los endpoints directamente desde el navegador

## Respuesta de la API

Todas las respuestas de la API siguen un formato consistente en JSON:

```json
{
  "response": {
    "status": "success",
    "data": {
      "challenges": [...]
    }
  }
}
```

## URL Base

La API está disponible en:

```
http://localhost:3000/api/v0
```

## Características principales

✅ **Sin autenticación** - API pública y gratuita  
✅ **Retos diarios** - Contenido actualizado automáticamente cada día  
✅ **Múltiples tipos** - Emojis, openings, personajes e imágenes  
✅ **Historial completo** - Accede a retos de cualquier fecha  
✅ **Formato JSON** - Fácil de integrar en cualquier aplicación

## ¿Necesitas ayuda?

- Revisa la sección [Cómo funciona](/how-it-works) para entender el concepto
- Consulta [Sobre el proyecto](/about) para más información general
- Explora los ejemplos de código para ver implementaciones reales

---

¡Comienza a explorar la documentación y crea algo increíble! 🚀
