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




export { fb_initialise, fb_authenticate, fb_WriteRec, fb_WriteRecPrivate}
/******************************************************/
// fb_login()
// Called by html LOGIN button
// Login to Firebase via Google authentication
// Input:  n/a
// Return: n/a
/******************************************************/
function fb_initialise() {
    console.log('%c fb_initialise(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
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
    // Initialize Firebase only if it hasn’t already been initialized
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
 
}
function fb_WriteRec() {
    const AUTH = getAuth();
    var name = document.getElementById("name").value;
    if (!currentUser || name == "" || name == null || !isNaN(name)) {
        alert("You must be logged in and enter a valid name.")
        return;
    }

    console.log('%c fb_WriteRec(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()

    const dbReference = ref(DB, "Public/" + userId);

    update(dbReference, { displayName: name }).then(() => {

        //✅ Code for a successful write goes here
        console.log("successful write")


    }).catch((error) => {

        //❌ Code for a write error goes here
        console.log("Writing error")
    });


}

function fb_WriteRecPrivate() {
    const AUTH = getAuth();
    var age = document.getElementById("age").value;
    var colour = document.getElementById("colour").value;
    if (!currentUser || age == "" || isNaN(age) || colour == "" || !isNaN(colour)) {
        alert("You must be logged in and enter a valid name and age.")
        return;
    }
    console.log('%c fb_WriteRecPrivate(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()

    const dbReference = ref(DB, "Private/" + userId);

    update(dbReference, { Age: age, Colour: colour }).then(() => {

        //✅ Code for a successful write goes here
        console.log("successful write")


    }).catch((error) => {

        //❌ Code for a write error goes here
        console.log("Writing error")
    });

    //Collects data of the user's google account

    onAuthStateChanged(AUTH, (user) => {
        if (user) {
            currentUser = user;
            userId = user.uid;
            console.log("✅ Logged in as:", user.email, "Name:", user.displayName, user.photoURL);
            update(dbReference, { Email: user.email, profilepicture: user.photoURL, Name: user.displayName }).then(() => {
                location.href = 'index.html'
                //✅ Code for a successful write goes here
                console.log("Google login completed")

            }).catch((error) => {

                //❌ Code for a write error goes here
                console.log("Google login error")
            });
        } else {
            console.log("⚠️ Not logged in — redirecting to index.html");
            location.href = "index.html";
        }
    },
        (error) => {
            console.error("❌ Auth detection error:", error);
        });
}

//Writing the score for the game: Coin Collector to the database

