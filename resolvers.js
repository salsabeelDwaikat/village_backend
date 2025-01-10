const User = require('./models/User');
const Village = require('./models/Village');
const Population = require('./models/Population');

const resolvers = {
  Query: {
    // Authentication
    me: async (_, __, context) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      return context.user;
    },

    // Villages
    villages: async () => {
      try {
        const villages = await Village.find();
        return villages;
      } catch (error) {
        throw new Error('Failed to fetch villages');
      }
    },

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

    // Population
    populationByVillage: async (_, { villageId }) => {
      try {
        const populationData = await Population.find({ villageId });
        return populationData;
      } catch (error) {
        throw new Error('Failed to fetch population data');
      }
    },

    // Overview
    populationData: async () => {
      try {
        const villages = await Village.find();
        return villages.map(village => ({
          name: village.name,
          population: village.population,
        }));
      } catch (error) {
        throw new Error('Failed to fetch population data');
      }
    },

    ageDistribution: async () => {
      try {
        const ageGroups = await Population.aggregate([
          { $group: { _id: '$ageGroup', total: { $sum: '$count' } } },
        ]);
        return ageGroups.map(group => ({
          ageGroup: group._id,
          total: group.total,
        }));
      } catch (error) {
        throw new Error('Failed to fetch age distribution data');
      }
    },

    genderRatio: async () => {
      try {
        const genders = await Population.aggregate([
          { $group: { _id: '$gender', total: { $sum: '$count' } } },
        ]);
        return genders.map(gender => ({
          gender: gender._id,
          total: gender.total,
        }));
      } catch (error) {
        throw new Error('Failed to fetch gender ratio data');
      }
    },

    mapData: async () => {
      try {
        const villages = await Village.find();
        return villages.map(village => ({
          name: village.name,
          coordinates: village.coordinates,
        }));
      } catch (error) {
        throw new Error('Failed to fetch map data');
      }
    },
  },

  Mutation: {
    // Authentication
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

    // Villages
    addVillage: async (_, { name, population, landArea, urbanAreas, coordinates }) => {
      try {
        const village = new Village({ name, population, landArea, urbanAreas, coordinates });
        await village.save();
        return village;
      } catch (error) {
        throw new Error('Failed to add village');
      }
    },

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

    // Population
    addPopulationData: async (_, { villageId, ageGroup, gender, count }) => {
      try {
        const populationData = new Population({ villageId, ageGroup, gender, count });
        await populationData.save();
        return populationData;
      } catch (error) {
        throw new Error('Failed to add population data');
      }
    },

    updatePopulationData: async (_, { id, updates }) => {
      try {
        const populationData = await Population.findByIdAndUpdate(id, updates, { new: true });
        if (!populationData) {
          throw new Error('Population data not found');
        }
        return populationData;
      } catch (error) {
        throw new Error('Failed to update population data');
      }
    },

    deletePopulationData: async (_, { id }) => {
      try {
        const populationData = await Population.findByIdAndDelete(id);
        if (!populationData) {
          throw new Error('Population data not found');
        }
        return populationData;
      } catch (error) {
        throw new Error('Failed to delete population data');
      }
    },
  },
};

module.exports = resolvers;