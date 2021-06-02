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
 document.getElementById('keyField').addEventListener('keyup', event => {
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
    // NOTICE: FILLING THE BETA KEY FROM PARAM MEANS THAT WE CAN BE VICTIM OF XSS AND OTHER VULNERABILITIES.
    // ALTHOUGH THE MINIMUM AND MAXIMUM IS 20 CHARS, IT IS POSSIBLE
    // THIS SHOULDN'T BE AN ISSUE THOUGH

    // const bkey = new URLSearchParams(window.location.search).get('beta-key')
    // const bkeyFromField = new URLSearchParams(window.location.search).get('beta-key')
    // // Test if the beta key is given in params
    // if (!bkey) {
    //     showLabelError('keyLabel', `Key cannot be empty.`);
    //     showInputError('keyLabel');
    // }
    // if not, show error to user
    // const doesKeyExist = await (
    //     await firebase.firestore().collection('beta_keys').doc(bkey).get()
    // ).data();

    // if (!doesKeyExist) {
    //     showLabelError('keyLabel', `Key is invalid.`);
    //     showInputError('keyLabel');
    // }

    const button = document.getElementById('signupButton'); //like the other fields, this will make sure that the key follows the minimum and maximum length requirement
    const values = validateInputs([
        'email', 'username', 'password', 'key'
    ]);

    const bkey = new URLSearchParams(window.location.search).get('beta-key') // get the key from param
    const bkeyFromField = values.key // get the key from the field
    // Test if the beta key is given in params
    if (!bkeyFromField) {
        showLabelError('keyLabel', `Key cannot be empty.`);
        showInputError('keyLabel');
    }
    //dont use this. the logic WAS working but broke. invalid keys are allowed
    const doesKeyExist = await (
        await firebase.firestore().collection('beta_keys').doc(bkeyFromField).get()
    ).data();

    if (!doesKeyExist) {
        showLabelError('keyLabel', `Key is invalid.`);
        showInputError('keyLabel');
    }
    if (!values) return;

    showButtonLoader(button);
    disableButton(button);

    const { email, username, password, key } = values;

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
        await firebase.firestore().collection('beta_keys').doc(bkeyFromField).delete();

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