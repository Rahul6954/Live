const express = require('express')
const { forgotPassword } = require('../../controllers/User/ForgotPassword')
const { resetPassword } = require('../../controllers/User/ResetPassword')
const { reserPasswordCheckLink } = require('../../controllers/User/ResetPassword')

const router = express.Router()

router.post('/reset-password-email', forgotPassword)
router.post('/reset-password/:emailId/:token', resetPassword)
router.get('/reset-password-check-link/:token', reserPasswordCheckLink)
module.exports = router
