//? ------------------------------------------------------------------------------------
//?
//?  /app/messages/edit.js
//?  Pyro Chat
//?
//?  Developed by Pyro Communications LLC
//?  Copyright (c) 2021 Pyro Communications LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


/**
 * 
 * @param {*} message 
 */
 function editMessageInList(message) {
    const messageItem = document.getElementById(`message-${message.id}`);
    const messageContent = messageItem.querySelector('.messageContent-2qWWxC');

    const { content } = message.data();

    // We don't have to check if the message_edited timestamp has changed because editing 
    messageContent.innerHTML = `${content}<span class="edited-3sfAzf">(edited)</span>`;
}


/**
 * 
 * @param {*} message 
 * @param {*} channel_id 
 */
function deleteMessageFromList(message, channel_id) {
    const messageList = document.getElementById(`messages-${channel_id}`);
    const messageItem = document.getElementById(`message-${message.id}`);
    const messages = Array.prototype.slice.call(messageList.children);

    // If the message is the start of a group
    if (messageItem.classList.contains('groupStart-23k01U')) {

        // Get the next message in the list if it exists.
        const nextMessage = messages[messages.indexOf(messageItem) + 1];

        // No more messages in list or there are no more messages after the current one
        if (messages.length === 1 || !nextMessage) {
            return messageList.removeChild(messageItem);
        }
        
        const message_id = nextMessage.id.split('-')[1];
        const nextMessageContents = nextMessage.querySelector('.contents-2mQqc9');
        const messageContent = nextMessageContents.querySelector('.messageContent-2qWWxC').innerHTML;

        const { author: { id:author_uid }, time: { long } } = CACHED_MESSAGES[message_id];
        const { username, flags } = CACHED_USERS[author_uid];

        const customTag = flags.includes('DEVELOPER') ? userTag('Developer') : '';

        nextMessageContents.innerHTML = `
            <div class="groupStartSeparator-kq2kfn"></div>
            <img src="${getAvatar(author_uid)}" class="avatar-1BDn8e clickable-1bVtEA">
            <h2 class="header-23xsNx"><span class="headerText-3Uvj1Y"><span class="username-1A8OIy clickable-1bVtEA">${username}</span>${customTag}</span><span class="timestamp-3ZCmNB"><span><i class="separator-2nZzUB"> — </i>${long}</span></span></h2>
            <div class="markup-2BOw-j messageContent-2qWWxC">${messageContent}</div>
        `.trim();

        nextMessage.classList.add('groupStart-23k01U');
    }

    messageList.removeChild(messageItem);
}








/**
 * 
 * @param {*} channel_id 
 * @param {*} message_id 
 * @param {*} messageEl 
 * @returns 
 */
function showMessageEditingButtons(channel_id, message_id, messageEl) {
    const { uid } = firebase.auth().currentUser;

    if (messageEl.getAttribute('author_uid') !== uid) return;

    messageEl.querySelector('.buttonContainer-DHceWr').innerHTML = `
        <div class="buttons-cl5qTG container-3npvBV">
            <div class="wrapper-2aW0bm">
                <div class="button-1ZiXG9" id="edit-message">
                    <svg class="icon-LYJorE" width="24" height="24" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.2929 9.8299L19.9409 9.18278C21.353 7.77064 21.353 5.47197 19.9409 4.05892C18.5287 2.64678 16.2292 2.64678 14.817 4.05892L14.1699 4.70694L19.2929 9.8299ZM12.8962 5.97688L5.18469 13.6906L10.3085 18.813L18.0201 11.0992L12.8962 5.97688ZM4.11851 20.9704L8.75906 19.8112L4.18692 15.239L3.02678 19.8796C2.95028 20.1856 3.04028 20.5105 3.26349 20.7337C3.48669 20.9569 3.8116 21.046 4.11851 20.9704Z" fill="currentColor"></path>
                    </svg>
                </div>
                <div class="button-1ZiXG9" id="delete-message">
                    <svg class="icon-LYJorE" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z"></path>
                        <path fill="currentColor" d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z"></path>
                    </svg>
                </div>
            </div>
        </div>
    `.trim();

    document.getElementById('edit-message').onclick = () => editMessage(channel_id, message_id);
    document.getElementById('delete-message').onclick = () => deleteMessage(channel_id, message_id);
}


