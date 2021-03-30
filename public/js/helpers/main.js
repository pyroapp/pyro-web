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
 * 2021-03-30T07:17:14.401Z
 * @returns 
 */
function generateId() {
    const isoDate = new Date().toISOString();
    const halves = isoDate.split('T');

    const date = halves[0].split('-');
    const time = halves[1].split('.')[0].split(':');
    const zulu = halves[1].split('.')[1].substring(0, 3);
    
    // Hours, Minutes, Seconds, Year, Month, Day, Zulu
    return `${time.join('')}${date.join('')}${zulu}`;
}


/**
 * 09473420210330379
 * @param {*} id 
 */
function getTimeFromId(id) {
    const year = id.substring(6, 10);
    const month = id.substring(10, 12);
    const day = id.substring(12, 14);
    const hours = id.substring(0, 2);
    const minutes = id.substring(2, 4)
    const seconds = id.substring(4, 6);
    const zulu = id.substring(14, 17);

    // Year-Month-DayTHours:Minutes:Seconds.ZuluZ
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${zulu}Z`;
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