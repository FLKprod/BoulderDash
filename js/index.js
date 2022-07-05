// ----------------------- COMMENCEMENT D'UNE NOUVELLE PARTIE ---------------------------------------------------------//

const nouvellegame = document.getElementById("Nouvellegame")
nouvellegame.addEventListener("click",()=>{
   window.location.href='game.html';

    // INITIALISATION DES DIFFÉRENTES VARIABLES POUR UNE NOUVELLE PARTIE //
    localStorage.setItem('respawn',0);
    localStorage.setItem('Mouvements',0);
    localStorage.setItem('Diamants',0);
    localStorage.setItem('temps',0);
    localStorage.setItem('heure',0);
    localStorage.setItem('seconde',0);
    localStorage.setItem('minute',0);
    localStorage.setItem('Niveau',1);
    localStorage.setItem('premierefois',0)
});

//-------------------------------------------------------------------------------------------------------------------//

// ------------------------------ REPRISE DE LA PARTIE EN COURS -----------------------------------------------------//
const continuergame = document.getElementById("Continuergame")
continuergame.addEventListener("click",()=>{
    //'continuer' sert à faire la détection si le client clique sur "continuer la partie en cours"//
    localStorage.setItem('continuer',1);
    console.log("continuergame : " + localStorage.getItem('continuer'))
    window.location.href='game.html';
    //'premierefois' sert à faire la détection si c'est la premiere foid que le client clique sur ce bouton//
    //Alors il sera rediriger comme si il lançait une nouvelle partie//
    if(localStorage.getItem('premierefois') == 1)
    localStorage.setItem('premierefois',0)
    // INITIALISATION DES DIFFÉRENTES VARIABLES POUR UNE NOUVELLE PARTIE //
    localStorage.setItem('respawn',0);
    localStorage.setItem('Mouvements',0);
    localStorage.setItem('Diamants',0);
    localStorage.setItem('temps',0);
    localStorage.setItem('heure',0);
    localStorage.setItem('seconde',0);
    localStorage.setItem('minute',0);
    localStorage.setItem('Niveau',1);
    
});

//---------------------------------------------------------------------------------------------------------------------------//

// --------------------------- GESTION DES AUTRES BOUTONS CONSTITUANT LE MENU PRINCIPAL --------------------------//

const niveau = document.getElementById("Niveaux")
niveau.addEventListener("click",()=>{
    window.location.href='niveaux.html';
});

const regles = document.getElementById("Regles")
regles.addEventListener("click",()=>{
    window.location.href='regles.html';
});

const editor = document.getElementById("Editeur")
editor.addEventListener("click",()=>{
    window.location.href='editeur.html';
});

//--------------------------------------------------------------------------------------------------------------------------//