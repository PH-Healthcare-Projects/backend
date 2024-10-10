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
    { expiresIn: '1m' }     // Token expires in 1 hour
  );

  // Step 4: Send token back to the client
  return reply.send({ token });
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

module.exports = {
    login,
    register
};
