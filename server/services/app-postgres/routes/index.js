const router = require('express').Router();
const Controller = require('../controllers/login');
const authentication = require('../middlewares/authentication');

// PUBLIC
router.use('/pub/movies', require('./public'))
router.use('/genres', require('./genre'))
router.use('/casts', require('./cast'))

// LOGIN ADMIN  
router.post('/login', Controller.login)

// AUTHENTICATION
router.use(authentication)

// MAIN ENTITY
router.post('/register', Controller.register)
router.use('/users', require('./user'))
router.use('/movies', require('./movie'))


module.exports = router