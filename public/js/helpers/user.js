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
    await firebase.auth().updateProfile({
        displayName: name
    });
}


/**
 * 
 * @param {*} url 
 */
async function setPhotoURL(url) {
    await firebase.auth().updateProfile({
        photoURL: url
    });
}


/**
 * 
 * @param {*} url 
 */
async function uploadAvatar(url) {
    
}


/**
 * 
 */
async function sendEmailVerification() {
    const user = firebase.auth().currentUser;

    await user.sendEmailVerification();
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
 * @param {*} profile 
 * @param {*} uid 
 */
async function dbProfile(profile, uid) {
    await firebase.database().ref(`/users/${uid}/`).set({
        profile
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
 * @param {*} email 
 * @param {*} password 
 * @returns 
 */
async function createUser(email, password) {
    try {
        const user = await firebase.auth().createUserWithEmailAndPassword(
            email, password
        );

        return user;
    } catch (error) {
        return error.code;
    }
}


/**
 * 
 * @param {*} email 
 * @param {*} password 
 * @returns 
 */
async function signinUser(email, password) {
    try {
        const user = await firebase.auth().signInWithEmailAndPassword(
            email, password
        );

        return user;
    } catch (error) {
        return error.code;
    }
}