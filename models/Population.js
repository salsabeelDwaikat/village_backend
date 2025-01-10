const mongoose = require('mongoose');

const populationSchema = new mongoose.Schema({
  villageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Village', required: true },
  ageGroup: { type: String, required: true }, // e.g., "0-18", "19-35", etc.
  gender: { type: String, required: true }, // e.g., "Male", "Female"
  count: { type: Number, required: true },
});

// Static method to find population data by villageId
populationSchema.statics.findByVillageId = async function (villageId) {
  return await this.find({ villageId }).exec();
};

// Static method to add new population data
populationSchema.statics.addPopulationData = async function (villageId, ageGroup, gender, count) {
  const populationData = new this({ villageId, ageGroup, gender, count });
  return await populationData.save();
};

// Static method to update population data
populationSchema.statics.updatePopulationData = async function (id, updates) {
  return await this.findByIdAndUpdate(id, updates, { new: true }).exec();
};

// Static method to delete population data
populationSchema.statics.deletePopulationData = async function (id) {
  return await this.findByIdAndDelete(id).exec();
};

module.exports = mongoose.model('Population', populationSchema);