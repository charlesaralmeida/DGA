/*//insira no head do hmtl:
<script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js"></script>  
<script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-database.js"></script>
*/

var data = [];

function buscar_postos(){    
    reference = database.ref("/Transportes/abastecimento/postos");
    var postos = readData(reference);    
    postos
    .then((result)=>{                  
        data = result;         
        makeFullTablePostos(data);                                
    })
    .catch((error)=>console.log(error));        
}

var firebaseConfig = {
    apiKey: "AIzaSyDs8OWyb3z70oxbANRhtujozYH8Lp5FIwo",
    authDomain: "dgaunicamp.firebaseapp.com",
    databaseURL: "https://dgaunicamp-default-rtdb.firebaseio.com",
    projectId: "dgaunicamp",
    storageBucket: "dgaunicamp.appspot.com",
    messagingSenderId: "927605457632",
    appId: "1:927605457632:web:9f4eb310f8dd7f428bc685",
    measurementId: "G-PFJ0J9H1KT"
}; 
  
firebase.initializeApp(firebaseConfig);  

var database = firebase.database();

function writeData(reference, data) {    
    reference.set(data);
} 

function updateData(reference, data) {    
    reference.update(data);
} 

function readData(reference){    
    return new Promise((resolve, reject)=>{
        reference.get()
        .then(snapshot => {
            var data_read = snapshot.val();             
            resolve(data_read);
        })
        .catch(error=>{
            reject(error);
        });
    });
}

function removeData(reference){
    reference.remove().then(function() {
        return true;
    })
    .catch(function(error) {
        return false;
    });    
}