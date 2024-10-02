const User = require('../../models/user')
const { sendRegistrationEmail } = require('../../configs/email/sendEmail')
const { passwordResetLink } = require('../../configs/PasswordResetLink')

exports.forgotPassword = async (req, res) => {
  const { emailId } = req.body

  try {
    const user = await User.findOne({ emailId: emailId })
    console.log(user)

    if (!user) {
      res.status(404).json({ success: false, msg: 'User not found!' })
    } else {
      const url = passwordResetLink(emailId)
      const subject = 'Password reset from Webvalut'
      const type = 'Password Reset'
      const usr = user.uname
      console.log(url)

      await sendRegistrationEmail(emailId, subject, url, type, usr)
      res.status(200).json({ success: true, msg: 'Message sent!' })
    }
  } catch (err) {
    console.error('Error in forgotPassword:', err) // Log the detailed error
    res.status(500).json({ success: false, msg: 'An error occurred', error: err.message })
  }
}
