//? ------------------------------------------------------------------------------------
//?
//?  /app/parsing/files.js
//?  Pyro Chat
//?
//?  Developed by Pyro Communications LLC
//?  Copyright (c) 2021 Pyro Communications LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


/**
 * 
 * @param {*} attachment 
 * @returns 
 */
function generateAttachmentEmbed(attachment) {
    if (!attachment) return;

    let { url, type, name, size } = attachment;

    size = bytesToSize(size);

    // If attachment is an image
    if (type.split('/')[0] === 'image') {
        return `<div class="messageAttachment-1aDidq"><img alt="${name}" src="${url}" style="border-radius: 4px; max-width: 45%;" /></div>`;

    } else if (type.split('/')[0] === 'video') {
        return `<div class="messageAttachment-1aDidq"><video style="max-width: 300px; border-radius: 4px;" controls><source src="${url}" type="${type}" /></video></div>`

    } else if (type.split('/')[0] === 'audio') {
        return `<div class="messageAttachment-1aDidq"><video style="max-width: 300px; border-radius: 4px;" controls><source src="${url}" type="${type}" /></video></div>`;

    } else {
        return `<div class="messageAttachment-1aDidq"><div class="attachment-33OFj0 horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG alignCenter-1dQNNs embedWrapper-lXpS3L"><img class="icon-1kp3fr" src="/img/985ea67d2edab4424c62009886f12e44.svg" alt="${name}"><div class="attachmentInner-3vEpKt"><div class="filenameLinkWrapper-1-14c5"><a class="anchor-3Z-8Bb anchorUnderlineOnHover-2ESHQB fileNameLink-9GuxCo" href="${url}" rel="noreferrer noopener" target="_blank">${name}</a></div><div class="metadata-3WGS0M size12-3R0845 height16-2Lv3qA">${size}</div></div><a href="${url}" class="anchor-3Z-8Bb anchorUnderlineOnHover-2ESHQB downloadWrapper-vhAtLx" target="_blank"><svg class="downloadButton-23tKQp" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M31,31H5a1,1,0,0,0,0,2H31a1,1,0,0,0,0-2Z"></path></svg></a></div></div>`;

    }
}