const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Message = require('./models/Message');
const Image = require('./models/Image');
require('dotenv').config();

// MongoDB connection string from .env
const MONGO_URI = process.env.MONGO_URI;

// Sample data
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
    await Admin.deleteMany({});
    await Message.deleteMany({});
    await Image.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample data
    await Admin.insertMany(admins);
    await Message.insertMany(messages);
    await Image.insertMany(images);
    console.log('Inserted sample data');

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