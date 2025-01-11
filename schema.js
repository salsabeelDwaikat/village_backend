const { gql } = require('graphql-tag');

const typeDefs = gql`
  type Admin {
    id: ID!
    name: String!
    image: String!
    
  }

  type Message {
    id: ID!
    sender: String!
    text: String!
    timestamp: String!
  }

  type Image {
    id: ID!
    imageUrl: String!
    description: String!
  }

  input AdminInput {
    name: String!
    image: String!
  }

  input MessageInput {
    sender: String!
    text: String!
    timestamp: String!
  }

  input ImageInput {
    imageUrl: String!
    description: String!
  }

  type Query {
    # Fetch all admins
    admins: [Admin]

    # Fetch a single admin by ID
    admin(id: ID!): Admin

    # Fetch all messages, sorted by timestamp
    messages: [Message]

    # Fetch a single message by ID
    message(id: ID!): Message

    # Fetch all images
    images: [Image]

    # Fetch a single image by ID
    image(id: ID!): Image
  }

  type Mutation {
    # Add a new admin
    addAdmin(input: AdminInput!): Admin

    # Update an existing admin by ID
    updateAdmin(id: ID!, input: AdminInput!): Admin

    # Delete an admin by ID
    deleteAdmin(id: ID!): Admin

    # Add a new message
    addMessage(input: MessageInput!): Message

    # Update an existing message by ID
    updateMessage(id: ID!, input: MessageInput!): Message

    # Delete a message by ID
    deleteMessage(id: ID!): Message

    # Add a new image
    addImage(input: ImageInput!): Image

    # Update an existing image by ID
    updateImage(id: ID!, input: ImageInput!): Image

    # Delete an image by ID
    deleteImage(id: ID!): Image
  }
`;

module.exports = typeDefs;