class AnimedleApiClient {
  private baseUrl: string;
  public dailyChallenges: ChallengeData[] | undefined;

  constructor(
    baseUrl: string = import.meta.env.PUBLIC_BASE_URL +
      'api/v0'
  ) {
    this.baseUrl = baseUrl;
  }

  public async setDailyChallenges() {
    this.dailyChallenges = await this.getDailyChallenge();
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
