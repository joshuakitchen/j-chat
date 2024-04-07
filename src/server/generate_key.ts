'use strict'

import crypto from 'crypto'
import fs from 'fs'

function main() {
  crypto.randomBytes(48, function (err, buffer) {
    if (err) {
      console.error(err)
    } else {
      fs.writeFileSync('/var/chat.key', buffer.toString('hex'))
    }
  })
}

main()
