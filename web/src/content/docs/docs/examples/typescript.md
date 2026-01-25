---
title: TypeScript
description: Ejemplos de consumo de la API con TypeScript
---

## Ejemplos de uso con TypeScript

A continuación encontrarás ejemplos completos de cómo consumir la API de Animedle usando TypeScript con diferentes enfoques.

## Tipos de datos

Primero, define las interfaces para los tipos de datos que devuelve la API:

```typescript
// types/api.types.ts

interface ApiResponse<T> {
  response: {
    status: 'success' | 'failed' | 'error';
    data?: T;
    message?: string;
  };
}

interface ChallengeData {
  id: number;
  name: string;
  fecha: string;
  nombre: 'emoji' | 'opening' | 'personaje' | 'imagenes';
  datos:
    | EmojiData
    | OpeningData
    | PersonajeData
    | ImagenesData;
}

interface EmojiData {
  emoji: string;
}

interface OpeningData {
  opening_url: string;
}

interface PersonajeData {
  personaje: string;
}

interface ImagenesData {
  very_easy: string;
  easy: string;
  medium: string;
  hard: string;
}

interface ChallengesResponse {
  challenges: ChallengeData[];
}

interface HistoryItem {
  id: number;
  fecha: string;
}

interface HistoryResponse {
  challenges: HistoryItem[];
}
```

## Cliente de API con fetch

```typescript
// services/animedle.service.ts

class AnimedleApiClient {
  private baseUrl: string;

  constructor(
    baseUrl: string = 'http://localhost:3000/api/v0'
  ) {
    this.baseUrl = baseUrl;
  }

  /**
   * Obtiene los retos del día actual
   */
  async getDailyChallenge(): Promise<ChallengeData[]> {
    try {
      const response = await fetch(`${this.baseUrl}/daily`);

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}`
        );
      }

      const data: ApiResponse<ChallengesResponse> =
        await response.json();

      if (
        data.response.status === 'success' &&
        data.response.data
      ) {
        return data.response.data.challenges;
      }

      throw new Error(
        data.response.message || 'Error desconocido'
      );
    } catch (error) {
      console.error(
        'Error obteniendo el reto diario:',
        error
      );
      throw error;
    }
  }

  /**
   * Obtiene el historial de retos
   * @param limit - Cantidad de días a recuperar
   */
  async getHistory(limit: number): Promise<HistoryItem[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/history?limit=${limit}`
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}`
        );
      }

      const data: ApiResponse<HistoryResponse> =
        await response.json();

      if (
        data.response.status === 'success' &&
        data.response.data
      ) {
        return data.response.data.challenges;
      }

      throw new Error(
        data.response.message || 'Error desconocido'
      );
    } catch (error) {
      console.error(
        'Error obteniendo el historial:',
        error
      );
      throw error;
    }
  }

  /**
   * Obtiene los retos de una fecha específica
   * @param date - Fecha en formato YYYY-MM-DD
   */
  async getChallengeByDate(
    date: string
  ): Promise<ChallengeData[]> {
    // Validar formato de fecha
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new Error(
        'Formato de fecha inválido. Usa YYYY-MM-DD'
      );
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/challenge/${date}`
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}`
        );
      }

      const data: ApiResponse<ChallengesResponse> =
        await response.json();

      if (
        data.response.status === 'success' &&
        data.response.data
      ) {
        return data.response.data.challenges;
      }

      throw new Error(
        data.response.message || 'Error desconocido'
      );
    } catch (error) {
      console.error(
        `Error obteniendo reto para la fecha ${date}:`,
        error
      );
      throw error;
    }
  }

  /**
   * Construye la URL completa de un recurso
   */
  getResourceUrl(path: string): string {
    // Eliminar /api/v0 para recursos
    const baseResourceUrl = this.baseUrl.replace(
      '/api/v0',
      ''
    );
    return `${baseResourceUrl}${path}`;
  }
}

