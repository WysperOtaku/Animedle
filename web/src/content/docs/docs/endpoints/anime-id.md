---
title: Reto por fecha
description: Obtén los retos de una fecha específica
---

## GET /api/v0/challenge/:date

Obtiene todos los retos disponibles para una fecha específica. Este endpoint te permite consultar los retos que estuvieron o están disponibles en cualquier día concreto.

### URL

```
GET /api/v0/challenge/:date
```

### Parámetros

#### Path Parameters

| Parámetro | Tipo   | Requerido | Descripción                                                |
| --------- | ------ | --------- | ---------------------------------------------------------- |
| date      | string | Sí        | Fecha del reto en formato YYYY-MM-DD (ejemplo: 2026-01-24) |

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

**Código:** `400 Bad Request`

Se produce cuando el parámetro `date` no tiene el formato correcto.

```json
{
  "status": "failed",
  "message": "The date parameter value is not with the correct format YYYY-MM-DD."
}
```

**Código:** `500 Internal Server Error`

Se produce cuando hay un error en el servidor o en la base de datos.

```json
{
  "status": "error",
  "message": "Descripción del error"
}
```

### Ejemplos de uso

#### Obtener los retos del 24 de enero de 2026

```bash
curl -X GET http://localhost:3000/api/v0/challenge/2026-01-24
```

#### Obtener los retos del 15 de diciembre de 2025

```bash
curl -X GET http://localhost:3000/api/v0/challenge/2025-12-15
```

### Notas importantes

- La fecha debe estar en formato YYYY-MM-DD estrictamente
- Puedes consultar retos de cualquier fecha (pasada, presente o futura)
- Si no existen retos para la fecha solicitada, se devolverá un array vacío en `challenges`
- Las URLs de recursos (imágenes y audio) son relativas al servidor de la API
- El formato de la respuesta es idéntico al endpoint `/api/v0/daily`, pero permite especificar cualquier fecha
