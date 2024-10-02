const mongoose = require('mongoose')
const siteSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    siteUrl: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: false,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    expireAt: {
      type: Date,
    },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  },
  { timestamps: true },
)

siteSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 })

const Site = mongoose.model('Site', siteSchema)
module.exports = Site
