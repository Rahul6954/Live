require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const isEmail = require('validator').isEmail

const userSchema = new mongoose.Schema(
  {
    emailId: {
      type: String,
      required: [true, 'Please enter the email'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please enter the password'],
      minlength: [6, 'Minimum length of password should be 6 characters'],
    },
    regMobile: {
      type: Number,
    },
    uname: {
      type: String,
      required: [true, 'Please enter a user name'],
      unique: true,
    },
    isAdmin: {
      type: String,
      default: false,
    },
    role: {
      type: String,
      default: false,
    },
  },
  { timestamps: true },
)

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        emailId: this.email,
        isAdmin: this.isAdmin,
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
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

const User = new mongoose.model('User', userSchema)

module.exports = User
