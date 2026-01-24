---
title: Historial
description: Obtén el historial de retos pasados
---

## GET /api/v0/history

Obtiene el historial de retos pasados con un límite configurable. Este endpoint te permite recuperar información sobre los retos que estuvieron disponibles en días anteriores.

### URL

```
GET /api/v0/history?limit={número}
```

### Parámetros

#### Query Parameters

| Parámetro | Tipo   | Requerido | Descripción                                                                             |
| --------- | ------ | --------- | --------------------------------------------------------------------------------------- |
| limit     | number | Sí        | Cantidad de días de historial que deseas recuperar. Debe ser un número entero positivo. |

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
          "id": 15,
          "fecha": "2026-01-23"
        },
        {
          "id": 14,
          "fecha": "2026-01-22"
        },
        {
          "id": 13,
          "fecha": "2026-01-21"
        }
      ]
    }
  }
}
```

### Campos de respuesta

- **id** (number): Identificador único del reto
- **fecha** (string): Fecha del reto en formato YYYY-MM-DD

### Errores posibles

**Código:** `400 Bad Request`

Se produce cuando el parámetro `limit` no es un número válido.

```json
{
  "status": "failed",
  "message": "The limit value is not a number."
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

#### Obtener los últimos 7 días de retos

```bash
curl -X GET "http://localhost:3000/api/v0/history?limit=7"
```

#### Obtener los últimos 30 días de retos

```bash
curl -X GET "http://localhost:3000/api/v0/history?limit=30"
```

### Notas importantes

- El endpoint devuelve los retos ordenados por fecha de forma descendente (del más reciente al más antiguo)
- Solo se devuelven retos de fechas iguales o anteriores al día actual
- El parámetro `limit` debe ser siempre un número entero
- Si no hay suficientes retos históricos, se devolverán todos los disponibles (menos que el límite solicitado)
- El historial solo incluye el ID y la fecha del reto, no los detalles completos. Para obtener los detalles de un reto específico, usa el endpoint `/api/v0/challenge/:date`
