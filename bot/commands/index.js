'use strict'

const fs = require('fs')
const path = require('path')

// Load all commands at startup
const commands = fs.readdirSync(__dirname, { withFileTypes: true })
  .filter(file => /(?<!index)\.js$/.test(file.name) && !file.isDirectory())
  .map(file => require(path.join(__dirname, file.name)))

module.exports = (client) => {
  return async function handleMsg(msg) {
    const words = msg.content.match(/^(\S+)(?: (.+))?$/) // alphanumeric characters separated by whitespace, 1st group prefix, 2nd group args
    const args = (words?.[2] || '').split(' ').filter(e => e)
    const op = args.shift() || '' // e.g. !prefix op args <=== pulls whatever op is

    // If valid prefix, find matching command and execute
    if (words?.[1] === process.env.PREFIX) {
      let cmd

      for (let i = 0; i < commands.length && !cmd; ++i) {
        if (commands[i].match(op, args)) {
          cmd = commands[i]
        }
      }

      if (cmd) {
        try {
          await cmd.run(msg, args)
        } catch (err) {
          console.log(`Command [${cmd.name}] failed`, err)
        }
      }
    }
  }
}
