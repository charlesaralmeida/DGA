/*//insira no head do hmtl:
<script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js"></script>  
<script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-database.js"></script>
*/

function exportData(){
    var reference = database.ref("/");
    reference.get().then(snapshot => {
        var data_read = snapshot.val();
        var d={};
        for(data in data_read){       
            d[data] = data_read[data];                        
        }        
        var str = JSON.stringify(d);
        uriContent = "data:application/octet-stream," + encodeURIComponent(str);        
        newWindow = window.open(uriContent, 'neuesDokument');
    });
}

function importData(){
    //str deve ser a string copiada do arquivo gerado pelo exportData(). Não esquecer de usar o '' para fechar a string
    //var str = "";
    var obj = JSON.parse(str);
    var path = database.ref("/bkp");
    //writeData(path, obj);
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
    reference.get().then(snapshot => {
        var data_read = snapshot.val();
        console.log(data_read);
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