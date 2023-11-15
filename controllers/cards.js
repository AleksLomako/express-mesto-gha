const { mongoose } = require('mongoose');
const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((error) => {
      res.status(500).send({ message: 'Ошибка на стороне сервера', error: error.message });
    });
};

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: 'Переданы некорректные данные', error: error.message });
      }
      return res.status(500).send({ message: 'Ошибка на стороне сервера', error: error.message });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.id)
    .orFail()
    .then((card) => res.send(card))
    .catch((error) => {
      if (error instanceof mongoose.Error.DocumentNotFoundError) {
        return res.status(404).send({ message: 'Не найдена карточка с таким id', error: error.message });
      }
      if (error instanceof mongoose.Error.CastError) {
        return res.status(400).send({ message: 'Передан некорректный id', error: error.message });
      }
      return res.status(500).send({ message: 'Ошибка на стороне сервера', error: error.message });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((error) => {
      if (error instanceof mongoose.Error.DocumentNotFoundError) {
        return res.status(404).send({ message: 'Не найдена карточка с таким id', error: error.message });
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

const disLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((error) => {
      if (error instanceof mongoose.Error.DocumentNotFoundError) {
        return res.status(404).send({ message: 'Не найдена карточка с таким id', error: error.message });
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
  getCards, createCard, deleteCard, likeCard, disLikeCard,
};
