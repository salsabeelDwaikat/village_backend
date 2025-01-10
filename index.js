const dotenv = require('dotenv'); // Import dotenv
dotenv.config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const typeDefs = require('./schema'); // Import your GraphQL schema
const resolvers = require('./resolvers'); // Import your GraphQL resolvers
const User = require('./models/User'); // Import the User model

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow requests from your React app
    credentials: true, // Allow cookies and authentication headers
  })
);
app.use(express.json()); // Parse incoming JSON data

// Debug: Check if MONGODB_URI is loaded
console.log('MONGODB_URI:', process.env.MONGODB_URI);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Function to authenticate the user using the JWT token
const authenticateUser = async (req) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id); // Fetch the user from the database
      return user;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
  return null;
};

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const user = await authenticateUser(req);
    return { user }; // Attach the user to the context
  },
});

// Start Apollo Server and apply middleware to Express app
async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' }); // Set the GraphQL endpoint to /graphql
}

startServer();

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Village Management System API!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`);
});