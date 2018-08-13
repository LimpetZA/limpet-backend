'use strict'

//const baseSchema = require('./BaseSchema')
const types = require('./types')
const mutations = require('./mutations')
const queries = require('./queries')

const resolvers = require('./resolvers')

const baseResolvers = require('./BaseResolvers')
const { makeExecutableSchema } = require('graphql-tools')


module.exports =  makeExecutableSchema({ typeDefs: [types, mutations, queries], resolvers })