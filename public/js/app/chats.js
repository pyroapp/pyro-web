//? ------------------------------------------------------------------------------------
//?
//?  /app/chats.js
//?  Pyro Chat
//?
//?  Developed by Pyro Communications LLC
//?  Copyright (c) 2021 Pyro Communications LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


/**
 * 
 * @param {*} channel_id 
 * @param {*} friend_uid 
 */
 function addChat(payload) {
    const { channel_id, type } = payload;
    const div = document.createElement('div');

    div.classList = 'chat-3bRxxu mainBody-f3wd0 hidden';
    div.id = channel_id;

    let chatTemplate;

    // This is where all the channel types are handled, it just returns the interface 
    // for specific things and it will inject it into the main chat interface
    if (type === 'PRIVATE') chatTemplate = privateChatHandler(div, payload);
    if (type === 'GROUP') chatTemplate = groupChatHandler(div, payload);
    
    const { header, chatContent, placeholder, membersList } = chatTemplate;

    div.innerHTML = `
        <section class="title-3qD0b- container-1r6BKw themed-ANHk51">${header}</section>
        <div class="content-yTz4x3" id="channel-${channel_id}">
            <main class="chatContent-a9vAAp">
                <div class="messagesWrapper-1sRNjr group-spacing-16">
                    <div class="scroller-2LSbBU auto-Ge5KZx scrollerBase-289Jih disableScrollAnchor-3V9UtP" style="overflow: hidden scroll; padding-right: 0px;">
                        <div class="scrollerContent-WzeG7R content-3YMskv">
                            <div class="scrollerInner-2YIMLh">
                                ${chatContent}
                                <div id="messages-${channel_id}" class="messagesList-3j93jr"></div>
                                <div class="scrollerSpacer-avRLaA"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-2fGMdU">
                    <div class="channelTextArea-rNsIhG channelTextArea-2VhZ6z">
                        <div class="scrollableContainer-2NUZem webkit-HjD9Er">
                            <div class="inner-MADQqc sansAttachButton-td2irx">
                                <div class="attachWrapper-2TRKBi">
                                    <input type="file" id="attachment-${channel_id}" class="hidden" multiple />
                                    <label for="attachment-${channel_id}" class="attachButton-2WznTc attachButton-2dnuIu button-38aScr lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN" style="cursor: pointer">
                                        <div class="contents-18-Yxp attachButtonInner-PQjIyk">
                                        <svg width="24" height="24" viewBox="0 0 24 24"><path class="attachButtonPlus-jWVFah" fill="currentColor" d="M12 2.00098C6.486 2.00098 2 6.48698 2 12.001C2 17.515 6.486 22.001 12 22.001C17.514 22.001 22 17.515 22 12.001C22 6.48698 17.514 2.00098 12 2.00098ZM17 13.001H13V17.001H11V13.001H7V11.001H11V7.00098H13V11.001H17V13.001Z"></path></svg>
                                        </div>
                                    </label>
                                </div>
                                <div class="textArea-12jD-V textAreaSlate-1ZzRVj slateContainer-3Qkn2x">
                                    ${placeholder}
                                    <div contenteditable="true" class="markup-2BOw-j slateTextArea-1Mkdgw fontSize16Padding-3Wk7zP messageField" spellcheck="true" style="outline: none; white-space: pre-wrap; overflow-wrap: break-word; padding-top: 12px;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="typing-2GQL18 base-gE7OpD hidden" styl="font-size: 12px;">
                        <svg width="24.5" height="7" class="ellipsis-19qdx6 dots-3Bkt3k themed-IQiCm3" style="margin-top: 1px;">
                            <g style="opacity: 1;">
                                <circle cx="3.5" cy="3.5" r="3.5" fill="currentColor" style="opacity: 1;"></circle>
                                <circle cx="12.25" cy="3.5" r="3.5" fill="currentColor" style="opacity: 1;"></circle>
                                <circle cx="21" cy="3.5" r="3.5" fill="currentColor" style="opacity: 1;"></circle>
                            </g>
                        </svg>
                        <span class="text-1y-e8-" style="margin-top: 2px;"></span>
                    </div>
                    <div class="wrapper-39oAo3 channelBlockedArea-fj903 hidden">
                        <div class="content-c_0cLD">
                            <div class="text-2yjo70">
                                <h3 class="title-FVgbgL base-1x0h_U size16-1P40sf">You cannot send messages to blocked users.</h3>
                            </div>
                        </div>
                        <div class="buttonContainer-3AU1Ij">
                            <button type="button" class="button-1YxJv4 button-38aScr lookFilled-1Gx00P colorPrimary-3b3xI6 sizeSmall-2cSMqn grow-q77ONN unblockbutton-fj93f">
                                <div class="contents-18-Yxp">Unblock</div>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            ${membersList}
        </div>
    `;

    document.getElementById('main-body').appendChild(div);

    handleChatEvents(div, payload);
}


