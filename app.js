const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Роуты
const UserRouter = require('./routes/users');
const CardRouter = require('./routes/cards');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

mongoose.connect(DB_URL, {
  //
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '6551f8e45c986e497bdde5db',
  };
  next();
});

app.use('/', UserRouter);
app.use('/', CardRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
