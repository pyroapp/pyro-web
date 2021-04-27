const functions = require("firebase-functions");
const firebase = require('firebase-admin');

firebase.initializeApp();

/**
 * 
 * @param {*} uid 
 * @returns 
 */
function getAvatar(uid) {
    return `https://firebasestorage.googleapis.com/v0/b/pyro-production.appspot.com/o/avatars%2F${uid}.gif?alt=media`;
}


/**
 * This listens for new message documents, it will grab the recipients
 * of the message and their corresponding FCM (Firebase Cloud Messaging)
 * tokens.
 */
exports.notifications = functions.firestore.document('/channels/{channelId}/messages/{messageId}').onWrite((change, context) => {
    const { author: { id, username }, content, channel_id, recipients } = change.after.data();

    recipients.forEach(recipient => {

        // Setup notification content
        const payload = {
            notification: {
                title: username,
                body: content,
                click_action: `https://pyrochat.app/channels/@me/${channel_id}/`,
                icon: getAvatar(id),
            },
            data: {
                channel_id: channel_id.toString(),
            },
        };

        firebase.messaging().sendToDevice(recipient.token, payload); // Send notification
    });

    return true;
});