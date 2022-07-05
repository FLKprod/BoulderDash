// ----------------------- COMMENCEMENT D'UNE NOUVELLE PARTIE ---------------------------------------------------------//

const nouvellegame = document.getElementById("Nouvellegame")
nouvellegame.addEventListener("click",()=>{
    window.location.href='game.html';
    localStorage.setItem('respawn',0);
    localStorage.setItem('Mouvements',0);
    localStorage.setItem('Diamants',0);;
    localStorage.setItem('temps',0);
    localStorage.setItem('heure',0);
    localStorage.setItem('seconde',0);
    localStorage.setItem('minute',0);
});

//-------------------------------------------------------------------------------------------------------------------//

// ------------------------------ REPRISE DE LA PARTIE EN COURS -----------------------------------------------------//

const continuergame = document.getElementById("Continuergame")
continuergame.addEventListener("click",()=>{
    window.location.href='game.html';
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