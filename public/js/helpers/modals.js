//? ------------------------------------------------------------------------------------
//?
//?  /helpers/modals.js
//?  Pyro Chat
//?
//?  Developed by Robolab LLC
//?  Copyright (c) 2021 Robolab LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


/**
 * 
 * @param {*} heading 
 * @param {*} message 
 * @param {*} buttonText 
 * @param {*} buttonEvent 
 */
 function showBasicModal(heading, message, buttonText, buttonEvent) {
    const modal = document.querySelectorAll('.layerContainer-yqaFcK')[0];

    modal.innerHTML = `
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
    
    await delay(80);

    modal.innerHTML = '';
}


function showCustomStatusModal() {
    const modal = document.querySelectorAll('.layerContainer-yqaFcK')[0];

    const { displayName } = firebase.auth().currentUser;

    modal.innerHTML = `
        <div class="backdropWithLayer-3_uhz4 fadeIn-dk023d" style="opacity: 0.85; background-color: rgb(0, 0, 0); transform: translateZ(0px);" onclick="hideModals()"></div>
        <div class="layer-2KE1M9 fadeIn-efi30">
            <div class="focusLock-Ns3yie">
                <div class="modalRoot-1Kx4Hb root-1gCeng small-3iVZYw fullscreenOnMobile-1bD22y" style="opacity: 1; transform: scale(1);">
                    <div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6 header-1TKi98 headerContainer-3N-yWX" style="flex: 0 0 auto;">
                        <div class="art-347BZj"></div>
                        <div class="header-3C6qT5">
                            <h4 class="headerText-2uyvpY">Set a custom status</h4>
                        </div>
                        <button class="close-hZ94c6 modalCloseButton-3ztS-g button-38aScr lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN" onclick="hideModals()">
                            <div class="contents-18-Yxp">
                                <svg aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path>
                                </svg>
                            </div>
                        </button>
                    </div>
                    <div class="content-1LAB8Z thin-1ybCId scrollerBase-289Jih" style="overflow: hidden scroll; padding-right: 8px;">
                        <div class="formGroup-2hEDrJ">
                            <h5 class="colorStandard-2KCXvj size14-e6ZScH h5-18_1nd title-3sZWYQ defaultMarginh5-2mL-bP">What's cookin', ${displayName.split('#')[0]}</h5>
                            <div class="children-rWhLdy">
                                <div class="inputContainer-1SpwlU">
                                    <div class="inputWrapper-31_8H8">
                                        <input class="inputDefault-_djjkz input-cIJ7To input-1GLP_D" id="customStatusInput" style="padding: 10px;" maxlength="128" placeholder="Support has arrived!" type="text">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="position: absolute; pointer-events: none; min-height: 0px; min-width: 1px; flex: 0 0 auto; height: 0px;"></div>
                    </div>
                    <div class="flex-1xMQg5 flex-1O1GKY horizontalReverse-2eTKWD horizontalReverse-3tRjY7 flex-1O1GKY directionRowReverse-m8IjIq justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 footer-2gL1pp" style="flex: 0 0 auto;">
                        <button class="button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeMedium-1AC_Sl grow-q77ONN" onclick="saveCustomStatus()">
                            <div class="contents-18-Yxp">Save</div>
                        </button>
                        <button class="button-38aScr lookLink-9FtZy- cancelButton-2O3h8t sizeMedium-1AC_Sl grow-q77ONN" onclick="hideModals()">
                            <div class="contents-18-Yxp">Cancel</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}