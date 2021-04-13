const functions = require("firebase-functions");
const firebase = require('firebase-admin');
const express = require('express');
const cors = require('cors');

firebase.initializeApp();


/**
 * 
 * @param {*} uid 
 * @returns 
 */
function getAvatar(uid) {
    return `https://firebasestorage.googleapis.com/v0/b/pyro-chat.appspot.com/o/avatars%2F${uid}.gif?alt=media`
}


/**
 * 
 * @param {*} res 
 * @param {*} error 
 */
async function returnError(res, error) {
    const err = error || 'Unexpected error';

    res.status(200).send('ERROR: ' + err);
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


/**
 * 
 */
const api_cdn = express();
const main_cdn = express();

main_cdn.use(cors());
main_cdn.use('/', api_cdn);

exports.cdn = functions.https.onRequest(api_cdn);

api_cdn.get('/:folder/:name', (req, res) => {
    const folder_name = req.params.folder;
    const file_name = req.params.name;

    const verified_folder = ['avatars'];

    if (!folder_name) return returnError(res, 'Folder name not specified');
    if (!verified_folder.includes(folder_name)) return returnError('Specified folder does not exist');
    if (!file_name) return returnError(res, 'File name not specified');

    return res.status(200).send(`https://firebasestorage.googleapis.com/v0/b/pyro-chat.appspot.com/o/${folder_name}%2F${file_name}.gif?alt=media`);
});