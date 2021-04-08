//? ------------------------------------------------------------------------------------
//?
//?  /helpers/globals.js
//?  Pyro Chat
//?
//?  Developed by Robolab LLC
//?  Copyright (c) 2021 Robolab LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------

// Global Cache
const CACHED_USERS = {};
const CACHED_RECIPIENTS = {};
const CACHED_PRIVATE_CHAT_LISTENERS = {};

// Global thresholds
const LOADING_TIMEOUT = 1500;
const ACTIVITY_TIMEOUT = 3000;
const IDLE_TIMEOUT = 5000;

// Global user status colours
const STATUS_COLOURS = {
    online: '#51DF3E',
    idle: '#dd9e00',
    dnd: '#DF3E3E',
    offline: '#666665',
    streaming: '#563490',
};

// Firebase authentication error codes
const AUTH_CODES = {
    'auth/claims-too-large': 'Claim size exceeds 1000 bytes.',
    'auth/email-already-exists': 'Email already exists.',
    'auth/id-token-expired': 'Authentication token has expired.',
    'auth/id-token-revoked': 'Authentication token has been revoked.',
    'auth/insufficient-permission': 'Insufficient permissions.',
    'auth/internal-error': 'Authentication server encountered an error.',
    'auth/invalid-argument': 'Invalid authentication argument.',
    'auth/invalid-claims': 'Invalid authentication payload.',
    'auth/invalid-continue-uri': 'Invalid authentication URI.',
    'auth/invalid-creation-time': 'Invalid creation time.',
    'auth/invalid-credential': 'Invalid authentication credentials.',
    'auth/email-already-in-use': 'Email already exists.',

    'auth/user-not-found': 'User does not exist.',
    'auth/invalid-email': 'Invalid email address.',
    'auth/invalid-display-name': 'Invalid username.',
    'auth/wrong-password': 'Invalid password.',
    'auth/too-many-requests': 'Slow down! You are being rate limited.'
};

// Loading overlay messages
const DID_YOU_KNOW = [
    'Props if you are reading this, because that means either Pyro is down or your internet just cannot load Pyro, which is impossible because Pyro was built to run on all network connections.'
];