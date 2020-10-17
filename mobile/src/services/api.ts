import axios from 'axios';

const api = axios.create({
  baseURL: 'https://happy-dourados.herokuapp.com',
});

export default api;