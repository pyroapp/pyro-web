//? ------------------------------------------------------------------------------------
//?
//?  /home/auth.js
//?  Pyro Chat
//?
//?  Developed by Robolab LLC
//?  Copyright (c) 2021 Robolab LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        const mobile = document.getElementById('loginButtonMobile');
        const desktop = document.getElementById('loginButtonDesktop');

        desktop.innerText = 'Open Discord';
        desktop.setAttribute('href', '/channels/@me');

        mobile.innerText = 'Open Discord';
        mobile.setAttribute('href', '/channels/@me');
    }
});