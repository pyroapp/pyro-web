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

    const user = await createUser(values.email, values.password);

    if (!AUTH_CODES[user]) {
        const profile = {
            email: values.email,
            password: values.password,
            
        };

        await dbProfile(profile, user.uid);
        await sendEmailVerification();

        redirect('/verifyemail/');
    } else {
        showLabelError('emailLabel', AUTH_CODES[user]);
    }

    hideButtonLoader(button);
    enableButton(button);
}