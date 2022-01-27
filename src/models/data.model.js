module.exports = (sequelize, Sequelize) => {
    const Data = sequelize.define("data", {
      Nombres: {
        type: Sequelize.STRING
      },
      Apellidos: {
        type: Sequelize.STRING
      },
      Telefonos: {
        type: Sequelize.STRING
      },
      Direccion: {
          type: Sequelize.STRING
      }
    });
  
    return Data;
  };