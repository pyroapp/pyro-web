//? ------------------------------------------------------------------------------------
//?
//?  /helpers/globals.js
//?  Pyro Chat
//?
//?  Developed by Pyro Communications LLC
//?  Copyright (c) 2021 Pyro Communications LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------

// Themes
const DEFAULT_THEME = 'dim';


// Global cache
const CACHED_USERS = {};
const CACHED_GROUP_CHAT_CHANNELS = {};
const CACHED_RECIPIENTS = {};
const CACHED_CHAT_LISTENERS = {};
const CACHED_LISTENERS = {};
const CACHED_FRIENDS = [];
const CACHED_MESSAGES = {};


// Global states
let CURRENT_CHANNEL_ID;
let IS_EDITING = false;
let IS_REPLYING = null;
const LAST_MESSAGE_TIMESTAMP = [];


// Global thresholds
const TYPING_INDICATOR_THRESHOLD = 2000;
const LOADING_TIMEOUT = 0;
const ACTIVITY_TIMEOUT = 3000;
const IDLE_TIMEOUT = 10000;
const INITIAL_MESSAGE_FETCH = 50;
const GROUP_DMS_USER_THRESHOLD = 14; // Not including current user


// API endpoints
const OG_URL = 'https://og.pyrochat.app/';
const CDN_URL = 'https://cdn.pyrochat.app/';
const CDN_AUTH_URL = 'https://fileauth.pyrochat.app/';


// Global user status colours
const STATUS_COLOURS = {
    online: '#51DF3E',
    idle: '#dd9e00',
    dnd: '#FF1414',
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
    'Deobfuscating the obfuscation!',
    'Now with 100% less Nitro!',
    'Organic, gluten-free, non-GMO code!',
    'Spaghettifying the spaghetto!',
    'Spark a conversation!',
    'Lighting up a nice campfire for you!',
    'Say hi at your local Pyro tavern - hot chocolate included!',
    'Unpack the webpack!',
    'Doing wizardly math stuff!',
    'Caring for the fonts!',
    'Lighting the way to camp!',
    'Made you a cup of hot chocolate!',
    'Late night gaming or planning your next dinner?',
    'Welcome back to Pyro!',
    'Preparing a warm welcome!',
    'Make a new friend!',
    'Be more like doko.',
    'Pyro > Discord > Guilded',
    'It\'s time to ditch Skype and Discord',
    'Generating handlers...'
];