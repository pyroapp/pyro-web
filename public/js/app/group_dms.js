//? ------------------------------------------------------------------------------------
//?
//?  /app/group_dms.js
//?  Pyro Chat
//?
//?  Developed by Pyro Communications LLC
//?  Copyright (c) 2021 Pyro Communications LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


/**
 * 
 */
async function showGroupDMModal(friend_uid) {
    const layer = document.querySelectorAll('.layerContainer-yqaFcK')[0];

    layer.innerHTML = `
        <div class="backdropWithLayer-3_uhz4 fadeIn-dk023d" style="opacity: 0.85; background-color: rgb(0, 0, 0); transform: translateZ(0px);" onclick="hideModals()"></div>
        <div class="layer-2KE1M9 fadeIn-efi30">
            <div class="focusLock-Ns3yie">
                <div class="modalRoot-1Kx4Hb root-1gCeng small-3iVZYw fullscreenOnMobile-1bD22y" style="opacity: 1; transform: scale(1);">
                    <div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6 header-1TKi98 headerContainer-3N-yWX" style="flex: 0 0 auto;">
                        <div class="header-3C6qT5" style="padding-top: 10px;">
                            <h4 class="headerText-2uyvpY">Create a Group Chat</h4>
                        </div>
                    </div>
                    <div class="content-1LAB8Z thin-1ybCId scrollerBase-289Jih" style="overflow: hidden scroll; padding-right: 8px;">
                        <div role="combobox" aria-controls="uid_1" aria-haspopup="listbox" aria-expanded="true" aria-owns="uid_1">
                            <div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 header-1TKi98" id="1231" style="flex: 0 0 auto;">
                                <h4 class="colorStandard-2KCXvj size14-e6ZScH h4-AQvcAz title-3sZWYQ defaultColor-1_ajX0 defaultMarginh4-2vWMG5">Select Friends</h4>
                                <div class="colorStandard-2KCXvj size12-3cLvbJ subtitle-2P4u9v marginTop4-2BNfKC"></div>
                                <div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 searchBar-1Vaz-O marginTop20-3TxNs6 hidden" style="flex: 1 1 auto;">
                                    <div class="searchBarComponent-yxeVIL container-2XeR5Z medium-2-DE5M">
                                        <div class="inner-3ErfOT thin-1ybCId scrollerBase-289Jih" dir="ltr" style="overflow: hidden scroll; padding-right: 0px;">
                                            <input class="input-1Rv96N" type="text" spellcheck="false" placeholder="Type the username of a friend" aria-activedescendant="user-row-0" aria-autocomplete="list" aria-controls="uid_1" value="">
                                            <div style="position: absolute; pointer-events: none; min-height: 0px; min-width: 1px; flex: 0 0 auto; height: 1px;"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="scroller-hUf6zQ thin-1ybCId scrollerBase-289Jih fade-2kXiP2" style="overflow: hidden scroll; padding-right: 0px; min-height: 200px;">
                                <div class="content-3YMskv">
                                    <div class="friendWrapper-2SrUFF"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex-1xMQg5 flex-1O1GKY horizontalReverse-2eTKWD horizontalReverse-3tRjY7 flex-1O1GKY directionRowReverse-m8IjIq justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 footer-2gL1pp" style="flex: 0 0 auto;">
                        <button class="button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeMedium-1AC_Sl grow-q77ONN" disabled>
                            <div class="contents-18-Yxp">Create</div>
                        </button>
                        <button class="button-38aScr lookLink-9FtZy- cancelButton-2O3h8t sizeMedium-1AC_Sl grow-q77ONN" onclick="hideModals()">
                            <div class="contents-18-Yxp">Cancel</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    const subtitle = layer.querySelectorAll('.subtitle-2P4u9v')[0];
    const button = layer.querySelectorAll('.button-38aScr')[0];

    subtitle.innerText = `You can add ${GROUP_DMS_USER_THRESHOLD} more friends.`;

    // Load friends list
    const friendList = document.querySelectorAll('.friendWrapper-2SrUFF')[0];
    const friends = await getFriends();
    const selectedFriends = [];

    button.onclick = () => {
        const { uid } = firebase.auth().currentUser;

        selectedFriends.push(friend_uid);
        selectedFriends.push(uid);

        createGroupChat(selectedFriends);
        hideModals();
    }

    friends.forEach(friend => {
        if (friend_uid === friend) return;

        const div = document.createElement('div');

        div.classList = 'flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6 friend-3KALPe';
        div.style = 'flex: 1 1 auto; margin-bottom: 4px;';
        div.setAttribute('uid', friend);
        div.innerHTML = `
            <div class="avatar-vr5NCN wrapper-3t9DeA" style="width: 32px; height: 32px;">
                <svg width="40" height="32" viewBox="0 0 40 32" class="mask-1l8v16 svg-2V3M55">
                    <foreignObject x="0" y="0" width="32" height="32" mask="url(#svg-mask-avatar-status-round-32)">
                        <div class="avatarStack-2Dr8S9">
                            <img src="${getAvatar(friend)}" class="avatar-VxgULZ">
                        </div>
                    </foreignObject>
                    <rect width="10" height="10" x="22" y="22" fill="#747f8d" mask="url(#svg-mask-status-online)" class="pointerEvents-2zdfdO RT_status"></rect>
                </svg>
            </div>
            <div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignBaseline-LAQbso noWrap-3jynv6 match-23yWrF" style="flex: 1 1 auto; height: 100%; padding-top: 8px;">
                <strong class="colorStandard-2KCXvj size14-e6ZScH nickname-O95uts RT_username"></strong>
                <div class="discordTag-X7dpau nameTag-m8r81H RT_discriminator"></div>
            </div>
            <label class="checkboxWrapper-SkhIWG alignCenter-MrlN6q" style="margin-top: 1px;">
                <div class="checkbox-1ix_J3 flexCenter-3_1bcw flex-1O1GKY justifyCenter-3D2jYp alignCenter-1dQNNs box-mmYMsp" checked="false" style="width: 24px; height: 24px;">
                    <svg width="18" height="18" viewBox="0 0 24 24" class="hidden">
                        <path fill="#ffffff" fill-rule="evenodd" clip-rule="evenodd" d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 7.00003L19.5899 5.59003L8.99991 16.17Z"></path>
                    </svg>
                </div>
            </label>
        `;

        friendList.appendChild(div);

        // Checkbox click
        const checkbox = div.querySelectorAll('.checkbox-1ix_J3')[0];

        function checkboxToggle() {
            const notSelected = checkbox.classList.contains('checked-3_4uQ9');

            if (!notSelected) {
                const left = GROUP_DMS_USER_THRESHOLD - selectedFriends.length;

                if (left === 0) {
                    return `You have reached the ${GROUP_DMS_USER_THRESHOLD} user limit.`;
                }

                selectedFriends.push(friend);

                subtitle.innerText = `You can add ${left - 1} more friends.`;

            } else {
                const index = selectedFriends.indexOf(friend);

                selectedFriends.splice(index, 1);

                const left = GROUP_DMS_USER_THRESHOLD - selectedFriends.length;

                subtitle.innerText = `You can add ${left} more friends.`;
            }

            if (selectedFriends.length > 0) {
                enableButton(button);
            } else {
                disableButton(button);
            }

            checkbox.setAttribute('selected', notSelected);
            checkbox.classList.toggle('checked-3_4uQ9');
        }

        div.querySelectorAll('.match-23yWrF')[0].onclick = () => {
            checkboxToggle();
        }

        checkbox.onclick = () => {
            checkboxToggle();
        }

        setRealtimeUserInfo(friend);
    });
}


/**
 * 
 * @param {*} friends 
 */
async function createGroupChat(friends) {
    const group_id = generateId();
    const { uid } = firebase.auth().currentUser;

    // Get list of user usernames
    const usernames = [];

    friends.forEach(friend => {
        usernames.push(CACHED_USERS[friend].username);
    });

    // Upload channel picture
    // Picture is uploaded first to ensure when the channel is shown,
    // an avatar appears and does not error out
    await uploadDefaultAvatar(group_id);

    // Create channel
    await firebase.firestore().collection('channels').doc(group_id).set({
        owner: uid,
        name: usernames.join(', '),
        type: 'GROUP_DM',
        recipients: friends,
        created: getTime(),
    });
}


/**
 * 
 * @param {*} channel_id 
 */
function addGroupChatChannel(channel_id) {
    const channelsList = document.getElementById('groupChatsList');

    const a = document.createElement('a');
    a.classList = 'channel-2QD9_O container-2Pjhx- clickable-1JJAn8 fadeIn-efi30';
    a.id = 'channel-' + channel_id;
    a.setAttribute('channel', channel_id);
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
                        <foreignObject x="0" y="0" width="32" height="32" mask="url(#svg-mask-avatar-default)">
                            <img src="${getAvatar(channel_id)}" class="avatar-VxgULZ">
                        </foreignObject>
                    </svg>
                </div>
            </div>
            <div class="content-3QAtGj">
                <div class="nameAndDecorators-5FJ2dg">
                    <div class="name-uJV0GL">
                        <div class="overflow-WK9Ogt RT_name"></div>
                    </div>
                </div>
                <div class="subText-1KtqkB">
                    <div class="activity-525YDR subtext-1RtU34">
                        <div class="activityText-OW8WYb"></div>
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

    // Leave group chat
    a.querySelectorAll('.closeButton-2GCmT5')[0].onclick = () => {
        showLeaveGroupChatConfirmationModal(channel_id);
    }

    channelsList.appendChild(a);
}


/**
 * 
 * @param {*} channel_id 
 */
function showLeaveGroupChatConfirmationModal(channel_id) {
    const layer = document.querySelectorAll('.layerContainer-yqaFcK')[0];
    const { name } = CACHED_GROUP_CHAT_CHANNELS[channel_id];

    layer.innerHTML = `
        <div class="backdropWithLayer-3_uhz4 fadeIn-dk023d" style="opacity: 0.85; background-color: rgb(0, 0, 0); transform: translateZ(0px);" onclick="hideModals()"></div>
        <div class="layer-2KE1M9 fadeIn-efi30">
            <div class="focusLock-Ns3yie">
                <div class="modalRoot-1Kx4Hb root-1gCeng small-3iVZYw fullscreenOnMobile-1bD22y" style="opacity: 1; transform: scale(1);">
                    <div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6 header-1TKi98 headerContainer-3N-yWX" style="flex: 0 0 auto;">
                        <div class="header-3C6qT5" style="padding-top: 10px;">
                            <h4 class="headerText-2uyvpY">Leave '${name}'</h4>
                        </div>
                    </div>
                    <div class="content-1LAB8Z thin-1ybCId scrollerBase-289Jih" style="overflow: hidden scroll; padding-right: 8px;">
                        <div>
                            <div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 header-1TKi98" id="1231" style="flex: 0 0 auto;">
                                <div class="content-1LAB8Z content-mK72R6 thin-1ybCId scrollerBase-289Jih" style="overflow: hidden scroll; padding-right: 8px;">
                                    <div class="colorStandard-2KCXvj size16-1P40sf">Are you sure you want to leave <strong>${name}</strong>? You won't be able to rejoin this group unless you are re-invited.</div>
                                    <div style="position: absolute; pointer-events: none; min-height: 0px; min-width: 1px; flex: 0 0 auto; height: 20px;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex-1xMQg5 flex-1O1GKY horizontalReverse-2eTKWD horizontalReverse-3tRjY7 flex-1O1GKY directionRowReverse-m8IjIq justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 footer-2gL1pp" style="flex: 0 0 auto;">
                        <button class="button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeMedium-1AC_Sl grow-q77ONN">
                            <div class="contents-18-Yxp">Leave Group</div>
                        </button>
                        <button class="button-38aScr lookLink-9FtZy- cancelButton-2O3h8t sizeMedium-1AC_Sl grow-q77ONN" onclick="hideModals()">
                            <div class="contents-18-Yxp">Cancel</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // TODO: Add button load
    layer.querySelectorAll('.button-38aScr')[0].onclick = async () => {
        await leaveGroupChat(channel_id);
        hideModals();
    }
}


