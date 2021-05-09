//? ------------------------------------------------------------------------------------
//?
//?  /app/messages.js
//?  Pyro Chat
//?
//?  Developed by Pyro Communications LLC
//?  Copyright (c) 2021 Pyro Communications LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


/**
 * 
 * @param {*} channel_id 
 * @returns 
 */
function generateRecipientsList(channel_id) {
    const { uid } = firebase.auth().currentUser;
    const recipients = [];

    CACHED_RECIPIENTS[channel_id].forEach(recipient => {
        if (uid === recipient) return; // Don't add current user

        const { fcm_token, mute_notifications } = CACHED_USERS[recipient];

        if (mute_notifications) return; // Don't send notification
        if (!fcm_token) return; // User doesn't have notifications enabled

        recipients.push({
            id: recipient,
            token: fcm_token,
        });
    });

    return recipients;
}


/**
 * 
 * @param {*} input 
 * @param {*} channel_id 
 * @param {*} file 
 * @returns 
 */
function sendMessage(input, channel_id, file) {
    const channel = document.getElementById(channel_id);
    const placeholder = channel.querySelectorAll('.placeholder-37qJjk')[0];

    let message = input.innerHTML.trim();

    if (!message && !file) return;

    const { uid } = firebase.auth().currentUser;
    const recipients = generateRecipientsList(channel_id);

    // Parse message content
    message = parseEmojis(message);
    message = parseText(message);

    firebase.firestore().collection('channels').doc(channel_id).collection('messages').doc(generateId()).set({
        attachment: file || null,
        author: {
            id: uid,
            username: CACHED_USERS[uid].username
        },
        channel_id: channel_id,
        content: message,
        edited_timestamp: null,
        mention_everyone: false,
        mention_roles: [],
        mentions: [],
        recipients: recipients,
        pinned: false,
        timestamp: new Date().toISOString()
    });

    // Remove all child node content
    while (input.childNodes.length > 0) {
        input.firstChild.remove();
    }

    placeholder.classList.remove('hidden');
}


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
            if (type === 'modified') editMessageInList(message);
            if (type === 'removed') deleteMessageFromList(message, channel_id);
        });

        messages.reverse();
        loadMessagesInList(messages);
    });

    CACHED_CHAT_LISTENERS[channel_id] = listener;
}


/**
 * 
 * @param {*} timestamp 
 * @returns 
 */
 function formatMessageTime(timestamp) {
    const isToday = moment(timestamp).isSame(moment(), "day");
    const isYesterday = moment(timestamp).isSame(moment().subtract(1, 'day'), "day");

    let long = moment(timestamp).format('MM/DD/YYYY');
    const short = moment(timestamp).format('h:mm A');

    if (isToday) long = moment(timestamp).format('h:mm A');
    if (isYesterday) long = 'Yesterday at ' + moment(timestamp).format('h:mm A');

    return {
        long: long,
        short: short
    };
}


/**
 * 
 * @param {*} message 
 */
function editMessageInList(message) {
    const messageItem = document.getElementById(`message-${message.id}`);
    const messageContent = messageItem.querySelector('.messageContent-2qWWxC');

    const { content } = message.data();

    // We don't have to check if the message_edited timestamp has changed because editing 
    messageContent.innerHTML = `${content}<span class="timestamp-3ZCmNB timestampInline-yHQ6fX"><span class="edited-3sfAzf">(edited)</span></span>`;
}


/**
 * 
 * @param {*} message 
 * @param {*} channel_id 
 */
