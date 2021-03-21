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
    const friendUID = Object.keys(user)[0];

    const {
        discriminator: friendDiscriminator,
        username: friendUsername
    } = user[friendUID];

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

    const addedFriendTime = getTime();

    try {
        await firebase.database().ref(`/friends/${uid}/`).update({
            [friendUID]: {
                discriminator: friendDiscriminator,
                username: friendUsername,
                friends_since: addedFriendTime
            }
        });

        const {
            discriminator,
            username
        } = await getProfile()

        await firebase.database().ref(`/friends/${friendUID}/`).update({
            [uid]: {
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


/**
 * 
 */
async function loadPrivateChannels() {
    const { uid } = firebase.auth().currentUser;

    await firebase.database().ref(`/friends/${uid}`).on('value', async friends => {
        const friendsList = document.getElementById('privateChannelsList');

        friendsList.innerHTML = ''; // Clear out existing values

        if (!friends.val()) return loadPlaceholderFriends();

        for (friendUID in friends.val()) {
            const {
                username,
                discriminator,
            } = friends.val()[friendUID];

            addPrivateChannel(friendUID, username, discriminator);
        }
    });
}


/**
 * 
 * @param {*} uid 
 * @param {*} username 
 * @param {*} discriminator 
 */
function addPrivateChannel(uid, username, discriminator) {
    const friendsList = document.getElementById('privateChannelsList');

    // Set realtime status
    firebase.database().ref(`/presence/${uid}`).on('value', presence => {
        setPrivateChannelStatus(uid, presence.val());
    });

    friendsList.innerHTML += `
        <a class="channel-2QD9_O container-2Pjhx- clickable-1JJAn8" id="${uid}" full_username="${username}#${discriminator}" onclick="changeChannel(this)">
            <div class="layout-2DM8Md">
                <div class="avatar-3uk_u9">
                    <div class="wrapper-3t9DeA" style="width: 32px; height: 32px;">
                        <svg width="40" height="32" viewBox="0 0 40 32" class="mask-1l8v16 svg-2V3M55">
                            <mask id="1e790872-400c-4750-815a-1afdbe1cdf12" width="32" height="32">
                                <circle cx="16" cy="16" r="16" fill="white"></circle>
                                <rect color="black" x="19" y="19" width="16" height="16" rx="8" ry="8"></rect>
                            </mask>
                            <foreignObject x="0" y="0" width="32" height="32" mask="url(#1e790872-400c-4750-815a-1afdbe1cdf12)">
                                <img src="${getAvatar(uid)}" class="avatar-VxgULZ">
                            </foreignObject>
                            <rect class="userStatus" x="22" y="22" width="10" height="10" class="pointerEvents-2zdfdO" fill="#43B581" mask="url(#svg-mask-status-online)"></rect>
                        </svg>
                    </div>
                </div>
                <div class="content-3QAtGj">
                    <div class="nameAndDecorators-5FJ2dg">
                        <div class="name-uJV0GL">
                            <div class="overflow-WK9Ogt">${username}</div>
                        </div>
                    </div>
                    <div class="subText-1KtqkB"></div>
                </div>
                <div class="children-gzQq2t">
                    <div class="closeButton-2GCmT5" onclick="deletePrivateChannel(uid)">
                        <svg class="closeIcon-rycxaQ" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </a>
    `;
}


/**
 * 
 */
function loadPlaceholderFriends() {
    const friendsList = document.getElementById('privateChannelsList');

    friendsList.innerHTML = `
        <svg width="184" height="428" viewBox="0 0 184 428" class="empty-388osJ">
            <rect x="40" y="6" width="144" height="20" rx="10"></rect>
            <circle cx="16" cy="16" r="16"></circle>
            <rect x="40" y="50" width="144" height="20" rx="10" opacity="0.9"></rect>
            <circle cx="16" cy="60" r="16" opacity="0.9"></circle>
            <rect x="40" y="94" width="144" height="20" rx="10" opacity="0.8"></rect>
            <circle cx="16" cy="104" r="16" opacity="0.8"></circle>
            <rect x="40" y="138" width="144" height="20" rx="10" opacity="0.7"></rect>
            <circle cx="16" cy="148" r="16" opacity="0.7"></circle>
            <rect x="40" y="182" width="144" height="20" rx="10" opacity="0.6"></rect>
            <circle cx="16" cy="192" r="16" opacity="0.6"></circle>
            <rect x="40" y="226" width="144" height="20" rx="10" opacity="0.5"></rect>
            <circle cx="16" cy="236" r="16" opacity="0.5"></circle>
            <rect x="40" y="270" width="144" height="20" rx="10" opacity="0.4"></rect>
            <circle cx="16" cy="280" r="16" opacity="0.4"></circle>
            <rect x="40" y="314" width="144" height="20" rx="10" opacity="0.3"></rect>
            <circle cx="16" cy="324" r="16" opacity="0.3"></circle>
            <rect x="40" y="358" width="144" height="20" rx="10" opacity="0.2"></rect>
            <circle cx="16" cy="368" r="16" opacity="0.2"></circle>
            <rect x="40" y="402" width="144" height="20" rx="10" opacity="0.1"></rect>
            <circle cx="16" cy="412" r="16" opacity="0.1"></circle>
        </svg>
    `;
}