//? ------------------------------------------------------------------------------------
//?
//?  /helpers/user.js
//?  Pyro Chat
//?
//?  Developed by Pyro Communications LLC
//?  Copyright (c) 2021 Pyro Communications LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


/**
 * 
 */
async function uploadDefaultAvatar(name) {

    // Generate a random colour for the profile picture
    const avatars = ['blue', 'green', 'yellow', 'red'];
    const index = generateRandom(0, avatars.length - 1);
    const path = `/img/avatar_${avatars[index]}.png`;

    // Get image into blob format for upload
    const blob = await (await fetch(path)).blob();

    // Upload image to Firebase Storage
    await firebase.storage().ref(`/avatars/${name}.gif`).put(blob);
}


/**
 * 
 * @param {*} userId
 * @returns 
 */
function getAvatar(user_id) {
    const bucket = 'pyro-' + (isStaging() ? 'staging' : 'production');
    const path = `https://firebasestorage.googleapis.com/v0/b/${bucket}.appspot.com/o/avatars%2F`;
    const uid = user_id || firebase.auth().currentUser.uid;

    return `${path}${uid}.gif?alt=media`;
}


/**
 * 
 * @param {*} discriminator 
 * @returns 
 */
async function doesDiscriminatorExist(discriminator) {
    const ref = firebase.firestore().collection('users');
    let snapshot = await ref.where('profile.discriminator', '==', discriminator).get();

    snapshot.forEach(() => {
        snapshot = true;
    });

    return snapshot === true ? true : false;
}


/**
 * 
 * @returns
 */
async function generateDiscriminator() {
    let valid = false;
    let discriminator = 0;

    do {
        discriminator = generateRandom(0, 9999);

        const query = await doesDiscriminatorExist(discriminator);
    
        if (!query) valid = true;
    } while (valid === false);

    discriminator = pad(discriminator, 4);

    return discriminator;
}


/**
 * 
 * @param {*} username 
 * @param {*} discriminator 
 */
async function getUser(username, discriminator) {
    let snapshot = await firebase.firestore().collection('users')
        .where('username', '==', username)
        .where('discriminator', '==', discriminator).get();

    if (snapshot.empty) return false;

    snapshot.forEach(user => {
        snapshot = {
            ...user.data(),
            uid: user.id
        };
    });

    return snapshot;
}


/**
 * 
 * @param {*} username 
 * @returns 
 */
async function isFriend(username, discriminator) {
    const { uid } = firebase.auth().currentUser;
    const friend = await getUser(username, discriminator);

    if (!friend) return false;

    const snapshot = await firebase.firestore().collection('friends').doc(uid).get();

    if (!snapshot.data()) return false; // No friends to begin with
    if (snapshot.data()[friend.uid]) return true;

    return false;
}


/**
 * 
 * @param {*} uid 
 */
const addUserToCache = (uid) => {
    return new Promise((resolve, reject) => {
        const listener = firebase.firestore().collection('users').doc(uid).onSnapshot(snapshot => {
            CACHED_USERS[uid] = {
                ...snapshot.data()
            };
    
            CACHED_LISTENERS[uid] = listener;
    
            setRealtimeUserInfo(uid);
            resolve();
        });
    });
}


/**
 * 
 * @param {*} uid 
 */
 function setRealtimeUserInfo(uid) {
    const elements = document.querySelectorAll(`[uid="${uid}"]`);

    elements.forEach(element => {
        const statusEl = element.querySelectorAll('.RT_status');
        const cusStatusEl = element.querySelectorAll('.RT_customstatus');
        const usernameEl = element.querySelectorAll('.RT_username');
        const discrminiatorEl = element.querySelectorAll('.RT_discriminator');

        const { status, custom_status, username, discriminator } = CACHED_USERS[uid];

        const statusText = {
            online: "Online",
            idle: "Idle",
            dnd: "Do Not Disturb",
            offline: "Offline"
        };

        statusEl.forEach(s => {
            s.setAttribute('fill', STATUS_COLOURS[status]);
            s.setAttribute('mask', `url(#svg-mask-status-${status})`);
        });

        cusStatusEl.forEach(u => {
            u.innerText = custom_status || statusText[status];
        });

        usernameEl.forEach(u => {
            u.innerText = username;
        });

        discrminiatorEl.forEach(d => {
            d.innerText = '#' + discriminator;
        });
    });
}