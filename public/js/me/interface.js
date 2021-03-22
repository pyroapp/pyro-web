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
};


document.onvisibilitychange = async () => {
    await delay(IDLE_TIMEOUT);
    setAutomaticStatus();
};


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

        await delay(LOADING_TIMEOUT);
    }

    hidePageLoader();
});


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