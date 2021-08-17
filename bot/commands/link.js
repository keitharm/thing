'use strict'

const User = require('../models/user')

const montageUrl = 'https://montage.com'

module.exports = {
  name: 'link',

  match (op) {
    return op === 'link'
  },

  async run ({ channel, author }) {
    const user = await User.findOne({ discordId: author.id }) || new User({
      discordId: author.id,
      alias: author.tag.split('#')[0],
    })

    await user.save() // Noop if new user wasn't created
    channel.send('Link sent')
    return author.send(`${montageUrl}/?id=${user.editorId}`)
  }
}
