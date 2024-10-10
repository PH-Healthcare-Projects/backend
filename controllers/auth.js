const authModel = require('../models/authModel')
const jwt = require('jsonwebtoken');

async function login (req, reply) {
  const { username, password } = req.body;

  // Step 1: Find user by username
  const user = await authModel.findByUsername(username);
  if (!user) {
    return reply.status(401).send({ message: 'Invalid credentials' });
  }

  // Step 2: Compare entered password with stored hashed password
  const isValidPassword = await authModel.comparePassword(password, user.password);
  if (!isValidPassword) {
    return reply.status(401).send({ message: 'Invalid credentials' });
  }

  // Step 3: Generate JWT token
  //const token = req.server.jwt.sign({ id: user.id, username: user.username });

  // If login is successful, sign a JWT token with an expiry
  const token = jwt.sign(
    { id: user.id, username: user.username }, 
    process.env.SECRET_KEY, // Use your secret key
    { expiresIn: '30m' }     // Token expires in 1 hour
  );

  // Create Refresh Token (expires in 7 days)
  const refreshToken = jwt.sign(
    { id: user.id, username: user.username }, 
    process.env.JWT_REFRESH_SECRET,  // You need another secret for refresh tokens
    { expiresIn: '7d' }   // Longer lifespan
  );


  // Step 4: Send token back to the client
  return reply.send({ token, refreshToken });
}

async function register (req, reply) {
  const { username, password, email } = req.body;

  // Step 1: Check if the username already exists
  const existingUser = await authModel.findByUsername(username);
  if (existingUser) {
    return reply.status(400).send({ message: 'Username already taken' });
  }

  // Step 2: Hash the password
  const hashedPassword = await authModel.hashPassword(password);

  // Step 3: Save the new user in the database
  const newUserId = await authModel.registerUser(username, hashedPassword, email);
  if (!newUserId) {
    return reply.status(500).send({ message: 'Error registering user' });
  }

  // Step 4: Send success response
  return reply.status(201).send({ message: 'User registered successfully', userId: newUserId });
}

async function refreshToken (request, reply) {
  const { refreshToken } = request.body;  // Get refresh token from request body

  if (!refreshToken) {
    return reply.code(401).send({ message: 'Refresh token required' });
  }

  try {
    // Verify the refresh token with the refresh token secret
    const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Generate a new access token (expires in 15 minutes)
    const newAccessToken = jwt.sign(
      { id: userData.id, username: userData.username }, 
      process.env.SECRET_KEY, 
      { expiresIn: '15m' }
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
