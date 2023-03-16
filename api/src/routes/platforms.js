let express = require('express');
let router = express.Router();
const getPlatforms = require('../controllers/platforms_controller');

// Obtiene una lista de nombres de plataforma de la API
router.get('/', async (req, res) => {
    try {
        result = await getPlatforms();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json(error.message);
    }
});

module.exports = router;