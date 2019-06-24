'use strict'

module.exports = () => {
  const now = new Date(Date.now())
  return `${now.getDate()}/${now.getMonth()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
}
