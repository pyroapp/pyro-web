//? ------------------------------------------------------------------------------------
//?
//?  /me/messages.js
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

    const message = input.innerHTML;

    const { uid } = firebase.auth().currentUser;
    const ref = firebase.firestore().collection('channels').doc(channel_id).collection('messages').doc(generateId());

    ref.set({
        attachments: [],
        author: uid,
        channel_id: channel_id,
        content: message,
        edited_timestamp: null,
        mention_everyone: false,
        mention_roles: [],
        mentions: [],
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
let lastMessage = {
    author: null
};

async function loadPrivateMessages(channel_id) {
    const ref = firebase.firestore().collection('channels').doc(channel_id).collection('messages');

    const listener = await ref.where('channel_id', '==', channel_id).orderBy('timestamp').limit(50).onSnapshot(snapshot => {
        if (snapshot.empty) return;

        snapshot.docChanges().forEach(change => {
            const { type, doc: message } = change;

            if (type === 'added') {
                const { content, author, timestamp } = message.data();
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
                div.setAttribute('channel', channel_id);

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

                lastMessage = message.data();

                const privateMessageList = document.getElementById(`private-message-list-${channel_id}`);

                privateMessageList.appendChild(div);
                div.scrollIntoView();

                return;
            }
        });
    });

    CACHED_PRIVATE_CHAT_LISTENERS[channel_id] = {
        Unsubscribe: listener,
        Reference: ref,
    };
}