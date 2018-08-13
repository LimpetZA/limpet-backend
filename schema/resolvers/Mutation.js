const dbAdapter = require('../../db/DatabaseAdapter')

module.exports = {
  Mutation: {
    addSpecies: async (root, { name }) => {
      //console.log(name)
      const doc = await dbAdapter.getDoc('species', { name })

      if(doc) {
        return { ...doc }
      }

      const operations = await dbAdapter.insertDoc('species', { name }).ops
      const id = operations[0]._id
      return { name,  id }
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
    },

    createToken: (root, { username, password }) => {
      return (Math.random() - 0.5) > 0 ? { reason: "MATH FAILED", code: "e404", status: 'ERROR' } : { data: "S3cretT0k3n", code: "e200"}
    }
  }
}