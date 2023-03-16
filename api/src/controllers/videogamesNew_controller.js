let express = require('express');
const { API_KEY } = process.env;
//const API_KEY = "bf6d6853fdf14713a1a2b845f7968ec2";
const axios = require('axios');
const { Videogame, Genre } = require('../db');

// Obtiene  los videogames por id
const getVideogamesNew = async ({
    name,
    description,
    platforms,
    image,
    released,
    rating,
    genres,
}) => {

    platforms = platforms.toString();

    let newVideoGame = await Videogame.create({
        name,
        description,
        platforms,
        image,
        released,
        rating,
    });

    let genreDb = await Genre.findAll({
        where: { name: genres }
    });

    newVideoGame.addGenres(genreDb);
    return newVideoGame;
};

module.exports = getVideogamesNew;