const authModel = require('../models/authModel');
const jwt = require('jsonwebtoken');

async function login(req, reply) {
  const { username, password } = req.body;

  const user = await authModel.findByUsername(username);
  if (!user) {
    return reply.status(401).send({ message: 'Invalid credentials' });
  }

  const isValidPassword = await authModel.comparePassword(password, user.password);
  if (!isValidPassword) {
    return reply.status(401).send({ message: 'Invalid credentials' });
  }

  const api_token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.SECRET_KEY,
    { expiresIn: '30m' }
  );

  const refreshToken = jwt.sign(
    { id: user.id, username: user.username, name: user.name },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  return reply.send({ api_token, refreshToken });
}

async function register(req, reply) {
  const { username, password, email } = req.body;

  const existingUser = await authModel.findByUsername(username);
  if (existingUser) {
    return reply.status(400).send({ message: 'Username already taken' });
  }

  const hashedPassword = await authModel.hashPassword(password);
  const newUserId = await authModel.registerUser(username, hashedPassword, email);

  if (!newUserId) {
    return reply.status(500).send({ message: 'Error registering user' });
  }

  return reply.status(201).send({ message: 'User registered successfully', userId: newUserId });
}

async function refreshToken(request, reply) {
  const { refreshToken } = request.body;

  if (!refreshToken) {
    return reply.code(401).send({ message: 'Refresh token required' });
  }

  try {
    const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = jwt.sign(
      { id: userData.id, username: userData.username },
      process.env.SECRET_KEY,
      { expiresIn: '30m' }
    );

    return reply.send({ accessToken: newAccessToken });
  } catch (err) {
    return reply.code(401).send({ message: 'Invalid refresh token' });
  }
}

module.exports = {
  login,
  register,
  refreshToken
};