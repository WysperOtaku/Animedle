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