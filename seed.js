const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

const mongoose = require('mongoose');
const Village = require('./models/Village');
const Population = require('./models/Population');
const Admin = require('./models/Admin');
const Message = require('./models/Message');
const Image = require('./models/Image');

// MongoDB connection string from .env
const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

// Sample data for villages and population
const villages = [
  { name: 'Jaballa', population: 50000, landArea: 10, urbanAreas: 2, coordinates: { lat: 32.2211, lng: 35.2544 } },
  { name: 'Bett Lahia', population: 75000, landArea: 12, urbanAreas: 3, coordinates: { lat: 32.2311, lng: 35.2644 } },
  // Add more villages...
];

const populations = [
  { villageId: null, ageGroup: '0-18', gender: 'Male', count: 10000 },
  { villageId: null, ageGroup: '0-18', gender: 'Female', count: 9000 },
  { villageId: null, ageGroup: '19-35', gender: 'Male', count: 15000 },
  { villageId: null, ageGroup: '19-35', gender: 'Female', count: 14000 },
  // Add more population data...
];

// Sample data for admins, messages, and images
const admins = [
  { name: 'John Doe', image: 'john.jpg' },
  { name: 'Jane Smith', image: 'jane.jpg' },
];

const messages = [
  { sender: 'Alice', text: 'Hello, world!', timestamp: new Date() },
  { sender: 'Bob', text: 'Hi there!', timestamp: new Date() },
];

const images = [
  { imageUrl: 'image1.jpg', description: 'A beautiful sunset' },
  { imageUrl: 'image2.jpg', description: 'A cute puppy' },
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await Village.deleteMany({});
    await Population.deleteMany({});
    await Admin.deleteMany({});
    await Message.deleteMany({});
    await Image.deleteMany({});
    console.log('Cleared existing data');

    // Insert villages and population data
    const savedVillages = await Village.insertMany(villages);
    populations.forEach(pop => pop.villageId = savedVillages[0]._id); // Assign villageId to population data
    await Population.insertMany(populations);
    console.log('Inserted villages and population data');

    // Insert admins, messages, and images
    await Admin.insertMany(admins);
    await Message.insertMany(messages);
    await Image.insertMany(images);
    console.log('Inserted admins, messages, and images');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1); // Exit with an error code
  }
};

// Run the seed function
seedDatabase();