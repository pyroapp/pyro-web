//? ------------------------------------------------------------------------------------
//?
//?  /app/privatechannels.js
//?  Pyro Chat
//?
//?  Developed by Pyro Communications LLC
//?  Copyright (c) 2021 Pyro Communications LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


/**
 * Loads the users private channels (direct messages)
 */
async function loadPrivateChannels() {
    const loadChannels = new Promise((resolve, reject) => {
        const { uid } = firebase.auth().currentUser;
    
        firebase.firestore().collection('channels')
        .where('recipients', 'array-contains', uid)
        .where('type', '==', 'DM').limit(50).onSnapshot(snapshot => {
            if (snapshot.empty) {
                addPrivateChannelPlaceholder();
                resolve();
            }
    
            snapshot.docChanges().forEach(async change => {
                const { type, doc: channel } = change;
    
                if (type === 'added') {
                    hidePrivateChannelPlaceholder();

                    const { recipients } = channel.data();

                    CACHED_RECIPIENTS[channel.id] = recipients;

                    // Remove current user from recipients list
                    recipients.splice(recipients.indexOf(uid), 1);
                    const friend_uid = recipients[0];

                    // If user is already in the cache it most likely means the 
                    // channel was closed and is being reopened.
                    addPrivateChannel(channel.id, friend_uid);
                    addChat(channel.id, friend_uid);

                    if (CACHED_RECIPIENTS[friend_uid]) {
                        setRealtimeUserInfo(uid);
                    } else {
                        await addUserToCache(friend_uid);
                    }
    
                    resolve();
                }

                if (type === 'removed') {
                    removePrivateChannel(channel.id);
                    removeChat(channel.id);
                    loadChannelFromId('friends');
                }
            });
        });
    });

    await loadChannels;
}


/**
 * Handles any blocked users the user has. It will cover both users chat fields
 * and will only let the user who blocked the other user to unblock.
 */
async function blockedUserHandler() {
    const { uid } = firebase.auth().currentUser;
    
    firebase.firestore().collection('friends').doc(uid).onSnapshot(snapshot => {
        const blocked_users = [];

        // Get blocked users
        for (friend_uid in snapshot.data()) {
            const { type } = snapshot.data()[friend_uid];

            if (type === 'BLOCKED') {
                blocked_users[friend_uid] = {
                    ...snapshot.data()[friend_uid]
                };
            }
        }

        // Get channels from DOM
        const channelsDOM = document.getElementById('privateChannelsList').children;

        Array.prototype.slice.call(channelsDOM).forEach(channelDOM => {
            if (!channelDOM.id.startsWith('channel')) return;

            const channel_id = channelDOM.id.split('-')[1];
            const friend_uid = channelDOM.getAttribute('uid');

            const channel = document.getElementById(channel_id);
            const chatpanel = channel.querySelectorAll('.channelTextArea-2VhZ6z')[0];
            const blockpanel = channel.querySelectorAll('.channelBlockedArea-fj903')[0];
            const unblock_btn = blockpanel.querySelectorAll('.unblockbutton-fj93f')[0];
            const block_btn = channel.querySelectorAll('.block-button-rj93')[0];

            // Check if user is blocked
            if (blocked_users[friend_uid]) {
                chatpanel.classList.add('hidden');
                blockpanel.classList.remove('hidden');

                blockpanel.querySelectorAll('.button-1YxJv4')[0].onclick = () => {
                    unblockFriend(friend_uid);
                }

                // Change block button to unblock
                if (blocked_users[friend_uid].local) {
                    block_btn.onclick = () => { unblockFriend(friend_uid) };
                    block_btn.innerText = 'Unblock';
                } else {
                    unblock_btn.classList.add('hidden');
                    block_btn.classList.add('hidden');
                }
            } else {
                chatpanel.classList.remove('hidden');
                blockpanel.classList.add('hidden');
                block_btn.classList.remove('hidden');

                // Change block button to unblock
                block_btn.onclick = () => { blockFriend(friend_uid) };
                block_btn.innerText = 'Block';
            }
        });
    });
}


