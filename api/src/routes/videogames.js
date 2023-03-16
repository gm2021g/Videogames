let express = require('express');
let router = express.Router();
const getVideogames = require('../controllers/videogames_controller');
const getVideogamesByID = require('../controllers/videogamesByID_controller');
const getVideogamesNew = require('../controllers/videogamesNew_controller');
const deleteVideogame = require('../controllers/videogameDelete_controller');
const updateVideogame = require('../controllers/videogameUpdate_controller');

// Ruta get videogames (trae todos los videogames) o con query trae por nombre
router.get('/', async (req, res) => {
    const name = req.query.name;

    try {
        result = await getVideogames(name);
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error.message)
        res.status(400).json(error.message);
    }
});


//Get videogame por id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        result = await getVideogamesByID(id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).send(`Error in Rute /videogames:id ${error}`);
    }
}
);


// Alta de videogame en DB, por formulario.
router.post('/', async (req, res) => {

    let videoGameNew = {
        id,
        name,
        description,
        platforms,
        image,
        released,
        rating,
        createdInDb, // por defecto viene en true, de da de alta en la DB con valor true
        genres,
    } = req.body;

    try {
        console.log(videoGameNew)
        result = await getVideogamesNew(videoGameNew);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).send('New Video Game NOT created');
    }
});

//Ruta para delete videogame
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteVG = await deleteVideogame(id);
        return res.status(200).send(deleteVG);

    } catch (error) {
        return res.status(400).send(error.message);
    }
});

//Ruta para update de videogame
router.put('/videogames', (req, res) => {
    const {
        id,
        name,
        description,
        platforms,
        image,
        released,
        rating,
        genres,
    } = req.body;

    try {
        let result = updateVideogame({
            id,
            name,
            description,
            platforms,
            image,
            released,
            rating,
            genres,
        });

        return res.status(200).json(result);

    } catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;