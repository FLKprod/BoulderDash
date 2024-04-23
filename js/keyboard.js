import {loadpositionperso,Gravite,DetectionTerre,DetectionDiamant,DetectionVictoire,refreshmap,setposjoueur,getPosjoueur,getposXjoueur,getposYjoueur, collision,textureloadmap} from './map.js'
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
    var direction
    
    // La variable vertical précise si le joueur se déplace verticalement ou non.
    // Les variables directionvertical et directionhorizontal servent à faire bouger le personnage en fonction de la touche pressée.
    // La variable _posjoueur calcule la coordonnée du personnage

    if (event.key === "w" || event.key === "ArrowUp") {
        directionvertical = -1;
            vertical = 0;
            _posjoueur-=ligne;

            // AUGMENTATION DU NOMBRE DE MOUVEMENT ET DETECTION SI COLISIONS //
            
            
            update_posjoueur();
            if(collision("w")==true){
                _posjoueur+=ligne;
                directionvertical=0;
                mouvements--;
            }
            localStorage.setItem('Mouvements',mouvements);
    } else if (event.key === "s" || event.key === "ArrowDown") {
        directionvertical = 1;
            vertical = 0;
            _posjoueur+=ligne;
          
            // AUGMENTATION DU NOMBRE DE MOUVEMENT ET DETECTION SI COLISIONS //
           
            update_posjoueur();
            if(collision("s")==true){
                _posjoueur-=ligne;
                directionvertical=0;
                mouvements--;
            }
            localStorage.setItem('Mouvements',mouvements);
    } else if (event.key === "a" || event.key === "ArrowLeft") {
        directionhorizontal = -1;
            vertical = 1;
            _posjoueur--;

            update_posjoueur();
            if(collision("left")==true){
                _posjoueur++;
                directionhorizontal=0;
                mouvements--;
            }
            localStorage.setItem('Mouvements',mouvements);
    } else if (event.key === "d" || event.key === "ArrowRight") {
        directionhorizontal = 1;
            vertical = 1;
            _posjoueur++;
            update_posjoueur();
            if(collision("right")==true){
                _posjoueur--;
                directionhorizontal=0;
                mouvements--;
            }
            localStorage.setItem('Mouvements',mouvements);
        
    }
    console.log(event.key);
    console.log(mouvements);
    document.getElementById("mooverecup").innerHTML = `Nombre de déplacements : ${mouvements++}`;
    
    
    
    
    
    update_cases();
    
    if(vertical == 0){
        joueur.style.top = (joueurtop + vitesse * directionvertical) + 'px';
    }
    else joueur.style.left = (joueurleft + vitesse * directionhorizontal) + 'px';

    console.log("/leftpos: " + joueur.style.left + "/toppos: " + joueur.style.left);
    console.log("position joueur actuelle  : " + _posjoueur);
    


    // RAFRAICHISSEMENT DE LA MAP ET DÉTÉCTION DE PIERRES QUI TOMBENT PAR L'ÉFFET DE LA GRAVITÉ //
    Gravite();
    refreshmap();
    
    
    function update_posjoueur() {
        setposjoueur(_posjoueur);
        loadpositionperso(getposXjoueur(),getposYjoueur());
    }

    async function update_cases() {
        DetectionTerre();
        DetectionDiamant();
        refreshmap();
        await Gravite();
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
