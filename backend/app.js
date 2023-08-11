const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/router');
const NotFoundError = require('./errors/notFoundError');
const { errorHandler } = require('./middlewares/errorHandler');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

// создание приложения
const app = express();

app.use(helmet());

app.use(express.json());

app.use(bodyParser.json());

app.use(requestLogger);

app.use(cors({ origin: ['http://kseniag.nomoreparties.co', 'https://kseniag.nomoreparties.co'] }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(limiter);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(routes);

app.use(errorLogger);

app.use((req, res, next) => next(new NotFoundError('Страницы не существует')));

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  // если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
