//? ------------------------------------------------------------------------------------
//?
//?  /auth/signup.js
//?  Pyro Chat
//?
//?  Developed by Pyro Communications LLC
//?  Copyright (c) 2021 Pyro Communications LLC. All Rights Reserved
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
    const bkey = new URLSearchParams(window.location.search).get('key');

    // Test if the beta key exists
    if (!bkey) return showLabelError('keyLabel', `Beta key invalid or does not exist`);

    const doesKeyExist = await (
        await firebase.firestore().collection('beta_keys').doc(bkey).get()
    ).data();

    if (!doesKeyExist) return showLabelError('keyLabel', `Beta key invalid or does not exist`);

    const button = document.getElementById('signupButton');
    const values = validateInputs([
        'email', 'username', 'password'
    ]);

    if (!values) return;

    showButtonLoader(button);
    disableButton(button);

    const { email, username, password } = values;

    let invalid = validateUsername(username);

    if (invalid) {
        showLabelError('usernameLabel', `Username cannot contain "${invalid}"`);
        showInputError('usernameField');

        hideButtonLoader(button);
        enableButton(button);

        return;
    }

    try {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const discriminator = await generateDiscriminator();

        const { user: { uid } } = user;

        await uploadDefaultAvatar(uid);
        await firebase.firestore().collection('beta_keys').doc(bkey).delete();

        await firebase.firestore().collection('users').doc(uid).set({
            username: username,
            discriminator: discriminator,
            mfa_enabled: false,
            locale: navigator.languages[0] || navigator.language,
            verified: false,
            email: email,
            flags: [],
            premium_type: null,
            status: 'online',
            mute_notifications: false,
        });

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