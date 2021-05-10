//? ------------------------------------------------------------------------------------
//?
//?  /app/parsing/links.js
//?  Pyro Chat
//?
//?  Developed by Pyro Communications LLC
//?  Copyright (c) 2021 Pyro Communications LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


/**
 * 
 * @param {*} message 
 * @returns 
 */
async function generateLinkEmbed(link) {
    if (isYoutubeLink(link)) {
        return embeds.push(await generateYoutubeEmbed(link));
    }

    return await generateOpenGraphEmbed(link);
}


/**
 * 
 * @param {*} link 
 * @returns 
 */
function isYoutubeLink(link) {
    const match = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

    return link.match(match);
}


/**
 * 
 * @param {*} link 
 * @returns 
 */
async function generateOpenGraphEmbed(link) {
    const { data: { data: { url, site_title, site_name, site_description, image: { url: image_url, image_height, image_width } } } } = await axios(OG_URL + `?url=${link}`);

    return `
        <div class="embedWrapper-lXpS3L embedFull-2tM8-- embed-IeVjo6 markup-2BOw-j" style="border-color: rgb(30, 35, 39); max-width: 432px;">
            <div class="grid-1nZz7S">
                <div class="embedProvider-3k5pfl embedMargin-UO5XwE"><span>${site_name}</span></div>
                <div class="embedTitle-3OXDkz embedMargin-UO5XwE"><a class="anchor-3Z-8Bb anchorUnderlineOnHover-2ESHQB embedTitleLink-1Zla9e embedLink-1G1K1D embedTitle-3OXDkz" href="${url}" target="_blank">${site_title}</a></div>
                <div class="embedDescription-1Cuq9a embedMargin-UO5XwE">${site_description}/div>
                <a class="anchor-3Z-8Bb anchorUnderlineOnHover-2ESHQB imageWrapper-2p5ogY imageZoom-1n-ADA clickable-3Ya1ho embedWrapper-lXpS3L embedMedia-1guQoW embedImage-2W1cML" href="${image_url}" style="width: ${image_width}px; height: ${image_height}px;"></a>
            </div>
        </div>
    `.trim();
}


/**
 * 
 */
async function generateYoutubeEmbed(link) {
    const { data: { data: { url:video_url, title: video_title, image: { url:image_url } } } } = await axios(OG_URL + `?url=${link}`);

    return `
        <div class="container-1ov-mD">
            <div class="embedWrapper-lXpS3L embedFull-2tM8-- embed-IeVjo6 markup-2BOw-j" style="border-color: rgb(255, 0, 0); max-width: 432px;">
                <div class="grid-1nZz7S">
                    <div class="embedProvider-3k5pfl embedMargin-UO5XwE"><a class="anchor-3Z-8Bb anchorUnderlineOnHover-2ESHQB embedLink-1G1K1D" href="https://www.youtube.com" target="_blank">YouTube</a></div>
                    <div class="embedTitle-3OXDkz embedMargin-UO5XwE"><a class="anchor-3Z-8Bb anchorUnderlineOnHover-2ESHQB embedTitleLink-1Zla9e embedLink-1G1K1D embedTitle-3OXDkz" href="${video_url}" target="_blank">${video_title}</a></div>
                    <div class="embedVideo-3nf0O9 embedMedia-1guQoW" style="width: 400px; height: 225px;">
                        <a class="anchor-3Z-8Bb anchorUnderlineOnHover-2ESHQB imageWrapper-2p5ogY imageZoom-1n-ADA clickable-3Ya1ho embedVideoImageComponent-34z3di" target="_blank" style="width: 400px; height: 225px;">
                            <img class="embedVideoImageComponentInner-2Ujh_1" alt="${video_title}" src="${image_url}" style="width: 400px; height: 225px;">
                        </a>
                        <div class="embedVideoActions-O6vR7W">
                            <div class="centerContent-1dpMl0">
                                <div class="wrapper-129saQ">
                                    <div class="iconWrapperActive-12kkfE iconWrapper-21idzA">
                                        <svg class="iconPlay-2kgvwV icon-3ZFEtL" width="16" height="16" viewBox="0 0 24 24">
                                            <polygon fill="currentColor" points="0 0 0 14 11 7" transform="translate(7 5)"></polygon>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `.trim();
}