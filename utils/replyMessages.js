const commandStartMessage = `Welcome to *Hyderabad Masajid Info Bot*\\!

This bot can help you get Jamaat timings of Masajids in Hyderabad\\.

*List of commands:*

/listareas \\- List available areas`;

const commandStartResponse = {
    text: commandStartMessage,
    parse_mode: 'MarkdownV2'
}

function selectedAreaResponse(listOfMasajid) {
    let listOfMasajidInArea = ``;
    let listOfMasajidKeyboard = [];
    for (let i = 0; i < listOfMasajid.length; i++) {
        listOfMasajidInArea += `${listOfMasajid[i].name.includes('-') ? listOfMasajid[i].name.replaceAll('-', '\\-') : listOfMasajid[i].name}\n`;

        listOfMasajidKeyboard.push([
            {
                text: listOfMasajid[i].name
            }
        ])
    }

    const responseMessage = `List of Masajid in *${listOfMasajid[0].area.charAt(0).toUpperCase() + listOfMasajid[0].area.substring(1)}*:\n\n${listOfMasajidInArea}`

    return {
        text: responseMessage,
        reply_markup: JSON.stringify({
            keyboard: listOfMasajidKeyboard,
            one_time_keyboard: true,
        }),
        parse_mode: 'MarkdownV2'
    };
}

function listAreasResponse(listOfMasajid) {

    let listOfAreas = ``;
    let listAreasKeyboard = [];

    for (let i = 0; i < listOfMasajid.length; i++) {
        listOfAreas += `*${i + 1}* \\- ${listOfMasajid[i].charAt(0).toUpperCase() + listOfMasajid[i].substring(1)}\n`;

        listAreasKeyboard.push([
            {
                text: `${listOfMasajid[i].charAt(0).toUpperCase() + listOfMasajid[i].substring(1)}`
            }
        ]);
    }

    const commandListAreasMessage = `List of areas:\n\n${listOfAreas}`;

    const commandListAreasResponse = {
        text: commandListAreasMessage,
        reply_markup: JSON.stringify({
            keyboard: listAreasKeyboard,
            one_time_keyboard: true,
        }),
        parse_mode: 'MarkdownV2',
    }

    return commandListAreasResponse;
}

function jamaatTimingResponse(masjidInfo) {
    let jamaatTimingMessage = ``;

    for (let time in masjidInfo.timing) {
        jamaatTimingMessage += `*${time.charAt(0).toUpperCase() + time.substring(1)}* \\- ${masjidInfo.timing[time]}\n`
    }

    const responseMessage = `Jamaat timing for: *${masjidInfo.name.replaceAll('-', '\\-')}*\n\n${jamaatTimingMessage}`;

    return {
        text: responseMessage,
        parse_mode: 'MarkdownV2'
    }
}

module.exports = { commandStartResponse, listAreasResponse, selectedAreaResponse, jamaatTimingResponse };