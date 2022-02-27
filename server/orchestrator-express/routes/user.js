const userRouter = require('express').Router();
const Controller = require('../controllers/user');

userRouter.post('/', Controller.createUser)         // done
userRouter.get('/', Controller.getAllUsers)         // done
userRouter.get('/:id', Controller.findUserById)     // done
userRouter.delete('/:id', Controller.deleteUser)    // done

module.exports = userRouter