// // Массив доменов, с которых разрешены кросс-доменные запросы
// const allowedCors = [
//   'https://kseniag.nomoreparties.co',
//   'http://kseniag.nomoreparties.co',
// ];

// module.exports = (req, res, next) => {
//   const { origin } = req.headers;
//   const { method } = req;
//   const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
//   const requestHeaders = req.headers['access-control-request-headers'];
//   // Если это предварительный запрос, добавляем нужные заголовки
//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     return res.end();
//   }
//   // сохраняем список заголовков исходного запроса
//   res.header('Access-Control-Allow-Credentials', true);
//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//   }
//   return next();
// };
