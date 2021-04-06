//? ------------------------------------------------------------------------------------
//?
//?  /helpers/main.js
//?  Pyro Chat
//?
//?  Developed by Robolab LLC
//?  Copyright (c) 2021 Robolab LLC. All Rights Reserved
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


/**
 * 
 * @param {*} num 
 * @param {*} len 
 */
function pad(num, len) {
    let pad = '';

    for (i = 0; i < len; i++) {
        pad += '0';
    }

    return (pad + num).slice(-len);
}


/**
 * 
 * @param {*} ms 
 * @returns 
 */
const delay = ms => new Promise(res => setTimeout(res, ms));


/**
 * @returns 
 */
function generateId() {
    const epoch = Date.now().toString();
    const random = generateRandom(0, 5).toString();

    return `${epoch}${random}`;
}

/**
 * 
 * @param {*} key 
 * @param {*} order 
 * @returns 
 */
function sortObjectByKey(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;
  
      const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;

      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }

      return ((order === 'desc') ? (comparison * -1) : comparison)
    }
}


/**
 * 
 * @returns 
 */
 Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};