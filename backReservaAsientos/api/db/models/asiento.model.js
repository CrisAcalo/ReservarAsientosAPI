//numero, disponible, reservadoPor
const { Model, DataTypes, Sequelize } = require('sequelize');

const ASIENTO_TABLE = 'asientos';

const AsientoSchema = {
    numero: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    disponible: {
        allowNull: false,
        defaultValue: true,
        type: DataTypes.BOOLEAN,
    },
    reservadoPor: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.STRING,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.fn('now'),
    },
}

class Asiento extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: ASIENTO_TABLE,
            modelName: 'Asiento',
            timestamps: false,
        }
    }
}

module.exports = { ASIENTO_TABLE, Asiento, AsientoSchema }
