'use strict'

const crypto = require('crypto')
const fs = require('fs')

function main() {
  crypto.randomBytes(48, function(err, buffer) {
    if(err) {
      console.error(err)
    } else {
      fs.writeFile('/var/chat.key', buffer.toString('hex'), function(err) {
        if(err) throw err;
        console.log('Saved key')
      })
    }
  })
}

main()
