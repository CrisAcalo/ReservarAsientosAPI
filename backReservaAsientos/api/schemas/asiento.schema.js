const Joi = require('joi');

const numero = Joi.number().integer();
const disponible = Joi.boolean();
const reservadoPor = Joi.string();

const createAsientoSchema = Joi.object({
    disponible: disponible.required(),
})

// const updateAsientoSchema = Joi.object({
//     disponible: disponible.required(),
//     reservadoPor: reservadoPor,
// })

const getAsientoSchema = Joi.object({
    numero: numero.required()
})

const reservarAsientoSchema = Joi.object({
    reservadoPor: reservadoPor.required()
})

module.exports = {
    createAsientoSchema,
    // updateAsientoSchema,
    getAsientoSchema,
    reservarAsientoSchema
}