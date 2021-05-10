//? ------------------------------------------------------------------------------------
//?
//?  /app/messages/send.js
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
 * Type:
 * 0 - Message
 * 1 - Attachment
 * 2 - Embed
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
    let type = 0;

    if (!message && !file) return;

    const { uid } = firebase.auth().currentUser;
    const recipients = generateRecipientsList(channel_id);

    // Parse message content
    message = parseEmojis(message);
    message = parseText(message);

    if (file) type = 1;

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
        type: 0,
        timestamp: new Date().toISOString()
    });

    resetMessageInput(channel_id, input);
}



/**
 * 
 * @param {*} input 
 */
function resetMessageInput(channel_id, input) {
    const channel = document.getElementById(channel_id);
    const placeholder = channel.querySelectorAll('.placeholder-37qJjk')[0];

    // Remove all child node content
    while (input.childNodes.length > 0) {
        input.firstChild.remove();
    }

    placeholder.classList.remove('hidden');
}