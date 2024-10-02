// router/vault/vaultRouter.js

const express = require('express');
const router = express.Router();
const {
  ClientGeneral,
  ClientCreate,
  ClientData,
  recordEdit,
  recordDelete,
} = require('../../controllers/Client');

// Define Routes
router.get('/client-home', ClientGeneral);
router.post('/client-create', ClientCreate);
router.get('/client-data/', ClientData);
router.patch('/record-edit/:clientId', recordEdit);
router.delete('/record-delete/:clientId', recordDelete);

module.exports = router;
