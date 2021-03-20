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
async function login() {
    const button = document.getElementById('loginButton');
    const values = validateInputs([
        'email', 'password'
    ]);

    if (!values) return;

    showButtonLoader(button);
    disableButton(button);

    try {
        await firebase.auth().signInWithEmailAndPassword(
            values.email, values.password
        );
            
        redirect('/channels/@me');
    } catch (error) {
        if (error.code === 'auth/wrong-password') {
            showLabelError('passwordLabel', AUTH_CODES[error.code]);
            showInputError('passwordField');
        } else if (error.code === 'auth/invalid-email') {
            showLabelError('emailLabel', AUTH_CODES[error.code]);
            showInputError('emailField');
        } else {
            showLabelError('emailLabel', AUTH_CODES[error.code]);
        }

        console.error(error);

        hideButtonLoader(button);
        enableButton(button);
    }
}