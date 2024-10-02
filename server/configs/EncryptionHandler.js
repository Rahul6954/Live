require('dotenv').config()
const Cryptr = require('cryptr')
const { models } = require('mongoose')

const key = process.env.CRYPTO_SECRET
const cryptr = new Cryptr(key)

const encrypt = inputPassword => {
  return cryptr.encrypt(inputPassword)
}

const decrypt = outputPassword => {
  return cryptr.decrypt(outputPassword)
}

module.exports = {
  encrypt,
  decrypt,
}
