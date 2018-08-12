'use strict'
const NodeCouchDb = require('node-couchdb');



class DatabaseAdapter {
  constructor(databaseName) {
    this.couch = new NodeCouchDb()
    Object.defineProperty(this, 'db', { value: null, writable: true})
    Object.defineProperty(this, 'databaseName', { value: databaseName, enumerable: false, writable: false, configurable: false })
  }

  async init() {
    const { couch, db } = this
    this.db = await couch.listDatabases().then(dbs => dbs.filter((v) => v.databaseName !== this.databaseName))

    //does the db even exist?
    if (this.db.length === 0) {
      this.db = await couch.createDatabase(this.databaseName)
    }

    return this.db
  }

  async initViews() {

  }

  async getDoc(id) {
    return await this.couch.get(this.databaseName, id)
  }

  async getDocsByField(field, value, optionalFields) {
    if(!optionalFields) optionalFields = []
    const query = {
      selector: {
        [field]: value
      },
      fields: [field, "_id", ...optionalFields],
    }

    return await this.couch.mango(this.databaseName, query)
  }

  async getDocsBySel(selector, fields) {
    const query = {
      selector,
      fields
    }

    return await this.couch.mango(this.databaseName, query)
  }

  async insertDoc(id,  fields) {
    const { data, headers, status } = await this.couch.insert(this.databaseName, {
      _id: id,
      ...fields
    })

    console.log(data, status)
    return { data, status }
  }

  async updateDoc(id,  fields) {
    const { data, headers, status } = await this.couch.insert(this.databaseName, {
      _id: id,
      ...fields
    })

    console.log(data, status)
    return { data, status }
  }

  async genID() {
    return await this.couch.uniqid().then(ids => ids[0])
  }
}

module.exports = DatabaseAdapter