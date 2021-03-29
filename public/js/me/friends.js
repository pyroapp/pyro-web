//? ------------------------------------------------------------------------------------
//?
//?  /me/friends.js
//?  Discord JS
//?
//?  Developed by Cooper Beltrami
//?
//?  Project built using designs, graphics and other assets developed by Discord Inc.
//?  Copyright (c) 2021 Cooper Beltrami and Discord Inc. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


document.getElementById('addFriendField').addEventListener('input', event => {
    const button = document.getElementById('addFriendButton');
    const value = event.target.value;

    if (value) {
        button.removeAttribute('disabled');
    } else {
        button.setAttribute('disabled', '');
    }
});


document.getElementById('addFriendField').addEventListener('keyup', event => {
    const value = event.target.value;

    if (event.key === 'Enter' && value) addFriendInit();
});


document.getElementById('addFriendButton').addEventListener('click', () => {
    addFriendInit();
}); 


/**
 * 
 */
async function addFriendInit() {
    const button = document.getElementById('addFriendButton');
    const input = document.getElementById('addFriendField');
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
        const user = await getUserByFullUsername(input.value);
        
        // Back to default
        label.innerText = 'You can add a friend with their Discord Tag. It\'s cAsE sEnSitIvE!';

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
 */
async function addFriend(user) {
    const { uid } = firebase.auth().currentUser;

    const {
        uid: friendUID,
        discriminator: friendDiscriminator,
        username: friendUsername
    } = user;

    const friendFullUsername = `${friendUsername}#${friendDiscriminator}`;

    if (await isFriend(friendFullUsername)) {
        return {
            failed: true,
            message: `You have already friended ${friendUsername}.`
        };
    }

    // Make sure you are not adding yourself
    const { displayName } = firebase.auth().currentUser;

    if (friendFullUsername === displayName) {
        return {
            failed: true,
            message: 'You cannot add yourself as a friend.'
        }
    }

    try {
        // Create friend database relationship
        await firebase.firestore().collection('friends').doc(uid).set({
            [friendUID]: true
        }, {
            merge: true
        });

        await firebase.firestore().collection('friends').doc(friendUID).set({
            [uid]: true
        }, {
            merge: true
        });

        // TODO: This might wipe out messages if you remove friends and
        // TODO: add the same friend, a check might needed

        // Create private message channel
        const privateId = getTime().toString();

        await firebase.firestore().collection('private_channels').doc(privateId).set({
            users: [uid, friendUID],
            group: false,
        });

        // Add private channel references in each profile
        await firebase.firestore().collection('subscribed_private').doc(uid).set({
            [privateId]: true
        }, {
            merge: true
        });

        await firebase.firestore().collection('subscribed_private').doc(friendUID).set({
            [privateId]: true
        }, {
            merge: true
        });

        return {
            failed: false,
            message: `Success! You added <strong>${friendUsername}</strong> as a friend.`
        };
    } catch (error) {
        console.error(error);
        return {
            failed: true,
            message: `Unexpected Error! Failed to add <strong>${friendUsername}</strong> as a friend.`
        };
    }
}