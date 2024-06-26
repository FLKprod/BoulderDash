//Clé utile permettant de prendre en parametre un fichier écrit par le client dans charger un niveau//
let data = sessionStorage.getItem('key');
localStorage.setItem('Initialisation',1);
console.log("DATA : " + data);

//Arrays pour images et textures//
var tabTextfile = new Array();
var stoneArray = new Array();

//variables pour initialiser et faire bouger le perso//
var posjoueur,posxjoueur,posyjoueur;
var spawnjoueurx,spawnjoueury;
var joueur = document.getElementById('joueur');
var alive = true;
var tabTextfiletout = [],tabTextfile,tailleTxt = 600,valeurloadtxt;
var compteur = 0;
var compteurX = 0,compteurY = 0, compteurTY = 0;

//initialisation du nombre de diamants et du nombre de mouvements
var totaldiamants;
var diamants=localStorage.getItem('Diamants');
var longueur = 0;
var respawn;
var clock = true;
var niveau=localStorage.getItem('Niveau');
var ordre=JSON.parse(localStorage.getItem('Ordre'));

if(respawn==null){
    respawn=0;
}
var lock = false;

//---------------------------------- CHARGEMENT DES FICHIERS TXT, DES MAPS ----------------------------------------------------------//

//Se déclenche lorsqu'on clique sur "continuer la partie en cours"//
 function continuerpartie(){
    console.log("continuerpartie = " + localStorage.getItem('continuer'))
    if(localStorage.getItem('continuer') == 1){
        console.log("reprise de la partie");
        localStorage.setItem('continuer',0);
        posjoueur = localStorage.getItem('posjoueur');
        return true;
    }
    return false;
}

async function loadtxt(value)
{   
    value=ordre[niveau-1];                          //[niveau-1] car dans un tableau initialisation à 0 et non à 1//
    
    if(value == "custom"){          //Fichier custom choisi par le client//
        fetch('../txt/' + data).then(function(response) {
        response.text().then(function(text) {
        console.log("TXT FILE custom : ");
        tabTextfiletout = text;
        compteur = 0;

        // Compteur sert à mettre seulement les bons characters dans le tableau //
            
        for(var i = 0;i<=tailleTxt;i++){
            if(tabTextfiletout[i] != undefined &&tabTextfiletout[i] != "\r" && tabTextfiletout[i] != "\n" ){
                tabTextfile[compteur] = tabTextfiletout[i];
                compteur++;
            }
        }
        valeurloadtxt = true; 
        
        });
        });
    }

//Sinon fichier facile/normal/difficile etc...
    else{
        fetch('../txt/' + value + '.txt').then(function(response) {
            response.text().then(function(text) {
            tabTextfiletout = text;
            compteur = 0;
                
            for(var i = 0;i<=tailleTxt;i++){
                if(tabTextfiletout[i] != undefined &&tabTextfiletout[i] != "\r" && tabTextfiletout[i] != "\n" ){
                    tabTextfile[compteur] = tabTextfiletout[i];
                    compteur++;
                }
            }
            valeurloadtxt = true;  
            });
            });
        }
        //Attendre que le fetch finisse(que le tableau soit initialisé), puis attendre 1 seconde pour valider la promesse//
        //1 seconde pour être sûr qu'il n'y est pas de bug//
    let promise = new Promise((res) => {
        setTimeout(() => res("Chargement du tableau terminé !"), 1000)
    });
    //Attente jusqu'à ce que la promesse aboutisse//
    await promise; 

       if(valeurloadtxt==true){

        lock = false;
        loadperso();
        
        textureloadmap("generate");
        loadpositionperso(spawnjoueurx,spawnjoueury);
        document.getElementById("diamantsrecup").innerHTML=`Diamants : ${diamants} / ${totaldiamants}`;
        positions_des_pierres();

        clock = true;
        }

}
//-------------------------------------------------------------------------------------------------------//

