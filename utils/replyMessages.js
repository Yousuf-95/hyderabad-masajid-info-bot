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

function selectedAreaResponse(listOfMasajid) {
    let listOfMasajidInArea = ``;
    for (let i = 0; i < listOfMasajid.length; i++) {
        listOfMasajidInArea += `${listOfMasajid[0].name}\n`;
    }

    const responseMessage = `List of Masajid in ${listOfMasajid[0].area}:\n\n${listOfMasajidInArea}`

    return {
        text: responseMessage,
    };
}

module.exports = { commandStartResponse, commandListAreasResponse, selectedAreaResponse };