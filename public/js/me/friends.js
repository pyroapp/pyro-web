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
        label.classList.remove('error-3T-E-_');

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
    const friendUID = Object.keys(user)[0];

    const {
        avatar: friendAvatar,
        discriminator: friendDiscriminator,
        username: friendUsername
    } = user[friendUID];

    const friendFullUsername = friendUsername + '#' + friendDiscriminator;

    if (await isFriend(friendFullUsername)) {
        return {
            failed: true,
            message: `You have already friended ${friendUsername}.`
        };
    }

    const addedFriendTime = getTime();

    try {
        // TODO: Add friend request, other person must accept the request.

        // Add friend to current account
        await firebase.database().ref(`/friends/${uid}/`).update({
            [friendUID]: {
                avatar: friendAvatar,
                discriminator: friendDiscriminator,
                username: friendUsername,
                friends_since: addedFriendTime
            }
        });

        // Add current user to friends account
        const {
            avatar,
            username,
        } = getProfile();

        const discriminator = username.split('#')[1];

        await firebase.database().ref(`/friends/${friendUID}/`).update({
            [uid]: {
                avatar: avatar,
                discriminator: discriminator,
                username: username,
                friends_since: addedFriendTime
            }
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