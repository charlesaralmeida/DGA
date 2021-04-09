var unidades_path = "/unidades";

function makeUnidadesLista(){    
    var form_gestor = document.getElementById("form_gestor");        
    var data_read;            
    var reference = database.ref(unidades_path);
    reference.get().then(snapshot => {    
        data_read = snapshot.val();             
        var sel_unidade = document.createElement("select");                
        var i = 0;
        for(v in data_read){                                    
            let opt = document.createElement("option");            
            opt.text = v;               
            i++; 
            opt.value = i;
            sel_unidade.appendChild(opt);            
            sel_unidade.setAttribute("id", "gestor_unidade");
        }        
        let label = document.createElement("label");
        let br = document.createElement("br");
        label.innerHTML = "Unidade:";
        form_gestor.appendChild(label);
        form_gestor.appendChild(br);
        form_gestor.appendChild(sel_unidade);
    });        
}

function getAvaliacaoGestor(){
    var data = {};
    data["matricula"] = document.getElementById("gestor_matricula").value;    
    data["nome"] = document.getElementById("gestor_nome").value;
    data["email"] = document.getElementById("gestor_email").value;
    data["ramal"] = document.getElementById("gestor_ramal").value;        
    var sel = document.getElementById("gestor_unidade");    
    data["unidade"] = sel.options[sel.selectedIndex].text;    
    return data;
}