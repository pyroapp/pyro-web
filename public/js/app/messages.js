//? ------------------------------------------------------------------------------------
//?
//?  /app/messages.js
//?  Pyro Chat
//?
//?  Developed by Robolab LLC
//?  Copyright (c) 2021 Robolab LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


/**
 * 
 * @param {*} channelId 
 */
 function sendPrivateMessage(channel_id) {
    const channel = document.getElementById(channel_id);
    const input = channel.querySelectorAll('.messageField')[0];
    const placeholder = channel.querySelectorAll('.placeholder-37qJjk')[0];

    const message = input.innerHTML.trim();

    if (!message) return;

    const { uid } = firebase.auth().currentUser;
    const ref = firebase.firestore().collection('channels').doc(channel_id).collection('messages').doc(generateId());

    // Format message recipients
    const recipients = [];

    CACHED_RECIPIENTS[channel_id].forEach(recipient => {
        if (uid === recipient) return; // Don't add current user

        const { fcm_token, mute_notifications } = CACHED_USERS[recipient];

        if (mute_notifications) return; // Don't send notification
        if (!fcm_token) return; // User doesn't have notifications enabled

        recipients.push({
            id: recipient,
            token: fcm_token,
        });
    });

    ref.set({
        attachments: [],
        author: {
            id: uid,
            username: CACHED_USERS[uid].username
        },
        channel_id: channel_id,
        content: message,
        edited_timestamp: null,
        mention_everyone: false,
        mention_roles: [],
        mentions: [],
        recipients: recipients,
        pinned: false,
        timestamp: new Date().toISOString(),
    });

    // Remove all child node content
    while (input.childNodes.length > 0) {
        input.firstChild.remove();
    }

    placeholder.classList.remove('hidden');
}


/**
 * 
 * @param {*} channel_id 
 */

async function loadPrivateMessages(channel_id) {   
    let chatdiv = document.querySelectorAll(".textArea-12jD-V");
    
    if (chatdiv) {
        if (chatdiv.length !== 0) {
            for (let query of chatdiv) {
                query.style.height = "44px";
            };
        };
    }; 

    // Retreive the initial 50 messages without a realtime listener
    const msgs = [];
    let lastmsg;

    // First setup of messages are retrieved in descending order to get
    // the last 50 messages instead of the first 50
    const messages = await firebase.firestore()
    .collection('channels')
    .doc(channel_id)
    .collection('messages')
    .where('channel_id', '==', channel_id)
    .orderBy('timestamp', 'desc')
    .limit(INITIAL_MESSAGE_FETCH)
    .get();

    // Reverses the messages again to set them back into
    // chronological order
    messages.forEach(message => {
        msgs.push(message);
    });

    msgs.reverse();

    msgs.forEach(msg => {
        loadMessage(msg);
        lastmsg = msg;
    });

    if (lastmsg) {
        // Get the last document from the previous snapshot to start 
        // the realtime listener from
        const { timestamp: lasttimestamp } = lastmsg.data();

        //  Retreive realtime updates 
        const listener = await firebase.firestore()
        .collection('channels')
        .doc(channel_id)
        .collection('messages')
        .where('channel_id', '==', channel_id)
        .orderBy('timestamp')
        .startAfter(lasttimestamp)
        .onSnapshot(snapshot => {
            if (snapshot.empty) return;

            snapshot.docChanges().forEach(change => {
                const { type, doc: message } = change;

                if (type === 'added') loadMessage(message);
            });
        });

        CACHED_PRIVATE_CHAT_LISTENERS[channel_id] = {
            Unsubscribe: listener,
        };
    } else {
        //  Retreive realtime updates 
        const listener = await firebase.firestore()
        .collection('channels')
        .doc(channel_id)
        .collection('messages')
        .where('channel_id', '==', channel_id)
        .orderBy('timestamp')
        .onSnapshot(snapshot => {
            if (snapshot.empty) return;

            snapshot.docChanges().forEach(change => {
                const { type, doc: message } = change;

                if (type === 'added') loadMessage(message);
            });
        });

        CACHED_PRIVATE_CHAT_LISTENERS[channel_id] = {
            Unsubscribe: listener,
        };
    }
}


