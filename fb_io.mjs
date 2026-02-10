//**************************************************************/
// fb_io.mjs
// Generalised firebase routines
// Written by <Your Name Here>, Term 2 202?
//
// All variables & function begin with fb_  all const with FB_
// Diagnostic code lines have a comment appended to them //DIAG
/**************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%c fb_io.mjs',
  'color: blue; background-color: white;');

/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the methods you want to call from the firebase modules


import { initializeApp }
  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase }
  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup }
  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";


/**************************************************************/
// EXPORT FUNCTIONS
// List all the functions called by code or html outside of this module
/**************************************************************/




export {
  fb_initialise,
  fb_authenticate,

};
/******************************************************/
// fb_login()
// Called by html LOGIN button
// Login to Firebase via Google authentication
// Input:  n/a
// Return: n/a
/******************************************************/
function fb_initialise() {
  console.log('%c fb_initialise(): ',
    'color: ' + COL_C + '; background-color: ' + COL_B + ';');
  const firebaseConfig = {
    apiKey: "AIzaSyCwPibZHntricqhOchcdlX3H7ve_CFQhR0",
    authDomain: "comp-2025-caleb-lowe-31f01.firebaseapp.com",
    databaseURL: "https://comp-2025-caleb-lowe-31f01-default-rtdb.firebaseio.com",
    projectId: "comp-2025-caleb-lowe-31f01",
    storageBucket: "comp-2025-caleb-lowe-31f01.firebasestorage.app",
    messagingSenderId: "440676386005",
    appId: "1:440676386005:web:05b4cb8a914c0ceb0ace5c",
    measurementId: "G-WGYBNEYVY3"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const firebaseGameDB = getDatabase(app);
  console.info(firebaseGameDB);
  document.getElementById("p_fbInitialise").innerHTML = "Button Clicked";
}
var currentUser = null;
var userId = null;
function fb_authenticate() {
  console.log('%c fb_authenticate(): ',
    'color: ' + COL_C + '; background-color: ' + COL_B + ';');
  const AUTH = getAuth();





  const PROVIDER = new GoogleAuthProvider();

  // The following makes Google ask the user to select the account

  PROVIDER.setCustomParameters({

    prompt: 'select_account'

  });

  signInWithPopup(AUTH, PROVIDER).then((result) => {

    //✅ Code for a successful authentication goes here
    console.log("successful authentication")
    currentUser = result.user;
    userId = currentUser.uid;
  })

    .catch((error) => {

      //❌ Code for an authentication error goes here
      console.log("authentication error")
    });
  document.getElementById("p_fbAuthenticate").innerHTML = "Authentication success"
};