const router = require('express').Router();

const { createUser, loginUser } = require('../controllers/users');
const { validateLoginUser, validateRegisterUser } = require('../middlewares/validation');
const auth = require('../middlewares/auth');
const UserRouter = require('./users');
const CardRouter = require('./cards');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', validateLoginUser, loginUser);
router.post('/signup', validateRegisterUser, createUser);

router.use(auth);
router.use('/users', UserRouter);
router.use('/cards', CardRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
