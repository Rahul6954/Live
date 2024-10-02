const Client = require('../../models/client.js')
const mongoose = require('mongoose')

// GET api/vault-home
const ClientGeneral = (req, res) => {
  res.status(200).json({ success: true, msg: 'Hi There from Client Home' })
}

// Custom error handler
const handleErrors = err => {
  let errors = { label: '' }

  if (err.code === 11000) {
    if (err.message.includes('label')) {
      errors.label = 'The Client already exists!'
    }
    return errors
  }

  if (err.message.includes('Client validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }

  return errors
}

const ClientCreate = async (req, res) => {
  const { label } = req.body

  const client = new Client({
    label: label,
    user: req.user._id,
  })

  try {
    await client.save()
    res.status(201).json({
      success: true,
      label: label,
      token: await client.generateTokens(),
    })
  } catch (err) {
    const errors = handleErrors(err)
    res.status(401).json({ success: false, errors })
    console.log(err)
  }
}

const ClientData = async (req, res) => {
  try {
    const clients = await Client.find({ user: req.user._id }) // Only fetch non-deleted clients
    res.status(200).json({ success: true, clients: clients })
  } catch (err) {
    res.status(404).json({ success: false, msg: 'An error occurred' })
  }
}

const recordEdit = async (req, res) => {
  const clientId = req.params.clientId
  console.log('Editing Client ID:', clientId) // Log client ID for debugging

  const updates = req.body
  const options = { new: true } // Ensure the updated document is returned

  try {
    // Attempt to update the client document with new data
    const client = await Client.findByIdAndUpdate(clientId, updates, options)

    if (!client) {
      // If no client is found, return an error
      return res.status(404).json({ success: false, msg: 'No Record Found' })
    }

    // Return the updated client data
    res.status(200).json({ success: true, client })
  } catch (error) {
    console.error('Error updating client:', error.message || error)
    res.status(500).json({ success: false, msg: 'Error updating record', error: error.message })
  }
}

const recordDelete = async (req, res) => {
  const clientId = req.params.clientId

  const date = new Date(Date.now() + 6.048e8).toISOString()

  const updates = {
    expireAt: date,
    favorite: false,
    deleted: true,
  }

  const client = await Client.findById(clientId)

  if (client) {
    if (client.deleted !== true) {
      try {
        const updatedClient = await Client.findByIdAndUpdate(clientId, updates, { new: true })
        if (!updatedClient) throw new Error('Record not found')
        res.status(200).json({ success: true, msg: 'Record will be deleted in 7 days' })
      } catch (error) {
        res.status(404).json({ success: false, msg: 'Record Not Found!' })
      }
    } else {
      try {
        const deletedClient = await Client.findByIdAndDelete(clientId)
        if (!deletedClient) throw new Error('Record not found')
        res.status(200).json({ success: true, msg: 'Record is permanently deleted' })
      } catch (error) {
        res.status(404).json({ success: false, msg: 'Record Not Found!' })
      }
    }
  }
}

module.exports = {
  ClientGeneral,
  ClientCreate,
  ClientData,
  recordEdit,
  recordDelete,
}
