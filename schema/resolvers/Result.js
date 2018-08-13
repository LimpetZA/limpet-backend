const dbAdapter = require('../../db/DatabaseAdapter')

module.exports = {
  Result: {
    __resolveType: (root, context, info) => {
      if(root.reason) {
        return 'Error'
      } else {
        return 'Token'
      }
    }
  }
}