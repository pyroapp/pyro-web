//? ------------------------------------------------------------------------------------
//?
//?  /app/messages/helpers.js
//?  Pyro Chat
//?
//?  Developed by Pyro Communications LLC
//?  Copyright (c) 2021 Pyro Communications LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


/**
 * 
 * @param {*} string 
 * @returns 
 */
 function extractLinks(string) {
    const expression = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
    const matches = string.match(expression);
    const links = [];

    for(match in matches) {
        links.push(matches[match]);
    }

    return links;
}


/**
 * 
 * @param {*} timestamp 
 * @returns 
 */
 function formatMessageTime(timestamp) {
    const isToday = moment(timestamp).isSame(moment(), "day");
    const isYesterday = moment(timestamp).isSame(moment().subtract(1, 'day'), "day");

    let long = moment(timestamp).format('MM/DD/YYYY');
    const short = moment(timestamp).format('h:mm A');

    if (isToday) long = moment(timestamp).format('h:mm A');
    if (isYesterday) long = 'Yesterday at ' + moment(timestamp).format('h:mm A');

    return {
        long: long,
        short: short
    };
}


/**
 * 
 * @param {*} channel_id 
 */
 function scrollToBottom(channel_id) {
    const messageList = document.getElementById(`messages-${channel_id}`).lastChild;
    
    messageList.scrollIntoView();
}


/**
 * 
 * @param {*} message_id 
 * @param {*} newcontent 
 */
 function updateMessage(channel_id, message_id, newcontent) {
    firebase.firestore().collection('channels').doc(channel_id).collection('messages').doc(message_id).update({
        content: newcontent,
        edited_timestamp: getTime()
    });
}


/**
 * 
 * @param {*} channel_id 
 * @param {*} message_id 
 */
 function deleteMessage(channel_id, message_id) {
    firebase.firestore().collection('channels').doc(channel_id).collection('messages').doc(message_id).delete();
}


/**
 * Shows a verified user tag with the specified content
 * @param {*} content Tag Content
 * @returns HTML for tag
 */
function userTag(content) {
    return `<span class="botTag-3W9SuW botTagRegular-2HEhHi botTag-2WPJ74 px-10SIf7"><svg class="botTagVerified-1klIIt" width="16" height="16" viewBox="0 0 16 15.2"><path d="M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z" fill="currentColor"></path></svg><span class="botText-1526X_">${content}</span></span>`;
}


/**
 * If the user clicks on a spoiler on the page it will reveal the text beneath
 */
document.body.onclick = e => {
    if (e.target.className === "spoilerText-3p6IlD hidden-HHr2R9") {
        e.target.className = "spoilerText-3p6IlD";
    }
};