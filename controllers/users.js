const { mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

// Регистрация пользователя
const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((error) => {
      if (error.code === 11000) {
        return next(new ConflictError('Такой пользователь уже существует'));
      }
      return next(error);
    });
};

// Аутентификация пользователя
const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((error) => {
      next(error);
    });
};

// Загрузка всех пользователей
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

// Получение информации о текущем пользователе
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(200).send({ user }))
    .catch((error) => {
      if (error instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('Не найден пользователь с таким id'));
      }
      if (error instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Передан некорректный id'));
      }
      return next(error);
    });
};

// Получение пользователя по ID
const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((error) => {
      if (error instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('Не найден пользователь с таким id'));
      }
      if (error instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Передан некорректный id'));
      }
      return next(error);
    });
};

// Обновление всех данных профиля
const updateProfile = (reqID, reqBody, res, next) => {
  User.findByIdAndUpdate(reqID, reqBody, { new: true, runValidators: true })
    .orFail()
    .then((updatedUser) => res.send(updatedUser))
    .catch((error) => {
      if (error instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('Не найден пользователь с таким id'));
      }
      return next(error);
    });
};

// Обновление информации профиля(декоратор)
const updateProfileInfo = (req, res, next) => {
  const { _id } = req.user;
  const { name, about } = req.body;
  return updateProfile(_id, { name, about }, res, next);
};

// Обновление аватара профиля(декоратор)
const updateAvatar = (req, res, next) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  return updateProfile(_id, { avatar }, res, next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfileInfo,
  updateAvatar,
  loginUser,
  getCurrentUser,
};
