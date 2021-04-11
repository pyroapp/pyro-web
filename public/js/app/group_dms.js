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
async function showGroupDMModal(uid) {
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
        selectedFriends.push(uid);
        createGroupChat(selectedFriends);
    }

    friends.forEach(friend => {
        if (uid === friend) return;

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
                <div class="discordTag-X7dpau nameTag-m8r81H"><span class="username-2b1r56"></span><span class="RT_discriminator"></span></div>
            </div>
            <label class="checkboxWrapper-SkhIWG alignCenter-MrlN6q" style="margin-top: 1px;">
                <input class="inputDefault-3JxKJ2 input-3ITkQf" type="checkbox">
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
 */
async function createGroupChat(friends) {
    console.log(friends);
}


/**
 * 
 * @param {*} channel_id 
 */
async function addGroupChannel(channel_id) {
    
}


/**
 * 
 * @param {*} channel_id 
 */
async function addGroupChat(channel_id) {

}