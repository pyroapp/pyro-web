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
 * @param {*} name 
 */
 async function setDisplayName(name) {
    await firebase.auth().currentUser.updateProfile({
        displayName: name
    });
}


/**
 * 
 * @param {*} url 
 */
async function setPhotoURL(url) {
    await firebase.auth().currentUser.updateProfile({
        photoURL: url
    });
}


async function sendEmailVerification(showModal) {
    await firebase.auth().currentUser.sendEmailVerification();

    if (showModal) {
        const { email } = await getProfile();

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
 * @returns 
 */
function generateAvatar() {
    const base = 'https://firebasestorage.googleapis.com/v0/b/djs-clone.appspot.com/o/';
    const defaultAvatars = [
        'avatar_blue',
        'avatar_green',
        'avatar_yellow',
        'avatar_red'
    ];

    const index = generateRandom(0, defaultAvatars.length - 1);
    const avatar = defaultAvatars[index];

    return base + `cdn%2Fmedia%2Favatars%2F${avatar}.png?alt=media`;
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
 * @param {*} profile 
 * @param {*} uid 
 */
async function dbProfile(profile, uid) {
    await firebase.database().ref(`/users/${uid}`).set({
        ...profile
    });
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
function getProfile() {
    const user = firebase.auth().currentUser;

    return {
        email: user.email,
        username: user.displayName,
        uid: user.uid,
        avatar: user.photoURL,
        emailVerified: user.emailVerified,
        creationTime: user.metadata.creationTime,
        lastSignInTime: user.metadata.lastSignInTime,
        phoneNumber: user.phoneNumber,
        provider: user.providerData,
        refreshToken: user.refreshToken
    }
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

    const friended = await (
        await firebase.database().ref(`/friends/${uid}/${friendUID}/username/`).once('value')
    ).val();

    return friended;
}