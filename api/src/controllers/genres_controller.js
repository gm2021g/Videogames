let express = require('express');
const { API_KEY } = process.env;
const axios = require('axios');
const { Genre } = require('../db');

const getGenres = async () => {
    const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const nameGenres = genresApi.data.results;

    nameGenres.forEach(async (gen) => {
        await Genre.findOrCreate({
            where: {
                name: gen.name,
            }
        })
    });

    const allGenres = await Genre.findAll();
    return allGenres;
};

module.exports = getGenres;