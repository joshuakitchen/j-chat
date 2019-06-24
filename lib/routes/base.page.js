'use strict'

const path = require('path')

const staticify = require('staticify')(path.join(__dirname, '../../static'))

module.exports = (req, res, next) => {
  res.render('index', {
    getVersionedPath: staticify.getVersionedPath
  })
}
