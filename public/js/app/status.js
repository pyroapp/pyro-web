//? ------------------------------------------------------------------------------------
//?
//?  /app/status.js
//?  Pyro Chat
//?
//?  Developed by Pyro Communications LLC
//?  Copyright (c) 2021 Pyro Communications LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


/**
 * This shouldn't change the behavior of notifications as
 * muting notifications is only done when settings automatic
 * or manual status's. This will keep to the last set status
 * which, if dnd, will not be overridden by going offline
 */
window.onunload = async () => {
    setStatus('offline');

    // Update user with the last open channel
    const { uid } = firebase.auth().currentUser;

    await firebase.firestore().collection('users').doc(uid).update({
        last_open_channel: lastPrivateChannelId
    });
}


document.onvisibilitychange = async () => {
    await delay(IDLE_TIMEOUT);
    setAutomaticStatus();
}


/**
 * 
 * @param {*} status 
 */
 async function setAutomaticStatus(override) {
    
    // If user has a manual status, don't set automatic one
    const ls = window.localStorage;

    if (ls.getItem('manual_status')) {
        toggleNotificationMute(ls.getItem('manual_status') === 'dnd');
        return setStatus(ls.getItem('manual_status'));
    }

    const visState = document.visibilityState;
    let status = 'online';

    if (override) {
        status = override;
    } else {
        if (visState === 'hidden') status = 'idle';
    }

    toggleNotificationMute(status === 'dnd');
    setStatus(status);
}


/**
 * 
 * @param {*} status 
 */
async function setManualStatus(status) {
    setStatus(status);

    // If user selects online status, clear existing manual status
    const ls = window.localStorage;

    if (status === 'online') {
        ls.removeItem('manual_status');
    } else {
        ls.setItem('manual_status', status);
    }

    toggleNotificationMute(status === 'dnd');
    setStatus(status);
}


/**
 * 
 * @param {*} status 
 */
async function setStatus(status) {
    const { uid } = firebase.auth().currentUser;

    await firebase.firestore().collection('users').doc(uid).update({
        status: status
    });
}