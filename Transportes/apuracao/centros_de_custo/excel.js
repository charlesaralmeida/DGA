function excel_to_json(){    
    let selectedFile;
    selectedFile = document.getElementById('input').files[0];       
    return new Promise((resolve, reject)=>{
        let fileReader = new FileReader();            
        fileReader.onload = () =>{          
            let data = fileReader.result;
            let workbook = XLSX.read(data,{type:"binary"});         
            let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[workbook.SheetNames[0]]);         
            jsonExcel = {};         
            const reject = "cod";
            for(let r1 in rowObject){                       
                let obj = rowObject[r1];
                let row = {};
                var cod = "";
                for(let r2 in obj){                                                                     
                    let value = obj[r2].toString();
                    if(r2!==reject) 
                        row[r2] = value.trim(); 
                    else{                        
                        cod = value;                                         
                    }
                } 
                jsonExcel[cod] = row;                        
            }
            document.getElementById("button_salvar").disabled = false;         
            resolve(jsonExcel);
        }
        fileReader.onerror = reject;
        fileReader.readAsBinaryString(selectedFile);
    }); 
}