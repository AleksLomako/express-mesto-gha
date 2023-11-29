const { mongoose } = require('mongoose');
const Card = require('../models/card');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

// Загрузка всех карточек
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

// Создание карточки
const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((error) => next(error));
};

// Удаление своей карточки
const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Не хватает прав для удаления карточки');
      } else {
        Card.deleteOne(card)
          .then(() => {
            res.send({ message: 'Карточка успешно удалена' });
          })
          .catch(next);
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('Не найдена карточка с таким id'));
      }
      if (error instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Передан некорректный id'));
      }
      return next(error);
    });
};

// Лайк карточке
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((error) => {
      if (error instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('Не найдена карточка с таким id'));
      }
      if (error instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Передан некорректный id'));
      }
      return next(error);
    });
};

// Дизлайк карточке
const disLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((error) => {
      if (error instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('Не найдена карточка с таким id'));
      }
      if (error instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Передан некорректный id'));
      }
      return next(error);
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, disLikeCard,
};
