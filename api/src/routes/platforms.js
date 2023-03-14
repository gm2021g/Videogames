let express = require('express');
const { API_KEY } = process.env;
let router = express.Router();
const axios = require('axios');

// Obtiene una lista de nombres de plataforma de la API
router.get('/', async (req, res) => {
    let apiPlatforms = await axios.get(`https://api.rawg.io/api/platforms/lists/parents?key=${API_KEY}`)
    let resAllPlatforms = apiPlatforms.data.results.map(p => p.name)
    res.status(200).send(resAllPlatforms);
    console.log(resAllPlatforms)
});

module.exports = router;