//? ------------------------------------------------------------------------------------
//?
//?  /helpers/files.js
//?  Pyro Chat
//?
//?  Developed by Pyro Communications LLC
//?  Copyright (c) 2021 Pyro Communications LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


async function uploadFile(input) {
    const file = input.files[0];
    const form = new FormData();

    const path = (window.URL || window.webkitURL).createObjectURL(file);

    return;
    form.append("file", file, "/Y:/Background.jpg");
    form.append("uid", "evannotcool");

    const options = {
        method: 'POST',
        body: form,
        redirect: 'follow'
    };

    const response = await fetch("https://pyro-cdn-kk3vd5vl7q-uc.a.run.app/upload", options);

    console.log(response);
}