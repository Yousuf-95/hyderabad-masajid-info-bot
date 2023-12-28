const commandStartMessage = `Welcome to *Hyderabad Masajid Info Bot*\\!

This bot can help you get Jamaat timings of Masajids in Hyderabad\\.

*List of commands:*

/listareas \\- List available areas`;

const commandStartResponse = {
    text: commandStartMessage,
    parse_mode: 'MarkdownV2'
}

module.exports = { commandStartResponse };