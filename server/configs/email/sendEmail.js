const nodemailer = require('nodemailer')
const ejs = require('ejs')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'rahulpmali456@gmail.com',
    pass: 'ldan edbk kcbv webp', // Use an App password if 2FA is enabled
  },
})

const sendRegistrationEmail = async (recipent, subject, url, type, usr) => {
  let view

  switch (type) {
    case 'Password Reset':
      view = 'resetPassword'
      break
    case 'Welcome':
      view = 'welcome'
      break
  }

  if (!recipent) {
    console.error('No recipient email address provided.')
    return
  }

  const data = await ejs.renderFile(__dirname + `/template/${view}.ejs`, {
    usr,
    url,
  })

  const mailOptions = {
    from: '"Web Valute" <rahulpmali456@gmail.com>',
    to: recipent,
    subject,
    html: data,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Message sent: %s', info.messageId)
  } catch (error) {
    console.error('Failed to send email:', error)
  }
}

module.exports = { sendRegistrationEmail }
