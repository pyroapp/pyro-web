//? ------------------------------------------------------------------------------------
//?
//?  /helpers/interface.js
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
 * @param {*} message 
 */
function showBanner(message) {
    const banner = document.getElementById('banner');

    banner.innerText = message;
}


/**
 * 
 * @param {*} message 
 * @param {*} buttonText 
 * @param {*} buttonEvent 
 */
function showInteractiveBanner(message, buttonText, buttonEvent) {
    const banner = document.getElementById('banner');

    banner.innerHTML = `
        ${message}
        <button onclick="${buttonEvent}" class="button-2DhvE9">
            ${buttonText}
        </button>
    `;
}


/**
 * 
 * @returns 
 */
function generateDidYouKnowMessage() {
    const index = generateRandom(0, DID_YOU_KNOW.length - 1);

    return DID_YOU_KNOW[index];
}


/**
 * 
 */
function showPageLoader() {
    const loader = document.getElementById('pageLoader');

    loader.innerHTML = `
        <div class="container-16j22k fixClipping-3qAKRb" style="opacity: 1;">
            <div class="content-1-zrf2">
                <video class="ready-36e6Vk" loop="" autoplay="" playsinline="">
                    <source src="/vid/0bdc0497eb3a19e66f2b1e3d5741634c.webm" type="video/webm">
                </video>
                <div class="text-3c9Zq1">
                    <div class="tipTitle-GL9qAt">Did you know</div>
                    <div class="tip-2cgoli">${generateDidYouKnowMessage()}</div>
                    <div class="body-2Vra9D contentBase-11jeVK"></div>
                </div>
            </div>
            <div class="problems-3mgf6w slideIn-sCvzGz">
                <div class="problemsText-1Yx-Kl">Connection problems? Let us know!</div>
                <div>
                    <a class="anchor-3Z-8Bb anchorUnderlineOnHover-2ESHQB links-3Ldd4A" href="/status" rel="noreferrer noopener" target="_blank">
                        <svg class="icon-3N9Bhy" aria-hidden="false" width="14" height="14" viewBox="0 0 14 14">
                        <path fill="currentColor" d="M6.99471698,9.67522659 C8.47108874,9.67522659 9.66792453,8.47748685 9.66792453,7 C9.66792453,5.52251315 8.47108874,4.32477341 6.99471698,4.32477341 C5.51834522,4.32477341 4.32150943,5.52251315 4.32150943,7 C4.32150943,8.47748685 5.51834522,9.67522659 6.99471698,9.67522659 Z M6.99471698,2.67522659 C8.18867925,2.67522659 9.26641509,3.16163142 10.0483019,3.94410876 L11.9396226,2.05135952 C10.6822642,0.782477341 8.92830189,0 6.99471698,0 C3.12754717,0 0,3.14048338 0,7 L2.67320755,7 C2.67320755,4.6102719 4.60679245,2.67522659 6.99471698,2.67522659 Z M11.3267925,7 C11.3267925,9.3897281 9.39320755,11.3247734 7.00528302,11.3247734 C5.81132075,11.3247734 4.73358491,10.8383686 3.94113208,10.0558912 L2.04981132,11.9486405 C3.31773585,13.2175227 5.06113208,14 6.99471698,14 C10.8618868,14 14,10.8595166 14,7 L11.3267925,7 Z"></path>
                        </svg>
                        Server Status
                    </a>
                </div>
            </div>
        </div>
    `;
}


/**
 * 
 */
function hidePageLoader() {
    const loader = document.getElementById('pageLoader');

    loader.innerHTML = '';
}


/**
 * 
 * @param {*} heading 
 * @param {*} message 
 * @param {*} buttonText 
 * @param {*} buttonEvent 
 */
function showBasicModal(heading, message, buttonText, buttonEvent) {
    const modal = document.querySelectorAll('.layerContainer-yqaFcK')[0];

    if (modal.childNodes.length) return;

    modal.innerHTML += `
        <div class="backdropWithLayer-3_uhz4 fadeIn-dk023d" style="opacity: 0.85; background-color: rgb(0, 0, 0); transform: translateZ(0px);" onclick="hideModals()"></div>
        <div class="layer-2KE1M9 fadeIn-efi30">
            <div class="focusLock-Ns3yie">
                <div class="container-14fypd root-1gCeng small-3iVZYw fullscreenOnMobile-1bD22y" style="opacity: 1; transform: scale(1);">
                    <div class="form-26zE04">
                        <div class="content-1LAB8Z modalContent-1T1Tix thin-1ybCId scrollerBase-289Jih" style="overflow: hidden scroll; padding-right: 8px;">
                            <div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyCenter-3D2jYp alignStretch-DpGPf3 noWrap-3jynv6 content-dfabe7" style="flex: 1 1 auto;">
                                <h2 class="colorStandard-2KCXvj size14-e6ZScH h2-2gWE-o title-3sZWYQ defaultColor-1_ajX0 title-18-Ds0 marginBottom20-32qID7 marginTop8-1DLZ1n">${heading}</h2>
                                <div class="colorStandard-2KCXvj size16-1P40sf body-Mj9Oxz">${message}</div>
                            </div>
                            <div style="position: absolute; pointer-events: none; min-height: 0px; min-width: 1px; flex: 0 0 auto; height: 20px;"></div>
                        </div>
                        <div class="flex-1xMQg5 flex-1O1GKY horizontalReverse-2eTKWD horizontalReverse-3tRjY7 flex-1O1GKY directionRowReverse-m8IjIq justifyBetween-2tTqYu alignStretch-DpGPf3 wrap-ZIn9Iy footer-2gL1pp" style="flex: 0 0 auto;">
                            <button type="submit" onclick="${buttonEvent}" class="primaryButton-2BsGPp button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeXlarge-2yFAlZ grow-q77ONN">
                                <div class="contents-18-Yxp">${buttonText}</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}


/**
 * 
 */
async function hideModals() {
    const modal = document.querySelectorAll('.layerContainer-yqaFcK')[0];
    
    if (!modal.childNodes.length) return;
    
    const container = document.querySelectorAll('.fadeIn-efi30')[0];
    const background = document.querySelectorAll('.fadeIn-dk023d')[0];

    container.classList.add('fadeOut-efi30');
    background.classList.add('fadeOut-dk023d');
    
    await delay(100);

    modal.innerHTML = '';
}