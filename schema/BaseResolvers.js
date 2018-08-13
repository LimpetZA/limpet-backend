// Provide resolver functions for your schema fields
const dbAdapter = require('../db/DatabaseAdapter')

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    getEntry: (root, { entry }, context, info) => {

    },
    getAllEntries: async () => (await dbAdapter.getDocs('entries', {})).toArray()
    
  },

  Mutation: {
    addSpecies: (root, { name }) => {
      //console.log(name)
      return { name, id: "123456" }
    },

    addEntry: async (root, { entry }) => {
      const { site, zone, date, observers, species, count, comments } = entry
      const { siteName, location } = site

      const doc = await dbAdapter.insertDoc('entries', {  site, zone, date, observers, species, count, comments })
      //console.log(doc)
      return await dbAdapter.getDoc('entries', entry)
    },

    addSite: async (root, { site }) => {
      const { name } = site

      const doc = await dbAdapter.insertDoc('sites', { ...site })
      //console.log(await dbAdapter.getDoc('sites', doc))
      return await dbAdapter.getDoc('sites', site)
    }
  },

  Entry: {
    species: (root, args, context, info) => {
      //console.log(root, args, context, info.variableValues.name)
      //dbAdapter.
      return { name: "Yes!", id: "123123" }
    },

    site: async (root, args, context, info) => {
      //console.log(root, args, context, info)
      const name = root.site.siteName
      //console.log(await dbAdapter.getDoc('sites', { siteName: name }))
      const data = await dbAdapter.getDoc('sites', {  siteName: name })
      //console.log(data)
      return data
    },

    zone: async (root, args, context, info) => {
      const id = root.id
      console.log(root.zone)
      if(root.zone) return root.zone
      const { zone } = await dbAdapter.getDoc("entries", root)
      return zone
    }
  },


};

module.exports = resolvers


