// Provide resolver functions for your schema fields
const dbAdapter = new (require('../db/DatabaseAdapter'))('limpet_dev_server')

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    getEntry: (root, { id }) => {

    }
  },

  Mutation: {
    addSpecies: (root, { name }) => {
      //console.log(name)
      return { name, id: "123456" }
    },

    addEntry: async (root, { entry }) => {
      const { site, zone, date, observers, species, count, comments } = entry
      const { siteName, location } = site

      const id = await dbAdapter.genID()
      const doc = await dbAdapter.insertDoc(id, { ...entry, type: "entry" })
      //console.log((await dbAdapter.getDoc(id)).data)
      return {...(await dbAdapter.getDoc(id)).data, id}
    },

    addSite: async (root, { site }) => {
      const { name } = site


      const id = await dbAdapter.genID()
      const doc = await dbAdapter.insertDoc(id, { ...site, type: "site" })
      console.log((await dbAdapter.getDoc(id)).data)
      return (await dbAdapter.getDoc(id)).data
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
      const name = info.variableValues.siteName
      const { data } = await dbAdapter.getDocsBySel({ "site": { "siteName": name } }, ["_id", "site"])
      let site = data.docs
      if(site.length && site.length > 1) {
        site = site[0]
      }
      console.log(data)
      return site
    },

    zone: async (root, args, context, info) => {
      const id = root.id
      const { data } = await dbAdapter.getDocsByField("site", info.variableValues.siteName, ["siteName", "location"])
    }
  },


};

module.exports = resolvers


