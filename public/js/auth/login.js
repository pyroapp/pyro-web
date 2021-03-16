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

    const user = await signinUser(values.email, values.password);

    if (!AUTH_CODES[user]) {
        if (user.emailVerified) {
            redirect('/direct/@me/test/');
        } else {
            signout();
            showLabelError('emailLabel', 'Please verify your email address.');
    
            hideButtonLoader(button);
            enableButton(button);
        }
    } else {
        if (user === 'auth/wrong-password') {
            showLabelError('passwordLabel', AUTH_CODES[user]);
        } else {
            showLabelError('emailLabel', AUTH_CODES[user]);
        }

        hideButtonLoader(button);
        enableButton(button);
    }
}