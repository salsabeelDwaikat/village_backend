const Village = require('../models/Village');
const Population = require('../models/Population');

const overviewResolvers = {
  Query: {
    // Get population data by village
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

    // Get age distribution data
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

    // Get gender ratio data
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

    // Get map data (village locations)
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
};

module.exports = overviewResolvers;