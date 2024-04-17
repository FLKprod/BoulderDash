// IMPORTATION DE FONCTIONS UTILES //
import {Timer} from "./../js/timer.js";
import {keyboard} from "./../js/keyboard.js"

console.warn('lancement de game.js');
//------------------------------------ MUSIQUE DE FOND DU JEU ---------------------------------------------//
function audiojeu(){
    var sonjeu = document.querySelector('#audioPlayer');   
    sonjeu.play();
}

//----------------------------------------------------------------------------------------------------------------------//

// --------------------------------- CODE POUR LE BOUTON RECOMMENCER -----------------------------------------//

const recommence = document.getElementById("Recommencer")
recommence.addEventListener("click",()=>{
    if(confirm('Voulez vous vraiment Recommencer ?')){
        window.location.href='./../html/game.html';
        }
});

//----------------------------------------------------------------------------------------------------------------------//

// --------------------------------- CODE POUR LE BOUTON QUITTER -----------------------------------------//

const quitte = document.getElementById("Quitter")
quitte.addEventListener("click",()=>{
    //MESSAGE DE VERIFICATION DU CHOIX DE L'UTILISATEUR//
    if(confirm('Voulez vous vraiment Quitter ?')){
        history.back();
        }
});

//----------------------------------------------------------------------------------------------------------------------//

//---------- LANCEMENT DES DIFFÉRENTES FONCTIONS POUR AVOIR LA MUSIQUE EN FOND ET LE TIMER OPÉRATIONNEL ----------------//

// audiojeu(); // Lance la lecture de la musique
setInterval(Timer, 1000); // Démarre le timer
keyboard(); // Appel de la fonction keyboard de manière asynchrone

//----------------------------------------------------------------------------------------------------------------------//