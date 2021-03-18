//? ------------------------------------------------------------------------------------
//?
//?  /me/friends.js
//?  Discord JS
//?
//?  Developed by Cooper Beltrami
//?
//?  Project built using designs, graphics and other assets developed by Discord Inc.
//?  Copyright (c) 2021 Cooper Beltrami and Discord Inc. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


document.getElementById('addFriendField').addEventListener('input', event => {
    const button = document.getElementById('addFriendButton');
    let value = event.target.value;

    if (value) {
        button.removeAttribute('disabled');
    } else {
        button.setAttribute('disabled', '');
    }
});


document.getElementById('addFriendButton').addEventListener('click', async () => {
    const input = document.getElementById('addFriendField');
    const label = document.getElementById('addFriendLabel');
    const split = input.value.split('#');

    // 1. Too many #'s
    // 2. No # is present
    // 3. No numbers after #

    label.classList.add('error-3T-E-_');

    if (split.length >= 2) {
        label.innerText = 'You cannot have more than one # in a user\'s username.';

    } else if (split.length === 1) {
        label.innerText = `We need ${input.value}'s four digit tag so we know which one they are.`;

    } else if (split[1] === null || isNaN(split[1])) {
        label.innerText = 'Hm, didn\'t work. Double check that the capitaliaation, spelling, any spaces, and numbers are correct.';

    } else {
        const user = await getUserByFullUsername(input.value);

        label.classList.remove('error-3T-E-_');

        if (!user) {
            showBasicModal(
                'Friend Request Failed',
                'Hm, didn\'t work. Double check that the capitalization, spelling, any spaces, and numbers are correct.',
                'Okay',
                'hideModals()'
            );
        }
    }
});