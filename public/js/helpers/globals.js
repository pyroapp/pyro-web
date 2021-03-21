//? ------------------------------------------------------------------------------------
//?
//?  /helpers/globals.js
//?  Discord JS
//?
//?  Developed by Cooper Beltrami
//?
//?  Project built using designs, graphics and other assets developed by Discord Inc.
//?  Copyright (c) 2021 Cooper Beltrami and Discord Inc. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


const AGE_LIMIT = 13;
const DOB_START_YEAR = 1921;
const LOADING_TIMEOUT = 1000;
const ACTIVITY_TIMEOUT = 3000;
const IDLE_TIMEOUT = 3000;

const AVATAR_PATH = 'https://firebasestorage.googleapis.com/v0/b/djs-clone.appspot.com/o/avatars%2F';

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

const DID_YOU_KNOW = [
    'Our mascot, Wumpus, was originally created as a mascot with no friends :(',
    'Discord was almost called Wyvern before we picked our name. Not too proud of that one.',
    'shift alt ↑ or ↓ will navigate between unread channels',
    'You can use Streamer Mode to hide personal details while streaming.',
    'You can temporarily mute a server or channel by right-clicking it.',
    'Customize Discord\'s appearance in the user settings menu.',
    'Click a server name in the emoji picker to hide that server\'s emoji.',
    'Drag and drop servers on top of each other to create server folders.',
    'Share what you\'re playing by using the Game Activity settings.',
    'Our logo\'s name is Clyde',
    'Our old Partner mascot was an elf named Springle. He recently retired.',
    'Discord\'s official birthday is May 13, 2015',
    'Click your avatar in the lower-left corner to set a custom status.',
    'You can type /tableflip and /unflip to spice up your messages.',
    'Our HypeSquad program has three houses you can be sorted in to by taking the in-app quiz: Bravery, Balance, and Brilliance',
    'You can play our version of the Snake game on our 404 page by pressing a ~secret~ button.',
    'There\'s a very small--and we mean small--chance you can get a secret ringtone when calling someone. Good luck!',
    'Use ctrl / to bring up the list of keyboard shortcuts.',
    'alt click a message to mark it as unread.',
    'shift enter to make a new line without sending your message.',
    'There are a bunch of hidden "Easter Eggs" in the app that happen when you click certain things...',
    'A red mic icon means that person has been muted by a server admin.',
    'In Discord\'s early days, light theme was the only theme. Scary times.',
    'ctrl k to quickly find a previous conversation or channel.',
    'Group DMs can have up to ten members.',
    'Change each participant\'s volume by right-clicking them in a call.',
    'Type a plus sign before an emoji to turn it into a reaction.',
    'The top-most role for a user defines that user\'s color.',
    'You can type /nick to quickly change your nickname in a server.',
    'You can drag and drop files onto Discord to upload them.',
    'Characters like @, #, !, and * will narrow Quick Switcher results.',
    'You can create channel categories to group and organize your channels.',
    'You can join up to 100 servers.',
    'shift esc to mark an entire server as read.',
    'Holding shift while clicking emoji allows you to send multiple emoji.',
    'We came up with the idea of Discord Nitro over morning breakfast potatoes.',
    'Link your favorite social media accounts in the connections settings.',
    'Click the compass in your server list to find new servers.',
    'Highlight text in your chat bar to bold, use italics, and more.',
    'The character on our 404 page is a robot hamster named Nelly',
    'Hover a GIF and click the star to save it to your favorites.',
    'Discord was almost called Bonfire before we picked our name. It was meant to be nice and cozy.',
    'You can press ↑ to quickly edit your most recent message.',
    'Right click to pin messages in a channel or DM to save them for later.',
    'Discord started as a game company making a mobile game called Fates Forever',
    'In the ancient days, Discord started as a browser only app.',
    'You can type /tenor or /giphy + anything to find a GIF for that topic!',
    'Hide muted channels in a server by right clicking the server name.'
];