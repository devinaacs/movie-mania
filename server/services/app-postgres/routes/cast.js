const castRouter = require('express').Router();
const Controller = require('../controllers/cast');

castRouter.post('/', Controller.createCast)         // done checked
castRouter.get('/', Controller.listCast)            // done checked
castRouter.get('/:id', Controller.findCast)         // done checked
castRouter.put('/:id', Controller.editCast)         // done checked
castRouter.delete('/:id', Controller.deleteCast)    // done checked

module.exports = castRouter