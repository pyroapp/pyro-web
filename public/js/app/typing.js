//? ------------------------------------------------------------------------------------
//?
//?  /app/typing.js
//?  Pyro Chat
//?
//?  Developed by Robolab LLC
//?  Copyright (c) 2021 Robolab LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


/**
 * 
 * @param {*} channel_id 
 * @param {*} typing 
 */
function isUserTyping(channel_id, typing) {    
    const { uid } = firebase.auth().currentUser;
    const { username } = CACHED_USERS[uid];

    if (typing) {
        firebase.database().ref(`typing_indicator/${channel_id}`).update({
            [uid]: username
        });
    } else {
        firebase.database().ref(`typing_indicator/${channel_id}`).remove();
    }
}


/**
 * 
 * @param {*} channel_id 
 */
function createTypingIndicatorListener(channel_id) {
    const { uid } = firebase.auth().currentUser;

    const chat = document.getElementById(channel_id);
    const indicator = chat.querySelector('.typing-2GQL18');
    const usersIndicator = indicator.querySelector('.text-1y-e8-');

    firebase.database().ref(`typing_indicator/${channel_id}`).on('value', snapshot => {
        const users = snapshot.val();

        // No users typing
        if (!users) {
            console.log(users);

            indicator.classList.add('hidden');
            usersIndicator.innerHTML = '';
        } else {
            console.log('testing', users);

            const typingUsers = [];

            for (user_id in users) {
                if (user_id === uid) return;
                
                const typeString = `<strong>${users[user_id]}</strong>`;
        
                typingUsers.push(typeString);
            }
            
            indicator.classList.remove('hidden');
            usersIndicator.innerHTML = typingUsers.join(', ') + ` ${users.length > 1 ? 'are' : 'is'} typing...`;
        }
    });
}