//---------------------------------- Chargement des textures constituant la map ----------------------------//
    function textureloadmap(value){
        
        longueur = 0;
        deleteemptyelements();
        document.getElementById("mooverecup").innerHTML=`Nombre de déplacements : ${localStorage.getItem('Mouvements')}`;
        document.getElementById("respawn").innerHTML=`Nombre de réaparitions : ${respawn}`;
        document.getElementById("niveau").innerHTML=`Niveau ${niveau}`;
        document.getElementById("Chronometre").innerHTML=`Chrono : ${localStorage.getItem('heure')} h ${localStorage.getItem('minute')} min ${localStorage.getItem('seconde')} s`;
        document.getElementById("diamantsrecup").innerHTML=`Diamants : ${diamants} / ${localStorage.getItem('TotalDiamants')}`;
        for(var k = 0; k < 512;k++){
            var div = document.createElement("div");
            div.style.width = "32px";
            div.style.height = "32px";
            div.id = "block";
        
        
            //detection si tableau = Terre ou Wall etc..//
            if(tabTextfile[k] == "T"){
                div.style.backgroundImage = 'url(../img/dirt.png)';
            }
            else if(tabTextfile[k] == "M"){
                div.style.backgroundImage = 'url(../img/wall.png)';
            }
            else if(tabTextfile[k] == "D"){
                div.style.backgroundImage = 'url(../img/diamant.gif)';
                if(value == "generate"){
                    totaldiamants++;
                }
            }
            else if(tabTextfile[k] == "R"){
                div.style.backgroundImage = 'url(../img/stone.png)';
            }
            else if(tabTextfile[k] == "V"){
                div.style.backgroundImage = 'url(../img/vide.jpg)';
            }
            else if(tabTextfile[k] == "P"){

                //compteurX et compteurY servent à remettre l'image au bon endroit(en accord avec la position du perso)//
                if(value == "generate"){
                    console.log("k : " + k);
                    posjoueur = k;
                    console.log("posjoueur load : " + posjoueur)
                    
                    compteurX += longueur;
                    compteurY += compteurTY;

                    console.log("CompteurX : " + compteurX + " / compteurY : " + compteurY)
                
            }
            
        }
        //permet de mettre un div DANS le div id:"container"//
        document.getElementById("container").appendChild(div);
        ++longueur;
        document.getElementById("diamantsrecup").innerHTML=`Diamants : ${diamants} / ${totaldiamants}`;
        //sauvegarde de la map dans un localStorage//
        localStorage.setItem('tabTextfile',JSON.stringify(tabTextfile))
        //retour à la ligne//
        if(longueur==32){
            var jump = document.createElement("br");
            document.getElementById("container").appendChild(jump);
            longueur=0;
            compteurTY++;
        }
        }
    }
//-------------------------------------------------------------------------------------------------------//

//Permet de voir si data est définie(si le client est passé par importer un niveau)//
function ifgetFilePath(){
    if(data != undefined)
    return true;
    return false;
}


//Chargement dU JEU EN LUI MEME 
window.addEventListener("load", ()=>{
    console.log("premierefois = " + localStorage.getItem('premierefois'))
    if(continuerpartie()!= true){
        if(ifgetFilePath())
            loadtxt("custom");
        else 
            loadtxt(ordre[niveau-1]);
}

//premiere fois que le client clique sur charger une partie, alors il sera dirigé vers une nouvelle partie//
else if(localStorage.getItem('premierefois') == 1) {
    console.log("Premiere fois !")
    localStorage.setItem('premierefois',0)
    if(ifgetFilePath())
        loadtxt("custom");
    else 
        loadtxt(ordre[niveau-1]);
}
else{
    console.log("else..")
    lock = false;
    
    console.log("TABTEXTFILE ELSE : ")
    //sert à enlever les virgules du string, utilisation de balises JSON pour lire le localstorage de tabTextfile//
    enlevervirgule()
    console.log("perso = " + localStorage.getItem('posjoueur')) 
    tabTextfile[localStorage.getItem('posjoueur')] = "P";
    loadperso();
    textureloadmap("generate");
    
    loadpositionperso(spawnjoueurx,spawnjoueury);
    document.getElementById("diamantsrecup").innerHTML=`Diamants : ${diamants} / ${totaldiamants}`;
    positions_des_pierres();
    clock = true;
}

})
//Permet de détecter si le perso est mort, avec un delai de 500ms//
setInterval(Refresh,500)


function enlevervirgule(){
    var compteur = 0;
    for(var i = 0;i<1024;i++){
        if(JSON.parse(localStorage.getItem('tabTextfile'))[i] != ',' && JSON.parse(localStorage.getItem('tabTextfile'))[i] !=undefined && JSON.parse(localStorage.getItem('tabTextfile'))[i] !=null){
            tabTextfile[compteur]=JSON.parse(localStorage.getItem('tabTextfile'))[i]
            compteur++;
        }
    }
}

function Refresh(){
    if(clock)
        Joueurenvie();
}