/**
 * Creates and shows a new private channel UI component
 * @param {*} channel_id Channel ID
 * @param {*} friend_uid Friend User ID
 */
 function addPrivateChannel(channel_id, friend_uid) {
    const channelsList = document.getElementById('privateChannelsList');

    const a = document.createElement('a');
    a.classList = 'channel-2QD9_O container-2Pjhx- clickable-1JJAn8 fadeIn-efi30';
    a.id = 'channel-' + channel_id;
    a.setAttribute('uid', friend_uid);
    a.setAttribute('onclick', `loadChannelFromId(${channel_id});`);
    a.innerHTML = `
        <div class="layout-2DM8Md">
            <div class="avatar-3uk_u9">
                <div class="wrapper-3t9DeA" style="width: 32px; height: 32px;">
                    <svg width="40" height="32" viewBox="0 0 40 32" class="mask-1l8v16 svg-2V3M55">
                        <mask id="1e790872-400c-4750-815a-1afdbe1cdf12" width="32" height="32">
                            <circle cx="16" cy="16" r="16" fill="white"></circle>
                            <rect color="black" x="19" y="19" width="16" height="16" rx="8" ry="8"></rect>
                        </mask>
                        <foreignObject x="0" y="0" width="32" height="32" mask="url(#1e790872-400c-4750-815a-1afdbe1cdf12)">
                            <img src="${getAvatar(friend_uid)}" class="avatar-VxgULZ">
                        </foreignObject>
                        <rect class="RT_status" x="22" y="22" width="10" height="10" class="pointerEvents-2zdfdO" fill="#43B581" mask="url(#svg-mask-status-online)"></rect>
                    </svg>
                </div>
            </div>
            <div class="content-3QAtGj">
                <div class="nameAndDecorators-5FJ2dg">
                    <div class="name-uJV0GL">
                        <div class="overflow-WK9Ogt RT_username"></div>
                    </div>
                </div>
                <div class="subText-1KtqkB">
                    <div class="activity-525YDR subtext-1RtU34 hidden">
                        <div class="activityText-OW8WYb lastmessage"></div>
                    </div>
                </div>
            </div>
            <div class="children-gzQq2t">
                <div class="closeButton-2GCmT5">
                    <svg class="closeIcon-rycxaQ" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path>
                    </svg>
                </div>
            </div>
        </div>
    `;

    a.querySelectorAll('.closeButton-2GCmT5')[0].onclick = () => {
        closePrivateChannel(channel_id);
    }

    return channelsList.appendChild(a);
}


/**
 * 
 * @param {*} channel_id 
 */
function removePrivateChannel(channel_id) {
    const channelsList = document.getElementById('privateChannelsList');
    const channel = document.getElementById(`channel-${channel_id}`);

    channelsList.removeChild(channel);
}


/**
 * Highlights the header for the selected channel group. Direct Messages and Group Chats.
 * @param {*} channelId Channel ID
 */
 function toggleSelectedChannelHeader(channel_id) {
    channel_id = `channel-${channel_id}`;

    document.querySelectorAll('.channel-2QD9_O').forEach(element => {
        element.classList.remove('selected-aXhQR6');
    });

    const channel = document.getElementById(channel_id);
    const parent = channel.parentElement.id;

    const pc_list = document.querySelectorAll('.headerText-2F0828')[0];
    const gc_list = document.querySelectorAll('.headerText-2F0828')[1];

    if (parent === 'groupChatsList') {
        gc_list.classList.add('list-selected-3j930');
        pc_list.classList.remove('list-selected-3j930');

    } else if (parent === 'privateChannelsList') {
        gc_list.classList.remove('list-selected-3j930');
        pc_list.classList.add('list-selected-3j930');

    }

    channel.classList.add('selected-aXhQR6');
}


/**
 * Reopens an existing private channel
 * @param {*} channel_id Channel ID
 */
async function reopenPrivateChannel(channel_id) {
    const { uid } = firebase.auth().currentUser;

    firebase.firestore().collection('channels').doc(channel_id).update({
        recipients: firebase.firestore.FieldValue.arrayUnion(uid)
    });

    // TODO: A delay is currently impemented to wait for the chat to be 
    // TODO: and then select it because we can't determine when the
    // TODO: private channel DOM is created.
    // TODO: See if there is some other way to do this, we could
    // TODO: possible use localstorage to keep some sort of flag
    await delay(100);
    loadChannelFromId(channel_id);
}


/**
 * Closes a private channel
 * @param {*} channel_id Channel ID
 */
async function closePrivateChannel(channel_id) {
    const { uid } = firebase.auth().currentUser;

    // Remove from channel users
    await firebase.firestore().collection('channels').doc(channel_id).update({
        recipients: firebase.firestore.FieldValue.arrayRemove(uid)
    });
}