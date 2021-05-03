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
 function addChat(channel_id, friend_uid) {
    const div = document.createElement('div');
    div.classList = 'chat-3bRxxu mainBody-f3wd0 hidden';
    div.id = channel_id;
    div.setAttribute('uid', friend_uid);
    div.innerHTML = `
        <section class="title-3qD0b- container-1r6BKw themed-ANHk51" id="private-header-${channel_id}">
            <div class="children-19S4PO">
                <div class="iconWrapper-2OrFZ1">
                    <svg width="40" height="32" viewBox="0 0 40 40" class="icon-22AiRD">
                        <mask id="1e790872-400c-4750-815a-1afdbe1cdf12" width="40" height="40">
                            <circle cx="16" cy="16" r="16" fill="white"></circle>
                            <rect color="black" x="19" y="19" width="16" height="16" rx="8" ry="8"></rect>
                        </mask>
                        <foreignObject x="0" y="0" width="40" height="40" mask="url(#svg-mask-avatar-default)">
                            <img src="${getAvatar(friend_uid)}" class="avatar-VxgULZ">
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
                <div class="search-36MZv- hidden">
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
                                                <img class="avatar-VxgULZ" src=${getAvatar(friend_uid)}>
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
                                    <div class="placeholder-37qJjk fontSize16Padding-3Wk7zP">Message @<span class="RT_username"></span></div>
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
        </div>
    `;

    document.getElementById('main-body').appendChild(div);

    // Send message on enter
    const input = div.querySelectorAll('.messageField')[0];

    input.addEventListener('keypress', event => {
        if (!event.shiftKey && event.key === 'Enter') {
            isUserTyping(channel_id, false);
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

    input.addEventListener("paste", function(e) {
        e.preventDefault();
    
        let text = (e.originalEvent || e).clipboardData.getData('text/plain');
    
        document.execCommand("insertHTML", false, text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;"));
    });

    div.querySelectorAll('.clickable-3rdHwn')[0].onclick = () => {
        showGroupDMModal(friend_uid);
    }

    div.querySelectorAll('.block-button-rj93')[0].onclick = () => {
        blockFriend(friend_uid);
    }

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