function deleteMessageFromList(message, channel_id) {
    const messageList = document.getElementById(`messages-${channel_id}`);
    const messageItem = document.getElementById(`message-${message.id}`);
    const messages = Array.prototype.slice.call(messageList.children);

    // If the message is the start of a group
    if (messageItem.classList.contains('groupStart-23k01U')) {

        // Get the next message in the list if it exists.
        const nextMessage = messages[messages.indexOf(messageItem) + 1];

        // No more messages in list or there are no more messages after the current one
        if (messages.length === 1 || !nextMessage) {
            return messageList.removeChild(messageItem);
        }
        
        const message_id = nextMessage.id.split('-')[1];
        const nextMessageContents = nextMessage.querySelector('.contents-2mQqc9');
        const messageContent = nextMessageContents.querySelector('.messageContent-2qWWxC').innerHTML;

        const { author: { id:author_uid }, time: { long } } = CACHED_MESSAGES[message_id];
        const { username, flags } = CACHED_USERS[author_uid];

        const customTag = flags.includes('DEVELOPER') ? userTag('Developer') : '';

        nextMessageContents.innerHTML = `
            <div class="groupStartSeparator-kq2kfn"></div>
            <img src="${getAvatar(author_uid)}" class="avatar-1BDn8e clickable-1bVtEA">
            <h2 class="header-23xsNx"><span class="headerText-3Uvj1Y"><span class="username-1A8OIy clickable-1bVtEA">${username}</span>${customTag}</span><span class="timestamp-3ZCmNB"><span><i class="separator-2nZzUB"> — </i>${long}</span></span></h2>
            <div class="markup-2BOw-j messageContent-2qWWxC">${messageContent}</div>
        `.trim();

        nextMessage.classList.add('groupStart-23k01U');
    }

    messageList.removeChild(messageItem);
}


/**
 * 
 * @param {*} messages 
 */
