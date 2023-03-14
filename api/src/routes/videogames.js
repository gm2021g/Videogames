let express = require('express');
let router = express.Router();
const axios = require('axios');
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;

// Obtiene los datos de videogames de la API
const getApiInfo = async () => {

    const url1 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`);
    const url2 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`);
    const url3 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`);
    const url4 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`);
    const url5 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`);

    const apiUrl = url1.data.results.concat(
        url2.data.results,
        url3.data.results,
        url4.data.results,
        url5.data.results,
    );

    const apiInfo = apiUrl.map(vGame => {
        const platforms = vGame.platforms.map((p) => p.platform);
        return {
            id: vGame?.id,
            name: vGame?.name,
            description: vGame?.description,
            platforms: platforms,
            genres: vGame?.genres,
            image: vGame?.background_image,
            released: vGame?.released,
            rating: vGame?.rating,
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
router.get('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        if (!isNaN(id)) {
            //Busca videogame en la Api
            const result = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)

            if (result.data.id) {
                let genrestr = [];
                for (i = 0; i < result.data.genres.length; i++) {
                    genrestr.push(result.data.genres[i].name)
                }

                let platformstr = [];
                for (i = 0; i < result.data.platforms.length; i++) {
                    platformstr.push(result.data.platforms[i].platform.name)
                }

                const apiResult = {
                    id: result.data.id,
                    name: result.data.name,
                    platforms: platformstr.toString(),
                    released: result.data.released,
                    image: result.data.background_image,
                    description: result.data.description.replace(/<[^>]+>/g, ''), // elimina etiquetas html como <p></p>
                    rating: result.data.rating,
                    genres: genrestr.toString()
                }
                return res.status(200).json(apiResult)
            }
        }

        //Busca videogame en la DB  
        var dataDb = await Videogame.findOne({
            where: { id },
            include: [Genre],
        });

        if (dataDb) {
            let genrestr = []
            for (let i = 0; i < dataDb.genres.length; i++) {
                genrestr.push(dataDb.genres[i].name)
            }

            const DbResult = {
                id: dataDb.id,
                name: dataDb.name,
                platforms: dataDb.platforms,
                released: dataDb.released,
                image: dataDb.image ? dataDb.image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCsgPISuO1XFJO3fxKhWGx7l9DEvGeQ2BMtQ&usqp=CAU",
                description: dataDb.description,
                rating: dataDb.rating,
                genres: genrestr.toString()
            }

            return res.status(200).json(DbResult)

        }
        return res.status(404).send('Videogame not found');

    } catch (error) {
        res.send(`Error in Rute /videogames:id ${error}`);
    }
}
);


// Alta de videogame en DB, por formulario.
router.post('/', async (req, res) => {
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
        // console.log(err);
        res.status(400).send(err);
    }
});

module.exports = router;