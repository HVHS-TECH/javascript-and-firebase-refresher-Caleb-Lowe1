


function start() {

buttonPressed.innerHTML = "you pressed the button"
messageSpace.innerHTML = "You've connected to the JavaScript!";
}
/**************************************************************/
// main.mjs
// Main entry for index.html
// Written by <Your Name Here>, Term 2 202?
/**************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%c main.mjs',
    'color: blue; background-color: white;');

/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the constants & functions required from fb_io module
import { fb_initialise }
    from './fb_io.mjs';
window.fb_initialise = fb_initialise;

import { fb_authenticate }
    from './fb_io.mjs';
window.fb_authenticate = fb_authenticate;
