const { gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    getEntry(name: String!): Entry
    hello: String
  }

  type Mutation {
    addSpecies(name: String!): Species
    addEntry(entry: EntryInput!): Entry
    addSite(site: SiteInput!): Site
  }

  mutation addSpecies($name: String!) {
    species: Species
    status: Status
  }

  input EntryInput {
    site: SiteInput
    zone: String!
    date: Int
    observers: [String]
    species: String!
    scribe: String
    count: Int
    comments: String
  }

  input SiteInput {
    siteName: String!
    location: String
  }

  enum Status {
    OK
    ERROR
  }

  enum Zone {
    HIGH
    MID
    LOW
  }

  type Species {
    id: ID
    name: String!
  }

  type Site {
    siteName: String!
    location: String
  }

  type Entry {
    site: Site!
    zone: Zone!
    """
    Date is unix time
    """
    date: Int
    observers: [String]
    species: Species!
    scribe: String
    count: Int
    comments: String
  }
`;

module.exports = typeDefs