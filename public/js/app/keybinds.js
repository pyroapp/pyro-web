//? ------------------------------------------------------------------------------------
//?
//?  /app/keybinds.js
//?  Pyro Chat
//?
//?  Developed by Pyro Communications LLC
//?  Copyright (c) 2021 Pyro Communications LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------

function getChannels() {
    const channels = document.querySelectorAll('*[id^="channel"]');

    const channelID = [];

    channels.forEach(channel => {
        channelID.push(channel.id.replace('channel-', ''));
    });

    return channelID;
}

let index = 0;

// Scrolling Channels
document.addEventListener('keydown', (e) => {
    const channelID = getChannels();

    const amountOfChannels = channelID.length;

    if (e.altKey && e.key == 'ArrowDown') {
        index += 1;
    }

    if (e.altKey && e.key == 'ArrowUp') {
        index -= 1;
    }

    if (index > amountOfChannels - 1) {
        index = 0;
    }

    if (index < 0) {
        index = amountOfChannels - 1; 
    }

    loadChannelFromId(channelID[index]);
});

//
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key == 'U') {
        console.log("Wut should I do next")
    }
});

// F-keybinds
document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key == 'F1') { // web browsers will lead to their support page with just f1. 
        // Might be able to implement this functionality in the desktop version.
        window.open("https://pyrochat.app/support")
    }
});