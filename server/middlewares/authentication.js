require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user') // Ensure this path is correct

const authentication = async (req, res, next) => {
  const authHeader = req.headers['authorization']

  if (!authHeader) {
    return res.status(403).json({ success: false, msg: 'No token provided' })
  }

  const token = authHeader.split(' ')[1] // Extracting the token without 'Bearer ' prefix

  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET)

      const user = await User.findById(payload.userId)

      if (!user) {
        return res.status(403).json({ success: false, msg: 'User not found' })
      }

      req.user = user // Store the entire user object in req.user
      next()
    } catch (err) {
      console.error('Token verification error:', err)
      return res.status(403).json({ success: false, msg: 'Invalid token' })
    }
  } else {
    return res.status(403).json({ success: false, msg: 'No token provideds' })
  }
}

module.exports = authentication
