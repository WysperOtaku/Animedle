import api from "../types/main";

export async function ensureDailyChallenges() {
  if (typeof window === 'undefined') {
    return undefined;
  }

  if (api.dailyChallenges) {
    return api.dailyChallenges;
  }

  await api.setDailyChallenges();
  return api.dailyChallenges;
}