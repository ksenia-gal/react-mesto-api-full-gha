const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const limiter = require('./middlewares/limiter');
<<<<<<< HEAD
// const { requestLogger, errorLogger } = require('./middlewares/logger')
=======
// const { requestLogger, errorLogger } = require('./middlewares/logger');
>>>>>>> 08804b525bb50f60e5262d9957fb708f1ab80d81
const routes = require('./routes/router');
const { errorHandler } = require('./middlewares/errorHandler');
const cors = require('cors');

// Слушаем 3000 порт
<<<<<<< HEAD
const { PORT = 3001 } = process.env;

=======
const { PORT = 3000 } = process.env;
//const { PORT = 4000 } = process.env;
>>>>>>> 08804b525bb50f60e5262d9957fb708f1ab80d81
// создание приложения
const app = express();

app.use(helmet());

app.use(express.json());

// app.use(cookieParser());

app.use(bodyParser.json());

app.use(limiter);

<<<<<<< HEAD
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001', 'http://kseniagal-backend.nomoreparties.co', 'https://kseniagal-backend.nomoreparties.co' ], credentials: true }));
=======
app.use(cors({ origin: ['http://localhost:3000', 'https://localhost:3000', 'http://kseniagal-backend.nomoreparties.co', 'https://kseniagal-backend.nomoreparties.co' ], credentials: true }));
>>>>>>> 08804b525bb50f60e5262d9957fb708f1ab80d81

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// app.use(requestLogger);

app.use(routes);

// app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  // если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
