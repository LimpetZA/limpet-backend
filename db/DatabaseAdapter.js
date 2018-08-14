'use strict'

const MongoClient = require('mongodb').MongoClient
const uuid = require('uuid/v4')

const Session = require('../components/Session')

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

  async getSession(token) {
    const { db } = this
    let session = {}

    const sessionCol = db.collection('session')
    let sessionDoc = await sessionCol.findOne({ token })

    if(sessionDoc) {
      session = new Session(sessionDoc)

      if(session.expired()) {
        await sessionCol.findOneAndDelete({token}, {})
        session = { status: Session.status.EXPIRED }
      }
    }

    return { session }
  }

  async getDoc(collectionName, query) {
    const { db } = this
    const col = db.collection(collectionName)
    const docs = await col.findOne(query)
    return docs
  }

  async getDocs(collectionName, query) {
    const { db } = this
    //const 
    const col = db.collection(collectionName)
    const docs = await col.find(query).toArray()
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