//? ------------------------------------------------------------------------------------
//?
//?  /app/keybinds.js
//?  Pyro Chat
//?
//?  Developed by Pyro Communications LLC
//?  Copyright (c) 2021 Pyro Communications LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------

const channels = document.querySelectorAll('*id^="channel"');
const channelID = channels.childNodes;
let index = 0;

channels.forEach(channel => {
    channelID.push(channel.id.replace('channel-', ''));
});

// Scrolling Channels
document.addEventListener('keydown', (e) => {
    const amountofchannels = channelID.length;

    if (e.ctrlKey && e.shiftKey && e.key == 'ArrowUp') {
        loadChannelFromId(channelID[index]);
        index = index + 1;
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'ArrowDown') {
        loadChannelFromId(channelID[index]);
        index = index - 1;
    }
    if (index >= amountofchannels) {
        index = 0;
    }
    if (index < 0) {
        index = 0;
    }
})

//
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key == 'U') {
        console.log("Wut should I do next")
    }
})