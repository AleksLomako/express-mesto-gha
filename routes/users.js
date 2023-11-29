const UserRouter = require('express').Router();
const {
  getUsers, getUserById, updateProfileInfo, updateAvatar, getCurrentUser,
} = require('../controllers/users');

const { validateUpdateProfile, validateUpdateAvatar, validateUserId } = require('../middlewares/validation');

UserRouter.get('', getUsers); // Загрузка всех пользователей
UserRouter.get('/:userId', validateUserId, getUserById); // Получение пользователя по ID
UserRouter.get('/me', getCurrentUser); // Получение информации о текущем пользователе
UserRouter.patch('/me', validateUpdateProfile, updateProfileInfo); // Обновление информации профиля
UserRouter.patch('/me/avatar', validateUpdateAvatar, updateAvatar); // Обновление аватара профиля

module.exports = UserRouter;
