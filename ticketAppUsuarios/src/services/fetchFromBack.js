import { AuthContext } from '../components/AuthProvider';
import { useContext } from "react";

const BASE_URL = 'https://4805-181-167-107-74.sa.ngrok.io';

const fetchFromBack = (url, options = {}) => {
  const { backToken } = useContext(AuthContext);

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${backToken}`,
  };

  const config = {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  };

  const apiUrl = `${BASE_URL}${url}`;
  console.log(config)
  return fetch(apiUrl, config);
}

export default fetchFromBack;