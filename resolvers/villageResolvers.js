const Village = require('../models/Village');

const villageResolvers = {
  Query: {
    // Fetch all villages
    villages: async () => {
      try {
        const villages = await Village.find();
        return villages;
      } catch (error) {
        throw new Error('Failed to fetch villages');
      }
    },

    // Fetch a single village by ID
    village: async (_, { id }) => {
      try {
        const village = await Village.findById(id);
        if (!village) {
          throw new Error('Village not found');
        }
        return village;
      } catch (error) {
        throw new Error('Failed to fetch village');
      }
    },
  },

  Mutation: {
    // Add a new village
    addVillage: async (_, { name, population, landArea, urbanAreas, coordinates }) => {
      try {
        const village = new Village({ name, population, landArea, urbanAreas, coordinates });
        await village.save();
        return village;
      } catch (error) {
        throw new Error('Failed to add village');
      }
    },

    // Update an existing village
    updateVillage: async (_, { id, updates }) => {
      try {
        const village = await Village.findByIdAndUpdate(id, updates, { new: true });
        if (!village) {
          throw new Error('Village not found');
        }
        return village;
      } catch (error) {
        throw new Error('Failed to update village');
      }
    },

    // Delete a village
    deleteVillage: async (_, { id }) => {
      try {
        const village = await Village.findByIdAndDelete(id);
        if (!village) {
          throw new Error('Village not found');
        }
        return village;
      } catch (error) {
        throw new Error('Failed to delete village');
      }
    },
  },
};

module.exports = villageResolvers;