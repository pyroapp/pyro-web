//? ------------------------------------------------------------------------------------
//?
//?  /firebase/config.js
//?  Pyro Chat
//?
//?  Developed by Pyro Communications LLC
//?  Copyright (c) 2021 Pyro Communications LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------

const staging_config = {
    apiKey: "AIzaSyAp71QVJ89ELh4LWpa3uhIepnND0TXwB4k",
    authDomain: "pyro-staging.firebaseapp.com",
    projectId: "pyro-staging",
    storageBucket: "pyro-staging.appspot.com",
    messagingSenderId: "812433736328",
    appId: "1:812433736328:web:85ddf3c267fa82bdeb553d"
};

const production_config = {
    apiKey: "AIzaSyDJ50aBUeML6SRDaGzun1-ssLGWUobOWxs",
    authDomain: "pyro-production.firebaseapp.com",
    projectId: "pyro-production",
    storageBucket: "pyro-production.appspot.com",
    messagingSenderId: "54609768963",
    appId: "1:54609768963:web:c2e751548bfbe965fad436",
    measurementId: "G-V52FCNFW41"
};

const config = isStaging() ? staging_config : production_config;

firebase.initializeApp(config);

if (isStaging()) console.log('%cSTAGING', 'color: orange; font-size: 32px;');

const analytics = firebase.analytics();
const messaging = firebase.messaging();

messaging.onMessage(payload => {
    console.log(payload);
});