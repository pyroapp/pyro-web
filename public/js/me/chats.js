//? ------------------------------------------------------------------------------------
//?
//?  /me/chats.js
//?  Discord JS
//?
//?  Developed by Cooper Beltrami
//?
//?  Project built using designs, graphics and other assets developed by Discord Inc.
//?  Copyright (c) 2021 Cooper Beltrami and Discord Inc. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------



function addChat(channelId, uid) {
    const div = document.createElement('div');
    div.classList = 'chat-3bRxxu mainBody-f3wd0 hidden';
    div.id = channelId;
    div.innerHTML = `
        <section class="title-3qD0b- container-1r6BKw themed-ANHk51" id="header-${channelId}">
            <div class="children-19S4PO">
                <div class="iconWrapper-2OrFZ1" >
                    <svg x="0" y="0" class="icon-22AiRD" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 2C6.486 2 2 6.486 2 12C2 17.515 6.486 22 12 22C14.039 22 15.993 21.398 17.652 20.259L16.521 18.611C15.195 19.519 13.633 20 12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12V12.782C20 14.17 19.402 15 18.4 15L18.398 15.018C18.338 15.005 18.273 15 18.209 15H18C17.437 15 16.6 14.182 16.6 13.631V12C16.6 9.464 14.537 7.4 12 7.4C9.463 7.4 7.4 9.463 7.4 12C7.4 14.537 9.463 16.6 12 16.6C13.234 16.6 14.35 16.106 15.177 15.313C15.826 16.269 16.93 17 18 17L18.002 16.981C18.064 16.994 18.129 17 18.195 17H18.4C20.552 17 22 15.306 22 12.782V12C22 6.486 17.514 2 12 2ZM12 14.599C10.566 14.599 9.4 13.433 9.4 11.999C9.4 10.565 10.566 9.399 12 9.399C13.434 9.399 14.6 10.565 14.6 11.999C14.6 13.433 13.434 14.599 12 14.599Z"></path>
                    </svg>
                </div>
                <h3 role="button" class="cursorPointer-1j7DL8 title-29uC1r base-1x0h_U size16-1P40sf"></h3>
                <div class="status-1XNdyw disableFlex-2QuzIB">
                    <svg width="10" height="15" viewBox="0 0 10 10" class="mask-1qbNWk">
                        <rect x="0" y="0" width="10" height="10" class="userStatus"></rect>
                    </svg>
                </div>
                <div class="spacer-3kEb8l"></div>
            </div>
            <div class="toolbar-1t6TWx">
                <div class="iconWrapper-2OrFZ1 clickable-3rdHwn">
                    <svg x="0" y="0" class="icon-22AiRD" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M11 5V3C16.515 3 21 7.486 21 13H19C19 8.589 15.411 5 11 5ZM17 13H15C15 10.795 13.206 9 11 9V7C14.309 7 17 9.691 17 13ZM11 11V13H13C13 11.896 12.105 11 11 11ZM14 16H18C18.553 16 19 16.447 19 17V21C19 21.553 18.553 22 18 22H13C6.925 22 2 17.075 2 11V6C2 5.447 2.448 5 3 5H7C7.553 5 8 5.447 8 6V10C8 10.553 7.553 11 7 11H6C6.063 14.938 9 18 13 18V17C13 16.447 13.447 16 14 16Z"></path>
                    </svg>
                </div>
                <div class="iconWrapper-2OrFZ1 clickable-3rdHwn">
                    <svg x="0" y="0" class="icon-22AiRD" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M21.526 8.149C21.231 7.966 20.862 7.951 20.553 8.105L18 9.382V7C18 5.897 17.103 5 16 5H4C2.897 5 2 5.897 2 7V17C2 18.104 2.897 19 4 19H16C17.103 19 18 18.104 18 17V14.618L20.553 15.894C20.694 15.965 20.847 16 21 16C21.183 16 21.365 15.949 21.526 15.851C21.82 15.668 22 15.347 22 15V9C22 8.653 21.82 8.332 21.526 8.149Z"></path>
                    </svg>
                </div>
                <div class="iconWrapper-2OrFZ1 clickable-3rdHwn">
                    <svg x="0" y="0" class="icon-22AiRD" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22 12L12.101 2.10101L10.686 3.51401L12.101 4.92901L7.15096 9.87801V9.88001L5.73596 8.46501L4.32196 9.88001L8.56496 14.122L2.90796 19.778L4.32196 21.192L9.97896 15.536L14.222 19.778L15.636 18.364L14.222 16.95L19.171 12H19.172L20.586 13.414L22 12Z"></path>
                    </svg>
                </div>
                <div class="iconWrapper-2OrFZ1 clickable-3rdHwn">
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
                <div class="iconWrapper-2OrFZ1 clickable-3rdHwn">
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
        <div class="content-yTz4x3" id="chat-${channelId}">
            <main class="chatContent-a9vAAp">
                <div class="messagesWrapper-1sRNjr group-spacing-16">
                    <div class="scroller-2LSbBU auto-Ge5KZx scrollerBase-289Jih disableScrollAnchor-3V9UtP"mstyle="overflow: hidden scroll; padding-right: 0px;">
                        <div class="scrollerContent-WzeG7R content-3YMskv">
                            <div class="scrollerInner-2YIMLh">
                                <div class="container-3RCQyg">
                                    <div class="wrapper-3t9DeA" style="width: 80px; height: 80px;">
                                        <svg width="92" height="80" viewBox="0 0 92 80" class="mask-1l8v16 svg-2V3M55">
                                            <foreignObject x="0" y="0" width="80" height="80" mask="url(#svg-mask-avatar-default)">
                                                <img class="avatar-VxgULZ" src=${getAvatar(uid)}>
                                            </foreignObject>
                                        </svg>
                                    </div>
                                    <h1 class="header-3uLluP"></h1>
                                    <div class="size16-1P40sf description-1sDbzZ">
                                        This is the beginning of your direct message history with <strong></strong>.
                                        <div class="container-1fnzfI">
                                            <div class="colorHeaderSecondary-3Sp3Ft size14-e6ZScH">No servers in common</div>
                                            <div class="divider-3yU4s2"></div>
                                            <button type="button" class="action-26D6fg button-38aScr lookFilled-1Gx00P colorPrimary-3b3xI6 sizeTiny-EgeIrh grow-q77ONN">
                                                <div class="contents-18-Yxp">Remove Friend</div>
                                            </button>
                                            <button type="button" class="action-26D6fg button-38aScr lookFilled-1Gx00P colorPrimary-3b3xI6 sizeTiny-EgeIrh grow-q77ONN">
                                                <div class="contents-18-Yxp">Block</div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="scrollerSpacer-avRLaA empty-6MGttt"></div>
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
                                    <button aria-label="Upload a file or send invites" role="menubutton" aria-controls="popout_8" aria-expanded="false" type="button" class="attachButton-2WznTc attachButton-2dnuIu button-38aScr lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN">
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
                                    <div class="placeholder-37qJjk fontSize16Padding-3Wk7zP"></div>
                                    <div data-can-focus="true" data-slate-editor="true" data-key="246" contenteditable="true" class="markup-2BOw-j slateTextArea-1Mkdgw fontSize16Padding-3Wk7zP" autocorrect="off" spellcheck="true"data-gramm="false" style="outline: none; white-space: pre-wrap; overflow-wrap: break-word;"></div>
                                </div>
                            </div>
                                <div class="buttons-3JBrkn hidden">
                                    <button aria-label="Send a gift" type="button" class="button-38aScr lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN">
                                        <div class="contents-18-Yxp button-3AYNKb button-318s1X">
                                            <div class="buttonWrapper-1ZmCpA" id="children" style="opacity: 1; transform: none;">
                                                <svg width="24" height="24" viewBox="0 0 24 24">
                                                    <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M16.886 7.999H20C21.104 7.999 22 8.896 22 9.999V11.999H2V9.999C2 8.896 2.897 7.999 4 7.999H7.114C6.663 7.764 6.236 7.477 5.879 7.121C4.709 5.951 4.709 4.048 5.879 2.879C7.012 1.746 8.986 1.746 10.121 2.877C11.758 4.514 11.979 7.595 11.998 7.941C11.9991 7.9525 11.9966 7.96279 11.9941 7.97304C11.992 7.98151 11.99 7.98995 11.99 7.999H12.01C12.01 7.98986 12.0079 7.98134 12.0058 7.97287C12.0034 7.96282 12.0009 7.95286 12.002 7.942C12.022 7.596 12.242 4.515 13.879 2.878C15.014 1.745 16.986 1.746 18.121 2.877C19.29 4.049 19.29 5.952 18.121 7.121C17.764 7.477 17.337 7.764 16.886 7.999ZM7.293 5.707C6.903 5.316 6.903 4.682 7.293 4.292C7.481 4.103 7.732 4 8 4C8.268 4 8.519 4.103 8.707 4.292C9.297 4.882 9.641 5.94 9.825 6.822C8.945 6.639 7.879 6.293 7.293 5.707ZM14.174 6.824C14.359 5.941 14.702 4.883 15.293 4.293C15.481 4.103 15.732 4 16 4C16.268 4 16.519 4.103 16.706 4.291C17.096 4.682 17.097 5.316 16.707 5.707C16.116 6.298 15.057 6.642 14.174 6.824ZM3 13.999V19.999C3 21.102 3.897 21.999 5 21.999H11V13.999H3ZM13 13.999V21.999H19C20.104 21.999 21 21.102 21 19.999V13.999H13Z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </button>
                                    <div class="buttonContainer-28fw2U">
                                        <button aria-label="Open GIF picker" type="button" class="button-38aScr lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN">
                                            <div class="contents-18-Yxp button-3AYNKb button-318s1X">
                                                <div class="buttonWrapper-1ZmCpA" id="icon" style="opacity: 1; transform: none;">
                                                    <svg width="24" height="24" class="icon-3D60ES" viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M2 2C0.895431 2 0 2.89543 0 4V20C0 21.1046 0.89543 22 2 22H22C23.1046 22 24 21.1046 24 20V4C24 2.89543 23.1046 2 22 2H2ZM9.76445 11.448V15.48C8.90045 16.044 7.88045 16.356 6.74045 16.356C4.11245 16.356 2.66045 14.628 2.66045 12.072C2.66045 9.504 4.23245 7.764 6.78845 7.764C7.80845 7.764 8.66045 8.004 9.32045 8.376L9.04445 10.164C8.42045 9.768 7.68845 9.456 6.83645 9.456C5.40845 9.456 4.71245 10.512 4.71245 12.06C4.71245 13.62 5.43245 14.712 6.86045 14.712C7.31645 14.712 7.64045 14.616 7.97645 14.448V12.972H6.42845V11.448H9.76445ZM11.5481 7.92H13.6001V16.2H11.5481V7.92ZM20.4724 7.92V9.636H17.5564V11.328H19.8604V13.044H17.5564V16.2H15.5164V7.92H20.4724Z"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                    <div class="buttonContainer-28fw2U">
                                        <button aria-label="Select emoji" type="button" class="emojiButtonNormal-TdumYh emojiButton-3uL3Aw emojiButton-pET4wH button-318s1X button-38aScr lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN">
                                            <div class="contents-18-Yxp">
                                                <div class="sprite-2iCowe" style="background-position: 0px 0px; background-size: 242px 110px; transform: scale(1); filter: grayscale(100%);"></div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    `;

    document.getElementById('main-body').appendChild(div);
}


/**
 * 
 * @param {*} channelId 
 * @param {*} username 
 */
 function setHeaderUsername(id, username) {
    const chat = document.getElementById(id);

    chat.querySelectorAll('.title-29uC1r')[0].innerText = username;
    chat.querySelectorAll('.header-3uLluP')[0].innerText = username;
    chat.querySelectorAll('.placeholder-37qJjk')[0].innerText =`Message @${username}`;
    chat.querySelectorAll('.description-1sDbzZ')[0].querySelectorAll('strong')[0].innerText = '@' + username;
}


function setHeaderStatus(id, status) {
    if (!status) return;

    // TODO: When friend is removed, socket is not disposed.
    const header = document.getElementById(`header-${id}`);
    const userStatus = header.querySelectorAll('.userStatus')[0];

    userStatus.setAttribute('fill', STATUS_COLOURS[status]);
    userStatus.setAttribute('mask', `url(#svg-mask-status-${status})`);
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