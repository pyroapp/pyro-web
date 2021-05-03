//? ------------------------------------------------------------------------------------
//?
//?  /app/typing.js
//?  Pyro Chat
//?
//?  Developed by Robolab LLC
//?  Copyright (c) 2021 Robolab LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------

function setFlag(flag){

    const { uid } = firebase.auth().currentUser;
    const username = CACHED_USERS[uid].username;
    switch(flag){
        
        case "TYPING":
            {
                firebase.database().ref(`typing_indicator/${CURRENT_CHANNEL_ID}`).update({
                    [uid]: username
                })
                break;
            }
        
        case "NOT_TYPING":
            {
               firebase.database().ref(`typing_indicator/${CURRENT_CHANNEL_ID}/${uid}`).remove()
            }

    }

}


async function checkTyping(){

    const { uid } = firebase.auth().currentUser;
    const username = CACHED_USERS[uid].username;

    if (CURRENT_CHANNEL_ID == undefined) return;
    
    const req = await firebase.database().ref(`typing_indicator/${CURRENT_CHANNEL_ID}`).get();
    const users = req.val();

    if (users == null) return;

    let usernames = Object.values(users);
    usernames = usernames.filter(user => user !== username);

    let typingString = usernames[0];


    for (i = 1; i < usernames.length; i++){
        typingString += ", ";
        typingString += usernames[i];
    }

    typingString += " is typing...";

    document.getElementById("typing-indicator").innerHTML = `<strong> ${typingString} </strong>`;
}

setInterval(checkTyping, 1000);