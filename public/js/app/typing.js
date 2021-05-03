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

    const usernames = Object.values(users);

    for (i = 0; i < usernames.length; i++){
        if (usernames[i] !== username){
            console.log(usernames[i]);
        }
    }
}

setInterval(checkTyping, 1000);