/**
 * 
 * @param {*} message 
 */
let lastMessage = { author: { id: null } };

function loadMessage(message) {
    const { content, author: { id: author }, timestamp, channel_id } = message.data();
    const { username } = CACHED_USERS[author];

    const isToday = moment(timestamp).isSame(moment(), "day");
    const isYesterday = moment(timestamp).isSame(moment().subtract(1, 'day'), "day");

    let formattedTime = moment(timestamp).format('dd/mm/yy');
    let messageClass = 'groupStart-23k01U';

    if (isToday) formattedTime = 'Today at ' + moment(timestamp).format('hh:mm A');
    if (isYesterday) formattedTime = 'Yesterday at ' + moment(timestamp).format('hh:mm A');

    if (lastMessage.author.id == author) {
        formattedTime = moment(timestamp).format('hh:mm A');
        messageClass = '';
    }

    const div = document.createElement('div');

    div.className = 'message-2qnXI6 cozyMessage-3V1Y8y wrapper-2a6GCs cozy-3raOZG zalgo-jN1Ica ' + messageClass;
    div.id = `private-message-${message.id}`;
    div.setAttribute('channel', channel_id);
    
    if (lastMessage.author.id === author) {
        div.innerHTML = `
            <div class="contents-2mQqc9">
                <span class="latin24CompactTimeStamp-2V7XIQ timestamp-3ZCmNB timestampVisibleOnHover-2bQeI4 alt-1uNpEt"><i class="separator-2nZzUB"></i>${formattedTime}<i class="separator-2nZzUB"></i></span>
                <div class="markup-2BOw-j messageContent-2qWWxC">${textParser(content)}</div>
            </div>
        `.trim();
    } else {
        div.innerHTML = `
            <div class="contents-2mQqc9">
                <img src="${getAvatar(author)}" class="avatar-1BDn8e clickable-1bVtEA">
                <h2 class="header-23xsNx"><span class="headerText-3Uvj1Y"><span class="username-1A8OIy clickable-1bVtEA">${username}</span></span><span class="timestamp-3ZCmNB"><span><i class="separator-2nZzUB"> — </i>${formattedTime}</span></span></h2>
                <div class="markup-2BOw-j messageContent-2qWWxC">${textParser(content)}</div>
            </div>
        `;
    }

    lastMessage = message.data();

    document.getElementById(`private-message-list-${channel_id}`).appendChild(div);
    div.scrollIntoView();
}

