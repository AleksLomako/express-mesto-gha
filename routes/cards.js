const CardRouter = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, disLikeCard,
} = require('../controllers/cards');

const { validateCreateCard, validateCardId } = require('../middlewares/validation');

CardRouter.get('/cards', getCards); // Загрузка всех карточек
CardRouter.post('/cards', validateCreateCard, createCard); // Создание карточки
CardRouter.delete('/cards/:cardId', validateCardId, deleteCard); // Удаление своей карточки
CardRouter.put('/cards/:cardId/likes', validateCardId, likeCard); // Лайк карточке
CardRouter.delete('/cards/:cardId/likes', validateCardId, disLikeCard); // Дизлайк карточке

module.exports = CardRouter;
