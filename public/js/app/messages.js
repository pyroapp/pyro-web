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

        const { fcm_token, status: { code } } = CACHED_USERS[recipient];

        if (code === 'dnd') return; // Don't send notification
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
        content: message,
        edited_timestamp: null,
        mention_everyone: false,
        mention_roles: [],
        mentions: [],
        recipients: recipients,
        pinned: false,
        timestamp: new Date().toISOString(),
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
    .limit(50)
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

    // Get the last document from the previous snapshot to start 
    // the realtime listener from
    const { timestamp: lasttimestamp } = lastmsg.data();

    //  Retreive realtime updates 
    const listener = await firebase.firestore()
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

    CACHED_PRIVATE_CHAT_LISTENERS[channel_id] = {
        Unsubscribe: listener,
    };
}


/**
 * 
 * @param {*} message 
 */
let lastMessage = { author: { id: null } };

function loadMessage(message) {
    const { content, author: { id: author }, timestamp, channel_id } = message.data();
    const { username } = CACHED_USERS[author];

    const isToday = moment(timestamp).isSame(moment(), "day");
    const isYesterday = moment(timestamp).isSame(moment().subtract(1, 'day'), "day");

    let formattedTime = moment(timestamp).format('dd/mm/yy');
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
                <div class="markup-2BOw-j messageContent-2qWWxC">${createTextLinks_(strip(content))}</div>
            </div>
        `.trim();
    } else {
        div.innerHTML = `
            <div class="contents-2mQqc9">
                <img src="${getAvatar(author)}" class="avatar-1BDn8e clickable-1bVtEA">
                <h2 class="header-23xsNx"><span class="headerText-3Uvj1Y"><span class="username-1A8OIy clickable-1bVtEA">${username}</span></span><span class="timestamp-3ZCmNB"><span><i class="separator-2nZzUB"> — </i>${formattedTime}</span></span></h2>
                <div class="markup-2BOw-j messageContent-2qWWxC">${createTextLinks_(strip(content))}</div>
            </div>
        `;
    }

    lastMessage = message.data();

    document.getElementById(`private-message-list-${channel_id}`).appendChild(div);
    div.scrollIntoView();
}

//https://www.labnol.org/code/20294-regex-extract-links-javascript
function createTextLinks_(text) {
    return (text || "").replace(
        /([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi,
            function(match, space, url) {
                let hyperlink = url;
                if (!hyperlink.match('^https?:\/\/')) {
                    hyperlink = 'http://' + hyperlink;
                }
                return space + '<a href="' + hyperlink + '" target="_blank">' + url + '</a>';
        }
    );
};

function strip(html) {
    let tempDiv = document.createElement("DIV");
    tempDiv.innerHTML = html;
    return tempDiv.innerText;
}