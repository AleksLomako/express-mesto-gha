const UserRouter = require('express').Router();
const {
  getUsers, getUserById, createUser, updateProfile, updateAvatar,
} = require('../controllers/users');

UserRouter.get('/users', getUsers);
UserRouter.get('/users/:userId', getUserById);
UserRouter.post('/users', createUser);
UserRouter.patch('/users/me', updateProfile);
UserRouter.patch('/users/me/avatar', updateAvatar);

module.exports = UserRouter;
