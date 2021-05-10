//? ------------------------------------------------------------------------------------
//?
//?  /app/authentication.js
//?  Pyro Chat
//?
//?  Developed by Pyro Communications LLC
//?  Copyright (c) 2021 Pyro Communications LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


window.onload = () => {
    const didyouknow = document.getElementById('didYouKnowLabel');

    didyouknow.innerText = generateDidYouKnowMessage();

    setTheme();
}


window.onpopstate = () => {
    loadChannelFromId(); // When user goes back
}


// Copy users full username and tag to clipboard
document.querySelector('.canCopy-2VBT7N').onclick = () => {
    const { uid } = firebase.auth().currentUser;
    const { username, discriminator } = CACHED_USERS[uid];

    copyToClipboard(`${username}#${discriminator}`);
}


firebase.auth().onAuthStateChanged(async user => {
    if (!user) return redirect('/login');

    await firebase.firestore().collection('users').doc(user.uid).onSnapshot(snapshot => {
        CACHED_USERS[user.uid] = {
            ...snapshot.data()
        };

        document.getElementById('avatarImage').setAttribute('src', getAvatar());
        document.querySelectorAll('.panels-j1Uci_')[0].setAttribute('uid', user.uid);
    
        setRealtimeUserInfo(user.uid);
    });

    await loadPrivateChannels();
    loadGroupChannels();
    getFriendsListener();
    await blockedUserHandler();
    await setAutomaticStatus('online');
    await delay(LOADING_TIMEOUT);
    loadChannelFromId();
    await delay(500);
    hidePageLoader();
    await enableNotifications();
});