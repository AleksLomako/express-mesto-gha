const Card = require('../models/card');

const getCards = (req, res) => {
  try {
    Card.find({})
      .then((cards) => res.send(cards));
  } catch (error) {
    res.status(500).send({ message: 'Ошибка на стороне сервера', error: error.message });
  }
};

const createCard = (req, res) => {
  try {
    const owner = req.user._id;
    const { name, link } = req.body;
    Card.create({ name, link, owner })
      .then((card) => {
        res.status(200).send(card);
      });
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).send({ message: 'Ошибка валидации полей', error: error.message });
      return;
    }
    res.status(500).send({ message: 'Ошибка на стороне сервера', error: error.message });
  }
};

const deleteCard = (req, res) => {
  try {
    Card.findByIdAndDelete(req.params.id)
      .then((card) => {
        if (!card) {
          res.status(404).send({ message: 'Не найдена карточка с таким id' });
          return;
        }
        res.status(200).send(card);
      });
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send({ message: 'Передан некорректный id', error: error.message });
      return;
    }
    res.status(500).send({ message: 'Ошибка на стороне сервера', error: error.message });
  }
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      if (error.message === 'NotValidId') {
        res.status(404).send({ message: 'Не найдена карточка с таким id', error: error.message });
        return;
      }
      if (error.name === 'CastError') {
        res.status(400).send({ message: 'Передан некорректный id', error: error.message });
        return;
      }
      res.status(500).send({ message: 'Ошибка на стороне сервера', error: error.message });
    });
};

const disLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      if (error.message === 'NotValidId') {
        res.status(404).send({ message: 'Не найдена карточка с таким id', error: error.message });
        return;
      }
      if (error.name === 'CastError') {
        res.status(400).send({ message: 'Передан некорректный id', error: error.message });
        return;
      }
      res.status(500).send({ message: 'Ошибка на стороне сервера', error: error.message });
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, disLikeCard,
};
