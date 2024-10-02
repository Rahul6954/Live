// router/vault/vaultRouter.js

const express = require('express')
const router = express.Router()
const {
  VaultGeneral,
  VaultCreate,
  VaultData,
  recordEdit,
  VaultDecrypt,
  VaultEncrypt,
  recordDelete,
} = require('../../controllers/Site')

// Define Routes
router.get('/vault-home', VaultGeneral) // General route for vault home
router.post('/vault-create/:clientId', VaultCreate) // Ensure clientId is passed in the route parameters
router.get('/vault-data/:clientId', VaultData) // Get vault data for the given clientId
router.patch('/vault-data/record-edit/:siteId', recordEdit)
router.delete('/vault-data/record-delete/:siteId', recordDelete)

router.post('/vault-decrypt-password', VaultDecrypt)
router.post('/vault-encrypt-password', VaultEncrypt)
module.exports = router
