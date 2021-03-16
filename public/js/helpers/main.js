//? ------------------------------------------------------------------------------------
//?
//?  /helpers/main.js
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
 * @returns 
 */
function isDev() {
    return window.location.protocol === 'http:';
}


/**
 * 
 * @param {*} path 
 */
function redirect(path) {
    window.location.href = path;
}


/**
 * 
 * @returns 
 */
function getTime() {
    return Date.now();
}


/**
 * 
 * @returns 
 */
function getYear() {
    return new Date().getFullYear();
}


/**
 * 
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
function generateRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


/**
 * 
 * @param {*} email 
 * @returns 
 */
 function validateEmail(email) {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    return pattern.test(String(email).toLowerCase());
}