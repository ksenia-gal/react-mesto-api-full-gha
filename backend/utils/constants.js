const { NODE_ENV, JWT_SECRET } = process.env;
const DEV_SECRET = 'dev-secret';
const REGEX = /https?:\/\/([a-z0-9-]+\.)+[a-z]{2,}([a-zA-Z0-9-._~:?#[\]@!$&'()*+,;=]*)/;

module.exports = {
  REGEX, NODE_ENV, JWT_SECRET, DEV_SECRET,
};
