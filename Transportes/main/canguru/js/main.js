

function openModalAbout() {
    let modal_about = document.getElementById("modal-about");
    modal_about.style.display = "block";
}

function closeModalAbout() {
    let modal_about = document.getElementById("modal-about");
    modal_about.style.display = "none";
}

function openModalFrota() {
    let modal_frota = document.getElementById("modal-frota");
    modal_frota.style.display = "block";
}

function closeModalFrota() {
    let modal_frota = document.getElementById("modal-frota");
    modal_frota.style.display = "none";
}

function openModalAlteracao() {
    let modal_alteracao = document.getElementById("modal-frota-alteracao");
    modal_alteracao.style.display = "block";
}

function closeModalAlteracao() {
    let modal_alteracao = document.getElementById("modal-frota-alteracao");
    modal_alteracao.style.display = "none";
    openModalFrota();
}

window.onclick = function (event) {
    let modal_about = document.getElementById("modal-about");
    if (event.target == modal_about) {
        modal_about.style.display = "none";
    }
}
