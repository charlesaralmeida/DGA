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

function insertSelectTable(row, notas_possiveis, id){
    let t = document.createElement("td");    
    let select = document.createElement("select");  
    var i = 0;             
    for(n of notas_possiveis){        
        let str = n;        
        let opt = document.createElement("option");            
        opt.text = str;               
        i++; 
        opt.value = i;
        select.appendChild(opt);        
        select.setAttribute("id", id);
    }         
    t.appendChild(select);
    t.setAttribute("align", "left");
    t.setAttribute("width", "20%");
    row.appendChild(t);    
}