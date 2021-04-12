//? ------------------------------------------------------------------------------------
//?
//?  /helpers/interface.js
//?  Pyro Chat
//?
//?  Developed by Robolab LLC
//?  Copyright (c) 2021 Robolab LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


/**
 * 
 * @param {*} message 
 */
function showBanner(message) {
    const banner = document.getElementById('banner');

    banner.innerText = message;
}


/**
 * 
 * @param {*} message 
 * @param {*} buttonText 
 * @param {*} buttonEvent 
 */
function showInteractiveBanner(message, buttonText, buttonEvent) {
    const banner = document.getElementById('banner');

    banner.innerHTML = `
        ${message}
        <button onclick="${buttonEvent}" class="button-2DhvE9">
            ${buttonText}
        </button>
    `;
}


/**
 * 
 * @returns 
 */
function generateDidYouKnowMessage() {
    const index = generateRandom(0, DID_YOU_KNOW.length - 1);

    return DID_YOU_KNOW[index];
}


/**
 * 
 */
function showPageLoader() {
    const loader = document.getElementById('pageLoader');

    loader.innerHTML = `
        <div class="container-16j22k fixClipping-3qAKRb" style="opacity: 1;">
            <div class="content-1-zrf2">
                <video class="ready-36e6Vk" loop="" autoplay="" playsinline="">
                    <source src="/vid/0bdc0497eb3a19e66f2b1e3d5741634c.webm" type="video/webm">
                </video>
                <div class="text-3c9Zq1">
                    <div class="tipTitle-GL9qAt">Pyro is loading</div>
                    <div class="tip-2cgoli">${generateDidYouKnowMessage()}</div>
                    <div class="body-2Vra9D contentBase-11jeVK"></div>
                </div>
            </div>
            <div class="problems-3mgf6w slideIn-sCvzGz">
                <div class="problemsText-1Yx-Kl">Connection problems? Let us know!</div>
                <div>
                    <a class="anchor-3Z-8Bb anchorUnderlineOnHover-2ESHQB links-3Ldd4A" href="/status" rel="noreferrer noopener" target="_blank">
                        <svg class="icon-3N9Bhy" aria-hidden="false" width="14" height="14" viewBox="0 0 14 14">
                        <path fill="currentColor" d="M6.99471698,9.67522659 C8.47108874,9.67522659 9.66792453,8.47748685 9.66792453,7 C9.66792453,5.52251315 8.47108874,4.32477341 6.99471698,4.32477341 C5.51834522,4.32477341 4.32150943,5.52251315 4.32150943,7 C4.32150943,8.47748685 5.51834522,9.67522659 6.99471698,9.67522659 Z M6.99471698,2.67522659 C8.18867925,2.67522659 9.26641509,3.16163142 10.0483019,3.94410876 L11.9396226,2.05135952 C10.6822642,0.782477341 8.92830189,0 6.99471698,0 C3.12754717,0 0,3.14048338 0,7 L2.67320755,7 C2.67320755,4.6102719 4.60679245,2.67522659 6.99471698,2.67522659 Z M11.3267925,7 C11.3267925,9.3897281 9.39320755,11.3247734 7.00528302,11.3247734 C5.81132075,11.3247734 4.73358491,10.8383686 3.94113208,10.0558912 L2.04981132,11.9486405 C3.31773585,13.2175227 5.06113208,14 6.99471698,14 C10.8618868,14 14,10.8595166 14,7 L11.3267925,7 Z"></path>
                        </svg>
                        Server Status
                    </a>
                </div>
            </div>
        </div>
    `;
}


/**
 * 
 */
async function hidePageLoader() {
    const loader = document.getElementById('pageLoader');

    loader.classList.add('fadeOut-efi30');

    await delay(100);

    loader.innerHTML = '';
}


/**
 * 
 */
