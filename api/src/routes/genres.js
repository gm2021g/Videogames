let express = require('express');
let router = express.Router();
const getGenres = require('../controllers/genres_controller');

// Trae los Genres de la Api y si no existen en la DB los guarda
router.get('/', async (req, res) => {
    try {
        result = await getGenres();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}
);

module.exports = router;