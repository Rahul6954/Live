require('dotenv').config()
const User = require('../../models/user')
const jwt = require('jsonwebtoken')

exports.resetPassword = async (req, res) => {
  const { token, emailId } = req.params
  const { password, confirmPassword } = req.body

  if (password !== confirmPassword) {
    return res.status(200).json({ success: false, msg: "Passwords Don't match" })
  }

  const options = { new: true }
  const secret = process.env.EMAIL_JWT_SECRET

  jwt.verify(token, secret, async (err, verifyResp) => {
    if (err) {
      return res.status(403).json({ success: false, msg: 'Token not verified!' })
    } else if (verifyResp) {
      try {
        const user = await User.findOneAndUpdate(
          { emailId: emailId },
          { password: password },
          options,
        )

        if (user) {
          await user.save()
          return res.status(200).json({ success: true, msg: 'Password changed' })
        } else {
          return res.status(404).json({ success: false, msg: 'User not found' })
        }
      } catch (err) {
        return res.status(500).json({ success: false, msg: 'Unsuccessful' })
      }
    }
  })
}

exports.reserPasswordCheckLink = (req, res) => {
  const { token } = req.params
  const secret = process.env.EMAIL_JWT_SECRET

  jwt.verify(token, secret, async (err, payload) => {
    if (err) {
      return res.status(204).json({ success: false, msg: 'Token Expired!' })
    } else {
      const user = await User.findOne({ emailId: payload.sub })
      console.log(user)

      if (!user) {
        return res.status(200).json({ success: false, msg: 'No User' })
      } else {
        return res.status(200).json({ success: true, msg: 'Token Verified!' })
      }
    }
  })
}
