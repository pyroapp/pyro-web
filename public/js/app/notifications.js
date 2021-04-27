//? ------------------------------------------------------------------------------------
//?
//?  /app/notifications.js
//?  Pyro Chat
//?
//?  Developed by Pyro Communications LLC
//?  Copyright (c) 2021 Pyro Communications LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


/**
 * 
 */
async function enableNotifications() {
    if (isMobile()) return;
    if (isStaging()) return;

    try {
        await messaging.requestPermission();
    
        const token = await messaging.getToken();
        const { uid } = firebase.auth().currentUser;

        await firebase.firestore().collection('users').doc(uid).update({
            fcm_token: token
        });
    } catch (e) {}
}


/**
 * 
 * @param {*} mute 
 */
 async function toggleNotificationMute(mute) {
    const { uid } = firebase.auth().currentUser;

    await firebase.firestore().collection('users').doc(uid).update({
        mute_notifications: mute
    });
}