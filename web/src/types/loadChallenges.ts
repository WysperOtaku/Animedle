import { ensureDailyChallenges } from "../utils/initApi";

export async function getChallenge(tipo: 'personaje' | 'emoji' | 'opening' | 'imagenes') {
  const dailyChallenges = await ensureDailyChallenges();
  return dailyChallenges?.find(c => c.nombre === tipo);
}