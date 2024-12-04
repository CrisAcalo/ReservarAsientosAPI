const express = require('express');

const AsientoService = require('../services/asiento.service');

const {
    createAsientoSchema,
    updateAsientoSchema,
    getAsientoSchema,
    reservarAsientoSchema
} = require('../schemas/asiento.schema');

const validationHandler = require('../middlewares/validator.handler');

const router = express.Router();

const asientoService = new AsientoService();

router.get('/', async (req, res) => {
    const asientos = await asientoService.find();
    res.json(asientos);
});

router.get('/:numero',
    validationHandler(getAsientoSchema, 'params'),
    async (req, res, next) => {
        const { numero } = req.params;
        try {
            const asiento = await asientoService.findOne(numero);
            res.json(asiento);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    async (req, res, next) => {
        try {
            const asiento = await asientoService.create();
            res.status(201).json(asiento);

        } catch (error) {
            next(error);
        }
    }
);

router.post('/reservar/:numero',
    validationHandler(getAsientoSchema, 'params'),
    validationHandler(reservarAsientoSchema, 'body'),
    async (req, res, next) => {
        const { numero } = req.params;
        const { reservadoPor } = req.body;
        try {
            const asiento = await asientoService.reservar(numero, reservadoPor);
            res.json(asiento);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/liberar/:numero',
    validationHandler(getAsientoSchema, 'params'),
    async (req, res, next) => {
        const { numero } = req.params;
        try {
            const asiento = await asientoService.liberar(numero);
            res.json(asiento);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:numero',
    validationHandler(getAsientoSchema, 'params'),
    async (req, res, next) => {
        const { numero } = req.params;
        try {
            const asiento = await asientoService.delete(numero);
            res.json(asiento);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;