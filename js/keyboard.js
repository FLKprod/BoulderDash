import {loadpositionperso,Gravite,DetectionTerre,DetectionDiamant,DetectionVictoire,refreshmap,setposjoueur,getPosjoueur,getposXjoueur,getposYjoueur, collision} from './map.js'
console.warn("Lancement de Keyboard.js!");

// Variables pour initialiser et faire bouger le perso //
var vitesse = 32, directionhorizontal = 1, directionvertical =1,vertical = 0;
var joueur = document.getElementById('joueur');
var ligne = 32;
var joueurleft,joueurtop;

//initialisation du nombre de mouvements//
var mouvements=localStorage.getItem('Mouvements');
if(mouvements==null||mouvements==-1){
    mouvements=0;
}

//----------------------- FONCTIONS DE DETECTION DES TOUCHES ET DES MOUVEMENTS EN FONCTION DE CES DERNIERES ------------------------------------------------------//

export async function keyboard() {
    document.addEventListener("keypress", async (event) => {
    var _posjoueur = getPosjoueur();
    joueurleft = joueur.offsetLeft;
    joueurtop = joueur.offsetTop;

    
    // La variable vertical précise si le joueur se déplace verticalement ou non.
    // Les variables directionvertical et directionhorizontal servent à faire bouger le personnage en fonction de la touche pressée.
    // La variable _posjoueur calcule la coordonnée du personnage

    if (event.key === "w" || event.key === "ArrowUp") {
        console.log("UP")
        directionvertical = -1;
        vertical = 0;
        _posjoueur -= ligne;
        mouvements++;
    } else if (event.key === "s" || event.key === "ArrowDown") {
        console.log("DOWN")
        directionvertical = 1;
        vertical = 0;
        _posjoueur += ligne;
        mouvements++;
    } else if (event.key === "a" || event.key === "ArrowLeft") {
        console.log("LEFT")
        directionhorizontal = -1;
        vertical = 1;
        _posjoueur--;
        mouvements++;
    } else if (event.key === "d" || event.key === "ArrowRight") {
        console.log("RIGHT")
        directionhorizontal = 1;
        vertical = 1;
        _posjoueur++;
        mouvements++;
    }
    console.log(event.key);
    loadpositionperso(getposXjoueur,getposYjoueur)
    update_posjoueur();
    update_cases();
    document.getElementById("mooverecup").innerHTML = `Nombre de déplacements : ${mouvements}`;
        
    
    function update_posjoueur() {
        console.log(_posjoueur);
        setposjoueur(_posjoueur);
    }

    async function update_cases() {
        DetectionTerre();
        DetectionDiamant();
        await Gravite();
        refreshmap();
        collision();
        if(DetectionVictoire() === true) {
            directionvertical = 0;
            directionhorizontal = 0;
            joueurleft = getposXjoueur;
            joueurtop = getposYjoueur;
            mouvements = 0;
        }
    }
})
}
