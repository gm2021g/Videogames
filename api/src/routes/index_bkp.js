const { Router } = require('express');
const axios = require('axios');
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers

// Obtiene los datos de videogames de la API
const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.rawg.io/api/games?token&key=${API_KEY}`);
    const apiInfo = await apiUrl.data.results.map(vGame => {
        const platforms = vGame.platforms.map((p) => p.platform);
        return {
            id: vGame.id,
            name: vGame.name,
            description: vGame.description,
            platforms: platforms,
            genres: vGame.genres,
            image: vGame.background_image,
            released: vGame.released,
            rating: vGame.rating,
        }

    })
    return apiInfo;
}

// Obtiene los datos de videogames de la DB
const getDbInfo = async () => {
    return await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })

}

// Une los datos de videogames de la DB y la API
const getAllVideogames = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const videoGamesTotal = apiInfo.concat(dbInfo);
    return videoGamesTotal
}

// Ruta get videogames (trae todos los videogames) o con query trae por nombre
router.get('/videogames', async (req, res) => {
    const name = req.query.name;
    let videoGamesTotal = await getAllVideogames();

    if (name) {
        let videoGameName = await videoGamesTotal.filter(vGame => vGame.name.toLowerCase().includes(name.toLowerCase()));

        //obtengo los 15 primeros videogames
        let videoGameName_2 = videoGameName.slice(0, 15);

        videoGameName.length ?
            res.status(200).send(videoGameName_2) :
            res.status(400).send('VigeoGame not found');
    }
    else {
        res.status(200).send(videoGamesTotal);
    }
});

///////////////////////////////////////////////////
// Trae los Genres de la Api y si no existen en la DB los guarda
router.get('/genres', async (req, res) => {
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
)

///////////////////////////////////////////////////


router.get('/videogames/:id', async (req, res) => {
    const { id } = req.params;

    if (id) {
        const videoGamesTotal = await getAllVideogames();
        let videoGameId = await videoGamesTotal.filter(vGame => vGame.id == id);
        videoGameId.length ?
            res.status(200).json(videoGameId) :
            res.status(404).send("VideoGame not found");
    }
});


//////////////////////////////////////////////////////////////////////////////////

// Alta de videogame en DB, por formulario.
router.post('/videogame', async (req, res) => {
    try {
        let { name,
            description,
            platforms,
            image,
            released,
            rating,
            createdInDb, // por defecto viene en true, de da de alta en la DB con valor true
            genres,
        } = req.body

        platforms = platforms.toString();

        let newVideoGame = await Videogame.create({
            name,
            description,
            platforms,
            image,
            released,
            rating,
            createdInDb
        })

        let genreDb = await Genre.findAll({
            where: { name: genres }
        })

        newVideoGame.addGenres(genreDb);

        res.status(200).send('New Video Game has been created');

    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

//////////////////////////////////////////////////////////////////////////////

// Obtiene una lista de nombres de plataforma de la API
router.get('/platforms', async (req, res) => {
    let apiPlatforms = await axios.get(`https://api.rawg.io/api/platforms/lists/parents?key=${API_KEY}`)
    let resAllPlatforms = apiPlatforms.data.results.map(p => p.name)
    res.status(200).send(resAllPlatforms);
    console.log(resAllPlatforms)
})

module.exports = router;
