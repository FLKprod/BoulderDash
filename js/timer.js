//--------------------- FONCTION CALCULANT LE TEMPS DE LA PARTIE EN COURS -----------------------------------------------------------------------------------------------------------------//

// Ce Timer se réinitialise seulement quand le joueur demarre une nouvelle partie //

var temps=localStorage.getItem('temps');
var minute=localStorage.getItem('minute');
var seconde=localStorage.getItem('seconde');
var heure=localStorage.getItem('heure');
export function Timer(){
    temps++;
    while(temps-60>=0){
        temps-=60;
        if(minute==59){
            heure++
            minute=0;
        }
        else{minute++;}
    }
    seconde=temps;
    localStorage.setItem('minute',minute);
    localStorage.setItem('heure',heure);
    localStorage.setItem('seconde',seconde);
    localStorage.setItem('temps',temps);
    document.getElementById("Chronometre").innerHTML=`Chrono : ${localStorage.getItem('heure')} h ${localStorage.getItem('minute')} min ${localStorage.getItem('seconde')} s`;
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//