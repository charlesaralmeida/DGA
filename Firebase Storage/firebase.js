/*//insira no head do hmtl:
<script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js"></script>  
<script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-storage.js"></script>      
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

var storage = firebase.storage();
var uploadTask;

function uploadFile(){    
    progressbar.value = 0;
    let file = getFile();        
    let reference = storage.ref("arquivos/" + file.name);
    uploadTask = reference.put(file);
    document.getElementById("message").innerText = "Uploading...";
    updateProgressbar(uploadTask);    
}

function getFile(){    
    let selectedFile = document.getElementById('fileUpload').files[0];           
    return selectedFile;
}

function updateProgressbar(task){
    task.on('state_changed',
        function progress(snapshot){
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            let progressbar = document.getElementById('progressbar');
            progressbar.value = percentage;
        },        
        function error(err){
            document.getElementById("message").innerText = "Upload Cancelado";
        },
        function complete(){
            document.getElementById("message").innerText = "Upload Completo!";
            progressbar.value = 0;
        }
    )

}

function cancelUpload(){
    uploadTask.cancel();
    progressbar.value = 0;
    document.getElementById("message").innerText = "Upload Cancelado";
}

function pauseUpload(){
    uploadTask.pause();
    document.getElementById("message").innerText = "Upload Pausado";
}

function resumeUpload(){
    uploadTask.resume();
    document.getElementById("message").innerText = "Uploading...";
}

function downloadFile(file){       
    storage.ref(file).getDownloadURL().then(function(url) {                        
        createLink(url, file);                                                                      
    }).catch(function(error) {
        console.log(error);
    });            
}

function createLink(url, text){    
    let link = document.createElement("a");
    link.href = url;
    link.text = text;
    link.download = "file";
    link.target = "_blank";
    document.body.appendChild(link);
    breakLineHTML();
}

function deleteFile(file){
    file = "arquivos/banda.jpg";    
    storage.ref(file).delete().then(function() {
        document.getElementById("message").innerText = "Arquivo excluído";
    }).catch(function(error) {
        console.log(error);
    });
}

function listFiles(){    
    let listRef = storage.ref("arquivos/");    
    listRef.listAll().then(result=>{   
        result.items.forEach((item)=>{            
            downloadFile(item.fullPath);
        });    
    });
}

function breakLineHTML(){
    let br = document.createElement("br");
    document.body.appendChild(br);
}