/**
 * 
 * @param {*} div 
 * @param {*} payload 
 * @returns 
 */
function privateChatHandler(div, payload) {
    const { type, friend_uid } = payload;

    div.setAttribute('type', type);
    div.setAttribute('uid', friend_uid);

    const membersList = '';
    const avatar = friend_uid;
    const placeholder = `<div class="placeholder-37qJjk fontSize16Padding-3Wk7zP">Message @<span class="RT_username"></span></div>`;

    const header = `
        <div class="children-19S4PO">
            <div class="iconWrapper-2OrFZ1">
                <svg width="40" height="32" viewBox="0 0 40 40" class="icon-22AiRD">
                    <mask id="1e790872-400c-4750-815a-1afdbe1cdf12" width="40" height="40">
                        <circle cx="16" cy="16" r="16" fill="white"></circle>
                        <rect color="black" x="19" y="19" width="16" height="16" rx="8" ry="8"></rect>
                    </mask>
                    <foreignObject x="0" y="0" width="40" height="40" mask="url(#svg-mask-avatar-default)">
                        <img src="${getAvatar(avatar)}" class="avatar-VxgULZ">
                    </foreignObject>
                </svg>
            </div>
            <h3 role="button" class="cursorPointer-1j7DL8 title-29uC1r base-1x0h_U size16-1P40sf RT_username"></h3>
            <div class="status-1XNdyw disableFlex-2QuzIB">
                <svg width="10" height="15" viewBox="0 0 10 10" class="mask-1qbNWk">
                    <rect x="0" y="0" width="10" height="10" class="RT_status"></rect>
                </svg>
            </div>
            <div class="spacer-3kEb8l"></div>
        </div>
        <div class="toolbar-1t6TWx">
            <div class="iconWrapper-2OrFZ1 clickable-3rdHwn">
                <svg x="0" y="0" class="icon-22AiRD" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M21 3H24V5H21V8H19V5H16V3H19V0H21V3ZM10 12C12.205 12 14 10.205 14 8C14 5.795 12.205 4 10 4C7.795 4 6 5.795 6 8C6 10.205 7.795 12 10 12ZM10 13C5.289 13 2 15.467 2 19V20H18V19C18 15.467 14.711 13 10 13Z"></path>
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
    `.trim();

    const chatContent = `
        <div class="container-3RCQyg">
            <div class="wrapper-3t9DeA" style="width: 80px; height: 80px;">
                <svg width="92" height="80" viewBox="0 0 92 80" class="mask-1l8v16 svg-2V3M55">
                    <foreignObject x="0" y="0" width="80" height="80" mask="url(#svg-mask-avatar-default)">
                        <img class="avatar-VxgULZ" src=${getAvatar(avatar)}>
                    </foreignObject>
                </svg>
            </div>
            <h1 class="header-3uLluP RT_username"></h1>
            <div class="size16-1P40sf description-1sDbzZ">
                This is the beginning of your direct message history with @<strong class="RT_username"></strong>.
                <div class="container-1fnzfI">
                    <div class="colorHeaderSecondary-3Sp3Ft size14-e6ZScH hidden">No friends in common</div>
                    <div class="divider-3yU4s2 hidden"></div>
                    <button type="button" class="action-26D6fg button-38aScr lookFilled-1Gx00P colorPrimary-3b3xI6 sizeTiny-EgeIrh grow-q77ONN hidden">
                        <div class="contents-18-Yxp">Remove Friend</div>
                    </button>
                    <button type="button" class="action-26D6fg button-38aScr lookFilled-1Gx00P colorPrimary-3b3xI6 sizeTiny-EgeIrh grow-q77ONN block-button-rj93">
                        <div class="contents-18-Yxp">Block</div>
                    </button>
                </div>
            </div>
        </div>
    `.trim();

    return {
        membersList: membersList,
        avatar: avatar,
        placeholder: placeholder,
        header: header,
        chatContent: chatContent
    };
}


/**
 * 
 * @param {*} div 
 * @param {*} payload 
 * @returns 
 */
