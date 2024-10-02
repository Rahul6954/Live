require('dotenv').config()
const jwt = require('jsonwebtoken')

const passwordResetLink = emailId => {
  const seccret = process.env.EMAIL_JWT_SECRET
  const payload = {
    sub: emailId,
  }
  const options = {
    expiresIn: process.env.EMAIL_JWT_EXP,
  }
  const token = jwt.sign(payload, seccret, options)
  const link = `${process.env.CLIENT_URL}reset-password/${emailId}/${token}`
  return link
}

module.exports = { passwordResetLink }
