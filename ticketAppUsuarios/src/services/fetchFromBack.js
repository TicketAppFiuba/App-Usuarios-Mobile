import { getData } from '../libs/LocalStorageHandlers';

const BASE_URL = 'https://b534-181-167-107-74.sa.ngrok.io';

export function fetchFromBack(url, options = {}) {
  token = getData();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const config = {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  };

  const apiUrl = `${BASE_URL}${url}`;

  return fetch(apiUrl, config);
}
