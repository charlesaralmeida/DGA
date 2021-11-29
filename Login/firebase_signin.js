/*//insira no head do hmtl:
<script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js"></script>  
<script src="https://www.gstatic.com/firebasejs/ui/4.8.1/firebase-ui-auth.js"></script>     
*/

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCiEWdYF_i85MGIXhcZ8W9s_eskb-dwWAY",
    authDomain: "testes-html-cd6b4.firebaseapp.com",
    projectId: "testes-html-cd6b4",
    storageBucket: "testes-html-cd6b4.appspot.com",
    messagingSenderId: "411644535686",
    appId: "1:411644535686:web:1056225d51f326a37a8207",
    measurementId: "G-RFVZS1S8MW"
};

firebase.initializeApp(firebaseConfig);
firebase.auth().useDeviceLanguage();

var ui = new firebaseui.auth.AuthUI(firebase.auth());
var database = firebase.database();

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            //signedIn(authResult.user);        
            return false;
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'index.html',
    signInOptions: [
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            customParameters: {
                // Forces account selection even when one account
                // is available.
                prompt: 'select_account'
            }
        }
    ]    
};

console.log(window.location.pathname);
ui.start('#firebaseui-auth-container', uiConfig);

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        var uid = user.email;
        console.log(uid);
        signedIn(user);        
    } else {                
        console.log("não autenticado");
    }
});


function signedIn(user) {
    let users = getAuthorizedUsers();
    users
        .then((result) => {
            for (item of result) {
                if (item === user.email) {
                    alert("Login realizado com sucesso");
                    console.log("autenticado");
                    window.location.replace("index.html");
                    return true;
                }
            }
            alert("Usuário não autorizado. Desconectando...");
            signOut();
            window.location.reload();
            return false;
        })
        .catch((error) => {
            console.log(error);
        });
}

function signOut(){
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}

function readData(reference) {
    return new Promise((resolve, reject) => {
        reference.get()
            .then(snapshot => {
                var data_read = snapshot.val();
                resolve(data_read);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getAuthorizedUsers() {
    reference = database.ref("users");
    return readData(reference);
}

function sendEmailVerification() {
    firebase.auth().currentUser.sendEmailVerification()
        .then(() => {
            // Email verification sent!
            // ...
        });
}