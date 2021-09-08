/*//insira no head do hmtl:
<script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js"></script>  
<script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-database.js"></script>
*/

function salvar(){
    var reference = database.ref("/Transportes/apuracao/centros_de_custo");
    var jsonExcel = excel_to_json();    
    jsonExcel
    .then((result)=>{
        console.log(result);
        writeData(reference, result);
    })
    .catch((error)=>console.log(error));    
}

function buscar(){
    var reference = database.ref("/Transportes/apuracao/centros_de_custo");
    var centros_de_custo = readData(reference);    
    centros_de_custo
    .then((result)=>{        
        let cc = result;
        reference = database.ref("/Transportes/apuracao/orgaos");
        var orgaos = readData(reference);    
        orgaos
        .then((result)=>{        
            for(let org in result){                
                console.log(cc[org]);                
            }
        })
        .catch((error)=>console.log(error));        
    })
    .catch((error)=>console.log(error));        
}

function exportData(){
    var reference = database.ref("/Transportes/apuracao/orgaos");
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

function convert_cod_orgao(cod){        
    cod = cod.slice(0,2) + "." + cod.slice(2,4) + "." + cod.slice(4,6) + "." + cod.slice(6,8) + "." + cod.slice(8,10) + "." + cod.slice(10,12) + "." +  cod.slice(12,14);    
    return cod;
}