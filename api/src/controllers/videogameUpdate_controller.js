let express = require('express');
const { API_KEY } = process.env;
const axios = require('axios');
const { Videogame, Genre } = require('../db');

// Update de videogame 
const updateVideogame = async ({
    id,
    name,
    description,
    platforms,
    image,
    released,
    rating,
    genres,
}) => {

    //Busca videogame en la DB  
    var videoDb = await Videogame.findOne({
        where: { id },
        include: [Genre],
    });

    // Si no lo encuentra da error 
    if (!videoDb) {
        throw new Error('VideoGame not found');
    }

    var videoUpd = await Videogame.update(
        {
            name,
            description,
            platforms,
            image,
            released,
            rating,
            genres,
        },
        {
            where: { id: id },
        }
    );

    return ('Videogame has been updated');
}

module.exports = updateVideogame;