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
    const messageId = getTime().toString();

    const { uid } = firebase.auth().currentUser;
    const ref = firebase.firestore().collection('private_messages').doc(channelId);

    ref.set({
        [messageId]: {
            author: uid,
            content: message,
            timestamp: messageId,
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
function loadPrivateMessages(messages, channelId) {
    if (!messages) return;

    const messageIds = Object.keys(messages);

    messageIds.sort();

    messageIds.forEach(messageId => {
        const message = document.getElementById(`private-message-${messageId}`);

        if (message) return;

        const { content, author, timestamp } = messages[messageId];
        const pmList = document.getElementById('private-messages-list');
        const { username } = CACHED_USERS[author];
        const formattedTime = moment.unix(timestamp).format('dddd h:mm:ss A');

        const div = document.createElement('div');
        div.className = 'message-2qnXI6 cozyMessage-3V1Y8y groupStart-23k01U wrapper-2a6GCs cozy-3raOZG zalgo-jN1Ica';
        div.id = `private-message-${messageId}`;
        div.setAttribute('channel', channelId);
        div.innerHTML = `
            <div class="contents-2mQqc9">
                <img src="${getAvatar(author)}" class="avatar-1BDn8e clickable-1bVtEA">
                <h2 class="header-23xsNx"><span class="headerText-3Uvj1Y"><span class="username-1A8OIy clickable-1bVtEA">${username}</span></span><span class="timestamp-3ZCmNB"><span><i class="separator-2nZzUB"> — </i>${formattedTime}</span></span></h2>
                <div class="markup-2BOw-j messageContent-2qWWxC">${content}</div>
            </div>
        `;
        
        pmList.appendChild(div);
        div.scrollIntoView();
    });
}