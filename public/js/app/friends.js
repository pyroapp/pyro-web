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

async function displayAllFriends() {
    const { uid } = firebase.auth().currentUser;

    const friends = await (await firebase.firestore().collection('friends').doc(uid).get()).data();
    const friendList = document.getElementById('friendsContainer-d9s8fd');
    
    if (!friends) {        
        friendList.innerHTML = 
        `
        <div class="emptyState-2i1-FW">
            <div class="friendsEmpty-1K9B4k" style="opacity: 1;">
                <div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyCenter-3D2jYp alignCenter-1dQNNs noWrap-3jynv6 wrapper-r-6rrt" style="flex: 1 1 auto;">
                    <div class="image-1GzsFd marginBottom40-2vIwTv" style="flex: 0 1 auto; width: 376px; height: 162px; background-image: url('../img/b5eb2f7d6b3f8cc9b60be4a5dcf28015.svg');"></div>
                    <div class="flexChild-faoVW3" direction="vertical-V37hAW flex-1O1GKY directionColumn-35P_nr" style="flex: 0 1 auto;">
                        <div class="text-GwUZgS marginTop8-1DLZ1n">Looks quiet here. Add a friend!</div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    else {
        friendList.innerHTML = 
        `
        <div class="onlineFriendsCounter" style="color: #99aab5; margin: 10px 20px;">ALL - ${Object.keys(friends).length}</div>
        `

        for (const friendUid in friends) {
            const friend = CACHED_USERS[friendUid];
            const a = document.createElement('a');
            const statusMask = `url(#svg-mask-status-${friend.status})`;
            const statusColour = STATUS_COLOURS[friend.status]
            
            if (friends[friendUid].type === 'BLOCKED') {
                continue;
            }

            a.innerHTML = 
            `
            <div class="layout-2DM8Md" style="margin: 0px 20px;">
                <div class="avatar-3uk_u9">
                    <div class="wrapper-3t9DeA" style="width: 32px; height: 32px;">
                        <svg width="40" height="32" viewBox="0 0 40 32" class="mask-1l8v16 svg-2V3M55">
                            <mask id="1e790872-400c-4750-815a-1afdbe1cdf12" width="32" height="32">
                                <circle cx="16" cy="16" r="16" fill="white"></circle>
                                <rect color="black" x="19" y="19" width="16" height="16" rx="8" ry="8"></rect>
                            </mask>
                            <foreignObject x="0" y="0" width="32" height="32" mask="url(#1e790872-400c-4750-815a-1afdbe1cdf12)">
                                <img src="${getAvatar(friendUid)}" class="avatar-VxgULZ">
                            </foreignObject>
                            <rect class="RT_status" x="22" y="22" width="10" height="10" class="pointerEvents-2zdfdO" fill="${statusColour}" mask=${statusMask}></rect>
                        </svg>
                    </div>
                </div>
                <div class="content-3QAtGj">
                    <div class="nameAndDecorators-5FJ2dg">
                        <div class="name-uJV0GL">
                            <div class="overflow-WK9Ogt RT_username" style="color: #99aab5;"><strong>${friend.username}</strong>#${friend.discriminator}</div>
                        </div>
                    </div>
                    <div class="subText-1KtqkB">
                        <div class="activity-525YDR subtext-1RtU34 hidden">
                            <div class="activityText-OW8WYb lastmessage"></div>
                        </div>
                    </div>
                </div>
                <div class="children-gzQq2t hidden">
                    <div class="closeButton-2GCmT5">
                        <svg class="closeIcon-rycxaQ" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path>
                        </svg>
                    </div>
                </div>
            </div>
            `;
            friendList.appendChild(a);
        }
    }
}

