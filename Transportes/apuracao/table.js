var data_select = [];

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

function makeFullTableOrgaos(data){    
    var table = document.getElementById("table");
    table.innerHTML = "";    
    table = createTable();
    var fields = ["Cod_orgao", "Sigla", "Descricao"];
    setHeaderTable(table, fields);    
    for(let item of data){                                                                
        var row = createRowTable();
        insertDataTable(row, item.cod);                 
        insertDataTable(row, item.sigla_sipex);                 
        insertDataTable(row, item.desc_sipex);                                                
        table.appendChild(row);        
    }
    
    let cods = new Array();
    let siglas  = new Array();

    for(let item of data){
        cods.push(item.cod);
        siglas.push(item.sigla_sipex);        
    }

    cods.sort();
    siglas.sort();
    
    document.getElementById("sel_cod").innerHTML = "<option value='' selected disabled hidden>Selecione um código</option>";
    document.getElementById("sel_sigla").innerHTML = "<option value='' selected disabled hidden>Selecione uma sigla</option>";
    for(let item of cods) createSelect("sel_cod", item);
    for(let item of siglas) createSelect("sel_sigla", item);    
    
    document.getElementById("table").append(table);    
}

function makeItemTableOrgaos(data){    
    var table = document.getElementById("table");
    table.innerHTML = "";
    var fields = ["Cod_orgao", "Sigla", "Descricao"];
    setHeaderTable(table, fields);    
    for(let item of data){                                                                
        var row = createRowTable();
        insertDataTable(row, item.cod);                 
        insertDataTable(row, item.sigla_sipex);                 
        insertDataTable(row, item.desc_sipex);                                        
        table.appendChild(row);        
    }    
}

var ordem_last_CentroCusto = 0;
var last_CentroCusto = "";
function makeItemTableCentrosCusto(cod){    
    let cc = buscar_centro_custo(cod);
    cc
    .then((result)=>{        
        var table = document.getElementById("table_CentroCusto");
        table.innerHTML = "";
        var fields = ["Ordem", "CO", "CL", "Inicio", "Fim"];
        setHeaderTable(table, fields);    
        for(let i=0;i<result.length;i++){                                                                   
            var row = createRowTable();
            let item = result[i];        
            insertDataTable(row, i);                         
            insertDataTable(row, item.CO);                                 
            insertDataTable(row, item.CL);                 
            insertDataTable(row, item.inicio);                 
            if(item.fim)
                insertDataTable(row, item.fim);                 
            else
                insertDataTable(row, "-");                         
            table.appendChild(row);     
            last_CentroCusto = item;
            ordem_last_CentroCusto = i;                   
        }        
        document.getElementById("input_CO").value = last_CentroCusto["CO"];
        document.getElementById("input_CL").value = "";
        document.getElementById("input_inicio").value = "";
        desabilitarIncluirCentroCusto();        
    })
    .catch((error)=>alert(error));    
}

function selectCod(){
    let cod = document.getElementById("sel_cod").value;    
    data_select = [];
    for(let item of data){                
        if(cod===item["cod"]){
            data_select = [item];
            document.getElementById("sel_sigla").value = item["sigla_sipex"];            
            makeItemTableOrgaos(data_select);   
            makeItemTableCentrosCusto(remove_point_cod_orgao(cod));         
        }        
    }        
}

function selectSigla(){
    let sigla = document.getElementById("sel_sigla").value;    
    data_select = [];
    for(let item of data){                
        if(sigla===item["sigla_sipex"]){
            data_select = [item];
            document.getElementById("sel_cod").value = item["cod"];            
            makeItemTableOrgaos(data_select);            
            makeItemTableCentrosCusto(remove_point_cod_orgao(item["cod"]));            
        }
    }
}

