---
title: JavaScript
description: Ejemplos de consumo de la API con JavaScript
---

## Ejemplos de uso con JavaScript

A continuación encontrarás ejemplos completos de cómo consumir la API de Animedle usando JavaScript vanilla, tanto en el navegador como en Node.js.

## Cliente de API básico (navegador)

```javascript
// services/animedle-client.js

class AnimedleApiClient {
  constructor(baseUrl = 'http://localhost:3000/api/v0') {
    this.baseUrl = baseUrl;
  }

  /**
   * Obtiene los retos del día actual
   * @returns {Promise<Array>} Array de retos
   */
  async getDailyChallenge() {
    try {
      const response = await fetch(`${this.baseUrl}/daily`);

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();

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
   * @param {number} limit - Cantidad de días a recuperar
   * @returns {Promise<Array>} Array de items del historial
   */
  async getHistory(limit) {
    try {
      const response = await fetch(
        `${this.baseUrl}/history?limit=${limit}`
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();

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
   * @param {string} date - Fecha en formato YYYY-MM-DD
   * @returns {Promise<Array>} Array de retos
   */
  async getChallengeByDate(date) {
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

      const data = await response.json();

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
   * @param {string} path - Ruta del recurso
   * @returns {string} URL completa
   */
  getResourceUrl(path) {
    const baseResourceUrl = this.baseUrl.replace(
      '/api/v0',
      ''
    );
    return `${baseResourceUrl}${path}`;
  }
}

// Exportar para módulos ES6
export default AnimedleApiClient;

// O para CommonJS
// module.exports = AnimedleApiClient;
```

## Ejemplos de uso en el navegador

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <title>Animedle API - Ejemplo</title>
  </head>
  <body>
    <h1>Retos de Animedle</h1>

    <section>
      <h2>Reto del Día</h2>
      <button id="btnCargarDiario">
        Cargar Reto Diario
      </button>
      <div id="retosDiarios"></div>
    </section>

    <section>
      <h2>Historial</h2>
      <input
        type="number"
        id="inputLimit"
        value="7"
        min="1"
        max="30"
      />
      <button id="btnCargarHistorial">
        Cargar Historial
      </button>
      <div id="historial"></div>
    </section>

    <section>
      <h2>Reto por Fecha</h2>
      <input type="date" id="inputFecha" />
      <button id="btnCargarFecha">Cargar Reto</button>
      <div id="retoPorFecha"></div>
    </section>

    <script type="module">
      import AnimedleApiClient from './services/animedle-client.js';

      const api = new AnimedleApiClient(
        'http://localhost:3000/api/v0'
      );

      // Cargar reto diario
      document
        .getElementById('btnCargarDiario')
        .addEventListener('click', async () => {
          const contenedor =
            document.getElementById('retosDiarios');
          contenedor.innerHTML = '<p>Cargando...</p>';

          try {
            const retos = await api.getDailyChallenge();

            contenedor.innerHTML = retos
              .map((reto) => {
                let contenido = '';

                switch (reto.nombre) {
                  case 'emoji':
                    contenido = `<p>Emojis: ${reto.datos.emoji}</p>`;
                    break;
                  case 'opening':
                    contenido = `<audio controls src="${api.getResourceUrl(reto.datos.opening_url)}"></audio>`;
                    break;
                  case 'personaje':
                    contenido = `<img src="${api.getResourceUrl(reto.datos.personaje)}" alt="Personaje" style="max-width: 300px;">`;
                    break;
                  case 'imagenes':
                    contenido = `
                <div>
                  <p>Dificultad: Muy Fácil</p>
                  <img src="${api.getResourceUrl(reto.datos.very_easy)}" alt="Imagen" style="max-width: 200px;">
                </div>
              `;
                    break;
                }

                return `
            <div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
              <h3>${reto.name}</h3>
              <p>Tipo: ${reto.nombre}</p>
              <p>Fecha: ${reto.fecha}</p>
              ${contenido}
            </div>
          `;
              })
              .join('');
          } catch (error) {
            contenedor.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
          }
        });

      // Cargar historial
      document
        .getElementById('btnCargarHistorial')
        .addEventListener('click', async () => {
          const contenedor =
            document.getElementById('historial');
          const limit =
            document.getElementById('inputLimit').value;
          contenedor.innerHTML = '<p>Cargando...</p>';

          try {
            const historial = await api.getHistory(
              parseInt(limit)
            );

            contenedor.innerHTML = `
          <ul>
            ${historial
              .map(
                (item) => `
              <li>
                <strong>Fecha:</strong> ${item.fecha} - 
                <strong>ID:</strong> ${item.id}
              </li>
            `
              )
              .join('')}
          </ul>
        `;
          } catch (error) {
            contenedor.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
          }
        });

      // Cargar reto por fecha
      document
        .getElementById('btnCargarFecha')
        .addEventListener('click', async () => {
          const contenedor =
            document.getElementById('retoPorFecha');
          const fecha =
            document.getElementById('inputFecha').value;

          if (!fecha) {
            alert('Por favor selecciona una fecha');
            return;
          }

          contenedor.innerHTML = '<p>Cargando...</p>';

          try {
            const retos =
              await api.getChallengeByDate(fecha);

            if (retos.length === 0) {
              contenedor.innerHTML =
                '<p>No hay retos para esta fecha</p>';
              return;
            }

            contenedor.innerHTML = retos
              .map(
                (reto) => `
          <div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
            <h3>${reto.name}</h3>
            <p>Tipo: ${reto.nombre}</p>
            <p>Fecha: ${reto.fecha}</p>
          </div>
        `
              )
              .join('');
          } catch (error) {
            contenedor.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
          }
        });
    </script>
  </body>
