module.exports = {
  "path": "_design/"
  "by_site": {
    "map": function (doc) {
      if (doc.site) {
        emit([doc.site.siteName, doc.site.location], doc._id)
      }
    }
  }
}