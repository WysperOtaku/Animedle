---
title: Reto diario
description: Obtén los retos del día actual
---

## GET /api/v0/daily

Obtiene todos los retos disponibles para el día actual. Este endpoint devuelve una lista de retos que incluyen diferentes tipos de desafíos relacionados con animes.

### URL

```
GET /api/v0/daily
```

### Parámetros

Este endpoint no requiere parámetros.

### Respuesta exitosa

**Código:** `200 OK`

**Estructura de la respuesta:**

```json
{
  "response": {
    "status": "success",
    "data": {
      "challenges": [
        {
          "id": 1,
          "name": "Nombre del Anime",
          "fecha": "2026-01-24",
          "nombre": "emoji",
          "datos": {
            "emoji": "😀🎌⚔️"
          }
        },
        {
          "id": 2,
          "name": "Otro Anime",
          "fecha": "2026-01-24",
          "nombre": "opening",
          "datos": {
            "opening_url": "/uploads/audios/openings/anime_opening.mp3"
          }
        },
        {
          "id": 3,
          "name": "Anime Ejemplo",
          "fecha": "2026-01-24",
          "nombre": "personaje",
          "datos": {
            "personaje": "/uploads/images/character/personaje.jpg"
          }
        },
        {
          "id": 4,
          "name": "Anime Visual",
          "fecha": "2026-01-24",
          "nombre": "imagenes",
          "datos": {
            "very_easy": "/uploads/images/anime/very_easy/imagen1.jpg",
            "easy": "/uploads/images/anime/easy/imagen1.jpg",
            "medium": "/uploads/images/anime/medium/imagen1.jpg",
            "hard": "/uploads/images/anime/hard/imagen1.jpg"
          }
        }
      ]
    }
  }
}
```

### Campos de respuesta

- **id** (number): Identificador único del reto
- **name** (string): Nombre del anime relacionado con el reto
- **fecha** (string): Fecha del reto en formato YYYY-MM-DD
- **nombre** (string): Tipo de reto. Puede ser:
  - `emoji`: Adivina el anime usando emojis
  - `opening`: Identifica el anime por su opening
  - `personaje`: Reconoce el anime por un personaje
  - `imagenes`: Identifica el anime por imágenes con diferentes niveles de dificultad
- **datos** (object): Contenido específico del reto según su tipo

### Tipos de datos por tipo de reto

#### Emoji

```json
{
  "emoji": "😀🎌⚔️"
}
```

#### Opening

```json
{
  "opening_url": "/uploads/audios/openings/anime_opening.mp3"
}
```

#### Personaje

```json
{
  "personaje": "/uploads/images/character/personaje.jpg"
}
```

#### Imágenes

```json
{
  "very_easy": "/uploads/images/anime/very_easy/imagen1.jpg",
  "easy": "/uploads/images/anime/easy/imagen1.jpg",
  "medium": "/uploads/images/anime/medium/imagen1.jpg",
  "hard": "/uploads/images/anime/hard/imagen1.jpg"
}
```

### Errores posibles

**Código:** `500 Internal Server Error`

Se produce cuando hay un error en el servidor o en la base de datos.

```json
{
  "status": "error",
  "message": "Descripción del error"
}
```

### Ejemplo de uso

```bash
curl -X GET http://localhost:3000/api/v0/daily
```

### Notas importantes

- Los retos se actualizan diariamente automáticamente basándose en la fecha actual del sistema
- Todos los retos devueltos corresponden exclusivamente al día actual
- Las URLs de recursos (imágenes y audio) son relativas al servidor de la API