function groupChatHandler(div, payload) {
    const { type, channel_id } = payload;

    div.setAttribute('type', type);
    div.setAttribute('channel', channel_id);

    const avatar = channel_id;

    const placeholder = `<div class="placeholder-37qJjk fontSize16Padding-3Wk7zP">Message <span class="RT_name"><span></div>`;

    const membersList = `
        <div class="membersWrap-2h-GB4">
            <div class="members-1998pB thin-1ybCId scrollerBase-289Jih fade-2kXiP2" style="overflow: hidden scroll; padding-right: 0px;">
                <h2 class="membersGroup-v9BXpm container-2ax-kl">Members</h2>
                <div id="userslist-${channel_id}"></div>
            </div>
        </div>
    `;

    const header = `
        <div class="children-19S4PO">
            <div class="iconWrapper-2OrFZ1">
                <div class="avatarContainer-3cVycu"></div>
            </div>
            <h3 class="title-29uC1r base-1x0h_U size16-1P40sf RT_name"></h3>
            <div class="spacer-3kEb8l"></div>
        </div>
        <div class="toolbar-1t6TWx">
            <div class="iconWrapper-2OrFZ1 clickable-3rdHwn groupChatSettings-j0932f hidden">
                <svg width="24" height="24" class="icon-22AiRD" viewBox="0 0 24 24">
                    <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 3.999L20 5.999L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"></path>
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
    `;

    const chatContent = `
        <div class="container-3RCQyg">
            <div class="wrapper-3t9DeA" style="width: 80px; height: 80px;">
                <svg width="92" height="80" viewBox="0 0 92 80" class="mask-1l8v16 svg-2V3M55">
                    <foreignObject x="0" y="0" width="80" height="80" mask="url(#svg-mask-avatar-default)">
                        <img class="avatar-VxgULZ" src=${getAvatar(avatar)}>
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
    `;

    return {
        membersList: membersList,
        header: header,
        avatar: avatar,
        placeholder: placeholder,
        chatContent: chatContent
    };
}


/**
 * 
 */
function handleChatEvents(div, payload) {
    const { type, channel_id } = payload;

    const input = div.querySelectorAll('.messageField')[0];
    const file = document.getElementById(`attachment-${channel_id}`);

    
    // Send attachment
    file.onchange = event => {        
        sendAttachmentHandler(channel_id, event.target.files);
    }


    if (type === 'PRIVATE') {
        const { friend_uid } = payload;

        div.querySelectorAll('.block-button-rj93')[0].onclick = () => {
            blockFriend(friend_uid);
        }

        div.querySelectorAll('.clickable-3rdHwn')[0].onclick = () => {
            showGroupDMModal(friend_uid);
        }
    }


    // Send message on enter
    input.addEventListener('keypress', event => {
        if (!event.shiftKey && event.key === 'Enter') {
            isUserTyping(channel_id, false);
            sendMessage(input, channel_id);

            event.returnValue = false;

            const chatdiv = document.querySelectorAll(".textArea-12jD-V");
    
            if (chatdiv) {
                if (chatdiv.length !== 0) {
                    for (query of chatdiv) {
                        query.style.height = "44px";
                    };
                };
            };
        }
    });


    input.onpaste = event => {
        const items = (event.clipboardData || event.originalEvent.clipboardData).items;

        for (i in items) {
            if (items[i].kind === 'file') return sendAttachmentHandler(
                channel_id,
                [items[i].getAsFile()]
            );
        }
    };

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


    // Sanitise pasting
    input.addEventListener("paste", event => {
        event.preventDefault();
    
        const text = (event.originalEvent || event).clipboardData.getData('text/plain');
    
        document.execCommand(
            "insertHTML",
            false,
            text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
        );
    });
    

    // Auto focus the input anywhere within the chat
    document.addEventListener('keypress', () => { 
        if (!input.activeElement) input.focus();
    });


    // Typing indicator behavior
    input.oninput = async () => {
        const temp = input.innerText;

        await delay(TYPING_INDICATOR_THRESHOLD);
        
        if (!input.innerHTML) return isUserTyping(channel_id, false);
        isUserTyping(channel_id, temp != input.innerText);
    }


    // Create typing indicator listener
    createTypingIndicatorListener(channel_id);
}


/**
 * 
 * @param {*} channel_id Channel ID
 */
function removeChat(channel_id) {
    const mainBody = document.getElementById('main-body');
    const chat = document.getElementById(channel_id);

    mainBody.removeChild(chat);
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

    document.getElementById(id).classList.remove('hidden');
}
