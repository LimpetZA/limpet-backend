const dbAdapter = require('../../db/DatabaseAdapter')

module.exports = {
  Entry: {
    species: async (root, args, context, info) => {
      //console.log(root)
      if(root.species) {
        let name = root.species.name
        let doc = await dbAdapter.getDoc('species', { name })
        return doc ? doc : { name: `Unknown (${root.species.name})` }
      }
      return  { species: { name: 'Unknown'  } }
    },

    site: async (root, args, context, info) => {
      if(root.site && root.site._id) {
        return root.site
      }

      const name = root.site.siteName
      const data = await dbAdapter.getDoc('sites', {
        siteName: name
      })
      return data
    },

    zone: async (root, args, context, info) => {
      const id = root.id
      if (root.zone) return root.zone
      const {
        zone
      } = await dbAdapter.getDoc("entries", root)
      return zone
    },

    comments: async ({comments, _id}) => {
      if(comments) {
        return comments
      }

      return await dbAdapter.getDoc('entries', { _id }).comments
    },

    count: ({ count }) => count || 0
  }
}