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
     apiKey: "AIzaSyA3npLrDl0XMDq66G7K1iyNLXhervsK0DU",
  authDomain: "caleb-lowe-13comp.firebaseapp.com",
  databaseURL: "https://caleb-lowe-13comp-default-rtdb.firebaseio.com",
  projectId: "caleb-lowe-13comp",
  storageBucket: "caleb-lowe-13comp.firebasestorage.app",
  messagingSenderId: "486660971961",
  appId: "1:486660971961:web:c6f46cda55d839d9612a68"
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