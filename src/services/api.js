import axios from "axios";

const BASE_URL = "http://localhost:3000/api/pokemons";
const BASE_URL_SEC = "http://localhost:3000/api/auth";


export const getAllPokemons = () => {
    return axios.get(BASE_URL)
        .then(res => res.data)
        .catch(err => {
            console.error("Erreur lors de la récupération des pokémons", err);
            throw err;
        });
};

export const getPokemonById = (id) => {
    return axios.get(`${BASE_URL}/${id}`)
        .then(res => res.data)
        .catch(err => {
            console.error("Erreur lors de la récupération du pokémon", err);
            throw err;
        });
};

export const createPokemon = (pokemon) => {
    return axios.post(BASE_URL, pokemon)
        .then(res => res.data)
        .catch(err => {
            console.error("Erreur lors de la création", err);
            throw err;
        });
};

export const updatePokemon = (id, data) => {
    return axios.put(`${BASE_URL}/${id}`, data)
        .then(res => res.data)
        .catch(err => {
            console.error("Erreur de mise à jour", err);
            throw err;
        });
};

export const deletePokemon = (id) => {
    return axios.delete(`${BASE_URL}/${id}`)
        .then(res => res.data)
        .catch(err => {
            console.error("Erreur lors de la suppression", err);
            throw err;
        });
};
export const createUser = (user) => {
    return axios.post(`${BASE_URL_SEC}/${'/register'}`, user)
        .then(res => res.data)
        .catch(err => {
            console.error("Erreur lors de la création de l'utilisateur", err);
            throw err;
        });
};

export const conectUser = (user) => {
    return axios.post(`${BASE_URL_SEC}/${'/login'}`, user)
        .then(res => res.data)
        .catch(err => {
            console.error("Erreur lors de la connexion de l'utilisateur", err);
            throw err;
        });
};