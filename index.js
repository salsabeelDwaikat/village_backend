require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./executableSchema');

const Village = require('./models/Village');
const Population = require('./models/Population');
const Admin = require('./models/Admin');
const Message = require('./models/Message');
const Image = require('./models/Image');

const app = express();
const PORT = process.env.PORT || 5000;

if (!process.env.MONGODB_URI) {
  console.error('Missing MONGODB_URI in environment variables.');
  process.exit(1);
}

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Successfully connected to the database'))
  .catch((err) => {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  });

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const seedDatabase = async () => {
  try {
    const villages = [
      { name: 'Jaballa', population: 50000, landArea: 10, urbanAreas: 2, coordinates: { lat: 32.2211, lng: 35.2544 } },
      { name: 'Bett Lahia', population: 75000, landArea: 12, urbanAreas: 3, coordinates: { lat: 32.2311, lng: 35.2644 } },
    ];

    const populations = [
      { villageId: null, ageGroup: '0-18', gender: 'Male', count: 10000 },
      { villageId: null, ageGroup: '0-18', gender: 'Female', count: 9000 },
      { villageId: null, ageGroup: '19-35', gender: 'Male', count: 15000 },
      { villageId: null, ageGroup: '19-35', gender: 'Female', count: 14000 },
    ];

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

    await Village.deleteMany({});
    await Population.deleteMany({});
    await Admin.deleteMany({});
    await Message.deleteMany({});
    await Image.deleteMany({});
    console.log('Cleared existing data');

    const savedVillages = await Village.insertMany(villages);
    populations.forEach(pop => pop.villageId = savedVillages[0]._id);
    await Population.insertMany(populations);
    console.log('Inserted villages and population data');

    await Admin.insertMany(admins);
    await Message.insertMany(messages);
    await Image.insertMany(images);
    console.log('Inserted admins, messages, and images');

    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error seeding database:', err);
  }
};

if (process.env.SEED_DB === 'true') {
  seedDatabase().then(() => {
    console.log('Seeding completed. Starting server...');
    startServer();
  });
} else {
  startServer();
}

function startServer() {
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  const shutdown = () => {
    console.log('Shutting down server...');
    server.close(() => {
      console.log('Server shut down.');
      mongoose.connection.close(false, () => {
        console.log('MongoDB connection closed.');
        process.exit(0);
      });
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}