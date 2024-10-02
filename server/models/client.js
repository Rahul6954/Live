require('dotenv').config()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const clientSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: [true, 'Please enter the Client Name'],
    },
    expireAt: {
      type: Date,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Use ObjectId to reference User
  },
  { timestamps: true },
)

// JWT generation
clientSchema.methods.generateTokens = async function () {
  try {
    return jwt.sign(
      {
        label: this._id.toString(),
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '30d',
      },
    )
  } catch (error) {
    console.error(error)
  }
}

// TTL Index for expireAt
clientSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 })

const Client = mongoose.model('Client', clientSchema)
module.exports = Client
