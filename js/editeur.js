//-------------------------- CODE POUR RETOURNER AU MENU PRINCIPAL --------------------------------------//
/* Nous avons dù utiliser history.back car la commande window.location.href='./../html/index.html' n'étais
    opérationnelle*/

const retourmenu = document.getElementById("Retourmenu")
retourmenu.addEventListener("click",()=>{
    history.back();
});

//------------------------------------------------------------------------------------------------------//

// ------------------------- CODE POUR RÉINITIALISER LE CONTENU DE LA TEXTAREA A CELLE DE DEPART----------------//

const reecrire = document.getElementById("Reinitialisation")
reecrire.addEventListener("click",()=>{
    confirm("Reinitialisation du fichier");
});

//-------------------------------------------------------------------------------------------------------------------//

//------------------------------- CODE POUR POUVOIR ENREGISTER ET TELECHARGER NOTRE TEXTAREA ÉDITÉE ------------------------//
const save = document.getElementById("Sauvegarde")
save.addEventListener("click",()=>{
    fichieredit="";
    fichier=document.forms["editeur"].txtedit.value;
    var p=0;
    // Sauts de ligne indispensables pour la lecture du fichier.txt //
    for(var i=0;i<fichier.length;i++){
        if(i%32==0 && i!=0){
            fichieredit+='\n';
            fichieredit+=fichier[i];        
        }
        else{
            fichieredit+=fichier[i];
        }
        if(fichier[i]=="P"){
            p++;
        }
    }
    if(p!=1){
        alert("Vous n'avez pas un seul et unique P dans votre zone de texte.\n Veuillez faire les modifications nécésaires et réessayer")
    }
    else{
    localStorage.setItem('Editeur',fichieredit);

    // Sauvegarde du fichier (téléchargement de ce dernier //
    var element=document.createElement('a');
    element.setAttribute('href','data:text/plain;charsef=utf-8,'+encodeURIComponent(fichieredit));
    element.setAttribute('download','FichierCree.txt');
    element.style.display="none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    alert("Fichier sauvegardé avec succés");
    var ordre=Array();
    ordre=JSON.parse(localStorage.getItem('Ordre'));
    ordre.push(toString(fichieredit));
    console.log(ordre);
    localStorage.setItem('Ordre',JSON.stringify(ordre));
    history.back();
    }
});

//-------------------------------------------------------------------------------------------------------------------//
