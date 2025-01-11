const Message = require('../models/Message');

const resolverMessage = {
  Query: {
    // Fetch all messages, sorted by timestamp
    messages: async () => {
      try {
        return await Message.find().sort({ timestamp: 1 });
      } catch (err) {
        throw new Error('Failed to fetch messages: ' + err.message);
      }
    },

    // Fetch a single message by ID
    message: async (_, { id }) => {
      try {
        const message = await Message.findById(id);
        if (!message) {
          throw new Error('Message not found');
        }
        return message;
      } catch (err) {
        throw new Error('Failed to fetch message: ' + err.message);
      }
    },
  },

  Mutation: {
    // Add a new message
    addMessage: async (_, { input }) => {
      try {
        const newMessage = new Message(input);
        await newMessage.save();
        return newMessage;
      } catch (err) {
        throw new Error('Failed to add message: ' + err.message);
      }
    },

    // Update an existing message by ID
    updateMessage: async (_, { id, input }) => {
      try {
        const updatedMessage = await Message.findByIdAndUpdate(id, input, { new: true });
        if (!updatedMessage) {
          throw new Error('Message not found');
        }
        return updatedMessage;
      } catch (err) {
        throw new Error('Failed to update message: ' + err.message);
      }
    },

    // Delete a message by ID
    deleteMessage: async (_, { id }) => {
      try {
        const deletedMessage = await Message.findByIdAndDelete(id);
        if (!deletedMessage) {
          throw new Error('Message not found');
        }
        return deletedMessage;
      } catch (err) {
        throw new Error('Failed to delete message: ' + err.message);
      }
    },
  },
};

module.exports = resolverMessage;