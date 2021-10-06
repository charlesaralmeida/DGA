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
            //console.log(rowObject);
            //todos os dados agrupados por key
            let arrayExcel;
            if(key!=="")            
                arrayExcel = group_by_key(rowObject, key);            
            else
                arrayExcel = rowObject;
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