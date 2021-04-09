function generatePDF(){
    
    var columns = ["Name", "Cellphone", "Work Phone"];
    var rows = [];    
    var data = {};
    var gestor = getAvaliacaoGestor();                  
    var itens = getAvaliacaoItens();
    var equipamentos = getAvaliacaoEquipamentos();  
    var div = document.createElement("div");
    var p = document.createElement("p");
    p.innerHTML = "<h1>Identificação</h1>";
    div.appendChild(p);
    var p = document.createElement("p");
    p.innerHTML = "<b>Matricula: </b>" + gestor.matricula;
    div.appendChild(p);
    p = document.createElement("p");    
    p.innerHTML = "<b>Nome: </b>" + gestor.nome;
    div.appendChild(p);
    p = document.createElement("p");    
    p.innerHTML = "<b>Unidade: </b>" + gestor.unidade;    
    div.appendChild(p);    

    var doc = new jsPDF();    
    doc.fromHTML(div, 10, 10);
    doc.save('hello-world.pdf');
}
