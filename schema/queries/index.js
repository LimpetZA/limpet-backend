'use stict'
const path = require('path');
const fs  = require('fs')

const files = fs.readdirSync(path.join(__dirname, '.'))

const fileContents = files.filter(file => path.extname(file).toLowerCase() === '.gql')
  .map(c => fs.readFileSync(path.join(__dirname,c)).toString())

module.exports = x => fileContents