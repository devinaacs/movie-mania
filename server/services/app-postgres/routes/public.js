const router = require('express').Router();
const PubController = require('../controllers/public');


router.post('/', PubController.createMovie)
router.get('/', PubController.listMovie)
router.get('/:id', PubController.findMovie)
router.put('/:id', PubController.editMovie)
router.delete('/:id', PubController.deleteMovie)


module.exports = router