//? ------------------------------------------------------------------------------------
//?
//?  /helpers/main.js
//?  Pyro Chat
//?
//?  Developed by Pyro Communications LLC
//?  Copyright (c) 2021 Pyro Communications LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


/**
 * 
 * @returns 
 */
function isStaging() {
    const { host } = window.location;

    if (host === 'staging.pyrochat.app') return true;
    if (host === 'localhost:8000') return true;

    return false;
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
    const random = generateRandom(0, 8).toString();

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


/**
 * 
 * @returns 
 */
function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}


/**
 * 
 * @param {*} a1 
 * @param {*} a2 
 * @returns 
 */
function getArrayDifference(a1, a2) {
    const a = [];
    const diff = [];

    for (i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    for (k in a) {
        diff.push(k);
    }

    return diff;
}

/**
 * 
 * @param {*} bytes 
 * @returns 
 */
function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    
    if (bytes == 0) return '0.00 Bytes';

    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
 
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}


/**
 * https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
 * 
 * @param {*} text 
 */
function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {

        // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
        return window.clipboardData.setData("Text", text);
    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        const textarea = document.createElement("textarea");
        
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
        document.body.appendChild(textarea);
        textarea.select();

        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}