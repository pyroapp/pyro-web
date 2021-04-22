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


/**
 * This event fires when the user moves away from the current tab
 * or minimises the current window. 
 * The delay determins how long the user must be away from the current
 * tab to change their status to idle
 */
document.onvisibilitychange = async () => {
    await delay(IDLE_TIMEOUT);
    setAutomaticStatus();
}


/**
 * Sets the users status if its been manually set of the tab
 * is out of focus. It will also make sure the user doesn't
 * get notifications if their status is set to do not disturb 
 * @param {*} override Override Status
 */
 async function setAutomaticStatus(override) {
    
    // If user has a manual status, don't set automatic one
    const ls = window.localStorage;

    if (ls.getItem('manual_status')) {
        toggleNotificationMute(ls.getItem('manual_status') === 'dnd');
        return setStatus(ls.getItem('manual_status'));
    }

    // Check if the tab is in focus or not
    const visState = document.visibilityState;
    let status = 'online';

    if (override) {
        status = override;
    } else {
        if (visState === 'hidden') status = 'idle';
    }

    // Update db
    toggleNotificationMute(status === 'dnd');
    setStatus(status);
}


/**
 * This function sets the status of the user if they have manually
 * set their status using the menu.
 * @param {*} status Status
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

    // Update db
    toggleNotificationMute(status === 'dnd');
    setStatus(status);
}


/**
 * Sets the users status within the database
 * @param {*} status Status
 */
async function setStatus(status) {
    const { uid } = firebase.auth().currentUser;

    await firebase.firestore().collection('users').doc(uid).update({
        status: status
    });
}