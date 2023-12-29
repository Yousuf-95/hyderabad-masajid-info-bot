const commandStartMessage = `Welcome to *Hyderabad Masajid Info Bot*\\!

This bot can help you get Jamaat timings of Masajids in Hyderabad\\.

*List of commands:*

/listareas \\- List available areas`;

const commandStartResponse = {
    text: commandStartMessage,
    parse_mode: 'MarkdownV2'
}

const commandListAreasMessage = `List of areas with number of Masajids:

1 \\- *Tolichowki*`;

const commandListAreasReplyKeyboard = [
    [
        { text: 'Tolichowki' },
    ]
];

const commandListAreasResponse = {
    text: commandListAreasMessage,
    reply_markup: JSON.stringify({
        keyboard: commandListAreasReplyKeyboard,
        one_time_keyboard: true,
    }),
    parse_mode: 'MarkdownV2',
}

module.exports = { commandStartResponse, commandListAreasResponse };