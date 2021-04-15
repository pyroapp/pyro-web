importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyDJ50aBUeML6SRDaGzun1-ssLGWUobOWxs",
    authDomain: "pyro-production.firebaseapp.com",
    projectId: "pyro-production",
    storageBucket: "pyro-production.appspot.com",
    messagingSenderId: "54609768963",
    appId: "1:54609768963:web:c2e751548bfbe965fad436",
    measurementId: "G-V52FCNFW41"
});

const messaging = firebase.messaging();

messaging.usePublicVapidKey('BBsAqMQZzPTXaYoGWU52TZzR2IxopRvN-pFEoFPVdky7jnFqtAaf-Ij0RCKq3TjpLlnDDRFgACECeULf5UYD8sI');