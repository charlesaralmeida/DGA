var itens_qualidade_path = "/itens_qualidade";
var number_of_itens = 0;

function makeItemsTable(){                      
    var data_read;            
    var reference = database.ref(itens_qualidade_path);
    reference.get().then(snapshot => {    
        data_read = snapshot.val();  
        var itens = data_read.itens.filter((el)=> {return el!= null;});        
        var notas_possiveis = data_read.notas_possiveis.filter((el)=> {return el!= null;});        
        var table = createTable();
        var fields = ["Descrição", "Avaliação"];
        setHeaderTable(table, fields);
        var i = 0;      
        for(item of itens){                                        
            var row = createRowTable();
            insertDataTable(row, item.descricao); 
            i++;
            let id = "select_itens_" + i;
            insertSelectTable(row, notas_possiveis, id);
            table.appendChild(row);
            number_of_itens++;
        }
        $("#div_itens").append(table);
    });        
}

function getAvaliacaoItens(){
    var data = {};
    for(let i = 1; i<=number_of_itens;i++){
        let s = "select_itens_" + i;
        var sel = document.getElementById(s);    
        data[i] = sel.options[sel.selectedIndex].text;
    }    
    return data;    
}