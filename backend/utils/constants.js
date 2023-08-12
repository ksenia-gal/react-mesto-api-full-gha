const { NODE_ENV, SECRET_SIGNING_KEY } = process.env;
const SECRET_DEV_KEY = 'dev-secret-key';
const REGEX = /https?:\/\/([a-z0-9-]+\.)+[a-z]{2,}([a-zA-Z0-9-._~:?#[\]@!$&'()*+,;=]*)/;

module.exports = {
  REGEX, NODE_ENV, SECRET_SIGNING_KEY, SECRET_DEV_KEY,
};
