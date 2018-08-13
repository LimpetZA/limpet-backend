const dbAdapter = require('../../db/DatabaseAdapter')

module.exports = {
  Query: {
    getEntry: (root, { entry }, context, info) => {

    },
    getAllEntries: async () => (await dbAdapter.getDocs('entries', {})).toArray()

  },
}