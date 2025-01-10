const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # User type for authentication
  type User {
    id: ID!
    username: String!
    role: String!
  }

  # AuthPayload type for returning token and user data
  type AuthPayload {
    token: String!
    user: User!
  }

  # Coordinates type for village locations
  type Coordinates {
    lat: Float!
    lng: Float!
  }

  # Village type
  type Village {
    id: ID!
    name: String!
    population: Int!
    landArea: Float!
    urbanAreas: Int!
    coordinates: Coordinates!
  }

  # Population type
  type Population {
    id: ID!
    villageId: ID!
    ageGroup: String!
    gender: String!
    count: Int!
  }

  # PopulationData type for overview queries
  type PopulationData {
    name: String!
    population: Int!
  }

  # AgeDistribution type for overview queries
  type AgeDistribution {
    ageGroup: String!
    total: Int!
  }

  # GenderRatio type for overview queries
  type GenderRatio {
    gender: String!
    total: Int!
  }

  # MapData type for overview queries
  type MapData {
    name: String!
    coordinates: Coordinates!
  }

  # Input types for mutations
  input CoordinatesInput {
    lat: Float!
    lng: Float!
  }

  input VillageUpdates {
    name: String
    population: Int
    landArea: Float
    urbanAreas: Int
    coordinates: CoordinatesInput
  }

  input PopulationUpdates {
    ageGroup: String
    gender: String
    count: Int
  }

  # Queries
  type Query {
    # Authentication
    me: User # Fetch the current authenticated user

    # Villages
    villages: [Village!]! # Fetch all villages
    village(id: ID!): Village # Fetch a single village by ID

    # Population
    populationByVillage(villageId: ID!): [Population!]! # Fetch population data for a specific village

    # Overview
    populationData: [PopulationData!]! # Fetch population data for all villages
    ageDistribution: [AgeDistribution!]! # Fetch age distribution data
    genderRatio: [GenderRatio!]! # Fetch gender ratio data
    mapData: [MapData!]! # Fetch map data (village locations)
  }

  # Mutations
  type Mutation {
    # Authentication
    signup(username: String!, password: String!, role: String!): AuthPayload # Sign up a new user
    signin(username: String!, password: String!): AuthPayload # Sign in an existing user

    # Villages
    addVillage(
      name: String!
      population: Int!
      landArea: Float!
      urbanAreas: Int!
      coordinates: CoordinatesInput!
    ): Village! # Add a new village
    updateVillage(id: ID!, updates: VillageUpdates!): Village! # Update an existing village
    deleteVillage(id: ID!): Village! # Delete a village

    # Population
    addPopulationData(
      villageId: ID!
      ageGroup: String!
      gender: String!
      count: Int!
    ): Population! # Add new population data
    updatePopulationData(id: ID!, updates: PopulationUpdates!): Population! # Update population data
    deletePopulationData(id: ID!): Population! # Delete population data
  }
`;

module.exports = typeDefs;