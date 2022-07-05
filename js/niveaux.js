// INITIALISATION DE L'ORDRE DE PASSAGE DE CHAQUE NIVEAU LORSQUE NOUS ARRIVONS SUR LA PAGE //
alert("ATTENTION ! L'ordre a été réinitialisé !")
var ordre=new Array();
ordre.push("facile");
ordre.push("normal");
ordre.push("difficile");
console.log(ordre);
localStorage.setItem('Ordre',JSON.stringify(ordre));


//---------------- CODE POUR VOIR L'ORDRE DE PASSAGE DES NIVEAUX -----------------------------------------//

const voir = document.getElementById("Voir")
voir.addEventListener("click",()=>{
    alert("Voici l'ordre de passage des niveaux: \n "+ordre);
});
//----------------------------------------------------------------------------------------------------------//

//---------------- CODE POUR ECHANGER DES NIVEAUX DE PLACE DANS L'ORDRE DE PASSAGE -------------------------//

const echange = document.getElementById("Echanger")
echange.addEventListener("click",()=>{
    var reponse1 = window.prompt("Selectionnez un des 2 niveaux que vous voulez echanger ", "Entrer le niveau du niveau");
    var reponse2 = window.prompt("Selectionnez l'autre niveau", "Entrer le niveau du niveau");
    console.log("F1:" +reponse1 + " / F2:"+ reponse2);
    if((reponse1>0)&&(reponse2>0)&&(reponse1<=ordre.length)&&(reponse2<=ordre.length)){
        var sauvegarde=ordre[reponse1-1];
        console.log("SAV : " + sauvegarde);
        ordre[reponse1-1]=ordre[reponse2-1];
        ordre[reponse2-1]=sauvegarde;
        console.log(ordre);
        localStorage.setItem('Ordre',JSON.stringify(ordre));
        alert('Echange des deux niveaux éfféctué avec succés \n Voici le nouvel ordre : \n'+ordre);
    }
    else{
        alert('ERROR : Les 2 numéros de niveaux ne sont pas valables. \n Aucun changement éfféctué');
    }
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

//--------------- CODE POUR REINITIALISER L'ODRE DE PASSAGE DES NIVEAUX A CELUI DE BASE DU JEU --------------//

const reini = document.getElementById("Reinitialisation")
reini.addEventListener("click",()=>{
    ordre.splice(0, ordre.length);
    console.log(ordre);
    ordre.push("facile");
    ordre.push("normal");
    ordre.push("difficile");
    localStorage.setItem('Ordre',JSON.stringify(ordre));
    alert('Ordre de passage des niveaux réinitialisée avec succés.\n Voici le nouvel ordre : \n'+ordre);
});

//----------------------------------------------------------------------------------------------------------//

//----------- CODE POUR SUPPRIMER UN NIVEAU DE L'ORDRE DE PASSAGE DES NIVEAUX ------------------------------//

const sup = document.getElementById("Supression")
sup.addEventListener("click",()=>{
    var reponse = window.prompt("Quel niveau voulez vous supprimer ?", "Entrer le niveau du niveau");
    if(reponse){
        if(reponse==1){
            ordre.shift();
            alert(`Le niveau 1 a été supprimé avec succés.\n Voici le nouvel ordre : \n`+ordre);
            localStorage.setItem('Ordre',JSON.stringify(ordre));
        }
        else if(reponse>ordre.length){
            alert('ERROR : Numero de niveau non valable');
        }
        else{
        ordre.splice(reponse-1,reponse-1);
        alert(`Le niveau ${reponse} a été supprimé avec succés.\n Voici le nouvel ordre : \n`+ordre);
        localStorage.setItem('Ordre',JSON.stringify(ordre));
        }
    }
});

//----------------------------------------------------------------------------------------------------------//