const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/router');
const { errorHandler } = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/notFoundError');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// создание приложения
const app = express();

app.use(helmet());

app.use(express.json());

// app.use(cookieParser());

app.use(bodyParser.json());

app.use(limiter);

app.use(cors);

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use((req, res, next) => next(new NotFoundError('Страница не существует')));

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  // если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
