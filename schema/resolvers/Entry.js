const dbAdapter = require('../../db/DatabaseAdapter')

module.exports = {
  Entry: {
    //species: (root, args, context, info) => {
    //  return {
    //    name: "Yes!",
    //    id: "123123"
    //  }
    //},

    site: async (root, args, context, info) => {
      const name = root.site.siteName
      const data = await dbAdapter.getDoc('sites', {
        siteName: name
      })
      return data
    },

    zone: async (root, args, context, info) => {
      const id = root.id
      console.log(root.zone)
      if (root.zone) return root.zone
      const {
        zone
      } = await dbAdapter.getDoc("entries", root)
      return zone
    },
  }
}