//? ------------------------------------------------------------------------------------
//?
//?  /me/interface.js
//?  Discord JS
//?
//?  Developed by Cooper Beltrami
//?
//?  Project built using designs, graphics and other assets developed by Discord Inc.
//?  Copyright (c) 2021 Cooper Beltrami and Discord Inc. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


window.onload = () => {
    const didyouknow = document.getElementById('didYouKnowLabel');

    didyouknow.innerText = generateDidYouKnowMessage();
}


window.onunload = () => {
    setStatus('offline');
}


document.onvisibilitychange = async () => {
    await delay(IDLE_TIMEOUT);
    setAutomaticStatus();
}


window.onpopstate = () => {
    // Event only occurs when user goes back
    loadPrivateChannelFromId();
}


firebase.auth().onAuthStateChanged(async user => {
    if (user) {
        if (!isEmailVerified()) {
            showInteractiveBanner(
                'Please check your email and follow the instructions to verify your account.',
                'Resend',
                'sendEmailVerification(true)'
            );
        }
        
        loadPrivateChannels();
        loadPrivateChannelFromId();

        await setAutomaticStatus('online');
        await delay(LOADING_TIMEOUT);
    }

    hidePageLoader();
});


/**
 * 
 * @param {*} channelId 
 */
let lastPrivateChannelId;

function loadPrivateChannelFromId(channelId) {
    if (!channelId) channelId = getPrivateChannelFromURL();
    if (lastPrivateChannelId === channelId) return;

    let title = 'Discord';
    let path = '/channels/@me/';

    const privateChannel = document.getElementById(`privatechannel-${channelId}`);

    if (privateChannel) {
        title = privateChannel.getAttribute('ptitle');
        path = (channelId === 'friends') ? '/channels/@me/' : `/channels/@me/${channelId}/`;
    } else {
        channelId = 'friends';
    }

    window.history.pushState({}, title, path);
    selectPrivateChannel(channelId);
    selectMainBody(channelId);

    lastPrivateChannelId = channelId;
}


/**
 * 
 * @returns 
 */
function getPrivateChannelFromURL() {
    const path = window.location.pathname.split('/');

    path.filter((value, index) => {
        if (!value) path.splice(index, index + 1);
    });

    const privChannelId = path[path.length - 1];

    return isNaN(privChannelId) ? false : privChannelId;
}