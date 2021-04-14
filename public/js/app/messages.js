//? ------------------------------------------------------------------------------------
//?
//?  /app/messages.js
//?  Pyro Chat
//?
//?  Developed by Robolab LLC
//?  Copyright (c) 2021 Robolab LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


/**
 * 
 * @param {*} channelId 
 */
 function sendPrivateMessage(channel_id) {
    const channel = document.getElementById(channel_id);
    const input = channel.querySelectorAll('.messageField')[0];
    const placeholder = channel.querySelectorAll('.placeholder-37qJjk')[0];

    const message = input.innerHTML.trim();

    if (!message) return;

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
        attachments: [],
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
let lastMessage = { author: { id: null } };

function loadMessage(message) {
    const { content, embeds, author: { id: author }, timestamp, channel_id } = message.data();
    const { username, flags } = CACHED_USERS[author];

    const isToday = moment(timestamp).isSame(moment(), "day");
    const isYesterday = moment(timestamp).isSame(moment().subtract(1, 'day'), "day");

    let formattedTime = moment(timestamp).format('DD/MM/YYY');
    let messageClass = 'groupStart-23k01U';

    if (isToday) formattedTime = 'Today at ' + moment(timestamp).format('hh:mm A');
    if (isYesterday) formattedTime = 'Yesterday at ' + moment(timestamp).format('hh:mm A');

    if (lastMessage.author.id == author) {
        formattedTime = moment(timestamp).format('hh:mm A');
        messageClass = '';
    }

    const div = document.createElement('div');

    div.className = 'message-2qnXI6 cozyMessage-3V1Y8y wrapper-2a6GCs cozy-3raOZG zalgo-jN1Ica ' + messageClass;
    div.id = `private-message-${message.id}`;
    div.setAttribute('channel', channel_id);

    if (lastMessage.author.id === author) {
        div.innerHTML = `
            <div class="contents-2mQqc9">
                <span class="latin24CompactTimeStamp-2V7XIQ timestamp-3ZCmNB timestampVisibleOnHover-2bQeI4 alt-1uNpEt"><i class="separator-2nZzUB"></i>${formattedTime}<i class="separator-2nZzUB"></i></span>
                ${content ? `<div class="markup-2BOw-j messageContent-2qWWxC">${parseText(content)}</div>` : ""}${embeds ? parseEmbeds(embeds) : ""}
            </div>
        `.trim();
    } else {
        let customTag = '';

        const isStaff = flags.includes('STAFF');
        const isContributer = flags.includes('CONTRIBUTER');
        
        // Select the highest flag option using waterfall
        if (isContributer) customTag = userTag('Contributer');
        if (isStaff) customTag = userTag('Staff');
        
        div.innerHTML = `
            <div class="contents-2mQqc9">
                <img src="${getAvatar(author)}" class="avatar-1BDn8e clickable-1bVtEA">
                <h2 class="header-23xsNx"><span class="headerText-3Uvj1Y"><span class="username-1A8OIy clickable-1bVtEA">${username}</span>${customTag}</span><span class="timestamp-3ZCmNB"><span><i class="separator-2nZzUB"> — </i>${formattedTime}</span></span></h2>
                ${content ? `<div class="markup-2BOw-j messageContent-2qWWxC">${parseText(content)}</div>` : ""}${embeds ? parseEmbeds(embeds) : ""}
            </div>
        `;
    }

    lastMessage = message.data();

    document.getElementById(`private-message-list-${channel_id}`).appendChild(div);
    div.scrollIntoView();

}


/**
 * 
 * @param {*} content 
 * @returns 
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

document.body.onclick = e => {
    if (e.target.className === "spoilerText-3p6IlD hidden-HHr2R9") {
        e.target.className = "spoilerText-3p6IlD";
    }
};