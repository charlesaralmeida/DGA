function openModalAbout() {
    let modal_about = document.getElementById("modal-about");
    modal_about.style.display = "block";
}

function closeModalAbout() {
    let modal_about = document.getElementById("modal-about");
    modal_about.style.display = "none";
}

window.onclick = function (event) {
    let modal_about = document.getElementById("modal-about");
    let modal_taxi = document.getElementById("modal-cadastro_usuario_taxi");
    let modal_util_taxi = document.getElementById("modal-util_taxi");
    let modal_leilao = document.getElementById("modal-comunicado-leilao");
    let modal_equipe = document.getElementById("modal-equipe");
    if (event.target == modal_about) {
        modal_about.style.display = "none";
    }    
    if (event.target == modal_taxi) {
        modal_taxi.style.display = "none";
    }    
    if (event.target == modal_util_taxi) {
        modal_util_taxi.style.display = "none";
    }    
    if (event.target == modal_leilao) {
        modal_leilao.style.display = "none";
    }    
    if (event.target == modal_equipe) {
        modal_equipe.style.display = "none";
    }    
}

function openModal(modal){
    document.getElementById(modal).style.display = "block";
}

function closeModal(modal){
    document.getElementById(modal).style.display = "none";
}

function moveSlide(atual, prox){
    document.getElementById(atual).style.display="none";
    document.getElementById(prox).style.display="block";    
}