/*//insira no head do hmtl:
<script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js"></script>  
<script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-database.js"></script>
*/

function salvar(){
    let ano = document.getElementById("sel_ano").value;
    let mes = document.getElementById("sel_mes").value;    
    var reference = database.ref("/Transportes/apuracao/combustivel/" + ano + "/" + mes);
    var arrayExcel = excel_to_array("Centro de Custo");    
    arrayExcel
    .then((result)=>{
        console.log(result);
        writeData(reference, result);
    })
    .catch((error)=>console.log(error));    
}

// function buscar(){
//     var reference = database.ref("/Transportes/apuracao/centros_de_custo");
//     var centros_de_custo = readData(reference);    
//     centros_de_custo
//     .then((result)=>{        
//         let cc = result;
//         reference = database.ref("/Transportes/apuracao/orgaos");
//         var orgaos = readData(reference);    
//         orgaos
//         .then((result)=>{    
//             let org = result;    
//             data = [];            
//             for(let key in result){                                
//                 let obj = {"cod": put_point_cod_orgao(key)};                
//                 Object.assign(obj, org[key]);
//                 Object.assign(obj, cc[key]);                           
//                 data.push(obj);
//             }            
//             makeFullTable(data);                                
//         })
//         .catch((error)=>console.log(error));        
//     })
//     .catch((error)=>console.log(error));        
// }

var data = [];

function buscar_orgaos(){    
    reference = database.ref("/Transportes/apuracao/orgaos");
    var orgaos = readData(reference);    
    orgaos
    .then((result)=>{    
        let org = result;    
        data = [];            
        for(let key in result){                                
            let obj = {"cod": put_point_cod_orgao(key)};                
            Object.assign(obj, org[key]);            
            data.push(obj);
        }            
        makeFullTableOrgaos(data);                                
    })
    .catch((error)=>console.log(error));        
}

function buscar_centro_custo(cod){
    return new Promise((resolve, reject)=>{
        var reference = database.ref("/Transportes/apuracao/centros_de_custo/" + cod);
        var centro_de_custo = readData(reference);    
        centro_de_custo
        .then((result)=>{        
            resolve(result);            
        })
        .catch((error)=>reject(error));            
    });
}

function habilitarIncluirCentroCusto(){
    document.getElementById("incluir_CentroCusto").hidden=false;    
    document.getElementById("button_habilitar_IncluirCentroCusto").hidden=true;
}

function desabilitarIncluirCentroCusto(){
    document.getElementById("incluir_CentroCusto").hidden=true;    
    document.getElementById("button_habilitar_IncluirCentroCusto").hidden=false;
}

function salvarCentroCusto(){    
    let CO = document.getElementById("input_CO").value;
    let CL = document.getElementById("input_CL").value;
    if(CL==="")
        CL = "-";
    let inicio = document.getElementById("input_inicio").value;    
    if(inicio===""){
        alert("Preencha todos os campos");
        return false;
    }else{
        inicio = formatDateInput(inicio);
    }    
    let fim = "-";

    if(CO===""){
        alert("Preencha todos os campos");        
    }else{        
        //se inicio do atual < inicio do cc já cadastrado => erro
        if(compareDates(inicio, last_CentroCusto["inicio"])){
            alert("Data de inclusão não pode ser anterior ao início do Centro de Custo atual");
        }else{  
            if((CO===last_CentroCusto["CO"])&&(CL===last_CentroCusto["CL"])){
                alert("Centro de Custo inserido já é o atual");
            }else{
                cod = remove_point_cod_orgao(data_select[0].cod);
                ordem = ordem_last_CentroCusto + 1;    
                let reference = database.ref("/Transportes/apuracao/centros_de_custo/" + cod + "/" + ordem);    
                let cc = {};
                cc["CO"] = CO;                
                cc["CL"] = CL;
                cc["inicio"] = inicio;
                cc["fim"] = fim;                
                writeData(reference, cc);         
                reference = database.ref("/Transportes/apuracao/centros_de_custo/" + cod + "/" + ordem_last_CentroCusto + "/fim");    
                fim = cc["inicio"]; //fim do anterior = inicio do atual                
                writeData(reference, fim);
                makeItemTableCentrosCusto(cod);      
            }
        }
    }
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

function put_point_cod_orgao(cod){        
    cod = cod.slice(0,2) + "." + cod.slice(2,4) + "." + cod.slice(4,6) + "." + cod.slice(6,8) + "." + cod.slice(8,10) + "." + cod.slice(10,12) + "." +  cod.slice(12,14);    
    return cod;
}

function remove_point_cod_orgao(cod){    
    cod = cod.split(".").join("");    
    return cod;
}

function formatDateInput(date){
    date = date.toString();    
    date = date.split("-");    
    date.swap(0,2);
    date = date[0] + "/" + date[1] + "/" + date[2];
    return date;
}

function formatDateInputEnglish(date){
    date = date.toString();    
    date = date.split("/");    
    date.swap(0,2);
    date = date[0] + "-" + date[1] + "-" + date[2];
    return date;
}

//retorna verdadeiro se date1<date2
function compareDates(date1,date2){
    date1 = formatDateInputEnglish(date1);
    date2 = formatDateInputEnglish(date2);
    return date1<date2? true:false;    
}

Array.prototype.swap = function (x,y) {
    var b = this[x];
    this[x] = this[y];
    this[y] = b;
    return this;
}