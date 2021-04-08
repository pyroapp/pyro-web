//? ------------------------------------------------------------------------------------
//?
//?  /app/notifications.js
//?  Pyro Chat
//?
//?  Developed by Robolab LLC
//?  Copyright (c) 2021 Robolab LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


/**
 * 
 */
async function enableNotifications() {
    if (isMobile()) return;

    try {
        await messaging.requestPermission();
    
        const token = await messaging.getToken();
        const { uid } = firebase.auth().currentUser;

        await firebase.firestore().collection('users').doc(uid).update({
            fcm_token: token
        });
    } catch (e) {}
}