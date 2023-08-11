const { config } = require('dotenv');

const { NODE_ENV } = process.env;

if (NODE_ENV === 'production') { config(); }

const { SECRET_KEY = 'dev-secret' } = process.env;

const REGEX = /https?:\/\/([a-z0-9-]+\.)+[a-z]{2,}([a-zA-Z0-9-._~:?#[\]@!$&'()*+,;=]*)/;

module.exports = { REGEX, NODE_ENV, SECRET_KEY };
