const dbAdapter = require('../../db/DatabaseAdapter')

module.exports = {
  Query: {
    getEntries: async (root, { entryQuery }, context, info) => {
      let docs = await dbAdapter.getDocs('entries', entryQuery)
      console.log(entryQuery)
      return docs
    },

    getAllEntries: async (root, _, context) =>  {
      let docs = await dbAdapter.getDocs('entries', {})
      let { session } = context
      //console.log(docs)

      return docs
    }
  },
}