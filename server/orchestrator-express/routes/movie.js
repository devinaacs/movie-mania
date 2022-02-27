const movieRouter = require('express').Router();
const Controller = require('../controllers/movie');

movieRouter.post('/', Controller.postMovie)
movieRouter.get('/', Controller.getAllMovies)       // done
movieRouter.get('/:id', Controller.findMovieById)   // done
movieRouter.put('/:id', Controller.editMovie)       // done
movieRouter.delete('/:id', Controller.deleteMovie)  // done

module.exports = movieRouter