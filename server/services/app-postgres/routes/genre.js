const genreRouter = require('express').Router();
const Controller = require('../controllers/genre');

genreRouter.post('/', Controller.createGenre)       // done checked
genreRouter.get('/', Controller.listGenre)          // done checked
genreRouter.get('/:id', Controller.findGenre)       // done checked
genreRouter.delete('/:id', Controller.deleteGenre)  // done checked

module.exports = genreRouter