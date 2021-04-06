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
async function loadPrivateChannels() {
    const { uid } = firebase.auth().currentUser;

    await firebase.firestore().collection('channels')
        .where('recipients', 'array-contains', uid)
        .where('type', '==', 'DM').limit(50).onSnapshot(snapshot => {

        if (snapshot.empty) return addPrivateChannelPlaceholder();

        snapshot.docChanges().forEach(change => {
            const { type, doc: channel } = change;

            if (type === 'added') {
                hidePrivateChannelPlaceholder();

                // Get friend user
                const { recipients } = channel.data();
                
                recipients.forEach(async recipient => {
                    if (recipient === uid) return;

                    addPrivateChannel(channel.id, recipient);
                    addChat(channel.id, recipient);

                    await firebase.firestore().collection('users').doc(recipient).onSnapshot(snapshot => {
                        CACHED_USERS[recipient] = {
                            ...snapshot.data()
                        };

                        // Update username and status
                        const { status, username } = snapshot.data();

                        setPrivateChannelStatus(channel.id, status);
                        setPrivateChannelUsername(channel.id, username);
                    });
                });

                return;
            }

            if (type === 'modified') {
                console.log(channel.data());

                return;
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
    a.id = 'private-channel-' + channel_id;
    a.setAttribute('onclick', `loadPrivateChannelFromId(${channel_id});`)
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
                        <rect class="userStatus" x="22" y="22" width="10" height="10" class="pointerEvents-2zdfdO" fill="#43B581" mask="url(#svg-mask-status-online)"></rect>
                    </svg>
                </div>
            </div>
            <div class="content-3QAtGj">
                <div class="nameAndDecorators-5FJ2dg">
                    <div class="name-uJV0GL">
                        <div class="overflow-WK9Ogt"></div>
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

    // Close private channel button
    a.querySelectorAll('.closeButton-2GCmT5')[0].onclick = () => {
        closePrivateChannel(channel_id);
    }
}


/**
 * 
 * @param {*} uid 
 * @param {*} channelId 
 */
 function setPrivateChannelStatus(channel_id, status) {
    const channel = document.getElementById(`private-channel-${channel_id}`);
    const header = document.getElementById(`private-header-${channel_id}`);
    const channelStatus = channel.querySelectorAll('.userStatus')[0];
    const headerStatus = header.querySelectorAll('.userStatus')[0];

    status = (status.offline) ? 'offline' : status.code;

    channelStatus.setAttribute('fill', STATUS_COLOURS[status]);
    channelStatus.setAttribute('mask', `url(#svg-mask-status-${status})`);
    headerStatus.setAttribute('fill', STATUS_COLOURS[status]);
    headerStatus.setAttribute('mask', `url(#svg-mask-status-${status})`);
}


/**
 * 
 * @param {*} uid 
 * @param {*} channelId 
 */
function setPrivateChannelUsername(channel_id, username) {
    const channel = document.getElementById(`private-channel-${channel_id}`);
    const chat = document.getElementById(channel_id);

    channel.setAttribute('ptitle', `@${username}`);
    channel.querySelectorAll('.overflow-WK9Ogt')[0].innerText = username;
    chat.querySelectorAll('.title-29uC1r')[0].innerText = username;
    chat.querySelectorAll('.header-3uLluP')[0].innerText = username;
    chat.querySelectorAll('.placeholder-37qJjk')[0].innerText =`Message @${username}`;
    chat.querySelectorAll('.description-1sDbzZ')[0].querySelectorAll('strong')[0].innerText = '@' + username;
}


/**
 * 
 */
 function toggleSelectedPrivateChannel(channelId) {
    document.querySelectorAll('.channel-2QD9_O').forEach(element => {
        element.classList.remove('selected-aXhQR6');
    });

    document.getElementById(channelId).classList.add('selected-aXhQR6');
}


/**
 * 
 */
async function selectPrivateChannel(channel_id) {
    toggleSelectedPrivateChannel(`private-channel-${channel_id}`);

    channel_id = channel_id.toString(); // Not sure why it sometimes returns an int
    
    if (channel_id === 'friends') return; // Don't load messages for friends channel
    if (CACHED_PRIVATE_CHAT_LISTENERS[channel_id]) return; // If listener already exists

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
    delete CACHED_PRIVATE_CHAT_LISTENERS[channel_id];

    // Determine if the selected user is being removed,
    // select the first user in the list.
    const channelList = document.getElementById('privateChannelsList');
    const channel = document.getElementById('private-channel-' + channel_id);

    channelList.removeChild(channel);

    let id = 'friends';

    if (channelList.childElementCount > 0) {
        id = channelList.children[0].id.replace('private-channel-', '');
    }

    loadPrivateChannelFromId(id);
}