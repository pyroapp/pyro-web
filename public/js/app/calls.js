//? ------------------------------------------------------------------------------------
//?
//?  /app/calls.js
//?  Pyro Chat
//?
//?  Developed by Pyro Communications LLC
//?  Copyright (c) 2021 Pyro Communications LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


let peer = new Peer();


    
peer.on('open', id => {
    console.log('Peer created')
    console.log('id : ' + id)
})
peer.on('error', error => {
    console.log(error)
})
peer.on('call', connection => {
    console.log('someone is calling')
})
peer.on('connection', data => {
    console.log('connection established')
})
peer.on('close', () => {
    console.log('peer destoryed')
})



/**
 * 
 */
function generatePeerConfig() {
    return {
        config: {
            'iceServers': [
                STUN_SERVER,
                TURN_SERVER
            ]
        }, 'debug': PEER_DEBUG_LEVEL
    }
}


/**
 * 
 */
function getRtcId(friend_uid) {
    return CACHED_USERS[friend_uid].rtc_id; 
}


/**
 * 
 */
function enableUserMedia() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
}


/**
 * 
 */
async function startCall(friend_uid, channel_id) {
    enableUserMedia();

    // Create new stream from media
    navigator.getUserMedia(MEDIA_CONFIG, stream => {
        const rtc_id = getRtcId(friend_uid);
        const call = peer.call(rtc_id, stream);

        // Start new call
        call.on('stream', remoteStream => {
            console.log('Stream Online');
        
            document.getElementById('rtc-stream').srcObject = remoteStream;
        });

        call.on('close', hangUp());
    }, error => {
        console.error('Failed to get local stream. ', error.message);
    });
}


/**
 * 
 */
async function answerCall() {
    enableUserMedia();

    peer.on('call', call => {
        navigator.getUserMedia(MEDIA_CONFIG, stream => {
            call.answer(stream);

            call.on('stream', remoteStream => {
                console.log('Stream Online');
                
                document.getElementById('rtc-stream').srcObject = remoteStream;
            });

            call.on('close', hangUp());

            call.data('data', data => {
                console.log('Data Received: ', data);
            });
        }, error => {
            console.log('Failed to get local stream.', error.message);
        });
    });
}


async function hangUp() {
    peer.destroy();


}


async function hangUp() {
    peer.destroy()
    document.getElementById('rtc-stream').srcObject = null
    peer = new Peer({
        config: {
            'iceServers': [{
                    urls: 'stun:stun.l.google.com:19302'
                },
                {
                    urls: 'turn:numb.viagenie.ca',
                    credential: 'muazkh',
                    username: 'webrtc@live.com'
                }
            ]
        }
    })
    peer.on('open', id => {
        console.log('Peer created')
        console.log('id : ' + id)
    })
    peer.on('error', error => {
        console.log(error)
    })
    peer.on('call', connection => {
        console.log('someone is calling')
    })
    peer.on('connection', data => {
        console.log('connection established')
    })
    peer.on('close', () => {
        console.log('peer destoryed')
    })
}
async function convertId(id) {
    const user = await firebase.firestore().collection('users').doc(id).get()
    console.log(user.data().rtc)
    return user.data().rtc
}