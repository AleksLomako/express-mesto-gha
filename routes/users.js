const UserRouter = require('express').Router();
const {
  getUsers, getUserById, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');

const { validateUpdateProfile, validateUpdateAvatar, validateUserId } = require('../middlewares/validation');

UserRouter.get('/users', getUsers); // Загрузка всех пользователей
UserRouter.get('/users/:userId', validateUserId, getUserById); // Получение пользователя по ID
UserRouter.get('/users/me', getCurrentUser); // Получение информации о текущем пользователе
UserRouter.patch('/users/me', validateUpdateProfile, updateProfile); // Обновление информации профиля
UserRouter.patch('/users/me/avatar', validateUpdateAvatar, updateAvatar); // Обновление аватара профиля

module.exports = UserRouter;
