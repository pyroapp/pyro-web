importScripts('https://www.gstatic.com/firebasejs/7.9.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.9.3/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCw2XgIvCUbUclj4KSSFZ9rwhQAruo3jAc",
    authDomain: "pyro-chat.firebaseapp.com",
    projectId: "pyro-chat",
    storageBucket: "pyro-chat.appspot.com",
    messagingSenderId: "598431502056",
    appId: "1:598431502056:web:aac9825304ddf9fbc2435d",
    measurementId: "G-56W0T7F4YD"
});

const messaging = firebase.messaging();

messaging.usePublicVapidKey('BLHzzlAd9aBJCaOSrgTlO_vs1EHA_GpHo8pco2cRnD3rNrGtxWMdGphjUWY14w2Wk5qYCup3GflyRdJdxWMqKic');