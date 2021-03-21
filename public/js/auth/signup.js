//? ------------------------------------------------------------------------------------
//?
//?  /auth/signup.js
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
document.getElementById('signupButton').addEventListener('click', () => {
    signup();
});


/**
 *  
 */
 document.getElementById('emailField').addEventListener('keyup', event => {
    if (event.key === 'Enter') signup();
});


/**
 *  
 */
 document.getElementById('usernameField').addEventListener('keyup', event => {
    if (event.key === 'Enter') signup();
});


/**
 *  
 */
 document.getElementById('passwordField').addEventListener('keyup', event => {
    if (event.key === 'Enter') signup();
});


/**
 * 
 */
 function loadYearsBorn() {
    const dropdown = document.getElementById('bornDropdown');
    const endDate = getYear() - AGE_LIMIT;
    

    for (year = DOB_START_YEAR; year < endDate; year++) {
        dropdown.innerHTML += `
            <option value="${year}">${year}</option>
        `;
    }
}


/**
 * 
 */
async function signup() {
    const button = document.getElementById('signupButton');
    const values = validateInputs([
        'email', 'username', 'password'
    ]);

    if (!values) return;

    showButtonLoader(button);
    disableButton(button);

    if (values.username.includes('#')) {
        showLabelError('usernameLabel', 'Hash symbols are not allowed.');
        showInputError('usernameField');

        hideButtonLoader(button);
        enableButton(button);

        return;
    }

    try {
        const user = await firebase.auth().createUserWithEmailAndPassword(
            values.email, values.password
        );

        const discriminator = await generateDiscriminator();
        const fullUsername = values.username + '#' + discriminator;

        await firebase.database().ref(`/users/${user.user.uid}/`).set({
            email: values.email,
            username: values.username,
            discriminator: discriminator,
            full_username: fullUsername,
        });

        await sendEmailVerification();
        await setDisplayName(fullUsername);
        await uploadDefaultAvatar();

        redirect('/channels/@me');
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            showInputError('emailField');
        } else if (error.code === 'auth/email-invalid') {
            showInputError('emailField');
        }

        showLabelError('emailLabel', AUTH_CODES[error.code]);

        console.error(error);

        hideButtonLoader(button);
        enableButton(button);
    }
}