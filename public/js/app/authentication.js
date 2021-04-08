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


window.onunload = async () => {
    const { uid } = firebase.auth().currentUser;
    
    await firebase.firestore().collection('users').doc(uid).update({
        status: {
            offline: true,
            code: CACHED_USERS[uid].status.code,
            manual: CACHED_USERS[uid].status.manual,
        }
    });
}


window.onpopstate = () => {
    loadPrivateChannelFromId(); // When user goes back
}


document.onvisibilitychange = async () => {
    const { uid } = firebase.auth().currentUser;

    if (CACHED_USERS[uid].status.manual) return;

    await delay(IDLE_TIMEOUT);
    setStatus('idle', false);
}


firebase.auth().onAuthStateChanged(async user => {
    if (!user) return redirect('/login');

    await firebase.firestore().collection('users').doc(user.uid).onSnapshot(snapshot => {
        CACHED_USERS[user.uid] = {
            ...snapshot.data()
        };

        // Set user details
        const usernameLabel = document.getElementById('usernameLabel');
        const discriminatorLabel = document.getElementById('discriminatorLabel');
        const avatarImage = document.getElementById('avatarImage');

        usernameLabel.innerText = CACHED_USERS[user.uid].username;
        discriminatorLabel.innerText = '#' + CACHED_USERS[user.uid].discriminator;
        avatarImage.setAttribute('src', getAvatar());

        // Set user status
        const userStatus = document.getElementById('userStatus');
        const { status } = snapshot.data();

        if (status.offline) status.code = 'offline';

        userStatus.setAttribute('fill', STATUS_COLOURS[status.code]);
        userStatus.setAttribute('mask', `url(#svg-mask-status-${status.code})`);
        
        firebase.firestore().collection('users').doc(user.uid).update({
            status: {
                offline: false,
                code: CACHED_USERS[user.uid].status.code,
                manual: CACHED_USERS[user.uid].status.manual,
            }
        });
    });

    await loadPrivateChannels();
    await delay(LOADING_TIMEOUT);
    loadPrivateChannelFromId();
    await delay(500);
    hidePageLoader();
    await enableNotifications();
});