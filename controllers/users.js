const { mongoose } = require('mongoose');
const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((error) => {
      res.status(500).send({ message: 'Ошибка на стороне сервера', error: error.message });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((error) => {
      if (error instanceof mongoose.Error.DocumentNotFoundError) {
        return res.status(404).send({ message: 'Не найден пользователь с таким id', error: error.message });
      }
      if (error instanceof mongoose.Error.CastError) {
        return res.status(400).send({ message: 'Передан некорректный id', error: error.message });
      }
      return res.status(500).send({ message: 'Ошибка на стороне сервера', error: error.message });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: 'Переданы некорректные данные', error: error.message });
      }
      return res.status(500).send({ message: 'Ошибка на стороне сервера', error: error.message });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((error) => {
      if (error instanceof mongoose.Error.DocumentNotFoundError) {
        return res.status(404).send({ message: 'Не найден пользователь с таким id', error: error.message });
      }
      if (error instanceof mongoose.Error.CastError) {
        return res.status(400).send({ message: 'Передан некорректный id', error: error.message });
      }
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: 'Переданы некорректные данные', error: error.message });
      }
      return res.status(500).send({ message: 'Ошибка на стороне сервера', error: error.message });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((error) => {
      if (error instanceof mongoose.Error.DocumentNotFoundError) {
        return res.status(404).send({ message: 'Не найден пользователь с таким id', error: error.message });
      }
      if (error instanceof mongoose.Error.CastError) {
        return res.status(400).send({ message: 'Передан некорректный id', error: error.message });
      }
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: 'Переданы некорректные данные', error: error.message });
      }
      return res.status(500).send({ message: 'Ошибка на стороне сервера', error: error.message });
    });
};

module.exports = {
  getUsers, getUserById, createUser, updateProfile, updateAvatar,
};
