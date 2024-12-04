const { sequelize } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class AsientoService {

    constructor() {
        this.Asiento = sequelize.models.Asiento;
    }

    async create() {
        return this.Asiento.create();
    }

    async find() {
        return this.Asiento.findAll({
            order: [['numero', 'ASC']]
        });
    }

    async findOne(numero) {
        const asiento = await this.Asiento.findByPk(numero);
        if (!asiento) {
            throw boom.notFound('Asiento not found');
        }
        return asiento;
    }

    async update(numero, changes) {
        const asiento = await this.findOne(numero);
        return asiento.update(changes);
    }

    async reservar(numero, reservadoPor) {
        const asiento = await this.findOne(numero);
        return asiento.update({ disponible: false, reservadoPor });
    }

    async liberar(numero) {
        const asiento = await this.findOne(numero);
        return asiento.update({ disponible: true, reservadoPor: null });
    }

    async delete(numero) {
        const asiento = await this.findOne(numero);
        await asiento.destroy();
        return { numero };
    }

}

module.exports = AsientoService;