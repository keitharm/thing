'use strict'

const User = require('../models/user')

module.exports = {
  name: 'alias',
  match (op, args) {
    return op === 'alias'
  },

  async run ({ channel, author }, args) {
    const user = await User.findOne({ discordId: author.id }) || new User({ discordId: author.id, alias: author.tag.split('#')[0] })

    if (args.length) {
      user.alias = args.join(' ')
    }

    try {
      await user.save()
    } catch (err) {
      if (err?.errors?.alias?.kind === 'maxlength') {
        return channel.send('Alias can\'t be longer than 16 characters.')
      }
      throw err
    }

    if (!args.length) {
      return channel.send(`Current alias: \`${user.alias}\``)
    }

    return channel.send('Alias updated')
  }
}
