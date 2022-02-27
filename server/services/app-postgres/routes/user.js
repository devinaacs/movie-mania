const userRouter = require('express').Router();

const Controller = require('../controllers/user');

userRouter.get('/', Controller.listUser)            // done checked
userRouter.get('/current', Controller.findUser)         // done checked
userRouter.put('/:id', Controller.editUser)         // done checked
userRouter.delete('/:id', Controller.deleteUser)    // done checked

module.exports = userRouter