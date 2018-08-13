const { gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`

  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    getEntry(name: String!): Entry
    getAllEntries: [Entry]
    hello: String
  }

  type Mutation {
    addSpecies(name: String!): Species
    addEntry(entry: EntryInput!): Entry
    addSite(site: SiteInput!): Site

    createToken(username: String!, password: String!): Result!

  }

  union Result = Token | Error

  scalar Date

  type Error {
    status: Status
    reason: String!
    code: Code
  }

  type Token {
    data: String!
    expiry: Date
    code: Code
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

  enum Code {
    e200
    e400
    e404
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
    _id: ID
    site: Site!
    zone: Zone!
    """
    Date is unix time
    """
    date: Date
    observers: [String]
    species: Species!
    scribe: String
    count: Int
    comments: String
  }

  type User {
    _id: ID
    username: String!
    email: String!
    firstName: String
    lastName: String
  }
`;

module.exports = typeDefs