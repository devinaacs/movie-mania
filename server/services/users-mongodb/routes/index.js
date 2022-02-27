const router = require('express').Router();
const Controller = require('../controllers/user');

router.post('/', Controller.register)
router.get('/', Controller.listUser)
router.get('/:id', Controller.findUser)
router.delete('/:id', Controller.deleteUser)


module.exports = router