function showStatusPicker() {
    const container = document.querySelectorAll('.layerContainer-yqaFcK')[0];

    if (container.childElementCount > 0) return hideStatusPicker();

    container.innerHTML = `
        <div class="statusPicker-rj932">
            <div style="width: 100%; height: 100%;" onclick="hideStatusPicker()"><div>
            <div id="statusPicker" class="layer-v9HyYc" style="position: absolute; left: 80px; bottom: 57.3193px;">
                <div class="animatorTop-2Y7x2r scale-3iLZhb didRender-33z1u8">
                    <div class="menu-3sdvDG styleFixed-sX-yHV">
                        <div class="scroller-3BxosC thin-1ybCId scrollerBase-289Jih">
                            <div class="item-1tOPte colorDefault-2K3EoJ" onclick="setManualStatus('online')">
                                <div class="statusItem-33LqPf">
                                    <svg width="10" height="10" class="mask-1qbNWk icon-1IxfJ2" viewBox="0 0 10 10">
                                        <foreignObject x="0" y="0" width="10" height="10" mask="url(#svg-mask-status-online)">
                                            <div class="status-1AY8sU" style="background-color: #51DF3E;"></div>
                                        </foreignObject>
                                    </svg>
                                    <div class="status-1fhblQ">Online</div>
                                </div>
                            </div>
                            <div role="separator" class="separator-2I32lJ"></div>
                            <div class="item-1tOPte colorDefault-2K3EoJ" onclick="setManualStatus('idle')">
                                <div class="statusItem-33LqPf">
                                    <svg width="10" height="10" class="mask-1qbNWk icon-1IxfJ2" viewBox="0 0 10 10">
                                        <foreignObject x="0" y="0" width="10" height="10" mask="url(#svg-mask-status-idle)">
                                            <div class="status-1AY8sU" style="background-color: #dd9e00;"></div>
                                        </foreignObject>
                                    </svg>
                                    <div class="status-1fhblQ">Idle</div>
                                </div>
                            </div>
                            <div class="item-1tOPte colorDefault-2K3EoJ" onclick="setManualStatus('dnd')">
                                <div class="statusItem-33LqPf">
                                    <svg width="10" height="10" class="mask-1qbNWk icon-1IxfJ2" viewBox="0 0 10 10">
                                        <foreignObject x="0" y="0" width="10" height="10" mask="url(#svg-mask-status-dnd)">
                                            <div class="status-1AY8sU" style="background-color: #DF3E3E;"></div>
                                        </foreignObject>
                                    </svg>
                                    <div class="status-1fhblQ">Do Not Disturb</div>
                                    <div class="description-2L932D">You will not receive notifications.</div>
                                </div>
                            </div>
                            <div class="item-1tOPte colorDefault-2K3EoJ" onclick="setManualStatus('offline')">
                                <div class="statusItem-33LqPf">
                                    <svg width="10" height="10" class="mask-1qbNWk icon-1IxfJ2" viewBox="0 0 10 10">
                                        <foreignObject x="0" y="0" width="10" height="10" mask="url(#svg-mask-status-offline)"> 
                                            <div class="status-1AY8sU" style="background-color: #666665;"></div>
                                        </foreignObject>
                                    </svg>
                                    <div class="status-1fhblQ">Appear Offline</div>
                                    <div class="description-2L932D">You will not appear online, but can still use Pyro.</div>
                                </div>
                            </div>
                            <div role="separator" class="separator-2I32lJ hidden"></div>
                            <div class="item-1tOPte colorDefault-2K3EoJ hidden" onclick="showCustomStatusModal()">
                                <div class="statusItem-33LqPf">
                                    <div class="customEmojiPlaceholder-37iZ_j customEmoji-2_2FwB"></div>
                                    <div class="status-1fhblQ">Set a custom status</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}



/**
 * 
 */
async function hideStatusPicker() {
    const container = document.querySelectorAll('.layerContainer-yqaFcK')[0];

    if (container.childElementCount < 1) return;

    // TODO: Fix this issue elegantly
    try {
        const picker = container.querySelectorAll('.statusPicker-rj932')[0];

        container.removeChild(picker);
    } catch (e) {}
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
function hidePrivateChannelPlaceholder() {
    const channelsList = document.getElementById('privateChannelsList');
    const placeholder = document.getElementById('privateChannelPlaceholder');

    if (placeholder) channelsList.removeChild(placeholder);
}


/**
 * 
 * @param {*} channelId 
 */
let lastChannelId;

function loadChannelFromId(channel_id) {
    if (!channel_id) channel_id = getChannelFromURL();
    if (lastChannelId === channel_id) return;

    let title = 'Pyro';
    let path = '/channels/@me/';

    const channel = document.getElementById(`channel-${channel_id}`);

    if (channel) {
        path = (channel_id === 'friends') ? '/channels/@me/' : `/channels/@me/${channel_id}/`;
    } else {
        channel_id = 'friends';
    }

    window.history.pushState({}, title, path);
    selectChannel(channel_id);
    selectMainBody(channel_id);

    lastChannelId = channel_id;
}
 
 
 /**
  * 
  * @returns 
  */
function getChannelFromURL() {
    const path = window.location.pathname.split('/');

    path.filter((value, index) => {
        if (!value) path.splice(index, index + 1);
    });

    const channel_id = path[path.length - 1];

    // Friends page
    const { uid } = firebase.auth().currentUser;

    if (channel_id === '@me') return CACHED_USERS[uid].last_open_channel || '';

    const otherPages = ['embers'];

    return (isNaN(channel_id) && !otherPages.includes(channel_id)) ? false : channel_id;
}