/**
 * 
 * @param {*} channel_id 
 */
async function leaveGroupChat(channel_id) {
    const { uid } = firebase.auth().currentUser; 
    const { owner: temp_owner, recipients } = CACHED_GROUP_CHAT_CHANNELS[channel_id];

    // Check how many recipients are left, if there are none left
    // delete the group chat
    if (recipients.length - 1 <= 0) {
        return firebase.firestore().collection('channels').doc(channel_id).delete();
    }

    // If user is the owner, assign owner to the next person in the list
    let owner = temp_owner;

    if (temp_owner === uid) {
        recipients.slice(recipients.indexOf(uid), 1);
        owner = recipients[0];
    }

    firebase.firestore().collection('channels').doc(channel_id).update({
        recipients: firebase.firestore.FieldValue.arrayRemove(uid),
        owner: owner
    });

    // TODO: Send leave message on group chat
}


/**
 * 
 * @param {*} channel_id 
 */
function showOwnerGroupChatSettings(channel_id) {
    const { uid } = firebase.auth().currentUser;
    const { owner } = CACHED_GROUP_CHAT_CHANNELS[channel_id];

    const chat = document.getElementById(channel_id);
    const button = chat.querySelector('.groupChatSettings-j0932f');

    // Show or hide the settings button depending on if they are the owner
    if (uid === owner) {
        button.classList.remove('hidden');
    } else {
        button.classList.add('hidden');
    }

    button.onclick = () => showGroupChatChangeNameModal(channel_id);
}