function textParser(text) {
    let oldtext = strip(text);
    let newtext = "";

    let markdown = {
        bold: false,
        italicized: false,
        underlined: false,
        codeblock: false,
        strikethrough: false,
        spoiler: false,
        quote: false
    };

    while (oldtext.length !== 0) {
        if (newtext == "" && oldtext.startsWith("> ") || oldtext.startsWith("\n> ")) {
            newtext = newtext + `<div class="blockquoteContainer-U5TVEi"><div class="blockquoteDivider-2hH8H6"></div><blockquote>`;
            oldtext = oldtext.slice(oldtext.startsWith("\n> ") ? "\n> ".length : "> ".length);
            markdown.quote = true;
        } else if (oldtext.startsWith("\n") && markdown.quote == true) {
            newtext = newtext + "</blockquote></div>"
            oldtext = oldtext.slice(1);
            markdown.quote = false;
        } else if (oldtext.startsWith("**") && !oldtext.startsWith("****")) {
            if (markdown.bold == false) {
                markdown.bold = true;
                newtext = newtext + "<b>";
            } else {
                markdown.bold = false;
                newtext = newtext + "</b>";
            };
            oldtext = oldtext.slice(2);
        } else if (oldtext.startsWith("__") && !oldtext.startsWith("____")) {
            if (markdown.underlined == false) {
                markdown.underlined = true;
                newtext = newtext + "<u>";
            } else {
                markdown.underlined = false;
                newtext = newtext + "</u>";
            };
            oldtext = oldtext.slice(2);
        } else if (oldtext.startsWith("*") && !oldtext.startsWith("**")) {
            if (markdown.italicized == false) {
                markdown.italicized = true;
                newtext = newtext + "<em>";
            } else {
                markdown.italicized = false;
                newtext = newtext + "</em>";
            };
            oldtext = oldtext.slice(1);
        } else if (oldtext.startsWith("`") && !oldtext.startsWith("``")) {
            if (markdown.codeblock == false) {
                markdown.codeblock = true;
                newtext = newtext + "<code>";
            } else {
                markdown.codeblock = false;
                newtext = newtext + "</code>";
            };
            oldtext = oldtext.slice(1);
        } else if (oldtext.startsWith("~~") && !oldtext.startsWith("~~~~")) {
            if (markdown.strikethrough == false) {
                markdown.strikethrough = true;
                newtext = newtext + "<del>";
            } else {
                markdown.strikethrough = false;
                newtext = newtext + "</del>";
            };
            oldtext = oldtext.slice(2);
        } else if (oldtext.startsWith("||") && !oldtext.startsWith("||||")) {
            if (markdown.spoiler == false) {
                markdown.spoiler = true;
                newtext = newtext + `<span class="spoilerText-3p6IlD hidden-HHr2R9" aria-expanded="false" tabindex="0" role="button" aria-label="Spoiler"><span aria-hidden="true" class="inlineContent-3ZjPuv">`
            } else {
                markdown.spoiler = false;
                newtext = newtext + "</span></span>";
            };
            oldtext = oldtext.slice(2);
        } else {
            newtext = newtext + oldtext.slice(0, 1);
            oldtext = oldtext.slice(1);
        };
    };

    if (markdown.bold == true) newtext = removeLastOfThis(newtext, "<b>", "**");
    if (markdown.italicized == true) newtext = removeLastOfThis(newtext, "<em>", "*");
    if (markdown.underlined == true) newtext = removeLastOfThis(newtext, "<u>", "__");
    if (markdown.codeblock == true) newtext = removeLastOfThis(newtext, "<code>", "`");
    if (markdown.strikethrough == true) newtext = removeLastOfThis(newtext, "<del>", "~~");
    if (markdown.spoiler == true) newtext = removeLastOfThis(newtext, `<span class="spoilerText-3p6IlD hidden-HHr2R9" aria-expanded="false" tabindex="0" role="button" aria-label="Spoiler"><span aria-hidden="true" class="inlineContent-3ZjPuv">`);
    if (markdown.quote == true) newtext = newtext + "</blockquote></div>"

    console.log(text)
    console.log(createTextLinks_(newtext))

    return twemoji.parse(createTextLinks_(newtext));
};

function removeLastOfThis(text, find, replace) {
    let removelast = text;
    let removedlast = "";

    while (removelast.length !== 0) {
        if (removelast.endsWith(find)) {
            removedlast = removelast.slice(0, -(find.length)) + replace + removedlast;
            removelast = "";
        } else {
            removedlast = removelast.slice(-1) + removedlast;
            removelast = removelast.slice(0, -1);
        };
    };
    return removedlast;
};

// https://stackoverflow.com/questions/6899659/remove-formatting-from-a-contenteditable-div

function strip(html) {
    let tempDiv = document.createElement("DIV");
    tempDiv.innerHTML = html;
    return tempDiv.innerText;
};

//https://www.labnol.org/code/20294-regex-extract-links-javascript

function createTextLinks_(text) {
    return (text || "").replace(
        /([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi,
            function(match, space, url) {
                let hyperlink = url;
                if (!hyperlink.match('^https?:\/\/')) {
                    hyperlink = 'http://' + hyperlink;
                }
                return space + '<a href="' + hyperlink + '" target="_blank">' + url + '</a>';
        }
    );
};
