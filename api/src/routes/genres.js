let express = require('express');
const { API_KEY } = process.env;
let router = express.Router();
const axios = require('axios');
const { Genre } = require('../db');

// Trae los Genres de la Api y si no existen en la DB los guarda
router.get('/', async (req, res) => {
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
    res.status(200).json(allGenres)
}
);

module.exports = router;