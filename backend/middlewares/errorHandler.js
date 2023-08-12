const { INTERNAL_SERVER_ERROR } = require('../errors/errorsStatusCode');

// const errorHandler = (err, req, res, next) => {
//   const { statusCode = INTERNAL_SERVER_ERROR, message } = err;
//   res
//     .status(statusCode)
//     .send({
//       message: statusCode === INTERNAL_SERVER_ERROR
//         ? 'На сервере произошла ошибка'
//         : message,
//     });
//   next();
// };

// module.exports = { errorHandler };

const errorHandler = (err, req, res, next) => {
  const statusCode = INTERNAL_SERVER_ERROR;
  const message = statusCode === INTERNAL_SERVER_ERROR ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = { errorHandler };
