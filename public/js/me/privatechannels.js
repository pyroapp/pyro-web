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
 async function loadPrivateChannels() {
    const { uid } = firebase.auth().currentUser;
    const ref = firebase.database().ref(`/users/${uid}/private/`);

    addPrivateChannelPlaceholder();

    // This get all channels when first run, after that it only gets added channels
    ref.on('child_added', async channel => {
        const channelId = channel.key;
        const item = await firebase.database().ref(`/private/${channelId}/`).once('value');

        const channelsList = document.getElementById('privateChannelsList');
        const placeholder = document.getElementById('privateChannelPlaceholder');

        if (placeholder) channelsList.removeChild(placeholder);

        // Determine if it is a group chat or not
        if (item.val().type === 'dm') {
            createPrivateChannel(item.val(), channelId);
        } else {
            createPrivateGroupChannel(item.val(), channelId);
        }
    });

    ref.on('child_removed', channel => {
        const channelId = channel.key;

        removePrivateChannel(channelId);
    });
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

    // Get friends uid
    const { uid: myUID } = firebase.auth().currentUser;
    delete channel.users[myUID];

    const uid = Object.keys(channel.users)[0];
    addPrivateChannel(channelId, uid);

    await firebase.database().ref(`/presence/${uid}/`).on('value', status => {
        setPrivateChannelStatus(channelId, status.val());
    });

    await firebase.database().ref(`/users/${uid}/username/`).on('value', username => {
        setPrivateChannelUsername(channelId, username.val());
    });
}


/**
 * 
 * @param {*} channelId 
 * @param {*} username 
 */
function setPrivateChannelUsername(channelId, username) {
    const channel = document.getElementById(channelId);

    channel.querySelectorAll('.name-uJV0GL')[0].innerHTML = `
        <div class="overflow-WK9Ogt">${username}</div>
    `;

    channel.classList.remove('hidden');
}


/**
 * 
 * @param {*} channelId 
 */
function removePrivateChannel(channelId) {
    const channelList = document.getElementById('privateChannelsList');
    const channel = document.getElementById(channelId);

    channelList.removeChild(channel);
}


/**
 * 
 * @param {*} uid 
 */
function addPrivateChannel(channelId, uid) {
    const channelsList = document.getElementById('privateChannelsList');

    const a = document.createElement('a');
    a.classList = 'channel-2QD9_O container-2Pjhx- clickable-1JJAn8 hidden fadeIn-efi30';
    a.id = channelId;
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
                    <div class="name-uJV0GL"></div>
                </div>
                <div class="subText-1KtqkB"></div>
            </div>
            <div class="children-gzQq2t hidden">
                <div class="closeButton-2GCmT5" onclick="deletePrivateChannel(uid)">
                    <svg class="closeIcon-rycxaQ" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path>
                    </svg>
                </div>
            </div>
        </div>
    `;

    channelsList.insertAdjacentElement('afterbegin', a);
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
function selectChannel(channelId) {
    const channel = document.getElementById(channelId);

    channel.classList.add('selected-aXhQR6');
}


/**
 * 
 * @param {*} channelId 
 */
function changeChannel(channel) {
    const channelId = channel.id;
    const friendUID = channel.uid;

    deselectAll();
    selectChannel(channelId);

    const privateMessagesPath = `/channels/@me/${channelId}`;
    const privateMessagesTitle = `@Username`;

    window.history.pushState(privateMessagesPath, privateMessagesTitle, privateMessagesPath);
    document.title = privateMessagesTitle;

    // Check if direct messages page already exists in the DOM, it not,
    // add a new page, loading all the content required
}