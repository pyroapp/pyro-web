//? ------------------------------------------------------------------------------------
//?
//?  /app/friends.js
//?  Pyro Chat
//?
//?  Developed by Pyro Communications LLC
//?  Copyright (c) 2021 Pyro Communications LLC. All Rights Reserved
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


/**
 * 
 */
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
        // Create private message channnel
        const channel_id = generateId();

        await firebase.firestore().collection('channels').doc(channel_id).set({
            type: 'DM',
            recipients: [uid, f_uid], // Keeps track of the actively open users in the DM
            users: [uid, f_uid], // Keeps track of the users within the DM
            created: getTime(),
        });

        // Create friend database relationship
        await firebase.firestore().collection('friends').doc(uid).set({
            [f_uid]: {
                type: 'FRIEND',
                channel_id: channel_id
            }
        }, {
            merge: true
        });

        await firebase.firestore().collection('friends').doc(f_uid).set({
            [uid]: {
                type: 'FRIEND',
                channel_id: channel_id
            }
        }, {
            merge: true
        });

        // Add association between friends uid and direct message channel
        await firebase.firestore().collection('users').doc(uid).set({
            friends_channels: {
                [f_uid]: channel_id
            }
        }, {
            merge: true
        });

        await firebase.firestore().collection('users').doc(f_uid).set({
            friends_channels: {
                [uid]: channel_id
            }
        }, {
            merge: true
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


/**
 * 
 */
function getFriendsListener() {
    const { uid } = firebase.auth().currentUser;

    firebase.firestore().collection('friends').doc(uid).onSnapshot(async snapshot => {
        for (friend_uid in snapshot.data()) {
            if (!CACHED_FRIENDS[friend_uid]) {
                CACHED_FRIENDS.push(friend_uid);

                if (!CACHED_USERS[friend_uid]) {
                    await addUserToCache(friend_uid);
                }
            }
        }

        displayFriendsList();
    });
}


/**
 * 
 * @param {*} status 
 */
function displayFriendsList() {
    const friendsList = document.getElementsByClassName('friendsList-jfa091')[0];
    const friendsListTitle = document.getElementsByClassName('title-30qZAO')[0];

    friendsListTitle.innerText = `Friends — ${Object.keys(CACHED_FRIENDS).length}`;

    CACHED_FRIENDS.sort();

    CACHED_FRIENDS.forEach(friend_uid => {
        if (document.getElementById(`friends-list-item-${friend_uid}`)) return;
        
        const div = document.createElement('div');
        div.className = 'peopleListItem-2nzedh';
        div.style = 'height: 62px; opacity: 1;';
        div.id = `friends-list-item-${friend_uid}`
        div.setAttribute('uid', friend_uid);
        div.innerHTML = `
            <div class="listItemContents-95HL3L">
                <div class="userInfo-2zN2z8">
                    <div class="avatar-SmRMf2 wrapper-3t9DeA" style="width: 32px; height: 32px;">
                        <svg width="40" height="32" viewBox="0 0 40 32" class="mask-1l8v16 svg-2V3M55">
                            <foreignObject x="0" y="0" width="32" height="32" mask="url(#svg-mask-avatar-status-round-32)">
                                <img class="avatar-VxgULZ" src="${getAvatar(friend_uid)}">
                            </foreignObject>
                            <rect width="10" height="10" x="22" y="22" class="pointerEvents-2zdfdO RT_status" mask="url(#svg-mask-status-dnd)" fill="#DF3E3E"></rect>
                        </svg>
                    </div>
                    <div class="text-37NqbO">
                        <div class="discordTag-2_tqUA nameTag-m8r81H"><span class="username-2b1r56 username-31C1TQ RT_username"></span><span class="discriminator-22Okc1 RT_discriminator"></span></div>
                        <div class="subtext-24R4-w">
                            <div class="text-3MU_QQ RT_customstatus"></div>
                        </div>
                    </div>
                </div>
                <div class="actions-1SQwjn">
                    <div class="actionButton-uPB8Fs">
                        <svg class="icon-35-fSh" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fill="currentColor" d="M4.79805 3C3.80445 3 2.99805 3.8055 2.99805 4.8V15.6C2.99805 16.5936 3.80445 17.4 4.79805 17.4H7.49805V21L11.098 17.4H19.198C20.1925 17.4 20.998 16.5936 20.998 15.6V4.8C20.998 3.8055 20.1925 3 19.198 3H4.79805Z"></path>
                        </svg>
                    </div>
                    <div class="actionButton-uPB8Fs hidden">
                        <svg class="icon-35-fSh" width="24" height="24" viewBox="0 0 24 24">
                            <g fill="none" fill-rule="evenodd">
                                <path d="M24 0v24H0V0z"></path>
                                <path fill="currentColor" d="M12 16c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm0-6c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm0-6c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2z"></path>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        `;

        friendsList.appendChild(div);

        div.querySelectorAll('.actionButton-uPB8Fs')[0].onclick = () => {
            const channel_id = getChannelIdByFriend(friend_uid);

            // Check if the channel already exists in the DOM, then select it
            if (document.getElementById(`channel-${channel_id}`)) {
                return loadChannelFromId(channel_id);
            }

            // Channel doesn't exist in the DOM and is therefore closed. Open the channel
            reopenPrivateChannel(channel_id);
        }

        setRealtimeUserInfo(friend_uid);
    });
}


/**
 * 
 * @param {*} friend_uid Friend User ID
 */
function getChannelIdByFriend(friend_uid) {
    const { uid } = firebase.auth().currentUser;

    return CACHED_USERS[uid].friends_channels[friend_uid];
}


/**
 * 
 * @returns List of User IDs
 */
 async function getBlockedUsers() {
    const { uid } = firebase.auth().currentUser;

    const friends = await (await firebase.firestore().collection('friends').doc(uid).get()).data();
    const uids = [];

    for (friend in friends) {
        const { type } = friends[friend];

        if (type === 'BLOCKED') uids.push(friend);
    }

    uids.sort();

    return uids;
}


/**
 * 
 * @param {*} friend_uid Friend User ID
 */
function unblockFriend(friend_uid) {
    const { uid } = firebase.auth().currentUser;

    // Unblock from current relationship
    firebase.firestore().collection('friends').doc(uid).update({
        [friend_uid]: {
            type: 'FRIEND',
        }
    });

    // Unblock from friends relationship
    firebase.firestore().collection('friends').doc(friend_uid).update({
        [uid]: {
            type: 'FRIEND'
        }
    });
}


/**
 * 
 * @param {*} friend_uid Friend User ID
 */
function blockFriend(friend_uid) {
    const { uid } = firebase.auth().currentUser;

    // Unblock from current relationship
    firebase.firestore().collection('friends').doc(uid).update({
        [friend_uid]: {
            type: 'BLOCKED',
            local: true,
        }
    });

    // Unblock from friends relationship
    firebase.firestore().collection('friends').doc(friend_uid).update({
        [uid]: {
            type: 'BLOCKED',
            local: false,
        }
    });
}