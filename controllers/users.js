const User = require('../models/user');

const getUsers = (req, res) => {
  try {
    User.find({})
      .then((users) => res.send(users));
  } catch (error) {
    res.status(500).send({ message: 'Ошибка на стороне сервера', error: error.message });
  }
};

const getUserById = (req, res) => {
  try {
    User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          res.status(404).send({ message: 'Не найден пользователь с таким id' });
          return;
        }
        res.status(200).send(user);
      });
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send({ message: 'Передан некорректный id', error: error.message });
      return;
    }
    res.status(500).send({ message: 'Ошибка на стороне сервера', error: error.message });
  }
};

const createUser = (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    User.create({ name, about, avatar })
      .then((user) => {
        res.status(200).send(user);
      });
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).send({ message: 'Ошибка валидации полей', error: error.message });
      return;
    }
    res.status(500).send({ message: 'Ошибка на стороне сервера', error: error.message });
  }
};

const updateProfile = (req, res) => {
  try {
    const { name, about } = req.body;
    User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
      .then((user) => {
        if (!user) {
          res.status(404).send({ message: 'Не найден пользователь с таким id' });
          return;
        }
        res.status(200).send(user);
      });
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send({ message: 'Передан некорректный id', error: error.message });
      return;
    }
    res.status(500).send({ message: 'Ошибка на стороне сервера', error: error.message });
  }
};

const updateAvatar = (req, res) => {
  try {
    const { avatar } = req.body;
    User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
      .then((user) => {
        if (!user) {
          res.status(404).send({ message: 'Не найден пользователь с таким id' });
          return;
        }
        res.status(200).send(user);
      });
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send({ message: 'Передан некорректный id', error: error.message });
      return;
    }
    res.status(500).send({ message: 'Ошибка на стороне сервера', error: error.message });
  }
};

module.exports = {
  getUsers, getUserById, createUser, updateProfile, updateAvatar,
};
