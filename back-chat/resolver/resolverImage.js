const Image = require('../models/Image');

const resolverImage = {
  Query: {
    // Fetch all images
    images: async () => {
      try {
        return await Image.find();
      } catch (err) {
        throw new Error('Failed to fetch images: ' + err.message);
      }
    },

    // Fetch a single image by ID
    image: async (_, { id }) => {
      try {
        const image = await Image.findById(id);
        if (!image) {
          throw new Error('Image not found');
        }
        return image;
      } catch (err) {
        throw new Error('Failed to fetch image: ' + err.message);
      }
    },
  },

  Mutation: {
    // Add a new image
    addImage: async (_, { input }) => {
      try {
        const newImage = new Image(input);
        await newImage.save();
        return newImage;
      } catch (err) {
        throw new Error('Failed to add image: ' + err.message);
      }
    },

    // Update an existing image by ID
    updateImage: async (_, { id, input }) => {
      try {
        const updatedImage = await Image.findByIdAndUpdate(id, input, { new: true });
        if (!updatedImage) {
          throw new Error('Image not found');
        }
        return updatedImage;
      } catch (err) {
        throw new Error('Failed to update image: ' + err.message);
      }
    },

    // Delete an image by ID
    deleteImage: async (_, { id }) => {
      try {
        const deletedImage = await Image.findByIdAndDelete(id);
        if (!deletedImage) {
          throw new Error('Image not found');
        }
        return deletedImage;
      } catch (err) {
        throw new Error('Failed to delete image: ' + err.message);
      }
    },
  },
};

module.exports = resolverImage;