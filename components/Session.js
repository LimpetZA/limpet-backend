'use strict'

const uuid = require('uuid/v4')

const MONTH = 2.628e9
const WEEK = 6.048e8
const DAY = 8.64e7
const HOUR = 3.6e6


class Session {
  constructor({ token, username, date_expire,  date_issued }) {
    Object.defineProperties(this, {
      token, username, date_expire, date_issued
    })
  }

  expired() {
    return Date.now() > this.date_expire
  }

  renewSession() {
    this.date_expire = Date.now() + WEEK
  }

  static newUserSession(username, { date_issued = Date.now(), date_expire = Date.now() + WEEK }) {
    return new Session({
      token: uuid(),
      username,
      date_issued,
      date_expire,
    })
  }

  toJSON() {
    return {
      token: uuid(),
      username,
      date_issued,
      date_expire
    }
  }
}

Object.defineProperty(Session, 'status', { value: [ 'EXPIRED', 'ACTIVE' ] })

module.exports = Session