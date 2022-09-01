import axios from 'axios';

// baseURL:  https://economia.awesomeapi.com.br/
// USD-BRL: USD-BRL
// quantidade: x

const api = axios.create({
  baseURL: "https://economia.awesomeapi.com.br/json/last/"  
});

export default api;