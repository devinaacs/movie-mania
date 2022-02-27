const movieRouter = require('express').Router();
const Controller = require('../controllers/movie');

movieRouter.post('/', Controller.createMovie)       // done checked
movieRouter.get('/', Controller.listMovie)          // done checked
movieRouter.get('/:id', Controller.findMovie)       // done checked
movieRouter.put('/:id', Controller.editMovie)       // done checked
movieRouter.delete('/:id', Controller.deleteMovie)  // done checked

module.exports = movieRouter