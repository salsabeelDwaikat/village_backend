const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authResolvers = {
  Mutation: {
    // Sign-up mutation
    signup: async (_, { username, password, role }) => {
      try {
        const user = new User({ username, password, role });
        await user.save();
        const token = user.generateAuthToken(); // Use the method from the User model
        return { token, user };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // Sign-in mutation
    signin: async (_, { username, password }) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          throw new Error('User not found');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          throw new Error('Invalid credentials');
        }

        const token = user.generateAuthToken(); // Use the method from the User model
        return { token, user };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = authResolvers;