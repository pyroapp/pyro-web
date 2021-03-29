//? ------------------------------------------------------------------------------------
//?
//?  /me/privatechannels.js
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
 */
async function initialisePrivateChannelFetch() {
    const { uid } = firebase.auth().currentUser;

    firebase.firestore().collection('subscribed_private').doc(uid).onSnapshot(async channels => {
        const channelDOM = document.getElementById(``);
        const privateChannels = [];

        if (channelDOM) return; // Channel already exists in the DOM
        if (!channels.data()) return privateChannels;

        // Iterate through each channel
        for (channelId in channels.data()) {
            const channel = channels.data()[channelId];
            
            // If the channel is open
            if (channel) {

                // Get channel info
                const channelData = await firebase.firestore().collection('private_channels').doc(channelId).get();
            
                privateChannels.push({
                    ...channelData.data(),
                    id: channelId,
                });

                // Populate cache with friends data
                const { uid } = firebase.auth().currentUser;

                channelData.data().users.forEach(async userId => {
                    if (uid === userId) return;

                    // Create a listener to get realtime updates on all users
                    await firebase.firestore().collection('users').doc(userId).onSnapshot(snapshot => {
                        CACHED_USERS[snapshot.id] = {
                            ...snapshot.data().profile
                        };
                    });
                });
            }
        }

        // Sort channels
        privateChannels.sort(sortObjectByKey('last_messaged'));

        loadPrivateChannels(privateChannels);
    });
}



/**
 * 
 */
function loadPrivateChannels(channels) {
    if (!channels) return addPrivateChannelPlaceholder();

    channels.forEach(channel => {
        if (channel.group) return; // TODO: Add group support

        // Get friends uid
        const { uid } = firebase.auth().currentUser;

        channel.users.remove(uid);

        const friendUID = channel.users[0];

        addPrivateChannel(channel.id, friendUID);
        addChat(channel.id, friendUID);
        loadPrivateChannelStatus(friendUID, channel.id);
        loadPrivateChannelUsername(friendUID, channel.id);

        console.log(channel);
    });
}


/**
 * 
 * @param {*} uid 
 * @param {*} channelId 
 */
function loadPrivateChannelStatus(uid, channelId) {
    firebase.firestore().collection('users').doc(uid).onSnapshot(data => {
        const status = data.data().status.status;

        const channel = document.getElementById(`private-channel-${channelId}`);
        const header = document.getElementById(`private-header-${channelId}`);
        const channelStatus = channel.querySelectorAll('.userStatus')[0];
        const headerStatus = header.querySelectorAll('.userStatus')[0];

        channelStatus.setAttribute('fill', STATUS_COLOURS[status]);
        channelStatus.setAttribute('mask', `url(#svg-mask-status-${status})`);
        headerStatus.setAttribute('fill', STATUS_COLOURS[status]);
        headerStatus.setAttribute('mask', `url(#svg-mask-status-${status})`);
    });
}


/**
 * 
 * @param {*} uid 
 * @param {*} channelId 
 */
function loadPrivateChannelUsername(uid, channelId) {
    firebase.firestore().collection('users').doc(uid).onSnapshot(data => {
        const username = data.data().profile.username;
        
        const channel = document.getElementById(`private-channel-${channelId}`);
        const chat = document.getElementById(channelId);

        channel.setAttribute('ptitle', `@${username}`);
        channel.querySelectorAll('.overflow-WK9Ogt')[0].innerText = username;
        chat.querySelectorAll('.title-29uC1r')[0].innerText = username;
        chat.querySelectorAll('.header-3uLluP')[0].innerText = username;
        chat.querySelectorAll('.placeholder-37qJjk')[0].innerText =`Message @${username}`;
        chat.querySelectorAll('.description-1sDbzZ')[0].querySelectorAll('strong')[0].innerText = '@' + username;

        CACHED_USERS[uid] = {
            ...data.data().profile
        };
    });
}


/**
 * 
 * @param {*} uid 
 * @param {*} status 
 * @returns 
 */
 function setPrivateChannelStatus(channelId, status) {
    if (!status) return;

    // TODO: When friend is removed, socket is not disposed.
    const channel = document.getElementById('private-channel-' + channelId);
    const userStatus = channel.querySelectorAll('.userStatus')[0];

    userStatus.setAttribute('fill', STATUS_COLOURS[status]);
    userStatus.setAttribute('mask', `url(#svg-mask-status-${status})`);
}


/**
 * 
 * @param {*} channelId 
 */
async function removePrivateChannel(channelId) {
    const channelList = document.getElementById('privateChannelsList');
    const channel = document.getElementById('private-channel-' + channelId);

    channelList.removeChild(channel);
}


/**
 * 
 * @param {*} channelId 
 */
async function closePrivateChannel(channelId) {
    const { uid } = firebase.auth().currentUser;

    await firebase.firestore().collection('subscribed_private').doc(uid).update({
        [channelId]: false
    });

    removePrivateChannel(channelId);

    // Determine if the selected user is being removed,
    // select the first user in the list.
    const channelList = document.getElementById('privateChannelsList');

    let id = 'friends';

    if (channelList.childElementCount > 0) {
        id = channelList.children[0].id.replace('private-channel-', '');
    }

    loadPrivateChannelFromId(id);
}


/**
 * 
 */
function deselectAll() {
    const elements = document.querySelectorAll('.channel-2QD9_O');

    elements.forEach(element => {
        element.classList.remove('selected-aXhQR6');
    });
}


/**
 * 
 */
function selectPrivateChannel(id) {
    const channel = document.getElementById('private-channel-' + id);

    deselectAll();
    channel.classList.add('selected-aXhQR6');

    if (id === 'friends') return;
    if (channel.getAttribute('message-listener')) return;

    const ref = firebase.firestore().collection('private_messages').doc(id.toString());
    
    ref.onSnapshot(messages => {
        loadPrivateMessages(messages.data(), messages.id);
    });

    channel.setAttribute('message-listener', true);
}


/**
 * 
 */
 function addPrivateChannelPlaceholder() {
    const channelsList = document.getElementById('privateChannelsList');

    channelsList.insertAdjacentHTML('afterbegin', `
        <svg width="184" height="428" viewBox="0 0 184 428" class="empty-388osJ" id="privateChannelPlaceholder">
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
    `);
}


/**
 * 
 * @param {*} uid 
 */
 function addPrivateChannel(channelId, uid) {
    const channelsList = document.getElementById('privateChannelsList');

    const a = document.createElement('a');
    a.classList = 'channel-2QD9_O container-2Pjhx- clickable-1JJAn8 fadeIn-efi30';
    a.id = 'private-channel-' + channelId;
    a.setAttribute('onclick', `loadPrivateChannelFromId(${channelId});`)
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
                            <img src="${getAvatar(uid)}" class="avatar-VxgULZ">
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
                <div class="subText-1KtqkB"></div>
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

    channelsList.appendChild(a);

    // Close private channel button
    a.querySelectorAll('.closeButton-2GCmT5').onclick = () => {
        closePrivateChannel(channelId);
    }

    console.log(channelId);
}