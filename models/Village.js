const mongoose = require('mongoose');

const villageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  population: { type: Number, required: true },
  landArea: { type: Number, required: true }, // in square kilometers
  urbanAreas: { type: Number, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
});

// Static method to find a village by ID
villageSchema.statics.findVillageById = async function (id) {
  return await this.findById(id).exec();
};

// Static method to find all villages
villageSchema.statics.findAllVillages = async function () {
  return await this.find({}).exec();
};

// Static method to add a new village
villageSchema.statics.addVillage = async function (name, population, landArea, urbanAreas, coordinates) {
  const village = new this({ name, population, landArea, urbanAreas, coordinates });
  return await village.save();
};

// Static method to update a village
villageSchema.statics.updateVillage = async function (id, updates) {
  return await this.findByIdAndUpdate(id, updates, { new: true }).exec();
};

// Static method to delete a village
villageSchema.statics.deleteVillage = async function (id) {
  return await this.findByIdAndDelete(id).exec();
};

module.exports = mongoose.model('Village', villageSchema);