// ------------------- DETECTION DE DIFFÉRENT BLOCS ET CHANGEMENTS DE TEXTURES NÉCÉSAIRES ---------------------------//
function DetectionTerre(){
    if(tabTextfile[posjoueur] == "T"){
        tabTextfile[posjoueur] = "V";
    }
}
function DetectionDiamant(){
    if(tabTextfile[posjoueur] == "D"){
        tabTextfile[posjoueur] = "V";
        diamants++;
        localStorage.setItem('Diamants',diamants);
        document.getElementById("diamantsrecup").innerHTML=`Diamants : ${diamants} / ${totaldiamants}`;
       
    }
}

//-------------------------------------------------------------------------------------------------------//

// DETECTION EN CAS DE VICTOIRE //
function DetectionVictoire(){
    if(totaldiamants===diamants){
        
        if(niveau===ordre.length){           //Fin du jeu//
            alert("Bravo ! Vous avez termine tous les niveaux !")
        }
        //passage au niveau suivant//
        else{
            
            alive=false;
            niveau++;
            Joueurenvie();
            return true;
        }
    }
}

// -------------------------- FONCTION SIMULANT LA GRAVITÉ POUR FAIRE TOMBER LES PIERRES ---------------------------//
export async function Gravite()
{
    for(var k = 0; k < stoneArray.length;k++){
            ecrase(k);
        if(tabTextfile[stoneArray[k]+32] == "V"){
                if((stoneArray[k]+32) != posjoueur){
                    tabTextfile[stoneArray[k]+32] = "R";
                    tabTextfile[stoneArray[k]] = "V";
                stoneArray[k]+=32;
      }
    }
}
}
//Fonction permettant de mettre dans un Array les Rochers//
//Pour que par la suite il soit utilisé pour la détection de collision//

function positions_des_pierres()
{
    var placement = 0;
    for(var i = 0;i<512;i++)
    {
        if(tabTextfile[i] == "R"){
            stoneArray[placement] = i;
            placement++;
        }   
    }
}
//-------------------------------------------------------------------------------------------------------//

// Chargement et affichage de la position du personnage //
async function loadpositionperso(valspawnx,valspawny){
    
    if(compteurX != 0 && compteurY != 0){
        valspawnx = compteurX;
        valspawny = compteurY;
        joueurleftposAbsolute = 0;
        joueurtopposAbsolute = 0;
    }
    else{
        var joueurleftposAbsolute = joueur.offsetLeft;
        var joueurtopposAbsolute = joueur.offsetTop;
        
    }
        // prend les cotes "left" et "top" de l'image joueur //
        
        posxjoueur=joueurleftposAbsolute + 32*valspawnx;
        posyjoueur=joueurtopposAbsolute + 32*valspawny;
        
        tabTextfile[posjoueur] = 'V';
        joueur.style.left = (posxjoueur)+ 'px';
        joueur.style.top = (posyjoueur)+ 'px';
        console.log("position joueur : " + posxjoueur + " / " + posyjoueur + " et pos : " + posjoueur);
}
    

// --------------------------------- DETECTION DE COLISION ENTRE LE PERSONNAGE ET UN MUR OU UNE PIERRE ---------------------------- //
function collision(valeur){
    //SI COLLISION ALORS RETURN TRUE, SINON FALSE//
    if(tabTextfile[posjoueur] == "M"){
        console.log("collision avec MUR"); 
        return true;
    }
    else if(tabTextfile[posjoueur] == "R"){
        console.log("collision avec STONE");
        if(valeur == "left" || valeur == "right"){

        for(var k = 0; k < stoneArray.length;k++){
            //valeur pour 1 CAILLOU//
            var p;
            
            if(posjoueur == stoneArray[k]){
                p = k;
                break;
            }
        }
        if(valeur == "right"){
            //POUSSER LE CAILLOUX VERS LA DROITE//
           
            if((tabTextfile[stoneArray[p]+1] == "V") && (posjoueur == stoneArray[p])){
                console.log("VIDE A DROITE DE CAILLOU");
                tabTextfile[stoneArray[p]+1] = "R";
                tabTextfile[stoneArray[p]] = "V";
                
                stoneArray[p]++;
                return false;
        }
    }
        if(valeur == "left"){
            //POUSSER LE CAILLOUX VERS LA GAUCHE//
            
            if((tabTextfile[stoneArray[p]-1] == "V") && (posjoueur == stoneArray[p])){
                console.log("VIDE A GAUCHE DE CAILLOU");
                tabTextfile[stoneArray[p]-1] = "R";
                tabTextfile[stoneArray[p]] = "V";
                
                stoneArray[p]--;
                return false;
            }
        }
    }

     return true;
    }
    else return false;
}

//-------------------------------------------------------------------------------------------------------//

