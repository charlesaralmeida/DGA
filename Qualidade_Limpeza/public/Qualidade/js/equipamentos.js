var itens_qualidade_path = "/itens_qualidade";
var number_of_equipamentos_produtos_epis_uniformes = 0;

function makeEquipamentosTable(){                      
    var data_read;            
    var reference = database.ref(itens_qualidade_path);
    reference.get().then(snapshot => {    
        data_read = snapshot.val();  
        var equipamentos = data_read.equipamentos_produtos_epis_uniformes.filter((el)=> {return el!= null;});        
        var notas_possiveis = data_read.notas_possiveis.filter((el)=> {return el!= null;}); 
        var table = createTable();
        var fields = ["Descrição", "Avaliação"];
        setHeaderTable(table, fields);        
        var i = 0;      
        for(equip of equipamentos){                            
            var row = createRowTable();
            insertDataTable(row, equip.descricao);            
            i++;
            let id = "select_equips_" + i;
            insertSelectTable(row, notas_possiveis, id);
            table.appendChild(row);
            number_of_equipamentos_produtos_epis_uniformes++;
        }
        $("#div_equipamentos").append(table);
    });        
}

function getAvaliacaoEquipamentos(){
    var data = {};
    for(let i = 1; i<=number_of_equipamentos_produtos_epis_uniformes;i++){
        let s = "select_equips_" + i;
        var sel = document.getElementById(s);    
        data[i] = sel.options[sel.selectedIndex].text;
    }    
    return data;    
}