import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'https://localhost:7081/api/',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'AIzaSyDaGmWKa4JsXZ-HjGw7ISLn_3namBGewQe'
  },
});

export default customAxios;