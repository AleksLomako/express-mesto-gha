const CardRouter = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, disLikeCard,
} = require('../controllers/cards');

CardRouter.get('/cards', getCards);
CardRouter.post('/cards', createCard);
CardRouter.delete('/cards/:cardId', deleteCard);
CardRouter.put('/cards/:cardId/likes', likeCard);
CardRouter.delete('/cards/:cardId/likes', disLikeCard);

module.exports = CardRouter;
