import { AuthContext } from '../components/AuthProvider';
import { useContext } from "react";
import data from '../data';

const BASE_URL = 'https://5cd4-201-212-239-28.ngrok-free.app';

const fetchFromBack = (url, options = {}) => {
  

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${data["token"]}`,
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