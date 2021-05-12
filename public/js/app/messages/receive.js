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
    messages.forEach(async message => {
        let { author: { id: author_uid }, timestamp, attachment, content, edited_timestamp, reply_message } = message.data();

        // If the timestamp of the message being loaded is before the timestamp of the previous message
        if (LAST_MESSAGE_TIMESTAMP[channel_id] > timestamp) return;

        const { username, flags } = CACHED_USERS[author_uid];
        const { long, short } = formatMessageTime(timestamp);

        const attachmentEmbed = attachment ? generateAttachmentEmbed(attachment) : '';
        const isEdited = edited_timestamp ? `<span class="edited-3sfAzf">(edited)</span>` : '';

        const div = document.createElement('div');
        div.id = `message-${message.id}`;
        div.setAttribute('channel', channel_id);
        div.setAttribute('author_uid', author_uid);

        const messageList = document.getElementById(`messages-${channel_id}`);

        if (reply_message) {
            const { author: { username: reply_username }, content: reply_content, attachment } = reply_message;
            const replyContent = reply_content || attachment.url || 'Message was deleted.';

            div.className = 'message-2qnXI6 cozyMessage-3V1Y8y wrapper-2a6GCs cozy-3raOZG zalgo-jN1Ica groupStart-23k01U';
    
            div.innerHTML = `
                ${messageList.lastChild.getAttribute('author_uid') === author_uid ? '' : '<div class="groupStartSeparator-kq2kfn"></div>'}
                <div class="contents-2mQqc9">
                    <img src="${getAvatar(author_uid)}" class="avatar-1BDn8e clickable-1bVtEA">
                    <h2 class="header-23xsNx"><span class="headerText-3Uvj1Y"><span class="username-1A8OIy clickable-1bVtEA">${username}</span> replied to <span class="username-1A8OIy clickable-1bVtEA">${reply_username}</span><span class="timestamp-3ZCmNB"><span><div class="separator-2nZzUB"> - </div>${long}</span></span></h2>
                    <div class="repliedMessage-VokQwo">
                        <div class="repliedTextPreview-2NBljf clickable-1bVtEA"><div class="replyBadge-r1su3o"><svg class="replyIcon-1b4Xjp" width="12" height="8" viewBox="0 0 12 8"><path d="M0.809739 3.59646L5.12565 0.468433C5.17446 0.431163 5.23323 0.408043 5.2951 0.401763C5.35698 0.395482 5.41943 0.406298 5.4752 0.432954C5.53096 0.45961 5.57776 0.50101 5.61013 0.552343C5.64251 0.603676 5.65914 0.662833 5.6581 0.722939V2.3707C10.3624 2.3707 11.2539 5.52482 11.3991 7.21174C11.4028 7.27916 11.3848 7.34603 11.3474 7.40312C11.3101 7.46021 11.2554 7.50471 11.1908 7.53049C11.1262 7.55626 11.0549 7.56204 10.9868 7.54703C10.9187 7.53201 10.857 7.49695 10.8104 7.44666C8.72224 5.08977 5.6581 5.63359 5.6581 5.63359V7.28135C5.65831 7.34051 5.64141 7.39856 5.60931 7.44894C5.5772 7.49932 5.53117 7.54004 5.4764 7.5665C5.42163 7.59296 5.3603 7.60411 5.29932 7.59869C5.23834 7.59328 5.18014 7.57151 5.13128 7.53585L0.809739 4.40892C0.744492 4.3616 0.691538 4.30026 0.655067 4.22975C0.618596 4.15925 0.599609 4.08151 0.599609 4.00269C0.599609 3.92386 0.618596 3.84612 0.655067 3.77562C0.691538 3.70511 0.744492 3.64377 0.809739 3.59646Z" fill="currentColor"></path></svg></div>${createTextLinks(replyContent)}</div>
                    </div>
                    <div class="markup-2BOw-j messageContent-2qWWxC">${content}${isEdited}</div>
                    <div class="container-1ov-mD">${attachmentEmbed}</div>
                </div>
                <div class="buttonContainer-DHceWr"></div>
            `.trim();
        } else {
            if (!messageList.lastChild || messageList.lastChild.getAttribute('author_uid') !== author_uid) {
                const customTag = flags.includes('DEVELOPER') ? userTag('Developer') : '';

                div.className = 'message-2qnXI6 cozyMessage-3V1Y8y wrapper-2a6GCs cozy-3raOZG zalgo-jN1Ica groupStart-23k01U';
    
                div.innerHTML = `
                    <div class="groupStartSeparator-kq2kfn"></div>
                    <div class="contents-2mQqc9">
                        <img src="${getAvatar(author_uid)}" class="avatar-1BDn8e clickable-1bVtEA">
                        <h2 class="header-23xsNx"><span class="headerText-3Uvj1Y"><span class="username-1A8OIy clickable-1bVtEA">${username}</span>${customTag}</span><span class="timestamp-3ZCmNB"><span><span class="separator-2nZzUB" style="margin-left: -3px"> - </span>${long}</span></span></h2>
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
        }

        messageList.appendChild(div);

        div.onmouseenter = () => showMessageEditingButtons(channel_id, message.id, div);
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