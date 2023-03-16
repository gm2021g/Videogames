import axios from 'axios';
import {
    GET_VIDEOGAMES, GET_GENRES, FILTER_BY_GENRE, GET_PLATFORMS, GET_DETAILS,
    FILTER_CREATED, ORDER_BY_NAME, ORDER_BY_RATING, GET_VIDEOGAME_NAME, INIT_FILTERS
} from "../action-types";

// Obtener los videogames desde la API y desde la Base de datos
export const getVideogames = () => {
    return async function (dispatch) {
        const json = await axios.get('http://localhost:3001/videogames');
        return dispatch({
            type: GET_VIDEOGAMES,
            payload: json.data
        })
    }
};

// Filtro para obtener los géneros de la API
export function getGenres() {
    return async function (dispatch) {
        const json = await axios.get('http://localhost:3001/genres');
        return dispatch({
            type: GET_GENRES,
            payload: json.data
        })
    }
};

// Filtro para seleccionar videogames por género
export function filterVideogamesByGenre(payload) { // payload es el value del input (Accion, Family, etc)
    return {
        type: FILTER_BY_GENRE,
        payload
    }
}

// Filtro para seleccionar si fue creado en la Base de datos o viene de la API
export function filterCreated(payload) { //db
    return {
        type: FILTER_CREATED,
        payload
    }
}

export function orderByName(payload) { //asc y desc 
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByRating(payload) {
    return {
        type: ORDER_BY_RATING,
        payload
    }
}
/*
export function initFilters(payload) {
    return {
        type: INIT_FILTERS,
        payload
    }
}
*/
//Buscar videogames por nombre
export function getVideogameName(name) {
    return async function (dispatch) {
        try {
            const json = await axios.get(`http://localhost:3001/videogames?name=${name}`);
            return dispatch({
                type: GET_VIDEOGAME_NAME,
                payload: json.data
            })
        } catch (error) {
            alert('Game not found');
        }
    }
}

export function postVideogame(payload) {
    return async function (dispatch) {
        const response = await axios.post('http://localhost:3001/videogames', payload);
        return response;
    }
}

export function getPlatforms() {
    return async function (dispatch) {
        const json = await axios.get('http://localhost:3001/platforms');
        return dispatch({
            type: GET_PLATFORMS,
            payload: json.data
        })
    }
};

export function getDetails(id) {
    if (id) {
        return async function (dispatch) {
            try {
                const detail = await axios.get(`http://localhost:3001/videogames/${id}`);
                dispatch({
                    type: GET_DETAILS,
                    payload: detail.data
                })
            } catch (error) {
                console.log(error)
            }
        }
    }
};  