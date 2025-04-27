import axios from "axios";

const BASE_URL = "http://localhost:3000/api/pokemons";
const BASE_URL_SEC = "http://localhost:3000/api/auth";

// Create an axios instance for secured requests
const secureApi = axios.create();

// Add request interceptor to attach the token to every request
secureApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle token expiration
secureApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/connection';
    }
    return Promise.reject(error);
  }
);

// Authentication functions
export const createUser = (user) => {
  return axios.post(`${BASE_URL_SEC}/register`, user)
    .then(res => res.data)
    .catch(err => {
      console.error("Erreur lors de la création de l'utilisateur", err);
      throw err;
    });
};

export const connectUser = (user) => {
  return axios.post(`${BASE_URL_SEC}/login`, user)
    .then(res => {
      // Store token in localStorage
      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
      return res.data;
    })
    .catch(err => {
      console.error("Erreur lors de la connexion de l'utilisateur", err);
      throw err;
    });
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  window.location.href = '/connection';
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

// Protected API calls - using secureApi with the token interceptor
export const getAllPokemons = () => {
  return secureApi.get(BASE_URL)
    .then(res => res.data)
    .catch(err => {
      console.error("Erreur lors de la récupération des pokémons", err);
      throw err;
    });
};

export const getPokemonById = (id) => {
  return secureApi.get(`${BASE_URL}/${id}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Erreur lors de la récupération du pokémon", err);
      throw err;
    });
};

export const createPokemon = (pokemon) => {
  return secureApi.post(BASE_URL, pokemon)
    .then(res => res.data)
    .catch(err => {
      console.error("Erreur lors de la création", err);
      throw err;
    });
};

export const updatePokemon = (id, data) => {
  return secureApi.put(`${BASE_URL}/${id}`, data)
    .then(res => res.data)
    .catch(err => {
      console.error("Erreur de mise à jour", err);
      throw err;
    });
};

export const deletePokemon = (id) => {
  return secureApi.delete(`${BASE_URL}/${id}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Erreur lors de la suppression", err);
      throw err;
    });
};