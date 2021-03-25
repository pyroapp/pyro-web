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

        await setAutomaticStatus('online');
        await showMiniProfile();

        loadPrivateChannelFromId();

        await delay(LOADING_TIMEOUT);
    }

    hidePageLoader();
});


/**
 * 
 * @param {*} channelId 
 */
function loadPrivateChannelFromId(channelId) {
    if (!channelId) channelId = getPrivateChannelFromURL();
    
    // If there is no valid id, load add friends page
    if (!channelId) channelId = 'friends';
    
    const channel = document.getElementById(`privatechannel-${channelId}`);

    // Invalid channel Id
    if (!channel) {
        return window.history.pushState(
            {},
            'Discord',
            '/channenls/@me/'
        );
    }

    const title = channel.getAttribute('ptitle');

    document.title = title || 'Discord';

    deselectAll();
    selectPrivateChannel(channelId);
    selectMainBody(channelId);
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


/**
 * 
 */
async function showMiniProfile() {
    const { username, discriminator } = await getProfile();

    const usernameLabel = document.getElementById('usernameLabel');
    const discriminatorLabel = document.getElementById('discriminatorLabel');
    const avatarImage = document.getElementById('avatarImage');

    usernameLabel.innerText = username;
    discriminatorLabel.innerText = '#' + discriminator;
    avatarImage.setAttribute('src', getAvatar());

    await setDisplayName(username + '#' + discriminator);
}