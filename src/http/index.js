import axios from 'axios';

const http = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL : undefined,
});

export default http;
