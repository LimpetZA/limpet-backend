const dbAdapter = require('../../db/DatabaseAdapter')

module.exports = {
  Mutation: {
    addSpecies: async (root, { species }) => {
      //console.log(name)
      const doc = await dbAdapter.getDoc('species', { name: species.name })

      if(doc) {
        console.log(doc)
        return { ...doc, id: doc._id }
      }

      const operations = await dbAdapter.insertDoc('species', { name: species.name  }).ops
      //const id = operations[0]._id
      console.log(species.name)
      return { name: species.name, id: operations[0]._id }
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
      
      return await dbAdapter.getDoc('sites', site)
    },

    createToken: (root, { username, password }) => {
      return (Math.random() - 0.5) > 0 ? { reason: "MATH FAILED", code: "e404", status: 'ERROR' } : { data: "S3cretT0k3n", code: "e200"}
    }
  }
}