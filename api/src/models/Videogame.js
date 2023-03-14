const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {

    id: { // id
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },

    name: { // name
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: { // description
      type: DataTypes.STRING,
      allowNull: false,
    },

    platforms: {  // platforms
      type: DataTypes.STRING,
      allowNull: true,
    },

    image: { // background_image
      type: DataTypes.STRING,
      allowNull: true,
    },

    released: { //  released  
      type: DataTypes.STRING,
      allowNull: true,
    },

    rating: { // rating
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    createdInDB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }

  });
};
