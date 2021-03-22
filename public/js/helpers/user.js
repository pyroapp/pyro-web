//? ------------------------------------------------------------------------------------
//?
//?  /helpers/user.js
//?  Discord JS
//?
//?  Developed by Cooper Beltrami
//?
//?  Project built using designs, graphics and other assets developed by Discord Inc.
//?  Copyright (c) 2021 Cooper Beltrami and Discord Inc. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


/**
 * 
 * @param {*} overrideStatus 
 */
async function setAutomaticStatus(overrideStatus) {

    // If user has manual status set, don't automatically set one
    if (window.localStorage.getItem('manual_status')) {
        return setStatus(window.localStorage.getItem('manual_status'));
    };
    
    let status = 'online';

    if (overrideStatus) {
        status = overrideStatus;
    } else {
        if (document.visibilityState === 'hidden') {
            status = 'idle';
        }
    }

    setStatus(status);
}


async function setStatus(status) {
    const { uid } = firebase.auth().currentUser;

    const userStatus = document.getElementById('userStatus');

    // Ask user what they are streaming.
    if (status === 'streaming') showStreamingStatusModal();

    userStatus.setAttribute('fill', STATUS_COLOURS[status]);
    userStatus.setAttribute('mask', `url(#svg-mask-status-${status})`);

    await firebase.database().ref(`/presence/`).update({
        [uid]: status
    });
}


/**
 * 
 * @param {*} status 
 */
function manualSetStatus(status) {
    setStatus(status);

    // If user selects online status, clear existing manual status
    if (status === 'online') {
        window.localStorage.removeItem('manual_status');
    } else {
        window.localStorage.setItem('manual_status', status);
    }
}


/**
 * 
 */
async function setCustomStatus() {
    const input = document.getElementById('customStatusInput');

    if (!input.value) return;
    
    

    // hideModals();
}


function clearCustomStatus() {

} 


/**
 * 
 * @param {*} name 
 */
 async function setDisplayName(name) {
    await firebase.auth().currentUser.updateProfile({
        displayName: name
    });
}


async function sendEmailVerification(showModal) {
    await firebase.auth().currentUser.sendEmailVerification();

    if (showModal) {
        const { email } = firebase.auth().currentUser;

        showBasicModal(
            'Verification Email',
            `We have sent you a new verification email to <strong>${email}</strong>, please check both your inbox and spam folder.`,
            'Okay',
            'hideModals()'
        );
    }
}


/**
 * 
 * @returns 
 */
function isEmailVerified() {
    const user = firebase.auth().currentUser;

    return user.emailVerified;
}


/**
 * 
 */
async function uploadDefaultAvatar() {
    const { uid } = firebase.auth().currentUser;

    // Generate a random colour for the profile picture
    const avatars = ['blue', 'green', 'yellow', 'red'];
    const index = generateRandom(0, avatars.length - 1);
    const path = `/img/avatar_${avatars[index]}.png`;

    // Get image into blob format for upload
    const blob = await (await fetch(path)).blob();

    // Upload image to Firebase Storage
    await firebase.storage().ref(`avatars/${uid}.gif`).put(blob);
}


/**
 * 
 * @param {*} userId
 * @returns 
 */
function getAvatar(userId) {
    let { uid } = firebase.auth().currentUser;
    
    if (userId) uid = userId;

    return `${AVATAR_PATH}${uid}.gif?alt=media`;
}


/**
 * 
 * @returns
 */
async function generateDiscriminator() {
    let valid = false;
    let discriminator = 0;

    const ref = firebase.database().ref('/users/');

    do {
        discriminator = generateRandom(0, 9999);

        const query = await (
            await ref.orderByChild('discriminator').equalTo(discriminator).once('value')
        ).val();
    
        if (!query) valid = true;
    } while (valid === false);

    discriminator = pad(discriminator, 4);

    return discriminator;
}


/**
 * 
 */
async function signout() {
    await firebase.auth().signOut();
}


/**
 * 
 * @returns 
 */
async function getProfile() {
    const { uid } = firebase.auth().currentUser;

    const profile = await (
        await firebase.database().ref(`/users/${uid}`).once('value')
    ).val();

    return profile;
}


/**
 * 
 * @param {*} username
 * @returns 
 */
async function getUserByFullUsername(username) {
    const user = await (
        await firebase.database().ref('/users/').orderByChild('full_username').equalTo(username).once('value')
    ).val();

    return user;
}


/**
 * 
 * @param {*} username 
 * @returns 
 */
async function isFriend(username) {
    const user = await getUserByFullUsername(username);

    if (!user) return false;

    const { uid } = firebase.auth().currentUser;
    const friendUID = Object.keys(user)[0];

    const isFriended = await (
        await firebase.database().ref(`/friends/${uid}/${friendUID}/`).once('value')
    ).val();

    return isFriended;
}