//-------------------------- BOUTON DE RETOUR AU MENU -------------------------------------------//

const retour = document.getElementById("Retourmenu")
retour.addEventListener("click",()=>{
    window.location.href='./../html/index.html';
});

//-----------------------------------------------------------------------------------------------//

//------------------------------------ MUSIQUE DE FOND DU JEU ---------------------------------------------//
function audiowin(){
    var sonwin = document.querySelector('#audioPlayer');   
    sonwin.play();
}
audiowin();

//----------------------------------------------------------------------------------------------------------------------//