function loadMessagesInList(messages) {
    messages.forEach(message => {
        let { author: { id: author_uid }, timestamp, channel_id, attachment, content, edited_timestamp } = message.data();

        // If the timestamp of the message being loaded is before the timestamp of the previous message
        if (LAST_MESSAGE_TIMESTAMP[channel_id] > timestamp) return;

        const { username, flags } = CACHED_USERS[author_uid];
        const { long, short } = formatMessageTime(timestamp);

        const customTag = flags.includes('DEVELOPER') ? userTag('Developer') : '';
        const attachmentEmbed = attachment ? generateAttachmentEmbed(attachment) : '';
        const isEdited = edited_timestamp ? `<span class="timestamp-3ZCmNB timestampInline-yHQ6fX"><span class="edited-3sfAzf">(edited)</span></span>` : '';

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
                    <div class="markup-2BOw-j messageContent-2qWWxC">${content}${isEdited}${attachmentEmbed}</div>
                </div>
                <div class="buttonContainer-DHceWr"></div>
            `.trim();
        } else {
            div.className = 'message-2qnXI6 cozyMessage-3V1Y8y wrapper-2a6GCs cozy-3raOZG zalgo-jN1Ica';

            div.innerHTML = `
                <div class="contents-2mQqc9">
                    <span class="latin24CompactTimeStamp-2V7XIQ timestamp-3ZCmNB timestampVisibleOnHover-2bQeI4 alt-1uNpEt"><i class="separator-2nZzUB"></i>${short}<i class="separator-2nZzUB"></i></span>
                    <div class="markup-2BOw-j messageContent-2qWWxC">${content}${isEdited}${attachmentEmbed}</div>
                </div>
                <div class="buttonContainer-DHceWr"></div>
            `.trim();
        }

        messageList.appendChild(div);
        scrollToBottom(channel_id);

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
}


/**
 * 
 * @param {*} channel_id 
 */
function scrollToBottom(channel_id) {
    const messageList = document.getElementById(`messages-${channel_id}`).lastChild;
    
    messageList.scrollIntoView();
}


/**
 * 
 * @param {*} channel_id 
 * @param {*} message_id 
 * @param {*} messageEl 
 * @returns 
 */
function showMessageEditingButtons(channel_id, message_id, messageEl) {
    const { uid } = firebase.auth().currentUser;

    if (messageEl.getAttribute('author_uid') !== uid) return;

    messageEl.querySelector('.buttonContainer-DHceWr').innerHTML = `
        <div class="buttons-cl5qTG container-3npvBV">
            <div class="wrapper-2aW0bm">
                <div class="button-1ZiXG9" id="edit-message">
                    <svg class="icon-LYJorE" width="24" height="24" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.2929 9.8299L19.9409 9.18278C21.353 7.77064 21.353 5.47197 19.9409 4.05892C18.5287 2.64678 16.2292 2.64678 14.817 4.05892L14.1699 4.70694L19.2929 9.8299ZM12.8962 5.97688L5.18469 13.6906L10.3085 18.813L18.0201 11.0992L12.8962 5.97688ZM4.11851 20.9704L8.75906 19.8112L4.18692 15.239L3.02678 19.8796C2.95028 20.1856 3.04028 20.5105 3.26349 20.7337C3.48669 20.9569 3.8116 21.046 4.11851 20.9704Z" fill="currentColor"></path>
                    </svg>
                </div>
                <div class="button-1ZiXG9" id="delete-message">
                    <svg class="icon-LYJorE" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z"></path>
                        <path fill="currentColor" d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z"></path>
                    </svg>
                </div>
            </div>
        </div>
    `.trim();

    document.getElementById('edit-message').onclick = () => showEditMessageUI(channel_id, message_id);
    document.getElementById('delete-message').onclick = () => deleteMessage(channel_id, message_id);
}


/**
 * 
 * @param {*} channel_id 
 * @param {*} message_id 
 */
function showEditMessageUI(channel_id, message_id) {
    console.log(channel_id, message_id);

    // Get the contents of the message
    const message = document.getElementById(`message-${message_id}`);
    const content = message.querySelector('.messageContent-2qWWxC');
    const attachment = message.querySelector('.messageAttachment-1aDidq');

    // Remove message attachment container


    // <div>
    //     <div class="channelTextArea-3bF57p channelTextArea-2VhZ6z">
    //         <div class="scrollableContainer-2NUZem webkit-HjD9Er">
    //             <div class="inner-MADQqc">
    //                 <div class="textArea-12jD-V textAreaSlate-1ZzRVj slateContainer-3Qkn2x" style="height: 43px;">
    //                     <div contenteditable="true" class="markup-2BOw-j slateTextArea-1Mkdgw fontSize16Padding-3Wk7zP textAreaWithoutAttachmentButton-qiaiTB" style="outline: none; white-space: pre-wrap; overflow-wrap: break-word; -webkit-user-modify: read-write-plaintext-only;"><div data-slate-object="block" data-key="135" style="position: relative;"><span data-slate-object="text" data-key="136"><span data-slate-leaf="true" data-offset-key="136:0"><span data-slate-string="true">plz help<br></span></span></span></div></div></div><div class="buttons-3JBrkn"><div class="buttonContainer-28fw2U"><button tabindex="0" aria-label="Select emoji" type="button" class="emojiButtonNormal-TdumYh emojiButton-3uL3Aw emojiButton-pET4wH button-318s1X button-38aScr lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN"><div class="contents-18-Yxp"><div class="sprite-2iCowe" style="background-position: -88px -22px; background-size: 242px 110px; transform: scale(1); filter: grayscale(100%);"></div></div></button></div></div></div></div></div><div class="operations-36ENbA">escape to <a class="anchor-3Z-8Bb anchorUnderlineOnHover-2ESHQB" role="button" tabindex="0">cancel</a> • enter to <a class="anchor-3Z-8Bb anchorUnderlineOnHover-2ESHQB" role="button" tabindex="0">save</a></div></div>
}


/**
 * 
 * @param {*} message_id 
 * @param {*} newcontent 
 */
function editMessage(channel_id, message_id, newcontent) {
    firebase.firestore().collection('channels').doc(channel_id).collection('messages').doc(message_id).update({
        content: newcontent
    });
}


/**
 * 
 * @param {*} channel_id 
 * @param {*} message_id 
 */
function deleteMessage(channel_id, message_id) {
    firebase.firestore().collection('channels').doc(channel_id).collection('messages').doc(message_id).delete();
}


/**
 * Shows a verified user tag with the specified content
 * @param {*} content Tag Content
 * @returns HTML for tag
 */
function userTag(content) {
    return `<span class="botTag-3W9SuW botTagRegular-2HEhHi botTag-2WPJ74 px-10SIf7"><svg class="botTagVerified-1klIIt" width="16" height="16" viewBox="0 0 16 15.2"><path d="M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z" fill="currentColor"></path></svg><span class="botText-1526X_">${content}</span></span>`;
}


/**
 * If the user clicks on a spoiler on the page it will reveal the text beneath
 */
document.body.onclick = e => {
    if (e.target.className === "spoilerText-3p6IlD hidden-HHr2R9") {
        e.target.className = "spoilerText-3p6IlD";
    }
};