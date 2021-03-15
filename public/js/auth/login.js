//? ------------------------------------------------------------------------------------
//?
//?  /auth/login.js
//?  Discord JS
//?
//?  Developed by Cooper Beltrami
//?
//?  Project built using designs, graphics and other assets developed by Discord Inc.
//?  Copyright (c) 2021 Cooper Beltrami and Discord Inc. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


/**
 *  
 */
document.getElementById('loginButton').addEventListener('click', () => {
    login();
});


/**
 *  
 */
document.getElementById('emailField').addEventListener('keyup', event => {
    if (event.key === 'Enter') login();
});


/**
 *  
 */
 document.getElementById('passwordField').addEventListener('keyup', event => {
    if (event.key === 'Enter') login();
});


/**
 *  
 */
function login() {
    const button = document.getElementById('loginButton');
    const values = validateInputs([
        'email', 'password'
    ]);

    if (!values) return;

    showButtonLoader(button);
    disableButton(button);

    firebase.auth().signInWithEmailAndPassword(
        values.email,
        values.password
    ).then(user => {
        if (!user.emailVerified) {
            firebase.auth().signOut();
            showLabelError('emailLabel', 'Please verify your email address.');
    
            hideButtonLoader(button);
            enableButton(button);
    
            return;
        }
    
        hideButtonLoader(button);
        enableButton(button);
    
        redirect('/direct/@me/test');
    }).catch(error => {
        if (error.code === 'auth/wrong-password') {
            showLabelError('passwordLabel', AUTH_CODES[error.code]);
        } else {
            showLabelError('emailLabel', AUTH_CODES[error.code]);
        }

        hideButtonLoader(button);
        enableButton(button);
    });
}