export default AnimedleApiClient;
```

## Cliente con axios (alternativa)

Si prefieres usar axios, instala la dependencia:

```bash
npm install axios
```

```typescript
// services/animedle-axios.service.ts
import axios, { AxiosInstance } from 'axios';

class AnimedleApiClient {
  private client: AxiosInstance;

  constructor(
    baseUrl: string = 'http://localhost:3000/api/v0'
  ) {
    this.client = axios.create({
      baseURL: baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Interceptor para manejar errores
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          console.error(
            'Error de respuesta:',
            error.response.data
          );
        } else if (error.request) {
          console.error('Error de red:', error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  async getDailyChallenge(): Promise<ChallengeData[]> {
    const { data } =
      await this.client.get<
        ApiResponse<ChallengesResponse>
      >('/daily');

    if (
      data.response.status === 'success' &&
      data.response.data
    ) {
      return data.response.data.challenges;
    }

    throw new Error(
      data.response.message || 'Error desconocido'
    );
  }

  async getHistory(limit: number): Promise<HistoryItem[]> {
    const { data } = await this.client.get<
      ApiResponse<HistoryResponse>
    >('/history', { params: { limit } });

    if (
      data.response.status === 'success' &&
      data.response.data
    ) {
      return data.response.data.challenges;
    }

    throw new Error(
      data.response.message || 'Error desconocido'
    );
  }

  async getChallengeByDate(
    date: string
  ): Promise<ChallengeData[]> {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new Error(
        'Formato de fecha inválido. Usa YYYY-MM-DD'
      );
    }

    const { data } = await this.client.get<
      ApiResponse<ChallengesResponse>
    >(`/challenge/${date}`);

    if (
      data.response.status === 'success' &&
      data.response.data
    ) {
      return data.response.data.challenges;
    }

    throw new Error(
      data.response.message || 'Error desconocido'
    );
  }
}

export default AnimedleApiClient;
```

## Ejemplos de uso

```typescript
// main.ts

import AnimedleApiClient from './services/animedle.service';

const api = new AnimedleApiClient(
  'http://localhost:3000/api/v0'
);

// Ejemplo 1: Obtener el reto diario
async function mostrarRetosDiarios() {
  try {
    const retos = await api.getDailyChallenge();

    console.log('Retos de hoy:');
    retos.forEach((reto) => {
      console.log(`- ${reto.nombre}: ${reto.name}`);

      switch (reto.nombre) {
        case 'emoji':
          console.log(
            `  Emojis: ${(reto.datos as EmojiData).emoji}`
          );
          break;
        case 'opening':
          const openingUrl = api.getResourceUrl(
            (reto.datos as OpeningData).opening_url
          );
          console.log(`  Opening: ${openingUrl}`);
          break;
        case 'personaje':
          const personajeUrl = api.getResourceUrl(
            (reto.datos as PersonajeData).personaje
          );
          console.log(`  Personaje: ${personajeUrl}`);
          break;
        case 'imagenes':
          const imagenes = reto.datos as ImagenesData;
          console.log(
            `  Imágenes disponibles: very_easy, easy, medium, hard`
          );
          break;
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

// Ejemplo 2: Obtener historial de los últimos 7 días
async function mostrarHistorial() {
  try {
    const historial = await api.getHistory(7);

    console.log('Historial de los últimos 7 días:');
    historial.forEach((item) => {
      console.log(`- Fecha: ${item.fecha}, ID: ${item.id}`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

// Ejemplo 3: Obtener reto de una fecha específica
async function mostrarRetoPorFecha(fecha: string) {
  try {
    const retos = await api.getChallengeByDate(fecha);

    if (retos.length === 0) {
      console.log(`No hay retos para la fecha ${fecha}`);
      return;
    }

    console.log(`Retos del ${fecha}:`);
    retos.forEach((reto) => {
      console.log(`- ${reto.nombre}: ${reto.name}`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

// Ejecutar ejemplos
mostrarRetosDiarios();
mostrarHistorial();
mostrarRetoPorFecha('2026-01-24');
```