/**
 * 
 * @param {*} channel_id 
 * @param {*} message_id 
 */
let tempMessage;

function editMessage(channel_id, message_id) {

    // If another message is already being edited
    if (document.querySelector('.editingMessageContainer-fj023r')) return;

    // Get the contents of the message
    const message = document.getElementById(`message-${message_id}`);
    const content = message.querySelector('.messageContent-2qWWxC');

    // Cancel message editing
    const stopEdit = () => {
        const editContainer = message.querySelector('.editingMessageContainer-fj023r');

        editContainer.classList = 'markup-2BOw-j messageContent-2qWWxC';
        editContainer.innerHTML = tempMessage;

        IS_EDITING = false;
    }

    // Save edited message
    const saveEdit = () => {
        const newMessage = input.innerHTML;

        // Message has not changed
        if (newMessage === tempMessage) return stopEdit();

        // Message has changed
        updateMessage(channel_id, message_id, newMessage);

        stopEdit();
    }

    // Check if the user is already editing, if they are, stop editing
    if (IS_EDITING) return stopEdit();

    IS_EDITING = true;

    tempMessage = content.innerHTML;

    // Remove edited tag from input
    const messageContent = tempMessage.replace('<span class="edited-3sfAzf">(edited)</span>', '');

    // Change the UI
    content.innerHTML = `
        <div class="editMessage-d93fk9">
            <div class="scrollableContainer-2NUZem webkit-HjD9Er">
                <div class="inner-MADQqc sansAttachButton-td2irx">
                    <div class="textArea-12jD-V textAreaSlate-1ZzRVj slateContainer-3Qkn2x">
                        <div contenteditable="true" class="markup-2BOw-j slateTextArea-1Mkdgw fontSize16Padding-3Wk7zP" spellcheck="true" style="outline: none; white-space: pre-wrap; overflow-wrap: break-word; padding-top: 12px;">${messageContent}</div>
                    </div>
                </div>
            </div>
            <div class="operations-36ENbA">escape to <a class="anchor-3Z-8Bb anchorUnderlineOnHover-2ESHQB cancelEdit-j091dg">cancel</a> • enter to <a class="anchor-3Z-8Bb anchorUnderlineOnHover-2ESHQB saveEdit-kfk90t">save</a></div>
        </div>
    `.trim();

    content.classList = 'editingMessageContainer-fj023r';

    // Add input event listeners
    const input = content.querySelector('.slateTextArea-1Mkdgw');
    const cancel = content.querySelector('.cancelEdit-j091dg');
    const save = content.querySelector('.saveEdit-kfk90t');

    setCaretToEnd(input);

    // Send message on enter
    input.onkeypress = event => {
        if (!event.shiftKey && event.key === 'Enter') {
            event.returnValue = false;

            saveEdit();

            // Change height of input dynamically
            const chatdiv = document.querySelectorAll(".textArea-12jD-V");
    
            if (chatdiv) {
                if (chatdiv.length !== 0) {
                    for (query of chatdiv) {
                        query.style.height = "44px";
                    }
                }
            }
        }
    }

    input.onkeyup = event => { if (event.key === 'Escape') return stopEdit() }
    cancel.onclick = () => stopEdit();
    save.onclick = () => saveEdit();

    // Dynamic input height
    input.oninput = () => {

        // Dynamically change height of message field with multiple lines
        const length = input.childNodes.length == 0 ? 1 : input.childNodes.length;

        const chatdiv = document.querySelectorAll(".textArea-12jD-V");
    
        if (!chatdiv) return;
        if (chatdiv.length === 0) return;

        for (query of chatdiv) {
            query.style.height = (33 + (11 * length)) + "px";
        }
    };

    // Sanitise pasting
    // TODO: Figure out how to merge this
    input.addEventListener("paste", event => {
        event.preventDefault();
    
        const text = (event.originalEvent || event).clipboardData.getData('text/plain');
    
        document.execCommand(
            "insertHTML",
            false,
            text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
        );
    });

    input.onpaste = event => {
        const items = (event.clipboardData || event.originalEvent.clipboardData).items;

        for (i in items) {
            if (items[i].kind === 'file') return sendAttachmentHandler(
                channel_id,
                [items[i].getAsFile()]
            );
        }
    }
}