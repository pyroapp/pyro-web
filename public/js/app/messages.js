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

    const { url, type, name } = attachment;
    let image = null;
    let video = null;

    // If attachment is an image
    if (type.split('/')[0] === 'image') {
        image = `
            <div class="messageAttachment-1aDidq">
                <img alt="${name}" src="${url}"></a>
            </div>
        `;
    }

    if (type.split('/')[0] === 'video') {
        video = `
            <div class="imageWrapper-2p5ogY embedWrapper-lXpS3L" style="width: 168px; height: 300px;">
                <div class="wrapperPaused-19pWuK wrapper-2TxpI8" data-fullscreen="false" style="width: 168px; height: 300px;">
                    <div class="metadata-13NcHb">
                        <div class="metadataContent-3c_ZXw">
                            <div class="metadataName-14STf-">Snapchat-1918857419.mp4</div>
                            <div class="metadataSize-2UOOLK">2.44 MB</div>
                        </div>
                        <a aria-label="Download" class="anchor-3Z-8Bb anchorUnderlineOnHover-2ESHQB metadataDownload-1fk90V" href="https://cdn.discordapp.com/attachments/751379237809815562/839339772840509450/Snapchat-1918857419.mp4" rel="noreferrer noopener" target="_blank">
                            <svg class="metadataIcon-2FyCKU" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M16.293 9.293L17.707 10.707L12 16.414L6.29297 10.707L7.70697 9.293L11 12.586V2H13V12.586L16.293 9.293ZM18 20V18H20V20C20 21.102 19.104 22 18 22H6C4.896 22 4 21.102 4 20V18H6V20H18Z"></path>
                            </svg>
                        </a>
                    </div>
                    <video class="video-8eMOth" playsinline="" height="300" poster="https://media.discordapp.net/attachments/751379237809815562/839339772840509450/Snapchat-1918857419.mp4?format=jpeg&amp;width=151&amp;height=270" preload="metadata" width="168" src="https://cdn.discordapp.com/attachments/751379237809815562/839339772840509450/Snapchat-1918857419.mp4"></video>
                    <div class="playCenter-Fe8u3X flexCenter-3_1bcw flex-1O1GKY justifyCenter-3D2jYp alignCenter-1dQNNs">
                        <div class="wrapper-129saQ">
                            <div class="iconWrapperActive-12kkfE iconWrapper-21idzA" tabindex="0" aria-label="Play" role="button">
                                <svg class="iconPlay-2kgvwV icon-3ZFEtL" aria-hidden="false" width="16" height="16" viewBox="0 0 24 24">
                                    <polygon fill="currentColor" points="0 0 0 14 11 7" transform="translate(7 5)"></polygon>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="playPausePop-RnpJoM" style="opacity: 0;">
                        <svg class="playPausePopIcon-p-D8VH" aria-hidden="false" width="16" height="16" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M0,14 L4,14 L4,0 L0,0 L0,14 L0,14 Z M8,0 L8,14 L12,14 L12,0 L8,0 L8,0 Z" transform="translate(6 5)"></path>
                        </svg>
                    </div>
                </div>
            </div>
        `;
    }

    const div = document.createElement('div');

    div.className = 'message-2qnXI6 cozyMessage-3V1Y8y wrapper-2a6GCs cozy-3raOZG zalgo-jN1Ica ' + messageClass;
    div.id = `private-message-${message.id}`;
    div.setAttribute('channel', channel_id);

    if (LAST_MESSAGE_AUTHOR_ID[channel_id] === author) {
        div.innerHTML = `
            <div class="contents-2mQqc9">
                <span class="latin24CompactTimeStamp-2V7XIQ timestamp-3ZCmNB timestampVisibleOnHover-2bQeI4 alt-1uNpEt"><i class="separator-2nZzUB"></i>${formattedTime}<i class="separator-2nZzUB"></i></span>
                ${content ? `<div class="markup-2BOw-j messageContent-2qWWxC">${parseText(content)}</div>` : ""} ${embeds ? parseEmbeds(embeds) : ""} ${image ? image : ''}
            </div>
        `.trim();
    } else {
        const customTag = flags.includes('DEVELOPER') ? userTag('Developer') : '';

        div.innerHTML = `
            <div class="contents-2mQqc9">
                <img src="${getAvatar(author)}" class="avatar-1BDn8e clickable-1bVtEA">
                <h2 class="header-23xsNx"><span class="headerText-3Uvj1Y"><span class="username-1A8OIy clickable-1bVtEA">${username}</span>${customTag}</span><span class="timestamp-3ZCmNB"><span><i class="separator-2nZzUB"> — </i>${formattedTime}</span></span></h2>
                ${content ? `<div class="markup-2BOw-j messageContent-2qWWxC">${parseText(content)}</div>` : ""} ${embeds ? parseEmbeds(embeds) : ""} ${image ? image : ''}
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