const express = require('express');
const mongoose = require('mongoose');

// Роуты
const UserRouter = require('./routes/users');
const CardRouter = require('./routes/cards');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

mongoose.connect(DB_URL, {
  //
});

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6551f8e45c986e497bdde5db',
  };
  next();
});

app.use('/', UserRouter);
app.use('/', CardRouter);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
