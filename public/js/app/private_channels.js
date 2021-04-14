//? ------------------------------------------------------------------------------------
//?
//?  /app/privatechannels.js
//?  Pyro Chat
//?
//?  Developed by Robolab LLC
//?  Copyright (c) 2021 Robolab LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


/**
 * 
 */
function loadPrivateChannels() {
    const { uid } = firebase.auth().currentUser;

    firebase.firestore().collection('channels')
    .where('recipients', 'array-contains', uid)
    .where('type', '==', 'DM')
    .limit(50)
    .onSnapshot(snapshot => {
        if (snapshot.empty) return addPrivateChannelPlaceholder();

        snapshot.docChanges().forEach(async change => {
            const { type, doc: channel } = change;

            if (type === 'added') {
                hidePrivateChannelPlaceholder();

                // Get friend user
                const { recipients } = channel.data();

                CACHED_RECIPIENTS[channel.id] = recipients;

                recipients.forEach(async recipient => {
                    if (recipient === uid) return;

                    addPrivateChannel(channel.id, recipient);
                    addChat(channel.id, recipient);

                    if (CACHED_USERS[recipient]) return; // User already exists

                    const listener = firebase.firestore().collection('users').doc(recipient).onSnapshot(snapshot => {
                        CACHED_USERS[recipient] = {
                            ...snapshot.data()
                        };

                        CACHED_LISTENERS[channel.id] = listener;

                        setRealtimeUserInfo(recipient);
                    });
                });
            }
        });
    });
}


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
        const channelsDOM = document.getElementById('privateChannelsList').childNodes;

        channelsDOM.forEach(channelDOM => {
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
 * 
 * @param {*} uid 
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
            <div class="children-gzQq2t hidden">
                <div class="closeButton-2GCmT5">
                    <svg class="closeIcon-rycxaQ" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path>
                    </svg>
                </div>
            </div>
        </div>
    `;

    return channelsList.appendChild(a);
}


/**
 * 
 */
 function toggleSelectedChannel(channelId) {
    document.querySelectorAll('.channel-2QD9_O').forEach(element => {
        element.classList.remove('selected-aXhQR6');
    });

    const channel = document.getElementById(channelId);
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
 * 
 */
async function selectChannel(channel_id) {
    toggleSelectedChannel(`channel-${channel_id}`);

    channel_id = channel_id.toString(); // Not sure why it sometimes returns an int

    if (channel_id === 'friends') return; // Don't load messages for friends channel
    if (CACHED_CHAT_LISTENERS[channel_id]) return; // If listener already exists

    loadPrivateMessages(channel_id);
}


/**
 * 
 * @param {*} channel_id 
 */
async function closePrivateChannel(channel_id) {
    const { uid } = firebase.auth().currentUser;

    await firebase.firestore().collection('channels').doc(channel_id).update({
        recipients: firebase.firestore.FieldValue.arrayRemove(uid)
    });

    // Remove from listener cache
    delete CACHED_LISTENERS[channel_id];

    // Determine if the selected user is being removed,
    // select the first user in the list.
    const channelList = document.getElementById('privateChannelsList');
    const channel = document.getElementById('channel-' + channel_id);

    channelList.removeChild(channel);

    let id = 'friends';

    if (channelList.childElementCount > 0) {
        id = channelList.children[0].id.replace('channel-', '');
    }

    loadChannelFromId(id);
}