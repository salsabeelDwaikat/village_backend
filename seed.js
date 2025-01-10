const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

const mongoose = require('mongoose');
const Village = require('./models/Village');
const Population = require('./models/Population');

const seedData = async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  // Clear existing data
  await Village.deleteMany();
  await Population.deleteMany();

  // Insert villages
  const villages = [
    { name: 'Jaballa', population: 50000, landArea: 10, urbanAreas: 2, coordinates: { lat: 32.2211, lng: 35.2544 } },
    { name: 'Bett Lahia', population: 75000, landArea: 12, urbanAreas: 3, coordinates: { lat: 32.2311, lng: 35.2644 } },
    // Add more villages...
  ];

  // Save villages to the database
  const savedVillages = await Village.insertMany(villages);

  // Insert population data
  const populations = [
    { villageId: savedVillages[0]._id, ageGroup: '0-18', gender: 'Male', count: 10000 },
    { villageId: savedVillages[0]._id, ageGroup: '0-18', gender: 'Female', count: 9000 },
    { villageId: savedVillages[1]._id, ageGroup: '19-35', gender: 'Male', count: 15000 },
    { villageId: savedVillages[1]._id, ageGroup: '19-35', gender: 'Female', count: 14000 },
    // Add more population data...
  ];

  await Population.insertMany(populations);

  console.log('Database seeded successfully');
  process.exit();
};

seedData();