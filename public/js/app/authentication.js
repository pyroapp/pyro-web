//? ------------------------------------------------------------------------------------
//?
//?  /app/authentication.js
//?  Pyro Chat
//?
//?  Developed by Robolab LLC
//?  Copyright (c) 2021 Robolab LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


window.onload = () => {
    const didyouknow = document.getElementById('didYouKnowLabel');

    didyouknow.innerText = generateDidYouKnowMessage();
}


window.onpopstate = () => {
    loadPrivateChannelFromId(); // When user goes back
}


firebase.auth().onAuthStateChanged(async user => {
    if (!user) return redirect('/login');

    await firebase.firestore().collection('users').doc(user.uid).onSnapshot(snapshot => {
        CACHED_USERS[user.uid] = {
            ...snapshot.data()
        };

        const { username, discriminator, status } = snapshot.data();

        // Set user details
        const usernameLabel = document.getElementById('usernameLabel');
        const discriminatorLabel = document.getElementById('discriminatorLabel');
        const avatarImage = document.getElementById('avatarImage');

        usernameLabel.innerText = username;
        discriminatorLabel.innerText = '#' + discriminator;
        avatarImage.setAttribute('src', getAvatar());

        // Set user status
        const userStatus = document.getElementById('userStatus');

        userStatus.setAttribute('fill', STATUS_COLOURS[status]);
        userStatus.setAttribute('mask', `url(#svg-mask-status-${status})`);
    });

    await loadPrivateChannels();
    await setAutomaticStatus('online');
    await delay(LOADING_TIMEOUT);
    loadPrivateChannelFromId();
    await delay(500);
    hidePageLoader();
    await enableNotifications();
});