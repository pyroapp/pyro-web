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

firebase.auth().onAuthStateChanged(async user => {
    if (user) {
        if (!isEmailVerified()) {
            showInteractiveBanner(
                'Please check your email and follow the instructions to verify your account.',
                'Resend',
                'sendEmailVerification()'
            );
        }

        await showMiniProfile();
        // await delay(2000);
    }

    hidePageLoader();
});


/**
 * 
 */
async function showMiniProfile() {
    const {
        username,
        avatar
    } = await getProfile();

    const name = username.split('#')[0];
    const discriminator = username.split('#')[1];

    const usernameLabel = document.getElementById('usernameLabel');
    const discriminatorLabel = document.getElementById('discriminatorLabel');
    const avatarImage = document.getElementById('avatarImage');

    usernameLabel.innerText = name;
    discriminatorLabel.innerText = '#' + discriminator;
    avatarImage.setAttribute('src', avatar);
}