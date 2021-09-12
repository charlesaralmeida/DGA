function excel_to_array(key){    
    let selectedFile;
    selectedFile = document.getElementById('input').files[0];       
    return new Promise((resolve, reject)=>{
        let fileReader = new FileReader();            
        fileReader.onload = () =>{          
            let data = fileReader.result;
            let workbook = XLSX.read(data,{type:"binary"});         
            //todos os dados da planilha
            let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[workbook.SheetNames[0]]);      
            console.log(rowObject);
            //todos os dados agrupados por key
            arrayExcel = group_by_key(rowObject, key);  
            document.getElementById("button_salvar").disabled = false;         
            resolve(arrayExcel);
        }
        fileReader.onerror = reject;
        fileReader.readAsBinaryString(selectedFile);
    }); 
}

function group_by_key(data, key){        
    key = replace_valid_key(key);    
    console.log(key);
    let dados = [];    
    //percorre todos os indices da array data
    for(let row in data){   
        //extrai os dados json de cada indice da array data
        let data_row = data[row];        
        //pega nos dados json o valor da key procurada
        let data_key = data_row[key];
        if(data_key){            
            data_key = replace_valid_key(data_key);
            if(dados.hasOwnProperty(data_key))
                dados[data_key].push(data_row);                    
            else{
                dados[data_key] = [];
                dados[data_key].push(data_row);
            }
        }
    }
    return dados;
}

function replace_valid_key(key){        
    key = key.replace(/\.|\#|\$|\/|\[|\]/gi, "_");        
    return key;
}

// function replace_valid_key(data, key){
//     console.log(data);
//     let old_key = key;
//     let new_key = key.replace(/\.|\#|\$|\/|\[|\]/gi, "_");    
//     data[new_key] = data[old_key];
//     delete data[old_key];
//     return data;
// }

// function excel_to_json(){    
//     let selectedFile;
//     selectedFile = document.getElementById('input').files[0];       
//     return new Promise((resolve, reject)=>{
//         let fileReader = new FileReader();            
//         fileReader.onload = () =>{          
//             let data = fileReader.result;
//             let workbook = XLSX.read(data,{type:"binary"});         
//             let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[workbook.SheetNames[0]]);   
//             console.log(rowObject);
//             jsonExcel = {};         
//             const reject = "cod";
//             for(let r1 in rowObject){                       
//                 let obj = rowObject[r1];
//                 let row = {};
//                 var cod = "";
//                 for(let r2 in obj){                                                                     
//                     let value = obj[r2].toString();
//                     if(r2!==reject) 
//                         row[r2] = value.trim(); 
//                     else{                        
//                         cod = value;                                         
//                     }
//                 }                 
//                 jsonExcel[cod] = [row];                        
//             }
//             document.getElementById("button_salvar").disabled = false;         
//             resolve(jsonExcel);
//         }
//         fileReader.onerror = reject;
//         fileReader.readAsBinaryString(selectedFile);
//     }); 
// }