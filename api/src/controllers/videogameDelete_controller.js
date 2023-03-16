let express = require('express');
const { API_KEY } = process.env;
const axios = require('axios');
const { Videogame, Genre } = require('../db');

// Obtiene  los videogames por id
const deleteVideogame = async (id) => {

    //Busca videogame en la DB  
    var videoDb = await Videogame.findOne({
        where: { id },
        include: [Genre],
    });

    // Si no lo encuentra da error 
    if (!videoDb) {
        throw new Error('VideoGame not found');
    }

    const elem = await Videogame.destroy({
        where: { id: `${id}` }
    });

    return ('Videogame has been deleted');
}

module.exports = deleteVideogame;