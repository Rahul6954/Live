const Site = require('../../models/site') // Ensure correct model is imported
const Client = require('../../models/client')
const mongoose = require('mongoose')
const { encrypt, decrypt } = require('../../configs/EncryptionHandler')

// GET api/vault-home
const VaultGeneral = (req, res) => {
  res.status(200).json({ success: true, msg: 'Hi There from Vault Home' })
}

// Custom error handler
const handleErrors = err => {
  let errors = { label: '' }

  if (err.code === 11000) {
    if (err.message.includes('label')) {
      errors.label = 'The Site already exists!'
    }
    return errors
  }

  if (err.message.includes('Site validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }

  return errors
}

// POST api/vault/create/:clientId
const VaultCreate = async (req, res) => {
  const { siteUrl, label, password, notes } = req.body
  const { clientId } = req.params // Getting clientId from request parameters
  const encryptedPassword = encrypt(password)

  const site = new Site({
    siteUrl: siteUrl,
    label: label,
    password: encryptedPassword,
    notes: notes,
    client: new mongoose.Types.ObjectId(clientId), // Associate with clientId
  })

  console.log(site)
  try {
    const clientExists = await Client.findById(clientId)
    console.log(clientExists)

    if (!clientExists) {
      // If no client found with the given clientId, return an error
      return res
        .status(404)
        .json({ success: false, msg: 'Client not found. Please create a client first.' })
    }
    await site.save()
    res.status(201).json({
      success: true,
      siteUrl: siteUrl,
      label: label,
      password: encryptedPassword,
      notes: notes,
      client: new mongoose.Types.ObjectId(clientId),
    })
  } catch (err) {
    const errors = handleErrors(err)
    res.status(401).json({ success: false, errors })
    console.log(err)
  }
}

// GET api/vault/data/:clientId
const VaultData = async (req, res) => {
  const { clientId } = req.params // Get clientId from URL params
  try {
    if (!mongoose.Types.ObjectId.isValid(clientId)) {
      return res.status(400).json({ success: false, msg: 'Invalid client ID.' })
    }
    const sites = await Site.find({ client: new mongoose.Types.ObjectId(clientId) }) // Only fetch non-deleted clients
    res.status(200).json({ success: true, sites: sites })
  } catch (err) {
    res.status(404).json({ success: false, msg: 'An error occurred' })
  }
}

// PUT api/vault/edit/:siteId
const recordEdit = async (req, res) => {
  const { siteId } = req.params
  console.log('SiteId ', siteId)

  const updates = req.body

  const options = { new: true }
  try {
    const site = await Site.findByIdAndUpdate(siteId, updates, options)
    if (!site) throw new Error('Site not found')
    res.status(200).send(site)
  } catch (error) {
    res.status(404).json({ success: false, msg: 'No Record Found' })
  }
}

// DELETE api/vault/delete/:siteId
const recordDelete = async (req, res) => {
  const { siteId } = req.params
  console.log(siteId)

  const date = new Date(Date.now() + 6.048e8).toISOString() // 7 days in the future

  const updates = {
    expireAt: date,
    favorite: false,
    deleted: true,
  }

  const site = await Site.findById(siteId)

  if (site) {
    if (site.deleted !== true) {
      try {
        const updatedSite = await Site.findByIdAndUpdate(siteId, updates, { new: true })
        if (!updatedSite) throw new Error('Record not found')
        res.status(200).json({ success: true, msg: 'Record will be deleted in 7 days' })
      } catch (error) {
        res.status(404).json({ success: false, msg: 'Record Not Found!' })
      }
    } else {
      try {
        const deletedSite = await Site.findByIdAndDelete(siteId)
        if (!deletedSite) throw new Error('Record not found')
        res.status(200).json({ success: true, msg: 'Record is permanently deleted' })
      } catch (error) {
        res.status(404).json({ success: false, msg: 'Record Not Found!' })
      }
    }
  }
}

const VaultDecrypt = (req, res) => {
  try {
    let password = req.body.siteObj.password
    const decryptedPassword = decrypt(password)
    res.json({ decryptedPassword }) // Wrap in an object
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, msg: 'Error decrypting password' })
  }
}

// POST api/vault-encrypt-password
const VaultEncrypt = (req, res) => {
  try {
    let password = req.body.siteObj.password
    res.send(encrypt(password))
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  VaultGeneral,
  VaultCreate,
  VaultData,
  recordEdit,
  recordDelete,
  VaultDecrypt,
  VaultEncrypt,
}
