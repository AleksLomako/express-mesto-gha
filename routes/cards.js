const CardRouter = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, disLikeCard,
} = require('../controllers/cards');

const { validateCreateCard, validateCardId } = require('../middlewares/validation');

CardRouter.get('', getCards); // Загрузка всех карточек
CardRouter.post('', validateCreateCard, createCard); // Создание карточки
CardRouter.delete('/:cardId', validateCardId, deleteCard); // Удаление своей карточки
CardRouter.put('/:cardId/likes', validateCardId, likeCard); // Лайк карточке
CardRouter.delete('/:cardId/likes', validateCardId, disLikeCard); // Дизлайк карточке

module.exports = CardRouter;
