'use strict'

require('dotenv').config() // Loads local .env file if it exists

const db = require('./lib/db')
const { Client } = require('discord.js')

const client = new Client()
const handleMsg = require('./commands')(client)

client.on('message', handleMsg)

client.once('ready', () => {
  client.user.setActivity(process.env.ACTIVITY)
  console.log(`[${client.user.tag}]: Logged in`)
})

/**
 * Entrypoint for the script.
 */
async function start() {
  try {
    await Promise.all([
      db.connect(),
      client.login(process.env.DISCORD_TOKEN),
    ])
  } catch (err) {
    if (err.code === 'TOKEN_INVALID') {
      console.error('Failed to login to discord.')
    }

    console.error(err)
    process.exit(1)
  }
}

start()
