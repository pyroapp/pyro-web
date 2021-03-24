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
function loadPrivateChannels() {
    const { uid } = firebase.auth().currentUser;

    const ref = firebase.firestore().collection('sub_priv_channels').doc(uid);

    addPrivateChannelPlaceholder();

    ref.onSnapshot(privChannels => {
        if (!privChannels.data()) return;

        for (channelId in privChannels.data()) {
            const isOpen = privChannels.data()[channelId];

            if (!isOpen) return; // Channel is closed

            const privateChannel = document.getElementById(`privatechannel-${channelId}`);

            if (!privateChannel) privateChannelCreationHandler(channelId);
        }
    });
}


/**
 * 
 * @param {*} channelId 
 */
async function privateChannelCreationHandler(channelId) {
    const channelsList = document.getElementById('privateChannelsList');
    const placeholder = document.getElementById('privateChannelPlaceholder');

    if (placeholder) channelsList.removeChild(placeholder);

    const { details, type} = await (
        await firebase.firestore().collection('priv_channels').doc(channelId).get()
    ).data();

    // Determine if it is a group chat or not
    if (type === 'dm') {
        createPrivateChannel(details, channelId);
    } else {
        createPrivateGroupChannel(details, channelId);
    }
}


/**
 * 
 * @param {*} channel 
 */
function createPrivateGroupChannel(channel, channelId) {
    console.log(channel, channelId);
}


/**
 * 
 * @param {*} channel 
 */
async function createPrivateChannel(channel, channelId) {
    const { uid } = firebase.auth().currentUser;
    const localPosition = channel.users.indexOf(uid);

    channel.users.splice(localPosition, localPosition + 1);

    const friendUID = channel.users[0];

    addPrivateChannel(channelId, friendUID);
    addChat(channelId, friendUID);

    await firebase.firestore().collection('users').doc(friendUID).onSnapshot(data => {
        setPrivateChannelStatus(channelId, data.data().status.status);
        setHeaderStatus(channelId, data.data().status.status);

        setPrivateChannelUsername(channelId, data.data().profile.username);
        setHeaderUsername(channelId, data.data().profile.username);
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
    const channel = document.getElementById('privatechannel-' + channelId);
    const userStatus = channel.querySelectorAll('.userStatus')[0];

    userStatus.setAttribute('fill', STATUS_COLOURS[status]);
    userStatus.setAttribute('mask', `url(#svg-mask-status-${status})`);
}


/**
 * 
 * @param {*} channelId 
 * @param {*} username 
 */
async function setPrivateChannelUsername(channelId, username) {
    const channel = document.getElementById('privatechannel-' + channelId);

    channel.setAttribute('ptitle', `@${username}`);
    channel.querySelectorAll('.overflow-WK9Ogt')[0].innerText = username;

    await delay(50);

    channel.classList.remove('hidden');
}


/**
 * 
 * @param {*} channelId 
 */
async function removePrivateChannel(channelId) {
    const channelList = document.getElementById('privateChannelsList');
    const channel = document.getElementById('privatechannel-' + channelId);

    channelList.removeChild(channel);
}


/**
 * 
 * @param {*} channelId 
 */
async function closePrivateChannel(channelId) {
    const { uid } = firebase.auth().currentUser;

    await firebase.firestore().collection('sub_priv_channels').doc(uid).update({
        [channelId]: false
    });

    removePrivateChannel(channelId);

    // Determine if the selected user is being removed,
    // select the first user in the list.
    const channelList = document.getElementById('privateChannelsList');

    let id = 'friends';

    if (channelList.childElementCount > 0) {
        id = channelList.children[0].id.replace('privatechannel-', '');
    }

    selectPrivateChannel(id);
    selectMainBody(id);
}


/**
 * 
 * @param {*} uid 
 */
function addPrivateChannel(channelId, uid) {
    const channelsList = document.getElementById('privateChannelsList');

    const a = document.createElement('a');
    a.classList = 'channel-2QD9_O container-2Pjhx- clickable-1JJAn8 hidden fadeIn-efi30';
    a.id = 'privatechannel-' + channelId;
    a.setAttribute('uid', uid);
    a.setAttribute('onclick', 'changeChannel(this)');
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

    const closeButton = a.querySelectorAll('.closeButton-2GCmT5')[0];
    
    closeButton.onclick = () => {
        closePrivateChannel(channelId);
    };
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
    const channel = document.getElementById('privatechannel-' + id);

    channel.classList.add('selected-aXhQR6');
}


/**
 * 
 * @param {*} channelId 
 */
function changeChannel(channel) {
    const id = channel.id.replace('privatechannel-', '');

    let path = `/channels/@me/${id}`;
    let title = channel.getAttribute('ptitle');

    if (id === 'friends') {
        path = '/channels/@me/';
        title = 'Discord';
    }

    deselectAll();
    selectMainBody(id);
    selectPrivateChannel(id);

    window.history.pushState(path, title, path);
    document.title = title;
}