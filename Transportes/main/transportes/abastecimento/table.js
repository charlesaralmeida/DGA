var data_select = new Array();
var data_select_cidades = new Array();
var ufs = new Array();
var cidades  = new Array();

function fill_select_uf(data){    
    for(let uf in data){
        createSelect("sel_uf", uf);
        data_select_cidades[uf] = [];
        for(let cidade in data[uf]){
            data_select_cidades[uf].push(data[uf][cidade]);
        }        
    }
}

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
    //t.setAttribute("width", "40%");
    row.appendChild(t);    
}

function insertDataTableLink(row, link, textlink){            
    let t = document.createElement("td");
    let data = "<a href=" + link + " target='_blank'>" + textlink + "</a>";        
    t.innerHTML = data;
    t.setAttribute("align", "left");
    //t.setAttribute("width", "40%");
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
    //var fields = ["nome_fantasia", "endereco", "cidade", "uf", "telefone", "razao_social", "cnpj"];
    var fields = ["Nome do Posto", "Endereço", "Cidade", "Estado", "Telefone"];
    setHeaderTable(table, fields);    
    for(let item of data){                     
        var row = createRowTable();                         
        insertDataTable(row, item.nome_fantasia);                         
        link_endereco = item.endereco + " - " + item.cidade + " - " + item.uf;
        link_endereco = link_endereco.replace(/\s/g, "%20");
        let link = "https://www.google.com/maps/search/?api=1&query=" + link_endereco;
        let textlink = item.endereco;
        //insertDataTable(row, item.endereco);          
        insertDataTableLink(row, link, textlink);          
        insertDataTable(row, item.cidade);                 
        insertDataTable(row, item.uf);        
        //insertDataTable(row, item.telefone);            
        let fone = "tel:" + item.fone;        
        fone = fone.replace(/\s/g, "%20");
        insertDataTableLink(row, fone, item.fone);           
        //insertDataTable(row, item.razao_social);                  
        //insertDataTable(row, item.cnpj);                                           
        table.appendChild(row);        
    }
        
    document.getElementById("table").append(table);
    document.getElementById("table").style = "margin-letf=auto; margin-right=auto;";
}

//remove elementos duplicado array
function removeDuplicates(data){
    return data.filter((value, index)=>data.indexOf(value) === index);
}


function selectUF(){    
    let uf = document.getElementById("sel_uf").value;    
    document.getElementById("sel_cidade").innerHTML = "";    
    let value = "Selecione uma cidade";
    createSelect("sel_cidade", value);
    for(let cidade in data_select_cidades[uf]){                
        createSelect("sel_cidade", data_select_cidades[uf][cidade]);        
    }            
    document.getElementById("label_sel_cidade").hidden = false;      
    document.getElementById("sel_cidade").hidden = false;        
}

function selectCidade(){
    let uf = document.getElementById("sel_uf").value;        
    let cidade = document.getElementById("sel_cidade").value;         
    buscar_postos(uf, cidade);    
}