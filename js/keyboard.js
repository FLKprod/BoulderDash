import {Gravite,collision,DetectionTerre,DetectionDiamant,DetectionVictoire,refreshmap,textureloadmap} from './map.js'
import {setposjoueur,getPosjoueur,getposXjoueur,getposYjoueur} from './map.js'

// Variables pour initialiser et faire bouger le perso //
var vitesse = 32, directionhorizontal = 1, directionvertical =1,vertical = 0;
var joueur = document.getElementById('joueur');
var x = 32;
var joueurleft,joueurtop;

//initialisation du nombre de mouvements//
var mouvements=localStorage.getItem('Mouvements');
if(mouvements==null||mouvements==-1){
    mouvements=0;
}
console.log(mouvements);
console.log("Keyboard.js!");

//----------------------- FONCTIONS DE DETECTION DES TOUCHES ET DES MOUVEMENTS EN FONCTION DE CES DERNIERES ------------------------------------------------------//

export async function keyboard(){
document.addEventListener("keydown", function(event) {
    if((event.keyCode == 90) || (event.keyCode == 83) || (event.keyCode == 81)||(event.keyCode == 68)||(event.keyCode == 27)||(event.keyCode == 82)||(event.keyCode == 37)||(event.keyCode == 38)||(event.keyCode == 39)||(event.keyCode == 40))
    {
        var _posjoueur = getPosjoueur();
        joueurleft = joueur.offsetLeft;
        joueurtop = joueur.offsetTop;

        /* La variable vertical precise si le joueur se déplace verticalement ou non.
           Les variables directionvertical et directionhorizontal servent à faire bouger le personnage en fonction de la touche pressée.
           la variable_posjoueur calcule la coordonnée du personnage*/
        
        // TOUCHE Z ET FLECHE DU HAUT //
        if ((event.keyCode == 90)||(event.keyCode == 38)) {
            directionvertical = -1;
            vertical = 0;
            _posjoueur-=x;

            // AUGMENTATION DU NOMBRE DE MOUVEMENT ET DETECTION SI COLISIONS //
            
            mouvements++;
            update_posjoueur();
            if(collision("z")==true){
                _posjoueur+=x;
                directionvertical=0;
                mouvements--;
            }
            localStorage.setItem('Mouvements',mouvements);
        }


        // TOUCHE S ET FLECHE DU BAS //
        else if ((event.keyCode == 83)||(event.keyCode == 40)) {
            directionvertical = 1;
            vertical = 0;
            _posjoueur+=x;
          
            // AUGMENTATION DU NOMBRE DE MOUVEMENT ET DETECTION SI COLISIONS //
            mouvements++;
            update_posjoueur();
            if(collision("s")==true){
                _posjoueur-=x;
                directionvertical=0;
                mouvements--;
            }
            localStorage.setItem('Mouvements',mouvements);
        }


        // TOUCHE Q ET FECHE DE GAUCHE //
        else if ((event.keyCode == 81)||(event.keyCode == 37)) {
            directionhorizontal = -1;
            vertical = 1;
            _posjoueur--;
        
            // AUGMENTATION DU NOMBRE DE MOUVEMENT ET DETECTION SI COLISIONS //
            mouvements++;
            update_posjoueur();
            if(collision("gauche")==true){
                _posjoueur++;
                directionhorizontal=0;
                mouvements--;
            }
            localStorage.setItem('Mouvements',mouvements);
        }


        // TOUCHE D ET FLECHE DE DROITE //
        else if ((event.keyCode == 68)||(event.keyCode == 39)) {
            directionhorizontal = 1;
            vertical = 1;
            _posjoueur++;

            // AUGMENTATION DU NOMBRE DE MOUVEMENT ET DETECTION SI COLISIONS //
            mouvements++;
            update_posjoueur();
            if(collision("droite")==true){
                _posjoueur--;
                directionhorizontal=0;
                mouvements--;
            }
            localStorage.setItem('Mouvements',mouvements);
        }


        // TOUCHE ECHAP POUR POUVOIR QUITTER LE JEU //
        else if ((event.keyCode == 27)) {
            if(confirm('Voulez vous vraiment Quitter ?')){
                window.location.href='./../html/index.html';
                }
        }


        // TOUCHE R POUR POUVOIR RECOMMENCER LE NIVEAU //
        else if ((event.keyCode == 82)) {
            if(confirm('Voulez vous vraiment Recommencer ?')){
                window.location.href='./../html/game.html';
                }
        }
        

        update_posjoueur();
        document.getElementById("mooverecup").innerHTML=`Nombre de déplacements : ${mouvements}`;
//-------------------------------------------------------------------------------------------------------//

update_cases();

// ----------------------------- RECALCUL DE LA POSITION DU PERSONNAGE ---------------------------------------//
if(vertical == 0){
        joueur.style.top = (joueurtop + vitesse * directionvertical) + 'px';
    }
    else joueur.style.left = (joueurleft + vitesse * directionhorizontal) + 'px';

    console.log("/leftpos: " + joueur.style.left + "/toppos: " + joueur.style.left);
    console.log("position joueur : " + _posjoueur);
    


    // RAFRAICHISSEMENT DE LA MAP ET DÉTÉCTION DE PIERRES QUI TOMBENT PAR L'ÉFFET DE LA GRAVITÉ //
    Gravite();
    refreshmap();
    textureloadmap();
    }     

function update_posjoueur(){
    setposjoueur(_posjoueur);}
});

function update_cases(){
    DetectionTerre();
    DetectionDiamant();

// ------------------------------------------------------------------------------------------------------------//

//---------------------------- DETECTION EN CAS DE VICTOIRE DU JOUEUR -------------------------------------------//

if(DetectionVictoire() == true){
    directionvertical = 0;
    directionhorizontal = 0;
    joueurleft = getposXjoueur;
    joueurtop = getposYjoueur;
    mouvements=0;
        }

    }
}

//---------------------------------------------------------------------------------------------------------------//

