//? ------------------------------------------------------------------------------------
//?
//?  /app/parse_emoji.js
//?  Pyro Chat
//?
//?  Developed by Pyro Communications LLC
//?  Copyright (c) 2021 Pyro Communications LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


/**
 * 
 * @param {*} text 
 * @returns 
 */
 function parseEmojis(text) {
    let oldtext = text;
    let newtext = "";

    while (oldtext.length !== 0) {
        const emoji = findEmoji(oldtext);

        if (oldtext.startsWith("\\") && emoji) {
            oldtext = oldtext.slice(1);
            newtext = newtext + oldtext.slice(0, 1);
            oldtext = oldtext.slice(1);
        } else if (emoji) {
            newtext = newtext + emoji.emoji;
            oldtext = oldtext.slice(emoji.text.length);
        } else {
            newtext = newtext + oldtext.slice(0, 1);
            oldtext = oldtext.slice(1);
        }
    };

    return newtext;
};


/**
 * 
 * @param {*} text 
 * @returns 
 */
function findEmoji(text) {
    for (let [name, emoji] of Object.entries(emojis)) {
        if (text.startsWith(`:${name}:`)) {
            return {
                text: `:${name}:`,
                emoji: emoji
            };
        };
    };

    return null;
};