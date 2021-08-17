'use strict'

const { Schema, model } = require('mongoose')
const { v4: uuid } = require('uuid')

const schema = new Schema({
  discordId: {
    type: String,
    index: true,
  },
  alias: {
    type: String,
    minLength: 1,
    maxLength: 32,
    required: true,
  },
  editorId: {
    type: String,
    default: uuid,
  }
})

module.exports = model('User', schema)