</html>
```

## Uso con fetch y promesas (sin async/await)

```javascript
// ejemplo-promesas.js

const api = new AnimedleApiClient(
  'http://localhost:3000/api/v0'
);

// Obtener reto diario con promesas
api
  .getDailyChallenge()
  .then((retos) => {
    console.log('Retos del día:', retos);
    retos.forEach((reto) => {
      console.log(`- ${reto.nombre}: ${reto.name}`);
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// Obtener historial con promesas
api
  .getHistory(7)
  .then((historial) => {
    console.log('Historial:');
    historial.forEach((item) => {
      console.log(`- ${item.fecha}: ID ${item.id}`);
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// Encadenar promesas
api
  .getHistory(1)
  .then((historial) => {
    if (historial.length > 0) {
      const fecha = historial[0].fecha;
      return api.getChallengeByDate(fecha);
    }
    throw new Error('No hay historial');
  })
  .then((retos) => {
    console.log('Retos del último día:', retos);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

## Uso en Node.js

Si quieres usar la API en Node.js (versión 18 o superior que incluye fetch):

```javascript
// node-example.js

import AnimedleApiClient from './services/animedle-client.js';

const api = new AnimedleApiClient(
  'http://localhost:3000/api/v0'
);

async function main() {
  try {
    // Obtener reto diario
    console.log('=== RETO DIARIO ===');
    const retos = await api.getDailyChallenge();
    retos.forEach((reto) => {
      console.log(`${reto.nombre}: ${reto.name}`);
    });

    // Obtener historial
    console.log('\n=== HISTORIAL (últimos 5 días) ===');
    const historial = await api.getHistory(5);
    historial.forEach((item) => {
      console.log(`${item.fecha} - ID: ${item.id}`);
    });

    // Obtener reto por fecha
    console.log('\n=== RETO DEL 2026-01-24 ===');
    const retosDelDia =
      await api.getChallengeByDate('2026-01-24');
    retosDelDia.forEach((reto) => {
      console.log(`${reto.nombre}: ${reto.name}`);
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
```

Para versiones anteriores de Node.js (< 18), instala node-fetch:

```bash
npm install node-fetch
```

```javascript
// node-example-old.js
import fetch from 'node-fetch';

// Usar la misma clase AnimedleApiClient
// Solo asegúrate de que fetch esté disponible globalmente
// o pasa fetch como parámetro
```
