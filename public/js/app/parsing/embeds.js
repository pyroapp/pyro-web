//? ------------------------------------------------------------------------------------
//?
//?  /app/parsing/parse_embeds.js
//?  Pyro Chat
//?
//?  Developed by Pyro Communications LLC
//?  Copyright (c) 2021 Pyro Communications LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


/**
 * 
 * @param {*} embeds 
 * @returns 
 */
function parseEmbeds(embeds) {
    const htmls = [];

    for (let embed of embeds) {
        const borderColour = embed.color ? ` style="border-color: ${embed.color};"` : '';
        let html = `<div class="container-1ov-mD"><div class="embedWrapper-lXpS3L embedFull-2tM8-- embed-IeVjo6 markup-2BOw-j" aria-hidden="false" ${borderColour}><div class="grid-1nZz7S">`;
        
        if (embed.title) {
            html += `<div class="embedTitle-3OXDkz embedMargin-UO5XwE">${parseText(embed.title)}</div>`;
        }

        if (embed.author) {
            html += `<div class="embedAuthor-3l5luH embedMargin-UO5XwE"><span class="embedAuthorName-3mnTWj">${parseText(embed.author)}</span></div>`;
        }

        if (embed.description) {
            html += `<div class="embedDescription-1Cuq9a embedMargin-UO5XwE">${parseText(embed.description)}</div>`
        }

        html += '</div></div>';

        htmls.push(html);
    };

    return htmls.join("\n");
};
