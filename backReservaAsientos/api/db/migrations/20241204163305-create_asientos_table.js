'use strict';

const { ASIENTO_TABLE, AsientoSchema } = require('../models/asiento.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(ASIENTO_TABLE, AsientoSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ASIENTO_TABLE);
  }
};
