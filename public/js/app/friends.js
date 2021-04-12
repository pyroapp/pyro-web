//? ------------------------------------------------------------------------------------
//?
//?  /app/friends.js
//?  Pyro Chat
//?
//?  Developed by Robolab LLC
//?  Copyright (c) 2021 Robolab LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


document.getElementById('addFriendField').oninput = event => {
    const button = document.getElementById('addFriendButton');
    const value = event.target.value;

    if (value) {
        button.removeAttribute('disabled');
    } else {
        button.setAttribute('disabled', '');
    }
}


document.getElementById('addFriendButton').onclick = () => {
    const field = document.getElementById('addFriendField');

    if (field.value) addFriendHandler();
}


document.getElementById('addFriendField').onkeyup = event => {
    const value = event.target.value;

    if (event.key === 'Enter' && value) addFriendHandler();
}


async function addFriendHandler() {
    const input = document.getElementById('addFriendField');
    const button = document.getElementById('addFriendButton');
    const label = document.getElementById('addFriendLabel');

    const split = input.value.split('#');
    
    showButtonLoader(button);
    disableButton(button);

    if (split.length > 2) {
        label.classList.add('error-3T-E-_');
        label.innerText = 'You cannot have more than one # in a user\'s username.';

    } else if (split.length === 1) {
        label.classList.add('error-3T-E-_');
        label.innerText = `We need ${input.value}'s four digit tag so we know which one they are.`;

    } else if (!split[1] || split[1].length !== 4 || isNaN(split[1])) {
        label.classList.add('error-3T-E-_');
        label.innerText = 'Hm, didn\'t work. Double check that the capitalisation, spelling, any spaces, and numbers are correct.';

    } else {
        const user = await getUser(split[0], split[1]);
        
        // Back to default
        label.innerText = 'You can add a friend with their Pyro Tag. It\'s cAsE sEnSitIvE!';

        // Can't find user
        if (!user) {
            showBasicModal(
                'Friend Request Failed',
                'Hm, didn\'t work. Double check that the capitalization, spelling, any spaces, and numbers are correct.',
                'Okay',
                'hideModals()'
            );
        } else {
            const {
                failed,
                message
            } = await addFriend(user);

            if (failed) {
                label.classList.add('error-3T-E-_');
            } else {
                label.classList.add('success-t0oxXf');
            }

            label.innerHTML = message;
            input.value = '';
        }
    }
    
    enableButton(button);
    hideButtonLoader(button);
}


/**
 * 
 * @param {*} user 
 * @returns 
 */
async function addFriend(user) {
    const { uid } = firebase.auth().currentUser;
    const {
        uid: f_uid,
        discriminator: f_discriminator,
        username: f_username
    } = user;

    const friended = await isFriend(f_username, f_discriminator);

    // Make sure you haven't already friended user
    if (friended) {
        return {
            failed: true,
            message: `You have already friended ${f_username}`,
        };
    }

    // Make sure you are not friending yourself
    const {
        username: l_username,
        discriminator: l_discriminator
    } = CACHED_USERS[uid]

    if (l_username === f_username && l_discriminator === f_discriminator) {
        return {
            failed: true,
            message: 'You cannot add yourself as a friend.'
        }
    }

    try {
        // Create friend database relationship
        await firebase.firestore().collection('friends').doc(uid).set({
            [f_uid]: {
                type: 'FRIEND'
            }
        }, {
            merge: true
        });

        await firebase.firestore().collection('friends').doc(f_uid).set({
            [uid]: {
                type: 'FRIEND'
            }
        }, {
            merge: true
        });

        // Create private message channnel
        const privateId = generateId();

        await firebase.firestore().collection('channels').doc(privateId).set({
            type: 'DM',
            recipients: [uid, f_uid],
            users: [uid, f_uid],
            created: getTime(),
        });

        return {
            failed: false,
            message: `Success! You added <strong>${f_username}</strong> as a friend.`
        }
    } catch (e) {
        return {
            failed: true,
            message: `Unexpected Error! Failed to add <strong>${f_username}</strong> as a friend.`
        }
    }
}


/**
 * 
 * @returns 
 */
async function getFriends() {
    const { uid } = firebase.auth().currentUser;

    const friends = await (await firebase.firestore().collection('friends').doc(uid).get()).data();
    const uids = [];

    for (friend in friends) {
        const { type } = friends[friend];

        if (type === 'FRIEND') uids.push(friend);
    }

    uids.sort();

    return uids;
}