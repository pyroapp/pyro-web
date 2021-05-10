//? ------------------------------------------------------------------------------------
//?
//?  /app/messages/receive.js
//?  Pyro Chat
//?
//?  Developed by Pyro Communications LLC
//?  Copyright (c) 2021 Pyro Communications LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


/**
 * 
 * @param {*} channel_id 
 */
 async function loadPrivateMessages(channel_id) {
    const listener = firebase.firestore().collection('channels').doc(channel_id).collection('messages').where('channel_id', '==', channel_id).orderBy('timestamp', 'desc').limit(INITIAL_MESSAGE_FETCH).onSnapshot(snapshot => {
        const messages = [];

        snapshot.docChanges().forEach(async change => {
            const { type, doc: message } = change;
 
            // Not entirely sure why but if you delete messages it will add the first
            // message from the listener and add it again. Probably because it has a limit
            // of 50 and it is making sure the list always has 50 messages...
            if (type === 'added') messages.push(message);
            if (type === 'removed') deleteMessageFromList(message, channel_id);
            if (type === 'modified') {
                editMessageInList(message);
                CACHED_MESSAGES[message.id] = message.data();
            }
        });

        messages.reverse();
        loadMessagesInList(channel_id, messages);
    });

    CACHED_CHAT_LISTENERS[channel_id] = listener;
}


/**
 * 
 * @param {*} messages 
 */
 function loadMessagesInList(channel_id, messages) {
    messages.forEach(message => {
        let { author: { id: author_uid }, timestamp, attachment, content, edited_timestamp } = message.data();

        // If the timestamp of the message being loaded is before the timestamp of the previous message
        if (LAST_MESSAGE_TIMESTAMP[channel_id] > timestamp) return;

        const { username, flags } = CACHED_USERS[author_uid];
        const { long, short } = formatMessageTime(timestamp);

        const customTag = flags.includes('DEVELOPER') ? userTag('Developer') : '';
        const attachmentEmbed = attachment ? generateAttachmentEmbed(attachment) : '';
        const isEdited = edited_timestamp ? `<span class="edited-3sfAzf">(edited)</span>` : '';

        const div = document.createElement('div');
        div.id = `message-${message.id}`;
        div.setAttribute('channel', channel_id);
        div.setAttribute('author_uid', author_uid);

        const messageList = document.getElementById(`messages-${channel_id}`);

        if (!messageList.lastChild || messageList.lastChild.getAttribute('author_uid') !== author_uid) {
            div.className = 'message-2qnXI6 cozyMessage-3V1Y8y wrapper-2a6GCs cozy-3raOZG zalgo-jN1Ica groupStart-23k01U';

            div.innerHTML = `
                <div class="groupStartSeparator-kq2kfn"></div>
                <div class="contents-2mQqc9">
                    <img src="${getAvatar(author_uid)}" class="avatar-1BDn8e clickable-1bVtEA">
                    <h2 class="header-23xsNx"><span class="headerText-3Uvj1Y"><span class="username-1A8OIy clickable-1bVtEA">${username}</span>${customTag}</span><span class="timestamp-3ZCmNB"><span><i class="separator-2nZzUB"> — </i>${long}</span></span></h2>
                    <div class="markup-2BOw-j messageContent-2qWWxC">${content}${isEdited}</div>
                    <div class="container-1ov-mD">${attachmentEmbed}</div>
                </div>
                <div class="buttonContainer-DHceWr"></div>
            `.trim();
        } else {
            div.className = 'message-2qnXI6 cozyMessage-3V1Y8y wrapper-2a6GCs cozy-3raOZG zalgo-jN1Ica';

            div.innerHTML = `
                <div class="contents-2mQqc9">
                    <span class="latin24CompactTimeStamp-2V7XIQ timestamp-3ZCmNB timestampVisibleOnHover-2bQeI4 alt-1uNpEt"><i class="separator-2nZzUB"></i>${short}<i class="separator-2nZzUB"></i></span>
                    <div class="markup-2BOw-j messageContent-2qWWxC">${content}${isEdited}</div>
                    <div class="container-1ov-mD">${attachmentEmbed}</div>
                </div>
                <div class="buttonContainer-DHceWr"></div>
            `.trim();
        }

        messageList.appendChild(div);

        // Show message editing buttons on hover
        div.onmouseenter = () => showMessageEditingButtons(channel_id, message.id, div);

        // Remove the message editing buttons
        div.onmouseleave = () => div.querySelector('.buttonContainer-DHceWr').innerHTML = '';

        LAST_MESSAGE_TIMESTAMP[channel_id] = timestamp;
        CACHED_MESSAGES[message.id] = {
            ...message.data(),
            time: {
                long: long,
                short: short
            }
        }
    });

    scrollToBottom(channel_id);
}