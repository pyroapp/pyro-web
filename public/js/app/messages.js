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
 * @param {*} channelId 
 */
 function sendPrivateMessage(channel_id, file) {
    const channel = document.getElementById(channel_id);
    const input = channel.querySelectorAll('.messageField')[0];
    const placeholder = channel.querySelectorAll('.placeholder-37qJjk')[0];

    let message = input.innerHTML.trim();

    if (!message && !file) return;

    const { uid } = firebase.auth().currentUser;
    const ref = firebase.firestore().collection('channels').doc(channel_id).collection('messages').doc(generateId());

    // Format message recipients
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

    ref.set({
        attachment: file || null,
        author: {
            id: uid,
            username: CACHED_USERS[uid].username
        },
        channel_id: channel_id,
        content: parseEmojis(message),
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
    let chatdiv = document.querySelectorAll(".textArea-12jD-V");
    
    if (chatdiv) {
        if (chatdiv.length !== 0) {
            for (let query of chatdiv) {
                query.style.height = "44px";
            };
        };
    }; 

    // Retreive the initial 50 messages without a realtime listener
    const msgs = [];
    let lastmsg;

    // First setup of messages are retrieved in descending order to get
    // the last 50 messages instead of the first 50
    const messages = await firebase.firestore()
    .collection('channels')
    .doc(channel_id)
    .collection('messages')
    .where('channel_id', '==', channel_id)
    .orderBy('timestamp', 'desc')
    .limit(INITIAL_MESSAGE_FETCH)
    .get();

    // Reverses the messages again to set them back into
    // chronological order
    messages.forEach(message => {
        msgs.push(message);
    });

    msgs.reverse();

    msgs.forEach(msg => {
        loadMessage(msg);
        lastmsg = msg;
    });

    if (lastmsg) {
        // Get the last document from the previous snapshot to start 
        // the realtime listener from
        const { timestamp: lasttimestamp } = lastmsg.data();

        //  Retreive realtime updates 
        const listener = firebase.firestore()
        .collection('channels')
        .doc(channel_id)
        .collection('messages')
        .where('channel_id', '==', channel_id)
        .orderBy('timestamp')
        .startAfter(lasttimestamp)
        .onSnapshot(snapshot => {
            if (snapshot.empty) return;

            snapshot.docChanges().forEach(change => {
                const { type, doc: message } = change;

                if (type === 'added') loadMessage(message);
            });
        });

        CACHED_CHAT_LISTENERS[channel_id] = listener;
    } else {
        //  Retreive realtime updates 
        const listener = firebase.firestore()
        .collection('channels')
        .doc(channel_id)
        .collection('messages')
        .where('channel_id', '==', channel_id)
        .orderBy('timestamp')
        .onSnapshot(snapshot => {
            if (snapshot.empty) return;

            snapshot.docChanges().forEach(change => {
                const { type, doc: message } = change;

                if (type === 'added') loadMessage(message);
            });
        });

        CACHED_CHAT_LISTENERS[channel_id] = listener;
    }
}


/**
 * 
 * @param {*} message 
 */
function loadMessage(message) {
    const { embeds, author: { id: author }, timestamp, channel_id, attachment } = message.data();
    let { content } = message.data();
    const { username, flags } = CACHED_USERS[author];

    const isToday = moment(timestamp).isSame(moment(), "day");
    const isYesterday = moment(timestamp).isSame(moment().subtract(1, 'day'), "day");

    let formattedTime = moment(timestamp).format('DD/MM/YYYY');
    let messageClass = 'groupStart-23k01U';

    if (isToday) formattedTime = 'Today at ' + moment(timestamp).format('h:mm A');
    if (isYesterday) formattedTime = 'Yesterday at ' + moment(timestamp).format('h:mm A');

    if (LAST_MESSAGE_AUTHOR_ID[channel_id] === author) {
        formattedTime = moment(timestamp).format('h:mm A');
        messageClass = '';
    }

    let file = null;

    if (attachment) {
        let { url, type, name, size } = attachment;

        size = bytesToSize(size);

        // If attachment is an image
        if (type.split('/')[0] === 'image') {
            file = `<div class="messageAttachment-1aDidq" style="margin-top: -18px;"><img alt="${name}" src="${url}" style="border-radius: 4px; max-width: 45%;" /></div>`.trim();
        } else if (type.split('/')[0] === 'video') {
            file = `<div class="messageAttachment-1aDidq"><video style="max-width: 300px; border-radius: 4px;" controls><source src="${url}" type="${type}" /></video></div>`.trim();
        } else if (type.split('/')[0] === 'audio') {
            file = `<div class="messageAttachment-1aDidq"><video style="max-width: 300px; border-radius: 4px;" controls><source src="${url}" type="${type}" /></video></div>`.trim();
        } else {
            file = `<div class="messageAttachment-1aDidq"><div class="attachment-33OFj0 horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG alignCenter-1dQNNs embedWrapper-lXpS3L"><img class="icon-1kp3fr" src="/img/985ea67d2edab4424c62009886f12e44.svg" alt="${name}"><div class="attachmentInner-3vEpKt"><div class="filenameLinkWrapper-1-14c5"><a class="anchor-3Z-8Bb anchorUnderlineOnHover-2ESHQB fileNameLink-9GuxCo" href="${url}" rel="noreferrer noopener" target="_blank">${name}</a></div><div class="metadata-3WGS0M size12-3R0845 height16-2Lv3qA">${size}</div></div><a href="${url}" class="anchor-3Z-8Bb anchorUnderlineOnHover-2ESHQB downloadWrapper-vhAtLx" target="_blank"><svg class="downloadButton-23tKQp" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M16.293 9.293L17.707 10.707L12 16.414L6.29297 10.707L7.70697 9.293L11 12.586V2H13V12.586L16.293 9.293ZM18 20V18H20V20C20 21.102 19.104 22 18 22H6C4.896 22 4 21.102 4 20V18H6V20H18Z"></path></svg></a></div></div>`.trim();
        }
    }

    const div = document.createElement('div');

    div.className = 'message-2qnXI6 cozyMessage-3V1Y8y wrapper-2a6GCs cozy-3raOZG zalgo-jN1Ica ' + messageClass;
    div.id = `private-message-${message.id}`;
    div.setAttribute('channel', channel_id);

    if (LAST_MESSAGE_AUTHOR_ID[channel_id] === author) {
        div.innerHTML = `
            <div class="contents-2mQqc9">
                <span class="latin24CompactTimeStamp-2V7XIQ timestamp-3ZCmNB timestampVisibleOnHover-2bQeI4 alt-1uNpEt"><i class="separator-2nZzUB"></i>${formattedTime}<i class="separator-2nZzUB"></i></span>
                <div class="markup-2BOw-j messageContent-2qWWxC">${embeds ? parseEmbeds(embeds) : ''}${file ? file : ''}${content ? `${parseText(content)}` : ''}</div>
            </div>
        `.trim();
    } else {
        const customTag = flags.includes('DEVELOPER') ? userTag('Developer') : '';

        div.innerHTML = `
            <div class="contents-2mQqc9">
                <img src="${getAvatar(author)}" class="avatar-1BDn8e clickable-1bVtEA">
                <h2 class="header-23xsNx"><span class="headerText-3Uvj1Y"><span class="username-1A8OIy clickable-1bVtEA">${username}</span>${customTag}</span><span class="timestamp-3ZCmNB"><span><i class="separator-2nZzUB"> — </i>${formattedTime}</span></span></h2>
                <div class="markup-2BOw-j messageContent-2qWWxC">${embeds ? parseEmbeds(embeds) : ''}${file ? file : ''}${content ? `${parseText(content)}` : ''}</div>
            </div>
        `.trim();
    }

    LAST_MESSAGE_AUTHOR_ID[channel_id] = author;

    document.getElementById(`private-message-list-${channel_id}`).appendChild(div);
    div.scrollIntoView();
}


/**
 * Shows a verified user tag with the specified content
 * @param {*} content Tag Content
 * @returns HTML for tag
 */
function userTag(content) {
    return `
        <span class="botTag-3W9SuW botTagRegular-2HEhHi botTag-2WPJ74 px-10SIf7">
            <svg class="botTagVerified-1klIIt" width="16" height="16" viewBox="0 0 16 15.2">
                <path d="M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z" fill="currentColor"></path>
            </svg>
            <span class="botText-1526X_">${content}</span>
        </span>
    `.trim();
}


/**
 * If the user clicks on a spoiler on the page it will reveal the text beneath
 */
document.body.onclick = e => {
    if (e.target.className === "spoilerText-3p6IlD hidden-HHr2R9") {
        e.target.className = "spoilerText-3p6IlD";
    }
};