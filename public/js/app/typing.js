//? ------------------------------------------------------------------------------------
//?
//?  /app/typing.js
//?  Pyro Chat
//?
//?  Developed by Robolab LLC
//?  Copyright (c) 2021 Robolab LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------

function typingIndicatorListener(){
    document.getElementsByClassName("messageField")[0].oninput = async (e) => {
        setFlag("TYPING");
        let _temp = document.getElementsByClassName("messageField")[0].innerText;
        await delay(1500);
        if (_temp == document.getElementsByClassName("messageField")[0].innerText) setFlag("NOT_TYPING");
    }
}

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

    let usersTyping = await firebase.database().ref(`typing_indicator/${lastChannelId}`).get();

    if (usersTyping.val() == null) return;
    delete usersTyping.val()[uid];

    let usernames = Object.values(usersTyping.val())

    if (usernames.length > 3){
        console.log("Multiple users are typing...");
        return;
    }*/

    
    
    
}

setInterval(checkTyping, 5000);