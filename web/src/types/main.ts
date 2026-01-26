import AnimedleApiClient from '../types/animedle.service';

const api = new AnimedleApiClient(
  import.meta.env.PUBLIC_BASE_URL + 'api/v0'
);

export default api;
