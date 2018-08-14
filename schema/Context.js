const dbAdapter = require('../db/DatabaseAdapter')

module.exports = async ({req}) => {
  const token = req.headers.authorization || '';

  // try to retrieve a user with the token
  const session = await dbAdapter.getSession(token);

  // add the user to the context
  return { session };
}