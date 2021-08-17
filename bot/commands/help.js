'use strict'

module.exports = {
  name: 'help',
  match (op) {
    return op === 'h' || op === 'help'
  },

  async run ({ channel }) {
    const helpMsg = `
\`\`\`
${process.env.PREFIX} alias [alias] - Set alias for your sections of the montage. Default is discord tag. No argument will return your current alias.
${process.env.PREFIX} link - Get a montage editor link for your user.
${process.env.PREFIX} help - This help message right here.
\`\`\`
`.trim()

    return channel.send(helpMsg)
  }
}
