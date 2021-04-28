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
                firebase.database().ref(`typing_indicator/${CURRENT_CHANNEL_ID}`).set({
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

    let usersTyping = await firebase.database().ref(`typing_indicator/${CURRENT_CHANNEL_ID}`).get();
    
    if (usersTyping.val() == null) return;
    let usernames = Object.values(usersTyping.val())
   
    usernames = usernames.filter(user => user !== username);
    
    if (usernames.length == 0) return;
    

    if (usernames.length > 3){
        return console.log("Multiple users are typing...");
    }

    let typingString = usernames[0];
    if (usernames.length == 1) typingString += " is typing...";
    
    console.log(typingString);
}

setInterval(checkTyping, 1000);