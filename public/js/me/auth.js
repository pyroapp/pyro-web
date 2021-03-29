//? ------------------------------------------------------------------------------------
//?
//?  /me/auth.js
//?  Discord JS
//?
//?  Developed by Cooper Beltrami
//?
//?  Project built using designs, graphics and other assets developed by Discord Inc.
//?  Copyright (c) 2021 Cooper Beltrami and Discord Inc. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


firebase.auth().onAuthStateChanged(user => {
    if (!user) return redirect('/login');

    const ref = firebase.firestore().collection('users').doc(user.uid);
    
    ref.onSnapshot(data => {
        const profile = data.data().profile;

        CACHED_USERS[user.uid] = {
            ...data.data().profile
        };

        const usernameLabel = document.getElementById('usernameLabel');
        const discriminatorLabel = document.getElementById('discriminatorLabel');
        const avatarImage = document.getElementById('avatarImage');

        usernameLabel.innerText = CACHED_USERS[user.uid].username;
        discriminatorLabel.innerText = '#' + CACHED_USERS[user.uid].discriminator;
        avatarImage.setAttribute('src', getAvatar());
    });
});