//Cette fonction permet d'effacer le joueur/la map/et le tableau associé à la map//
function touteffacer()
{
    console.log("effaceeeeeeeeee");
    localStorage.setItem('tabTextfile','')
    tabTextfile = []; 
    refreshmap();
    refreshplayer();
    
    
    
      
}
//Ces 2 fonctions permettent respectivement d'effacer le joueur pour le placer ailleurs, et l'effacement de la map//
function refreshplayer()
{
    //Detection du parent container//
    var newplayer = document.getElementById('joueur');
    var firstnewplayerchild = newplayer.firstElementChild;
    while(firstnewplayerchild){
        firstnewplayerchild.remove();
        firstnewplayerchild = newplayer.firstElementChild;
    }
    
}

function refreshmap(){
    //Detection du parent container//
    var block = document.getElementById('container');
    var firstblockchild = block.firstElementChild; 
   while(firstblockchild){
        firstblockchild.remove();
        firstblockchild = block.firstElementChild;
   }
   textureloadmap("");
}



// Chargement du Personnage et initialisation des valeurs//
function loadperso(){
   //permet de faire loadperso UNE SEULE FOIS PAR PARTIE//
   if(lock == false){
    alive = true;
    posjoueur = 0;
    posxjoueur = 0;
    posyjoueur = 0;
    diamants = 0;
    totaldiamants = 0;
    compteurX = 0;
    compteurY = 0;
    compteurTY = 0;
    var div = document.createElement("div");
    div.style.width = "32px";
    div.style.height = "32px";
    div.style.backgroundImage = 'url(../img/perso.gif)';
    document.getElementById("joueur").appendChild(div);
    lock = true;
}
}

// ---------------------------------------------- FONCTION POUR VÉRIFIER SI LE PERSONNAGE EST TOUJOURS EN VIE ----------------------------------//
function Joueurenvie(){
    if(alive == false)
    {
        clock = false;
        lock = false;
        touteffacer();
        tabTextfile = []; 
        

        


        respawn++;
        localStorage.setItem('respawn',respawn);
        localStorage.setItem('Mouvements',0);
        
        loadtxt(ordre[niveau-1]);
        // Sélection de tous les éléments div à l'intérieur du conteneur
        const container = document.getElementById('container');

        deleteemptyelements()

        
    }

}
function ecrase(valeur)
{
    //DETECTION SUR TOUS LES Y DE LA MAP//
    //SI le joueur n'est pas JUSTE en DESSOUS de la pierre (ET que il n'y a QUE du vide en dessous de la pierre ( au moins 2 blocs ))
    //Alors le Joueur est mort //
    
            var p;
            
    for(var largeurmap = 2; largeurmap <= 20;largeurmap++)
            {
                if(posjoueur == stoneArray[valeur]+32*largeurmap){
                    p = valeur;
                }
                if(((stoneArray[p]+32*largeurmap) == posjoueur)&&((tabTextfile[stoneArray[p]+32*largeurmap]) == "V") &&((tabTextfile[stoneArray[p]+32]) =="V")){
                alive = false;
                }
            }
}


// ------------------------- DIFFÉRENTS GETTERS ET SETTERS UTILES AU PROGRAMME -----------------------------------------//

function setposjoueur(value){
    posjoueur = value;
    localStorage.setItem('posjoueur',posjoueur);
}

function getPosjoueur(){
    return posjoueur;
}

function getposXjoueur(){
    return posxjoueur;
}

function getposYjoueur(){
    return posyjoueur;
}

export function deleteemptyelements(){
    // Sélection de tous les éléments div à l'intérieur du conteneur
    const container = document.getElementById('container');

    // Sélection de tous les éléments div à l'intérieur du conteneur
    const divs = container.querySelectorAll('div');

    // Suppression des 512 premières divs
    for (let i = 0; i < 512 && i < divs.length; i++) {
        // Suppression de la première div à chaque itération
        divs[i].remove();
        console.log("div deleted")
    }

    // Sélection de tous les éléments div à l'intérieur du conteneur
    const brs = container.querySelectorAll('br');

    // Suppression des 512 premières divs
    for (let i = 0; i < 16 && i < divs.length; i++) {
        // Suppression de la première div à chaque itération
        brs[i].remove();
        console.log("line deleted")
    }
}

//----------------------------------------------------------------------------------------------------------------------//

export{collision,DetectionTerre,DetectionDiamant,DetectionVictoire,refreshmap,refreshplayer,Joueurenvie,textureloadmap}
export {setposjoueur,getPosjoueur,getposXjoueur,getposYjoueur,loadpositionperso}