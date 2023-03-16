let express = require('express');
//const { API_KEY } = process.env;
const API_KEY = "bf6d6853fdf14713a1a2b845f7968ec2";
const axios = require('axios');
const { Videogame, Genre } = require('../db');

// Obtiene todos los videogames o sino los videogames por nombre 
const getVideogames = async (name) => {
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

    // comienza proceso principal
    let videoGamesTotal = await getAllVideogames();

    if (name) {
        let videoGameName = await videoGamesTotal.filter(vGame => vGame.name.toLowerCase().includes(name.toLowerCase()));

        //obtengo los 15 primeros videogames
        let videoGameName_2 = videoGameName.slice(0, 15);

        if (videoGameName.length) return videoGameName_2;
        else throw new Error('VideoGame not found ---- ');
    }
    else {
        return videoGamesTotal;
    }
}

module.exports = getVideogames;