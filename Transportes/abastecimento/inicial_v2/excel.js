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
            key="uf";
            arrayExcel = group_by_key(rowObject, key);            
            let array_result = [];
            for(let uf in arrayExcel){
                array_result[uf] = group_by_key(arrayExcel[uf], "cidade");                
            }

            let array_cidades = [];
            for(let uf in array_result){                                                
                array_cidades[uf] = [];
                for(let cidades in array_result[uf]){
                    array_cidades[uf].push(cidades);                    
                }
                array_cidades[uf] = removeDuplicates(array_cidades[uf]);
                array_cidades[uf].sort();             
            }           
            array_result = array_cidades;
            // if(key!=="")            
            //     arrayExcel = group_by_key(rowObject, key);            
            // else
            //     arrayExcel = rowObject;
            document.getElementById("button_salvar").disabled = false;         
            resolve(array_result);
        }
        fileReader.onerror = reject;
        fileReader.readAsBinaryString(selectedFile);
    }); 
}

function group_by_key(data, key){            
    let dados = [];    
    //percorre todos os indices da array data
    for(let row in data){   
        //extrai os dados json de cada indice da array data
        let data_row = data[row];        
        //pega nos dados json o valor da key procurada
        let data_key = data_row[key];
        if(data_key){            
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

//remove elementos duplicado array
function removeDuplicates(data){
    return data.filter((value, index)=>data.indexOf(value) === index);
}