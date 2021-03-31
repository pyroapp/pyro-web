//? ------------------------------------------------------------------------------------
//?
//?  /me/messages.js
//?  Discord JS
//?
//?  Developed by Cooper Beltrami
//?
//?  Project built using designs, graphics and other assets developed by Discord Inc.
//?  Copyright (c) 2021 Cooper Beltrami and Discord Inc. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


/**
 * 
 * @param {*} channelId 
 */
function sendPrivateMessage(channelId) {
    const channel = document.getElementById(channelId);
    const input = channel.querySelectorAll('.messageField')[0];
    const placeholder = channel.querySelectorAll('.placeholder-37qJjk')[0];

    const message = input.innerHTML;

    const { uid } = firebase.auth().currentUser;
    const ref = firebase.firestore().collection('private_messages').doc(channelId);

    ref.set({
        [generateId()]: {
            author: uid,
            content: message,
            timestamp: new Date().toISOString(),
        }
    }, {
        merge: true
    });

    // Remove all child node content
    while (input.childNodes.length > 0) {
        input.firstChild.remove();
    }

    placeholder.classList.remove('hidden');
}


/**
 * 
 * @param {*} messages 
 * @param {*} channelId 
 * @returns 
*/
let lastMessage = { author: null };

function loadPrivateMessages(messages, channelId) {
    const messageArray = [];

    if (!messages) return;

    for (messageId in messages) {
        const messageDOM = document.getElementById(`private-message-${messageId}`);

        // If message doesn't already exist in the DOM
        if (!messageDOM) {

            messageArray.push({
                ...messages[messageId],
                id: messageId,
            });   
        }
    }

    // Sort messages by timestamp
    messageArray.sort(sortObjectByKey('timestamp'));

    messageArray.forEach(message => {
        const { content, author, timestamp } = message;
        const { username } = CACHED_USERS[author];

        const isToday = moment(timestamp).isSame(moment(), "day");
        const isYesterday = moment(timestamp).isSame(moment().subtract(1, 'day'), "day");

        let formattedTime = moment(timestamp).format('dd/mm/yy');
        let messageClass = 'groupStart-23k01U';

        if (isToday) formattedTime = 'Today at ' + moment(timestamp).format('hh:mm A');
        if (isYesterday) formattedTime = 'Yesterday at ' + moment(timestamp).format('hh:mm A');

        if (lastMessage.author == author) {
            formattedTime = moment(timestamp).format('hh:mm A');
            messageClass = '';
        }

        const div = document.createElement('div');

        div.className = 'message-2qnXI6 cozyMessage-3V1Y8y wrapper-2a6GCs cozy-3raOZG zalgo-jN1Ica ' + messageClass;
        div.id = `private-message-${message.id}`;
        div.setAttribute('channel', channelId);

        if (lastMessage.author === author) {
            div.innerHTML = `
                <div class="contents-2mQqc9">
                    <span class="latin24CompactTimeStamp-2V7XIQ timestamp-3ZCmNB timestampVisibleOnHover-2bQeI4 alt-1uNpEt"><i class="separator-2nZzUB"></i>${formattedTime}<i class="separator-2nZzUB"></i></span>
                    <div class="markup-2BOw-j messageContent-2qWWxC">${content}</div>
                </div>
            `.trim();
        } else {
            div.innerHTML = `
                <div class="contents-2mQqc9">
                    <img src="${getAvatar(author)}" class="avatar-1BDn8e clickable-1bVtEA">
                    <h2 class="header-23xsNx"><span class="headerText-3Uvj1Y"><span class="username-1A8OIy clickable-1bVtEA">${username}</span></span><span class="timestamp-3ZCmNB"><span><i class="separator-2nZzUB"> — </i>${formattedTime}</span></span></h2>
                    <div class="markup-2BOw-j messageContent-2qWWxC">${content}</div>
                </div>
            `;
        }

        lastMessage = message;

        const privateMessageList = document.getElementById(`private-message-list-${channelId}`);

        privateMessageList.appendChild(div);
        div.scrollIntoView();
    });
}