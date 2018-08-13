'use strict'

const NodeCouchDb = require('node-couchdb')
const nano = require('nano')
const MongoClient = require('mongodb').MongoClient
const uuid = require('uuid/v4')

class DatabaseAdapter {
  constructor() {
    this.url = 'mongodb://localhost:27017'
    Object.defineProperty(this, 'db', { value: null, writable: true, enumerable: false})
  }

  async init(databaseName) {
    const { url } = this
    Object.defineProperty(this, 'databaseName', { value: databaseName, enumerable: false, writable: false, configurable: false })

    this.db = (await MongoClient.connect(url, { useNewUrlParser: true })).db(databaseName)

    return this.db
  }

  async initViews() {

  }

  async getDoc(collectionName, query) {
    const { db } = this
    const col = db.collection(collectionName)
    const docs = await col.findOne(query)
    return docs
  }

  async getDocs(collectionName, query) {
    const { db } = this
    const col = db.collection(collectionName)
    const docs = await col.find(query)
    return docs
  }

  async insertDoc(collectionName, data) {
    const { db } = this
    const col = db.collection(collectionName)
    const id = uuid()
    return await col.insertOne({
     // _id: id,
      ...data
    })
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
    return uuid()
  }
}

module.exports = new DatabaseAdapter()