require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./executableSchema'); // Import the executable schema

const app = express();
const PORT = process.env.PORT || 5000;

// Validate required environment variables
if (!process.env.MONGODB_URI) {
  console.error('Missing MONGODB_URI in environment variables.');
  process.exit(1);
}

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI) // Use MONGODB_URI from environment variables
  .then(() => console.log('Successfully connected to the database'))
  .catch((err) => {
    console.error('Error connecting to the database:', err);
    process.exit(1); // Exit if database connection fails
  });

// GraphQL Endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema, // Use the executable schema
    graphiql: true, // Enable GraphiQL for testing
  })
);

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
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

process.on('SIGINT', shutdown); // Handle Ctrl+C
process.on('SIGTERM', shutdown); // Handle termination signal