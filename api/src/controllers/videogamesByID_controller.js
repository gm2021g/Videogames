let express = require('express');
//const { API_KEY } = process.env;
const API_KEY = "bf6d6853fdf14713a1a2b845f7968ec2";
const axios = require('axios');
const { Videogame, Genre } = require('../db');


// Obtiene  los videogames por id
const getVideogamesByID = async (id) => {

    if (!isNaN(id)) {
        //Busca videogame en la Api
        const result = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        console.log(result)

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
            return apiResult;
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

        return DbResult;
    }

    throw new Error('VideoGame not found');
};

module.exports = getVideogamesByID;