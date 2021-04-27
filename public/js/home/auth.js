//? ------------------------------------------------------------------------------------
//?
//?  /home/auth.js
//?  Pyro Chat
//?
//?  Developed by Pyro Communications LLC
//?  Copyright (c) 2021 Pyro Communications LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        const mobile = document.getElementById('loginButtonMobile');
        const desktop = document.getElementById('loginButtonDesktop');

        desktop.innerText = 'Open Pyro';
        desktop.setAttribute('href', '/channels/@me');

        mobile.innerText = 'Open Pyro';
        mobile.setAttribute('href', '/channels/@me');
    }
});