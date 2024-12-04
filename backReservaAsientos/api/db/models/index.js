const { Asiento, AsientoSchema } = require('./asiento.model');

function setupModels(sequelize) {
  Asiento.init(AsientoSchema, Asiento.config(sequelize)); // inicializa el modelo Asiento

}

module.exports = { setupModels };
