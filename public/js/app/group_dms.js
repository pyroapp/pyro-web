//? ------------------------------------------------------------------------------------
//?
//?  /app/group_dms.js
//?  Pyro Chat
//?
//?  Developed by Robolab LLC
//?  Copyright (c) 2021 Robolab LLC. All Rights Reserved
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
async function addGroupChannel(channel_id) {
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
 * @param {*} channel_id 
 */
function addGroupChat(channel_id) {
    const div = document.createElement('div');
    div.classList = 'chat-3bRxxu mainBody-f3wd0 hidden';
    div.id = channel_id;
    div.setAttribute('channel', channel_id);
    div.innerHTML = `
        <section class="title-3qD0b- container-1r6BKw themed-ANHk51" id="private-header-${channel_id}">
            <div class="children-19S4PO">
                <div class="iconWrapper-2OrFZ1">
                <svg x="0" y="0" class="icon-22AiRD" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M14 8.00598C14 10.211 12.206 12.006 10 12.006C7.795 12.006 6 10.211 6 8.00598C6 5.80098 7.794 4.00598 10 4.00598C12.206 4.00598 14 5.80098 14 8.00598ZM2 19.006C2 15.473 5.29 13.006 10 13.006C14.711 13.006 18 15.473 18 19.006V20.006H2V19.006Z"></path><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M14 8.00598C14 10.211 12.206 12.006 10 12.006C7.795 12.006 6 10.211 6 8.00598C6 5.80098 7.794 4.00598 10 4.00598C12.206 4.00598 14 5.80098 14 8.00598ZM2 19.006C2 15.473 5.29 13.006 10 13.006C14.711 13.006 18 15.473 18 19.006V20.006H2V19.006Z"></path><path fill="currentColor" d="M20.0001 20.006H22.0001V19.006C22.0001 16.4433 20.2697 14.4415 17.5213 13.5352C19.0621 14.9127 20.0001 16.8059 20.0001 19.006V20.006Z"></path><path fill="currentColor" d="M14.8834 11.9077C16.6657 11.5044 18.0001 9.9077 18.0001 8.00598C18.0001 5.96916 16.4693 4.28218 14.4971 4.0367C15.4322 5.09511 16.0001 6.48524 16.0001 8.00598C16.0001 9.44888 15.4889 10.7742 14.6378 11.8102C14.7203 11.8418 14.8022 11.8743 14.8834 11.9077Z"></path>
                </svg>
                </div>
                <h3 role="button" class="cursorPointer-1j7DL8 title-29uC1r base-1x0h_U size16-1P40sf RT_name"></h3>
                <div class="spacer-3kEb8l"></div>
            </div>
            <div class="toolbar-1t6TWx">
                <div class="iconWrapper-2OrFZ1 clickable-3rdHwn hidden">
                    <svg x="0" y="0" class="icon-22AiRD" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M21 3H24V5H21V8H19V5H16V3H19V0H21V3ZM10 12C12.205 12 14 10.205 14 8C14 5.795 12.205 4 10 4C7.795 4 6 5.795 6 8C6 10.205 7.795 12 10 12ZM10 13C5.289 13 2 15.467 2 19V20H18V19C18 15.467 14.711 13 10 13Z"></path>
                    </svg>
                </div>
                <div class="search-36MZv-">
                    <div class="search-2oPWTC">
                        <div class="searchBar-3dMhjb">
                            <div class="DraftEditor-root">
                                <div class="public-DraftEditorPlaceholder-root">
                                    <div class="public-DraftEditorPlaceholder-inner" style="white-space: pre-wrap;">Search</div>
                                </div>
                                <div class="DraftEditor-editorContainer">
                                    <div aria-describedby="placeholder-bjp4e" class="notranslate public-DraftEditor-content" contenteditable="true" role="textbox" spellcheck="false" style="outline: none; user-select: text; white-space: pre-wrap; overflow-wrap: break-word;">
                                        <div data-contents="true">
                                            <div data-block="true" data-editor="bjp4e" data-offset-key="19m55-0-0">
                                                <div data-offset-key="19m55-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">
                                                    <span data-offset-key="19m55-0-0">
                                                        <br data-text="true">
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="icon-38sknP iconLayout-1WxHy4 small-1lPjda">
                                <div class="iconContainer-O4O2CN">
                                    <svg class="icon-3cZ1F_ visible-3V0mGj" width="24" height="24" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M21.707 20.293L16.314 14.9C17.403 13.504 18 11.799 18 10C18 7.863 17.167 5.854 15.656 4.344C14.146 2.832 12.137 2 10 2C7.863 2 5.854 2.832 4.344 4.344C2.833 5.854 2 7.863 2 10C2 12.137 2.833 14.146 4.344 15.656C5.854 17.168 7.863 18 10 18C11.799 18 13.504 17.404 14.9 16.314L20.293 21.706L21.707 20.293ZM10 16C8.397 16 6.891 15.376 5.758 14.243C4.624 13.11 4 11.603 4 10C4 8.398 4.624 6.891 5.758 5.758C6.891 4.624 8.397 4 10 4C11.603 4 13.109 4.624 14.242 5.758C15.376 6.891 16 8.398 16 10C16 11.603 15.376 13.11 14.242 14.243C13.109 15.376 11.603 16 10 16Z"></path>
                                    </svg>
                                    <svg class="icon-3cZ1F_" width="24" height="24" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="iconWrapper-2OrFZ1 clickable-3rdHwn hidden">
                    <svg x="0" y="0" class="icon-22AiRD" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M19 3H4.99C3.88 3 3.01 3.89 3.01 5L3 19C3 20.1 3.88 21 4.99 21H19C20.1 21 21 20.1 21 19V5C21 3.89 20.1 3 19 3ZM19 15H15C15 16.66 13.65 18 12 18C10.35 18 9 16.66 9 15H4.99V5H19V15Z" fill="currentColor"></path>
                    </svg>
                </div>
                <a tabindex="-1" class="anchor-3Z-8Bb anchorUnderlineOnHover-2ESHQB" href="/support" rel="noreferrer noopener" target="_blank">
                    <div class="iconWrapper-2OrFZ1 clickable-3rdHwn" role="button">
                        <svg x="0" y="0" class="icon-22AiRD" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 2C6.486 2 2 6.487 2 12C2 17.515 6.486 22 12 22C17.514 22 22 17.515 22 12C22 6.487 17.514 2 12 2ZM12 18.25C11.31 18.25 10.75 17.691 10.75 17C10.75 16.31 11.31 15.75 12 15.75C12.69 15.75 13.25 16.31 13.25 17C13.25 17.691 12.69 18.25 12 18.25ZM13 13.875V15H11V12H12C13.104 12 14 11.103 14 10C14 8.896 13.104 8 12 8C10.896 8 10 8.896 10 10H8C8 7.795 9.795 6 12 6C14.205 6 16 7.795 16 10C16 11.861 14.723 13.429 13 13.875Z"></path>
                        </svg>
                    </div>
                </a>
            </div>
        </section>
        <div class="content-yTz4x3" id="chat-${channel_id}">
            <main class="chatContent-a9vAAp">
                <div class="messagesWrapper-1sRNjr group-spacing-16">
                    <div class="scroller-2LSbBU auto-Ge5KZx scrollerBase-289Jih disableScrollAnchor-3V9UtP" style="overflow: hidden scroll; padding-right: 0px;">
                        <div class="scrollerContent-WzeG7R content-3YMskv">
                            <div class="scrollerInner-2YIMLh">
                                <div class="container-3RCQyg">
                                    <div class="wrapper-3t9DeA" style="width: 80px; height: 80px;">
                                        <svg width="92" height="80" viewBox="0 0 92 80" class="mask-1l8v16 svg-2V3M55">
                                            <foreignObject x="0" y="0" width="80" height="80" mask="url(#svg-mask-avatar-default)">
                                                <img class="avatar-VxgULZ" src=${getAvatar(channel_id)}>
                                            </foreignObject>
                                        </svg>
                                    </div>
                                    <h1 class="header-3uLluP RT_name"></h1>
                                    <div class="size16-1P40sf description-1sDbzZ">
                                        Welcome to the beginning of the <strong class="RT_name"></strong> group.
                                        <div class="container-1fnzfI hidden">
                                            <div class="colorHeaderSecondary-3Sp3Ft size14-e6ZScH hidden">No friends in common</div>
                                            <div class="divider-3yU4s2 hidden"></div>
                                            <button type="button" class="action-26D6fg button-38aScr lookFilled-1Gx00P colorPrimary-3b3xI6 sizeTiny-EgeIrh grow-q77ONN">
                                                <div class="contents-18-Yxp">Remove Friend</div>
                                            </button>
                                            <button type="button" class="action-26D6fg button-38aScr lookFilled-1Gx00P colorPrimary-3b3xI6 sizeTiny-EgeIrh grow-q77ONN">
                                                <div class="contents-18-Yxp">Block</div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div id="private-message-list-${channel_id}">
                                    <div class="wrapper-3vR61M placeholdermessages hidden" style="height: 4446px;">
                                        <div class="wrapper-1F5TKx cozy-12kSNU" style="margin-top: 1rem;">
                                            <div class="contents-1R-xLu">
                                                <div class="avatar-2daVqv" style="opacity: 0.08;"></div>
                                                <h2 class="header-1oLBbW">
                                                    <div class="blob-2w7iIK" style="width: 7.1875rem; opacity: 0.158911;"></div>
                                                </h2>
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 4.25rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.4375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.3125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.0625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.875rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                            <div class="attachmentContainer-2BK1nK">
                                                <div class="attachment-2p5mHK" style="opacity: 0.03; width: 250px; height: 315px;"></div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU" style="margin-top: 1rem;">
                                            <div class="contents-1R-xLu">
                                                <div class="avatar-2daVqv" style="opacity: 0.08;"></div>
                                                <h2 class="header-1oLBbW">
                                                    <div class="blob-2w7iIK" style="width: 6.875rem; opacity: 0.136743;"></div>
                                                </h2>
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 4.9375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.6875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.3125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.9375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.25rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.1875rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                            <div class="attachmentContainer-2BK1nK">
                                                <div class="attachment-2p5mHK" style="opacity: 0.03; width: 286px; height: 291px;"></div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 4.5rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.75rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.25rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.25rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.8125rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU" style="margin-top: 1rem;">
                                            <div class="contents-1R-xLu">
                                                <div class="avatar-2daVqv" style="opacity: 0.08;"></div>
                                                <h2 class="header-1oLBbW">
                                                    <div class="blob-2w7iIK" style="width: 5.75rem; opacity: 0.122663;"></div>
                                                </h2>
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 3.625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.0625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.6875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.1875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.9375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.5rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 4.875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.0625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.75rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 2rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 1.9375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.25rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.25rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.8125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.625rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU" style="margin-top: 1rem;">
                                            <div class="contents-1R-xLu">
                                                <div class="avatar-2daVqv" style="opacity: 0.08;"></div>
                                                <h2 class="header-1oLBbW">
                                                    <div class="blob-2w7iIK" style="width: 5.875rem; opacity: 0.159079;"></div>
                                                </h2>
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 3.125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 1.875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.8125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.25rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.1875rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 4.1875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.25rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.5rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.3125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.0625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.1875rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU" style="margin-top: 1rem;">
                                            <div class="contents-1R-xLu">
                                                <div class="avatar-2daVqv" style="opacity: 0.08;"></div>
                                                <h2 class="header-1oLBbW">
                                                    <div class="blob-2w7iIK" style="width: 5.875rem; opacity: 0.176747;"></div>
                                                </h2>
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 2.9375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.5rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.5625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.375rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 3.25rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.1875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.1875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.75rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.3125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.75rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 2.125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.1875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.25rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU" style="margin-top: 1rem;">
                                            <div class="contents-1R-xLu">
                                                <div class="avatar-2daVqv" style="opacity: 0.08;"></div>
                                                <h2 class="header-1oLBbW">
                                                    <div class="blob-2w7iIK" style="width: 5.9375rem; opacity: 0.180947;"></div>
                                                </h2>
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 3rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.6875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.8125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.8125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.75rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.9375rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 3.0625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.25rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.4375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.1875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.4375rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 2.1875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.8125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.75rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.5rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.0625rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 2rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.75rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.5rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.5rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.9375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.6875rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU" style="margin-top: 1rem;">
                                            <div class="contents-1R-xLu">
                                                <div class="avatar-2daVqv" style="opacity: 0.08;"></div>
                                                <h2 class="header-1oLBbW">
                                                    <div class="blob-2w7iIK" style="width: 5.625rem; opacity: 0.171525;"></div>
                                                </h2>
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 3.9375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.5625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.25rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.625rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 3.3125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.75rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.3125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.3125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.25rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU" style="margin-top: 1rem;">
                                            <div class="contents-1R-xLu">
                                                <div class="avatar-2daVqv" style="opacity: 0.08;"></div>
                                                <h2 class="header-1oLBbW">
                                                    <div class="blob-2w7iIK" style="width: 5.3125rem; opacity: 0.14232;"></div>
                                                </h2>
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 3.4375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.9375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.1875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.0625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.4375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.8125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.9375rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 4rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.25rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.3125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.25rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.6875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.4375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.875rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 3.0625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.4375rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 4.0625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.5625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.5625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.9375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.5rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.5rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU" style="margin-top: 1rem;">
                                            <div class="contents-1R-xLu">
                                                <div class="avatar-2daVqv" style="opacity: 0.08;"></div>
                                                <h2 class="header-1oLBbW">
                                                    <div class="blob-2w7iIK" style="width: 5.9375rem; opacity: 0.132138;"></div>
                                                </h2>
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 3rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.6875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.75rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.4375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.5rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.125rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 4.375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.5625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.25rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.1875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.75rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.4375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.6875rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU" style="margin-top: 1rem;">
                                            <div class="contents-1R-xLu">
                                                <div class="avatar-2daVqv" style="opacity: 0.08;"></div>
                                                <h2 class="header-1oLBbW">
                                                    <div class="blob-2w7iIK" style="width: 6.5625rem; opacity: 0.177965;"></div>
                                                </h2>
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 4.4375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.5625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.3125rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 2.1875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.5625rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 1.875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.25rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.0625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.3125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.625rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 3.4375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.6875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.4375rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU" style="margin-top: 1rem;">
                                            <div class="contents-1R-xLu">
                                                <div class="avatar-2daVqv" style="opacity: 0.08;"></div>
                                                <h2 class="header-1oLBbW">
                                                    <div class="blob-2w7iIK" style="width: 6.625rem; opacity: 0.175295;"></div>
                                                </h2>
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 3.25rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.9375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.0625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.8125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.1875rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                            <div class="attachmentContainer-2BK1nK">
                                                <div class="attachment-2p5mHK" style="opacity: 0.03; width: 240px; height: 267px;"></div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 3.125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.4375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.9375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.9375rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 3.625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.25rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 1.875rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 1.9375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.5rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.4375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.75rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.1875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.5625rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU" style="margin-top: 1rem;">
                                            <div class="contents-1R-xLu">
                                                <div class="avatar-2daVqv" style="opacity: 0.08;"></div>
                                                <h2 class="header-1oLBbW">
                                                    <div class="blob-2w7iIK" style="width: 6.6875rem; opacity: 0.184135;"></div>
                                                </h2>
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 3.5625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.875rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 4.125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.8125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.5625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.1875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 1.9375rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 3.6875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.5625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.5rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU" style="margin-top: 1rem;">
                                            <div class="contents-1R-xLu">
                                                <div class="avatar-2daVqv" style="opacity: 0.08;"></div>
                                                <h2 class="header-1oLBbW">
                                                    <div class="blob-2w7iIK" style="width: 5.3125rem; opacity: 0.155053;"></div>
                                                </h2>
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 4.9375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.6875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 1.9375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.6875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 5rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                            <div class="attachmentContainer-2BK1nK">
                                                <div class="attachment-2p5mHK" style="opacity: 0.03; width: 381px; height: 130px;"></div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 3.125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.1875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.75rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 1.9375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.875rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU" style="margin-top: 1rem;">
                                            <div class="contents-1R-xLu">
                                                <div class="avatar-2daVqv" style="opacity: 0.08;"></div>
                                                <h2 class="header-1oLBbW">
                                                    <div class="blob-2w7iIK" style="width: 5.75rem; opacity: 0.156875;"></div>
                                                </h2>
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 4.9375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.5rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.6875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.4375rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 4.625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.5rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.6875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.6875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.5rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 1.875rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 2.375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.8125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.6875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.4375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.625rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU" style="margin-top: 1rem;">
                                            <div class="contents-1R-xLu">
                                                <div class="avatar-2daVqv" style="opacity: 0.08;"></div>
                                                <h2 class="header-1oLBbW">
                                                    <div class="blob-2w7iIK" style="width: 6.125rem; opacity: 0.155456;"></div>
                                                </h2>
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 3.8125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.3125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.4375rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 3.5rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 1.9375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.9375rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 3.1875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 5rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.1875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.5rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.6875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.25rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 4rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.9375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.1875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.6875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.1875rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU" style="margin-top: 1rem;">
                                            <div class="contents-1R-xLu">
                                                <div class="avatar-2daVqv" style="opacity: 0.08;"></div>
                                                <h2 class="header-1oLBbW">
                                                    <div class="blob-2w7iIK" style="width: 5.3125rem; opacity: 0.113182;"></div>
                                                </h2>
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 3.5rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.8125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.375rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU" style="margin-top: 1rem;">
                                            <div class="contents-1R-xLu">
                                                <div class="avatar-2daVqv" style="opacity: 0.08;"></div>
                                                <h2 class="header-1oLBbW">
                                                    <div class="blob-2w7iIK" style="width: 5.6875rem; opacity: 0.149423;"></div>
                                                </h2>
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 4.5rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.5rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.625rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 3.1875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.5rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.6875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.625rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 2.9375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.5rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.0625rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 4.3125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.5rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.5rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.4375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.0625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.1875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.0625rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU" style="margin-top: 1rem;">
                                            <div class="contents-1R-xLu">
                                                <div class="avatar-2daVqv" style="opacity: 0.08;"></div>
                                                <h2 class="header-1oLBbW">
                                                    <div class="blob-2w7iIK" style="width: 6.9375rem; opacity: 0.13249;"></div>
                                                </h2>
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 2.8125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.3125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.75rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.5rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.4375rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 2.375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.0625rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 2.125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.1875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.0625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.25rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.75rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.5rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU" style="margin-top: 1rem;">
                                            <div class="contents-1R-xLu">
                                                <div class="avatar-2daVqv" style="opacity: 0.08;"></div>
                                                <h2 class="header-1oLBbW">
                                                    <div class="blob-2w7iIK" style="width: 5.5625rem; opacity: 0.157012;"></div>
                                                </h2>
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 3.25rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.25rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.375rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 4.8125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 1.875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.1875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.3125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.625rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 2.0625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 1.875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.0625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 1.9375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.3125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.8125rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                            <div class="attachmentContainer-2BK1nK">
                                                <div class="attachment-2p5mHK" style="opacity: 0.03; width: 384px; height: 163px;"></div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 4.375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.5625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.0625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.9375rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU" style="margin-top: 1rem;">
                                            <div class="contents-1R-xLu">
                                                <div class="avatar-2daVqv" style="opacity: 0.08;"></div>
                                                <h2 class="header-1oLBbW">
                                                    <div class="blob-2w7iIK" style="width: 5.625rem; opacity: 0.171928;"></div>
                                                </h2>
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 2.0625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.0625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.5rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.25rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.5rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.5625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.5625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.9375rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU" style="margin-top: 1rem;">
                                            <div class="contents-1R-xLu">
                                                <div class="avatar-2daVqv" style="opacity: 0.08;"></div>
                                                <h2 class="header-1oLBbW">
                                                    <div class="blob-2w7iIK" style="width: 7rem; opacity: 0.124057;"></div>
                                                </h2>
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 4.3125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.75rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.6875rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                            <div class="attachmentContainer-2BK1nK">
                                                <div class="attachment-2p5mHK" style="opacity: 0.03; width: 306px; height: 143px;"></div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 3.5rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.4375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU" style="margin-top: 1rem;">
                                            <div class="contents-1R-xLu">
                                                <div class="avatar-2daVqv" style="opacity: 0.08;"></div>
                                                <h2 class="header-1oLBbW">
                                                    <div class="blob-2w7iIK" style="width: 7.5rem; opacity: 0.157287;"></div>
                                                </h2>
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 4.0625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.0625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.1875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.5625rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 4.25rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.4375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.1875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.0625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 1.9375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 1.9375rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 4.4375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.75rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.5rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.75rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.75rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 2.25rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.0625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.9375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.5rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU" style="margin-top: 1rem;">
                                            <div class="contents-1R-xLu">
                                                <div class="avatar-2daVqv" style="opacity: 0.08;"></div>
                                                <h2 class="header-1oLBbW">
                                                    <div class="blob-2w7iIK" style="width: 6.6875rem; opacity: 0.107222;"></div>
                                                </h2>
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 2.4375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.9375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.25rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 4.5rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.25rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.8125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 1.9375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.5rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.6875rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                            <div class="attachmentContainer-2BK1nK">
                                                <div class="attachment-2p5mHK" style="opacity: 0.03; width: 381px; height: 253px;"></div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU" style="margin-top: 1rem;">
                                            <div class="contents-1R-xLu">
                                                <div class="avatar-2daVqv" style="opacity: 0.08;"></div>
                                                <h2 class="header-1oLBbW">
                                                    <div class="blob-2w7iIK" style="width: 5.9375rem; opacity: 0.133722;"></div>
                                                </h2>
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 4.25rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.4375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.75rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 1.9375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.3125rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 2.4375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.5625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 1.875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.625rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 3.25rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                            <div class="attachmentContainer-2BK1nK">
                                                <div class="attachment-2p5mHK" style="opacity: 0.03; width: 346px; height: 286px;"></div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU" style="margin-top: 1rem;">
                                            <div class="contents-1R-xLu">
                                                <div class="avatar-2daVqv" style="opacity: 0.08;"></div>
                                                <h2 class="header-1oLBbW">
                                                    <div class="blob-2w7iIK" style="width: 5.6875rem; opacity: 0.192082;"></div>
                                                </h2>
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 2.75rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.9375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.8125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.1875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.6875rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 4.5625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.5625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.9375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.6875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.6875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.8125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 5rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.1875rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU">
                                            <div class="contents-1R-xLu">
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 1.9375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.25rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.3125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.3125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 1.875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.9375rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.1875rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper-1F5TKx cozy-12kSNU" style="margin-top: 1rem;">
                                            <div class="contents-1R-xLu">
                                                <div class="avatar-2daVqv" style="opacity: 0.08;"></div>
                                                <h2 class="header-1oLBbW">
                                                    <div class="blob-2w7iIK" style="width: 7.0625rem; opacity: 0.146747;"></div>
                                                </h2>
                                                <div class="content-2LZomT">
                                                    <div class="blob-2w7iIK" style="width: 3.125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.5625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 4.125rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 3.6875rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.625rem; opacity: 0.06;"></div>
                                                    <div class="blob-2w7iIK" style="width: 2.9375rem; opacity: 0.06;"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="scrollerSpacer-avRLaA"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-2fGMdU">
                    <div class="channelTextArea-rNsIhG channelTextArea-2VhZ6z">
                        <div class="scrollableContainer-2NUZem webkit-HjD9Er">
                            <div class="inner-MADQqc sansAttachButton-td2irx">
                                <div class="uploadInput-1XtQef hidden">
                                    <div class="file-input" tabindex="-1" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; opacity: 0; cursor: pointer;"></div>
                                </div>
                                <div class="attachWrapper-2TRKBi hidden">
                                    <button class="attachButton-2WznTc attachButton-2dnuIu button-38aScr lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN">
                                        <div class="contents-18-Yxp attachButtonInner-PQjIyk">
                                            <svg width="24" height="24" viewBox="0 0 24 24">
                                                <g fill="none" fill-rule="evenodd">
                                                    <path class="attachButtonPlus-jWVFah" fill="currentColor" fill-rule="nonzero" d="M22.031 12.665c-.923-.4338-1.9384-.665-2.9778-.665-.695 0-1.3663.1013-2 .29V11h-4V7h-2v4h-4v2h4v4h1.29c-.1887.6337-.29 1.305-.29 2 0 1.0394.2312 2.055.665 2.978-.2207.0146-.4424.022-.665.022-2.6522 0-5.1957-1.0536-7.071-2.929C3.1067 17.1958 2.053 14.6523 2.053 12c0-5.5228 4.4772-10 10-10 2.6522 0 5.1957 1.0536 7.071 2.929 1.8754 1.8753 2.929 4.4188 2.929 7.071 0 .2225-.0074.4443-.022.665zM15.4457 13c-.9793.59-1.8023 1.413-2.3924 2.3924V13h2.3924z"></path>
                                                    <path class="attachButtonPlay-3iJ0mf" fill="currentColor" d="M19.0532 14c1.326 0 2.598.5268 3.5355 1.4645.9377.9376 1.4645 2.2094 1.4645 3.5355 0 1.326-.5268 2.598-1.4645 3.5355C21.651 23.4732 20.3793 24 19.0532 24c-1.326 0-2.5978-.5268-3.5355-1.4645C14.58 21.598 14.0532 20.326 14.0532 19c0-2.7614 2.2386-5 5-5zm-1 7l3-2-3-2v4z"></path>
                                                </g>
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                                <div class="textArea-12jD-V textAreaSlate-1ZzRVj slateContainer-3Qkn2x">
                                    <div class="placeholder-37qJjk fontSize16Padding-3Wk7zP">Message <span class="RT_name"><span></div>
                                    <div contenteditable="true" class="markup-2BOw-j slateTextArea-1Mkdgw fontSize16Padding-3Wk7zP messageField" spellcheck="true" style="outline: none; white-space: pre-wrap; overflow-wrap: break-word; padding-top: 12px;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="typing-2GQL18 base-gE7OpD hidden" styl="font-size: 14px;">
                        <svg width="24.5" height="7" class="ellipsis-19qdx6 dots-3Bkt3k themed-IQiCm3" style="margin-top: 1px;">
                            <g style="opacity: 1;">
                                <circle cx="3.5" cy="3.5" r="3.5" fill="currentColor" style="opacity: 1;"></circle>
                                <circle cx="12.25" cy="3.5" r="3.5" fill="currentColor" style="opacity: 1;"></circle>
                                <circle cx="21" cy="3.5" r="3.5" fill="currentColor" style="opacity: 1;"></circle>
                            </g>
                        </svg>
                        <span class="text-1y-e8-" style="margin-top: 2px;"><strong>Firebase</strong> is typing...</span>
                    </div>
                </div>
            </main>
        </div>
    `;

    document.getElementById('main-body').appendChild(div);

    // Send message on enter
    const input = div.querySelectorAll('.messageField')[0];

    input.addEventListener('keypress', event => {
        if (!event.shiftKey && event.key === 'Enter') {
            sendPrivateMessage(channel_id);
            event.returnValue = false;

            let chatdiv = document.querySelectorAll(".textArea-12jD-V");
    
            if (chatdiv) {
                if (chatdiv.length !== 0) {
                    for (let query of chatdiv) {
                        query.style.height = "44px";
                    };
                };
            };
        }
    });

    // Placeholder behavior
    input.addEventListener('input', () => {
        const placeholder = div.querySelectorAll('.placeholder-37qJjk')[0];

        if (input.innerHTML.length > 0) {
            placeholder.classList.add('hidden');
        } else {
            placeholder.classList.remove('hidden');
        }

        // Dynamically change height of message field with multiple lines
        const text = div.querySelectorAll('.messageField')[0];
        const length = text.childNodes.length == 0 ? 1 : text.childNodes.length;

        const chatdiv = document.querySelectorAll(".textArea-12jD-V");
    
        if (!chatdiv) return;
        if (chatdiv.length === 0) return;

        for (query of chatdiv) {
            query.style.height = (33 + (11 * length)) + "px";
        };
    });

    input.addEventListener('paste', (e) => {
        e.preventDefault();

        const text = (e.originalEvent || e).clipboardData.getData('text/plain');

        document.execCommand("insertHTML", false, text);
    });

    return div;
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
 */
 async function loadGroupChannels() {
    const { uid } = firebase.auth().currentUser;

    firebase.firestore().collection('channels')
    .where('recipients', 'array-contains', uid)
    .where('type', '==', 'GROUP_DM')
    .limit(50)
    .onSnapshot(snapshot => {
        if (snapshot.empty) return;

        snapshot.docChanges().forEach(async change => {
            const { type, doc: channel } = change;
            const { recipients } = channel.data();

            if (type === 'added') {
                
                // Group chat already exists in DOM
                if (document.getElementById(`channel-${channel.id}`)) return;
            
                CACHED_RECIPIENTS[channel.id] = recipients;

                addGroupChannel(channel.id);
                addGroupChat(channel.id);

                // Realtime group chat name
                const listener = await firebase.firestore().collection('channels').doc(channel.id).onSnapshot(snapshot => {
                    const { recipients } = snapshot.data();
                    const gc = document.getElementById(`channel-${channel.id}`);

                    // Channel
                    gc.querySelectorAll('.activityText-OW8WYb')[0].innerText = recipients.length.toString() + ' Members';

                    CACHED_GROUP_CHAT_CHANNELS[channel.id] = {
                        ...snapshot.data()
                    }

                    setRealtimeChannelInfo(channel.id);
                });

                CACHED_LISTENERS[channel.id] = listener;

                recipients.forEach(recipient => {
                    if (recipient === uid) return;
                    if (CACHED_USERS[recipient]) return; // User already exists

                    firebase.firestore().collection('users').doc(recipient).onSnapshot(snapshot => {
                        CACHED_USERS[recipient] = {
                            ...snapshot.data()
                        };
                    });
                });

                return;
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

                // Detatch listener
                CACHED_LISTENERS[channel.id]();
                delete CACHED_LISTENERS[channel.id];

                loadChannelFromId('friends');
            }
        });
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