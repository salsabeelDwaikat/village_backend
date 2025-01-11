const Admin = require('./models/Admin');
const Message = require('./models/Message');
const Image = require('./models/Image');

const resolvers = {
  Query: {
    admins: async () => {
      try {
        return await Admin.find();
      } catch (error) {
        throw new Error('Failed to fetch admins');
      }
    },
    admin: async (_, { id }) => {
      try {
        const admin = await Admin.findById(id);
        if (!admin) {
          throw new Error('Admin not found');
        }
        return admin;
      } catch (error) {
        throw new Error('Failed to fetch admin');
      }
    },
    messages: async () => {
      try {
        return await Message.find().sort({ timestamp: 1 });
      } catch (error) {
        throw new Error('Failed to fetch messages');
      }
    },
    message: async (_, { id }) => {
      try {
        const message = await Message.findById(id);
        if (!message) {
          throw new Error('Message not found');
        }
        return message;
      } catch (error) {
        throw new Error('Failed to fetch message');
      }
    },
    images: async () => {
      try {
        return await Image.find();
      } catch (error) {
        throw new Error('Failed to fetch images');
      }
    },
    image: async (_, { id }) => {
      try {
        const image = await Image.findById(id);
        if (!image) {
          throw new Error('Image not found');
        }
        return image;
      } catch (error) {
        throw new Error('Failed to fetch image');
      }
    },
  },
  Mutation: {
    addAdmin: async (_, { input }) => {
      try {
        const newAdmin = new Admin(input);
        await newAdmin.save();
        return newAdmin;
      } catch (error) {
        throw new Error('Failed to add admin');
      }
    },
    updateAdmin: async (_, { id, input }) => {
      try {
        const updatedAdmin = await Admin.findByIdAndUpdate(id, input, { new: true });
        if (!updatedAdmin) {
          throw new Error('Admin not found');
        }
        return updatedAdmin;
      } catch (error) {
        throw new Error('Failed to update admin');
      }
    },
    deleteAdmin: async (_, { id }) => {
      try {
        const deletedAdmin = await Admin.findByIdAndDelete(id);
        if (!deletedAdmin) {
          throw new Error('Admin not found');
        }
        return deletedAdmin;
      } catch (error) {
        throw new Error('Failed to delete admin');
      }
    },
    addMessage: async (_, { input }) => {
      try {
        const newMessage = new Message(input);
        await newMessage.save();
        return newMessage;
      } catch (error) {
        throw new Error('Failed to add message');
      }
    },
    updateMessage: async (_, { id, input }) => {
      try {
        const updatedMessage = await Message.findByIdAndUpdate(id, input, { new: true });
        if (!updatedMessage) {
          throw new Error('Message not found');
        }
        return updatedMessage;
      } catch (error) {
        throw new Error('Failed to update message');
      }
    },
    deleteMessage: async (_, { id }) => {
      try {
        const deletedMessage = await Message.findByIdAndDelete(id);
        if (!deletedMessage) {
          throw new Error('Message not found');
        }
        return deletedMessage;
      } catch (error) {
        throw new Error('Failed to delete message');
      }
    },
    addImage: async (_, { input }) => {
      try {
        const newImage = new Image(input);
        await newImage.save();
        return newImage;
      } catch (error) {
        throw new Error('Failed to add image');
      }
    },
    updateImage: async (_, { id, input }) => {
      try {
        const updatedImage = await Image.findByIdAndUpdate(id, input, { new: true });
        if (!updatedImage) {
          throw new Error('Image not found');
        }
        return updatedImage;
      } catch (error) {
        throw new Error('Failed to update image');
      }
    },
    deleteImage: async (_, { id }) => {
      try {
        const deletedImage = await Image.findByIdAndDelete(id);
        if (!deletedImage) {
          throw new Error('Image not found');
        }
        return deletedImage;
      } catch (error) {
        throw new Error('Failed to delete image');
      }
    },
  },
};

module.exports = resolvers;