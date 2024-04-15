let ordre = JSON.parse(localStorage.getItem('Ordre'));

if (!ordre) {
    console.log("pas d'ordre")
  ordre = ["Facile", "Normal", "Difficile"];
}

// Récupération de l'élément DOM
const niveauxDiv = document.getElementById('niveaux');

// Remplissage du div avec les éléments de l'ordre
ordre.forEach(niveau => {
  const divNiveau = document.createElement('div');
  divNiveau.classList.add('niveau');
  divNiveau.textContent = niveau;
  niveauxDiv.appendChild(divNiveau);
});
//----------------------------------------------------------------------------------------------------------//

//---------------- CODE POUR ECHANGER DES NIVEAUX DE PLACE DANS L'ORDRE DE PASSAGE -------------------------//

// Récupération des éléments DOM
const niveaux = document.querySelectorAll('.niveau');
const resetButton = document.getElementById('reset');
const deleteButton = document.getElementById('delete');

// Variable pour stocker le niveau précédemment sélectionné
let niveauSelectionne = null;

// Ajout d'un écouteur d'événement à chaque niveau pour les rendre cliquables
niveaux.forEach(niveau => {
  niveau.addEventListener('click', () => {
    // Si aucun niveau n'est sélectionné, mettre à jour le niveau sélectionné
    if (!niveauSelectionne) {
      niveauSelectionne = niveau;
      niveauSelectionne.classList.add('selected');
    } else {
      // Récupérer le parent des niveaux
      const parent = niveau.parentNode;

      // Insérer le niveau sélectionné avant le niveau actuel pour l'échanger de position
      parent.insertBefore(niveauSelectionne, niveau.nextSibling);

      // Réinitialiser le niveau sélectionné
      niveauSelectionne.classList.remove('selected');
      niveauSelectionne = null;
      ordre = Array.from(parent.children).map(n => n.textContent);
      localStorage.setItem('Ordre', JSON.stringify(ordre));
      
    }
    
  });
});

// Écouteur d'événement pour le bouton "Réinitialiser"
resetButton.addEventListener('click', () => {
    // Supprimer tous les niveaux existants
    niveauxDiv.innerHTML = '';
  
    // Ajouter les niveaux "Facile", "Normal" et "Difficile" dans cet ordre
    const niveauxNouveaux = ["Facile", "Normal", "Difficile"];
    niveauxNouveaux.forEach(nomNiveau => {
      const divNiveau = document.createElement('div');
      divNiveau.classList.add('niveau');
      divNiveau.textContent = nomNiveau;
      niveauxDiv.appendChild(divNiveau);
    });
  
    // Mettre à jour le localStorage avec le nouvel ordre
    localStorage.setItem('Ordre', JSON.stringify(niveauxNouveaux));
  });
  
  
  // Variable pour stocker le niveau à supprimer
let niveauASupprimer = null;

// Écouteur d'événement pour le bouton "Supprimer"
deleteButton.addEventListener('click', () => {
  // Activer le mode suppression
  niveauASupprimer = true;
});

// Ajout d'un écouteur d'événement à chaque niveau pour les rendre cliquables
niveaux.forEach(niveau => {
  niveau.addEventListener('click', () => {
    // Si on est en mode suppression et que le niveau est cliqué
    if (niveauASupprimer) {
      // Supprimer le niveau
      niveau.remove();
      // Réinitialiser la variable pour désactiver le mode suppression
      niveauASupprimer = false;
    }
  });
});



//----------------------------------------------------------------------------------------------------------//

//-----------------------------------CODE POUR IMPORTATION D'UN FICHIER TXT ---------------------------------------//

const bouton = document.getElementById("Importation")
var path;
bouton.addEventListener("click",()=>{
    console.log(ordre);
    if(validPath(getVal())){
        path = getVal();
        console.log("Path : " + path);
        ordre.push(path);
        console.log(ordre);
        localStorage.setItem('Mouvements',0);
        sessionStorage.setItem('key', path);
    }
}
);

function getVal() {
    const val = document.querySelector('input').value;
    console.log(val);
    return val;
}

function validPath(value){
if(value.includes(".txt") && value != null){
    console.log("Validé");
    return true;
}
else{return false;}
}
export function getFilePath(){
    return path;
}

//----------------------------------------------------------------------------------------------------------//