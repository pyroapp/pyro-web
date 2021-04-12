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
    loadChannelFromId(); // When user goes back
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
    await loadGroupChannels();
    await setAutomaticStatus('online');
    await delay(LOADING_TIMEOUT);
    loadChannelFromId();
    await delay(500);
    hidePageLoader();
    await enableNotifications();
});