const router = require('express').Router();

router.use('/movies', require('./movie'))
router.use('/users', require('./user'))

module.exports = router