/**
 * 
 * @param {*} id 
 */
function selectMainBody(id) {
    const mainBodies = document.querySelectorAll('.mainBody-f3wd0');

    mainBodies.forEach(body => {
        body.classList.add('hidden');
    });

    const selectedBody = document.getElementById(id);

    selectedBody.classList.remove('hidden');
}


/**
 * 
 * @param {*} channel_id 
 */
function showGroupChatChangeNameModal(channel_id) {
    const layer = document.querySelectorAll('.layerContainer-yqaFcK')[0];

    layer.innerHTML = `
        <div class="backdropWithLayer-3_uhz4 fadeIn-dk023d" style="opacity: 0.85; background-color: rgb(0, 0, 0); transform: translateZ(0px);" onclick="hideModals()"></div>
        <div class="layer-2KE1M9 fadeIn-efi30">
            <div class="focusLock-Ns3yie">
                <div class="modalRoot-1Kx4Hb root-1gCeng small-3iVZYw fullscreenOnMobile-1bD22y" style="opacity: 1; transform: scale(1);">
                    <div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6 header-1TKi98 headerContainer-3N-yWX" style="flex: 0 0 auto;">
                        <div class="header-3C6qT5" style="padding-top: 10px;">
                            <h4 class="headerText-2uyvpY">Update Group Chat</h4>
                        </div>
                    </div>
                    <div class="content-1LAB8Z thin-1ybCId scrollerBase-289Jih" style="overflow: hidden scroll; padding-right: 8px;">
                        <div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 header-1TKi98" id="1231" style="flex: 0 0 auto;">
                            <div class="content-1LAB8Z content-mK72R6 thin-1ybCId scrollerBase-289Jih" style="overflow: hidden scroll; padding-right: 8px;">
                                
                                <!-- <div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 marginBottom40-2vIwTv" style="flex: 1 1 auto;">
                                    <div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyBetween-2tTqYu alignStretch-DpGPf3 noWrap-3jynv6">
                                        <div class="flexChild-faoVW3" style="flex: 1 1 auto;">
                                            <div class="avatarUploader-3XDtmn avatarUploader-2yeaMv">
                                                <div class="avatarUploaderInner-3UNxY3 avatarUploaderInner-3SDRO_" style="background-image: url(${getAvatar(channel_id)});">
                                                    <div class="avatarUploaderHint-3SN212">Change Icon</div>
                                                    <div class="fileInput-23-d-3" tabindex="0" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; opacity: 0; cursor: pointer;"></div>
                                                    <div class="avatarUploaderIndicator-2G-aIZ"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStart-H-X2h- noWrap-3jynv6">
                                            <div class="colorStandard-2KCXvj size14-e6ZScH description-3_Ncsb formText-3fs7AJ marginBottom8-AtZOdT modeDefault-3a2Ph1" style="margin-top: auto; margin-bottom: auto;">We recommend an image of at least 512x512 for the server.</div>
                                        </div>
                                    </div>
                                </div> -->

                                <div class="marginBottom20-32qID7">
                                    <h5 class="colorStandard-2KCXvj size14-e6ZScH h5-18_1nd title-3sZWYQ defaultMarginh5-2mL-bP">Group Chat Name</h5>
                                    <div class="inputWrapper-31_8H8">
                                        <input class="inputDefault-_djjkz input-cIJ7To" type="text" maxlength="100">
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="flex-1xMQg5 flex-1O1GKY horizontalReverse-2eTKWD horizontalReverse-3tRjY7 flex-1O1GKY directionRowReverse-m8IjIq justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 footer-2gL1pp" style="flex: 0 0 auto;">
                        <button class="button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeMedium-1AC_Sl grow-q77ONN" disabled>
                            <div class="contents-18-Yxp">Save</div>
                        </button>
                        <button class="button-38aScr lookLink-9FtZy- cancelButton-2O3h8t sizeMedium-1AC_Sl grow-q77ONN" onclick="hideModals()">
                            <div class="contents-18-Yxp">Cancel</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    const nameField = layer.querySelector('.input-cIJ7To');
    const saveBtn = layer.querySelectorAll('.button-38aScr')[0];

    // Enable and disable button depending on text input
    nameField.oninput = () => {
        if (nameField.value.length > 5) {
            enableButton(saveBtn);
        } else {
            disableButton(saveBtn);
        }
    }

    // Update group chat name
    nameField.onkeydown = async event => {
        if (event.key === 'Enter' && nameField.value.length > 5) {
            updateName();
        }
    }

    saveBtn.onclick = () => {
        updateName();
    }

    const updateName = () => {
        disableButton(saveBtn);
        changeGroupChatName(channel_id, nameField.value);
        hideModals();
    }
}


/**
 * 
 * @param {*} channel_id 
 */
async function changeGroupChatName(channel_id, name) {
    firebase.firestore().collection('channels').doc(channel_id).update({
        name: name
    });
}


/**
 * 
 */
function loadGroupChannels() {
    const { uid } = firebase.auth().currentUser;

    firebase.firestore().collection('channels')
    .where('recipients', 'array-contains', uid)
    .where('type', '==', 'GROUP_DM')
    .limit(50)
    .onSnapshot(snapshot => {
        const gcHeader = document.querySelectorAll('.headerText-2F0828')[1];
        
        // Hide group chats header if none exist
        if (snapshot.empty) {
            gcHeader.classList.add('hidden');
        } else {
            gcHeader.classList.remove('hidden');
        }

        snapshot.docChanges().forEach(async change => {
            const { type, doc: channel } = change;
            const { recipients } = channel.data();

            if (type === 'added') {
                addChat({ type: 'GROUP', channel_id: channel.id });
                addGroupChatChannel(channel.id);
            }

            if (type === 'modified') {
                const { recipients: previousNumberOfUsers } = CACHED_GROUP_CHAT_CHANNELS[channel.id];
                const updatedNumberOfUsers = recipients;

                // If the updated number of users is less than the previous number
                // of users then a user has been deleted  
                if (updatedNumberOfUsers.length < previousNumberOfUsers.length) {
                    const difference = getArrayDifference(updatedNumberOfUsers, previousNumberOfUsers);

                    // Remove users who have left or been removed from the group chat
                    difference.forEach(user => {
                        if (user === 'remove') return;

                        const usersList = document.getElementById(`userslist-${channel.id}`);
                        const userItem = document.getElementById(`useritem-${channel.id}-${user}`);

                        usersList.removeChild(userItem);
                    });

                    showOwnerGroupChatSettings(channel.id);
                }
            }

            // Channel was either added or changed
            if (type === 'added' || type === 'modified') {
                document.getElementById(`channel-${channel.id}`).querySelectorAll('.activityText-OW8WYb')[0].innerText = recipients.length.toString() + ' Members';

                CACHED_GROUP_CHAT_CHANNELS[channel.id] = {
                    ...channel.data()
                };

                CACHED_RECIPIENTS[channel.id] = recipients;

                // This code is a little tricky to understand, and has a particular order
                // so an explanation is below.
                
                // A channel user item is added to the user list for the channel first,
                // This is to create the user object to which a realtime user listener
                // can be attached.
                
                // If the user is already cached, it doesn't need to get their info again
                // but will connect their realtime listener to this new user item.

                // If the user has not been fetched yet, a cache of the user is added
                // and a realtime listener for that user is not attached to all elements
                // using the setRealtimeUserInfo function.
                recipients.forEach(recipient => {
                    addChannelUserItem(channel.id, recipient);

                    if (CACHED_USERS[recipient]) return setRealtimeUserInfo(recipient);

                    firebase.firestore().collection('users').doc(recipient).onSnapshot(snapshot => {
                        CACHED_USERS[recipient] = {
                            ...snapshot.data()
                        };

                        setRealtimeUserInfo(recipient);
                    });
                });

                setRealtimeChannelInfo(channel.id);
                loadGroupChatHeadingAvatars(channel.id);
                showOwnerGroupChatSettings(channel.id);
            }

            // Removed means that a field within the document has been changed.
            if (type === 'removed') {

                // Check channel recipients, if local user doesn't exist remove from DOM
                const gcList = document.getElementById('groupChatsList');
                const chatList = document.getElementById('main-body');

                const gc = document.getElementById(`channel-${channel.id}`);
                const chat = document.getElementById(channel.id);

                gcList.removeChild(gc); // Remove channel
                chatList.removeChild(chat); // Remove chat

                // Detatch listeners
                CACHED_CHAT_LISTENERS[channel.id]();
                delete CACHED_CHAT_LISTENERS[channel.id];

                loadChannelFromId('friends');
            }
        });
    });
}


/**
 * 
 * @param {*} channel_id 
 */
function addChannelUserItem(channel_id, recipient) {
    const usersList = document.getElementById(`userslist-${channel_id}`);
    const { owner } = CACHED_GROUP_CHAT_CHANNELS[channel_id];

    if (document.getElementById(`useritem-${channel_id}-${recipient}`)) return;

    const ownerCrown = (owner === recipient) ? '<svg class="ownerIcon-2NH9FM icon-1A2_vz" width="24" height="24" viewBox="0 0 16 16"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.6572 5.42868C13.8879 5.29002 14.1806 5.30402 14.3973 5.46468C14.6133 5.62602 14.7119 5.90068 14.6473 6.16202L13.3139 11.4954C13.2393 11.7927 12.9726 12.0007 12.6666 12.0007H3.33325C3.02725 12.0007 2.76058 11.792 2.68592 11.4954L1.35258 6.16202C1.28792 5.90068 1.38658 5.62602 1.60258 5.46468C1.81992 5.30468 2.11192 5.29068 2.34325 5.42868L5.13192 7.10202L7.44592 3.63068C7.46173 3.60697 7.48377 3.5913 7.50588 3.57559C7.5192 3.56612 7.53255 3.55663 7.54458 3.54535L6.90258 2.90268C6.77325 2.77335 6.77325 2.56068 6.90258 2.43135L7.76458 1.56935C7.89392 1.44002 8.10658 1.44002 8.23592 1.56935L9.09792 2.43135C9.22725 2.56068 9.22725 2.77335 9.09792 2.90268L8.45592 3.54535C8.46794 3.55686 8.48154 3.56651 8.49516 3.57618C8.51703 3.5917 8.53897 3.60727 8.55458 3.63068L10.8686 7.10202L13.6572 5.42868ZM2.66667 12.6673H13.3333V14.0007H2.66667V12.6673Z" fill="currentColor"></path></svg>' : '';
    
    const div = document.createElement('div');
    div.classList = "member-3-YXUe container-2Pjhx- clickable-1JJAn8";
    div.id = `useritem-${channel_id}-${recipient}`;
    div.setAttribute('uid', recipient);
    div.innerHTML = `
        <div class="layout-2DM8Md">
            <div class="avatar-3uk_u9">
                <div clas="wrapper-3t9DeA" style="width: 32px; height: 32px;">
                    <svg width="32" height="32" class="mask-1l8v16 svg-2V3M55">
                        <foreignObject x="0" y="0" width="32" height="32" mask="url(#svg-mask-avatar-status-round-32)">
                            <div class="avatarStack-2Dr8S9"><img src="${getAvatar(recipient)}" class="avatar-VxgULZ"></div>
                        </foreignObject>
                        <rect width="10" height="10" x="22" y="22" fill="#43b581" mask="url(#svg-mask-status-online)" class="pointerEvents-2zdfdO RT_status"></rect>
                    </svg>
                </div>
            </div>
            <div class="content-3QAtGj">
                <div class="nameAndDecorators-5FJ2dg">
                    <div class="name-uJV0GL"><span class="roleColor-rz2vM0 RT_username"></span></div>${ownerCrown}</div>
                <div class="subText-1KtqkB"></div>
            </div>
        </div>
    `;

    usersList.appendChild(div);
}


/**
 * 
 * @param {*} channel_id 
 */
function loadGroupChatHeadingAvatars(channel_id) {
    const chat = document.getElementById(channel_id);
    const avatar_container = chat.querySelectorAll('.avatarContainer-3cVycu')[0];
    
    avatar_container.innerHTML = ""; // Clear existing avatars

    const { recipients } = CACHED_GROUP_CHAT_CHANNELS[channel_id];
    let i = 0;

    recipients.forEach(recipient => {
        if (i === recipients.length - 1) {
            avatar_container.innerHTML += `
                <img src="${getAvatar(recipient)}" uid=${recipient} class="avatar-3z61ij">
            `;

            return i++;
        }

        avatar_container.innerHTML += `
            <svg width="24" height="24" class="avatarMask-2SqW1n" viewBox="0 0 24 24" uid=${recipients}>
                <foreignObject x="0" y="0" width="24" height="24" mask="url(#svg-mask-voice-user-summary-item)">
                    <img src="${getAvatar(recipient)}" class="avatar-3z61ij">
                </foreignObject>
            </svg>
        `;

        i++;
    });
}


/**
 * 
 * @param {*} channel_id 
 */
function setRealtimeChannelInfo(channel_id) {
    const elements = document.querySelectorAll(`[channel="${channel_id}"]`);

    elements.forEach(element => {
        const nameEl = element.querySelectorAll('.RT_name');
        const { name } = CACHED_GROUP_CHAT_CHANNELS[channel_id];

        nameEl.forEach(n => {
            n.innerText = name;
        });
    });
}