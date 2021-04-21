//? ------------------------------------------------------------------------------------
//?
//?  /helpers/files.js
//?  Pyro Chat
//?
//?  Developed by Pyro Communications LLC
//?  Copyright (c) 2021 Pyro Communications LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


/**
 * 
 * @param {*} file 
 * @returns 
 */
async function uploadFile(file) {
    const { uid } = firebase.auth().currentUser;
    const { premium_type:ember } = CACHED_USERS[uid];
    const { name, size } = file;

    // Check file size
    // Free Plan: 25mb
    // Ember Plan: 100mb
    const sizeInMB = size / 1024 / 1024;

    if (!ember && sizeInMB >= 25) return console.log(`File too large... ${sizeInMB}`);
    if (ember && sizeInMB >= 100) return console.log(`File too large... ${sizeInMB}`);

    // Get authentication information from GCP
    const params = new URLSearchParams();

    params.append('file', name);
    params.append('uid', uid);
    params.append('ember', ember);
   
    try {
        console.log(`Uploading ${name}... Size: ${sizeInMB}`);

        // Getting policy document authentication
        const { data: { POST } } = await axios.post(API_URL, params, {
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        const { fields, url } = POST;

        // Uploading file to google cloud storage bucket
        const form = new FormData();

        form.append('acl', `${fields.acl}`);
        form.append('key', `${fields.key}`);
        form.append('x-goog-date', fields['x-goog-date']);
        form.append('x-goog-credential', fields['x-goog-credential']);
        form.append('x-goog-algorithm', fields['x-goog-algorithm']);
        form.append('policy', fields.policy);
        form.append('x-goog-signature', fields['x-goog-signature']);
        form.append('file', file);


        await axios.post(url, form, {
            "Content-Type": "multipart/form-data"
        });

        console.log(CDN_URL + fields.key);

        return CDN_URL + fields.key;
    } catch (error) {
        throw error;
    }
}