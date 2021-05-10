//? ------------------------------------------------------------------------------------
//?
//?  /app/themes.js
//?  Pyro Chat
//?
//?  Developed by Robolab LLC
//?  Copyright (c) 2021 Robolab LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


/**
 * 
 */
function setTheme(theme) {
    const app = document.getElementsByTagName('html')[0];

    if (!theme) theme = DEFAULT_THEME;

    app.classList.add(`theme-${theme}`);
}