async function displayOnlineFriends() {
    const { uid } = firebase.auth().currentUser;

    const friends = await (await firebase.firestore().collection('friends').doc(uid).get()).data();
    const friendList = document.getElementById('friendsContainer-d9s8fd');
    
    if (!friends) {        
        friendList.innerHTML = 
        `
        <div class="emptyState-2i1-FW">
            <div class="friendsEmpty-1K9B4k" style="opacity: 1;">
                <div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyCenter-3D2jYp alignCenter-1dQNNs noWrap-3jynv6 wrapper-r-6rrt" style="flex: 1 1 auto;">
                    <div class="image-1GzsFd marginBottom40-2vIwTv" style="flex: 0 1 auto; width: 376px; height: 162px; background-image: url('../img/b5eb2f7d6b3f8cc9b60be4a5dcf28015.svg');"></div>
                    <div class="flexChild-faoVW3" direction="vertical-V37hAW flex-1O1GKY directionColumn-35P_nr" style="flex: 0 1 auto;">
                        <div class="text-GwUZgS marginTop8-1DLZ1n">Looks quiet here. Add a friend!</div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    else {
        friendList.innerHTML = 
        `
        <div class="onlineFriendsCounter" style="color: #99aab5; margin: 10px 20px;">ONLINE - ${Object.keys(friends).length}</div>
        `

        for (const friendUid in friends) {
            const friend = CACHED_USERS[friendUid];
            const a = document.createElement('a');
            const statusMask = `url(#svg-mask-status-${friend.status})`;
            const statusColour = STATUS_COLOURS[friend.status]

            if (friends[friendUid].type === 'BLOCKED' || friend.status === 'offline') {
                continue;
            }

            a.innerHTML = 
            `
            <div class="layout-2DM8Md" style="margin: 0px 20px;">
                <div class="avatar-3uk_u9">
                    <div class="wrapper-3t9DeA" style="width: 32px; height: 32px;">
                        <svg width="40" height="32" viewBox="0 0 40 32" class="mask-1l8v16 svg-2V3M55">
                            <mask id="1e790872-400c-4750-815a-1afdbe1cdf12" width="32" height="32">
                                <circle cx="16" cy="16" r="16" fill="white"></circle>
                                <rect color="black" x="19" y="19" width="16" height="16" rx="8" ry="8"></rect>
                            </mask>
                            <foreignObject x="0" y="0" width="32" height="32" mask="url(#1e790872-400c-4750-815a-1afdbe1cdf12)">
                                <img src="${getAvatar(friendUid)}" class="avatar-VxgULZ">
                            </foreignObject>
                            <rect class="RT_status" x="22" y="22" width="10" height="10" class="pointerEvents-2zdfdO" fill="${statusColour}" mask=${statusMask}></rect>
                        </svg>
                    </div>
                </div>
                <div class="content-3QAtGj">
                    <div class="nameAndDecorators-5FJ2dg">
                        <div class="name-uJV0GL">
                            <div class="overflow-WK9Ogt RT_username" style="color: #99aab5;"><strong>${friend.username}</strong>#${friend.discriminator}</div>
                        </div>
                    </div>
                    <div class="subText-1KtqkB">
                        <div class="activity-525YDR subtext-1RtU34 hidden">
                            <div class="activityText-OW8WYb lastmessage"></div>
                        </div>
                    </div>
                </div>
                <div class="children-gzQq2t hidden">
                    <div class="closeButton-2GCmT5">
                        <svg class="closeIcon-rycxaQ" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path>
                        </svg>
                    </div>
                </div>
            </div>
            `;
            friendList.appendChild(a);
        }
    }
}

/**
 * 
 * @returns 
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
 * @param {*} friend_uid 
 */
function unblockFriend(friend_uid) {
    const { uid } = firebase.auth().currentUser;

    // Unblock from current relationship
    firebase.firestore().collection('friends').doc(uid).update({
        [friend_uid]: {
            type: 'FRIEND',
        }
    }, {
        merge: true
    });

    // Unblock from friends relationship
    firebase.firestore().collection('friends').doc(friend_uid).update({
        [uid]: {
            type: 'FRIEND'
        }
    }, {
        merge: true
    });
}


/**
 * 
 * @param {*} friend_uid 
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