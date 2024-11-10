const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust path as needed

const authModel = {
  findByUsername: async (username) => {
    try {
      const user = await User.findOne({ where: { username } });
      return user ? user.toJSON() : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  comparePassword: async (enteredPassword, storedPasswordHash) => {
    return bcrypt.compare(enteredPassword, storedPasswordHash);
  },

  registerUser: async (username, hashedPassword, email) => {
    try {
      const newUser = await User.create({
        username,
        password: hashedPassword,
        email,
      });
      return newUser.id; // Return the ID of the newly inserted user
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  hashPassword: async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  },
};

module.exports = authModel;
