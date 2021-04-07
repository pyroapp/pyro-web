const functions = require("firebase-functions");
const firebase = require('firebase-admin');

firebase.initializeApp();

/**
 * This listens for new message documents. When a new document is received,
 * the user who sent that message is read and their status and messaging
 * token is fetched. Depending on their status it may or may not send the
 * notification to the user.
 */
exports.notifications = functions.firestore.document('/channels/{channelId}/messages/{messageId}').onWrite((change, context) => {
    const { author: { id, username }, content, channel_id, recipients } = change.after.data();

    recipients.forEach(recipient => {

        // Setup notification content
        const payload = {
            notification: {
                title: username,
                body: content,
                click_action: `https://pyro-chat.web.app/channels/@me/${channel_id}`,
                icon: `https://firebasestorage.googleapis.com/v0/b/pyro-chat.appspot.com/o/avatars%2F${id}.gif?alt=media`
            },
            data: {
                channel_id: channel_id,
                author: {
                    id: id,
                    username: username
                },
            },
        };

        firebase.messaging().sendToDevice(recipient.token, payload); // Send notification
    });

    return true;
});