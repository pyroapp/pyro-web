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

    // TODO: Make this into a listener on that endpoint.
    // TODO: This can probably be in the same area as the input...
    let usersTyping = await firebase.database().ref(`typing_indicator/${CURRENT_CHANNEL_ID}`).get();

    if (usersTyping.val() == null) return;
    delete usersTyping.val()[uid];

    let usernames = Object.values(usersTyping.val())

    if (usernames.length > 3){
        console.log("Multiple users are typing...");
        return;
    }*/

    
    
    
}

setInterval(checkTyping, 5000);