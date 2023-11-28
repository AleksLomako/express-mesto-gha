const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { createUser, loginUser } = require('./controllers/users');
const { validateLoginUser, validateRegisterUser } = require('./middlewares/validation');
const UserRouter = require('./routes/users');
const CardRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const handleError = require('./middlewares/handleError');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();

mongoose.connect(DB_URL, {
  //
});
app.use(express.json());

app.post('/signin', validateLoginUser, loginUser);
app.post('/signup', validateRegisterUser, createUser);

app.use(auth);
app.use('/', UserRouter);
app.use('/', CardRouter);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

app.use((errors()));
app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
