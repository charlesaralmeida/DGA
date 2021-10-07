var data_select = new Array();

function createTable(){
    return document.createElement("table");
}

function createRowTable(){
    return document.createElement("tr");
}

function setHeaderTable(table, fields){        	
    var header = document.createElement("tr");                
    for(let i=0;i<fields.length;i++){
        let t = document.createElement("th");
        let h = document.createTextNode(fields[i]);
        t.appendChild(h);        
        header.appendChild(t);
    }              
    header.setAttribute("align", "left");        
    table.appendChild(header);
}
   
function insertDataTable(row, data){            
    let t = document.createElement("td");
    let d = document.createTextNode(data);
    t.appendChild(d);
    t.setAttribute("align", "left");
    t.setAttribute("width", "40%");
    row.appendChild(t);    
}

function createSelect(idSel, value){
    let sel = document.getElementById(idSel);
    let opt = document.createElement("option");
    opt.text = value;
    opt.value = value;
    sel.appendChild(opt);
}

function makeFullTablePostos(data){    
    var table = document.getElementById("table");
    table.innerHTML = "";    
     table = createTable();
    var fields = ["razao_social", "nome_fantasia", "cnpj", "endereco", "cidade", "uf", "telefone"];
    setHeaderTable(table, fields);    
    for(let item of data){                     
        var row = createRowTable();
        insertDataTable(row, item.razao_social);                 
        insertDataTable(row, item.nome_fantasia);                 
        insertDataTable(row, item.cnpj);                                                
        insertDataTable(row, item.endereco);                 
        insertDataTable(row, item.cidade);                 
        insertDataTable(row, item.uf);
        insertDataTable(row, item.telefone);                                                        
        table.appendChild(row);        
    }
    
    let ufs = new Array();
    let cidades  = new Array();

    for(let item of data){
        ufs.push(item.uf);
        cidades.push(item.cidade);        
    }

    ufs = removeDuplicates(ufs);
    cidades = removeDuplicates(cidades);

    ufs.sort();
    cidades.sort();
    
    document.getElementById("sel_uf").innerHTML = "<option value='' selected disabled hidden>Selecione um Estado</option>";
    document.getElementById("sel_cidade").innerHTML = "<option value='' selected disabled hidden>Selecione uma Cidade</option>";
    for(let item of ufs) createSelect("sel_uf", item);
        
    document.getElementById("table").append(table);    
}

//remove elementos duplicado array
function removeDuplicates(data){
    return data.filter((value, index)=>data.indexOf(value) === index);
}

function makeItemTablePostos(data){    
    var table = document.getElementById("table");
    table.innerHTML = "";
    var fields = ["razao_social", "nome_fantasia", "cnpj", "endereco", "cidade", "uf", "telefone"];
    setHeaderTable(table, fields);    
    for(let item of data){                                                                
        var row = createRowTable();
        insertDataTable(row, item.razao_social);                 
        insertDataTable(row, item.nome_fantasia);                 
        insertDataTable(row, item.cnpj);                                                
        insertDataTable(row, item.endereco);                 
        insertDataTable(row, item.cidade);                 
        insertDataTable(row, item.uf);
        insertDataTable(row, item.telefone);                                       
        table.appendChild(row);        
    }    
}

function selectUF(){
    let uf = document.getElementById("sel_uf").value;    
    data_select = [];      
    for(let item of data){                        
        if(uf===item["uf"]){            
            data_select.push(item);            
        }        
    }            
    
    document.getElementById("sel_cidade").innerHTML = "<option value='' selected disabled hidden>Selecione uma Cidade</option>"; 

    let cidades  = new Array();

    for(let item of data_select){        
        cidades.push(item.cidade);        
    }
    
    cidades = removeDuplicates(cidades);
    cidades.sort();

    for(let item of cidades){
        createSelect("sel_cidade", item);    
    } 

    document.getElementById("table").innerHTML = "";
    makeItemTablePostos(data_select);     
    for(let item of cidades) createSelect("sel_cidade", item);  
}

function selectCidade(){
    let uf = document.getElementById("sel_uf").value;        
    let cidade = document.getElementById("sel_cidade").value;        
    data_select = [];
    for(let item of data){                        
        if((uf===item["uf"])&&(cidade===item["cidade"])){
            data_select.push(item);   
        }        
    }                        

    document.getElementById("table").innerHTML = "";
    makeItemTablePostos(data_select);        
}
