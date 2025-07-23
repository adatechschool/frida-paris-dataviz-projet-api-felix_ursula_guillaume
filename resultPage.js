// export default resultPage;
import { APIResult } from "./APIResult.js";

//   function affichCharge() {
//   const conteneur = document.getElementById("chargeDebut");
//   const chargement = document.createElement("p");
//   chargement.innerText = "Chargement des cinémas à proximité…";
//   conteneur.appendChild(chargement);
// }
// affichCharge();

// document.getElementById("chargeDebut").style.display = "none";


function cinemaList() {
  const resultPage = document.getElementById("resultPage");
  resultPage.innerHTML = '<h1 id=Titre>Voici les cinémas autour de chez toi</h1>';

  const cinemaList = document.getElementById("cinemaList");
    for (let i = 0; i < APIResult.results.length; i++) {
    const cinema = APIResult.results[i];

    

    cinemaList.innerHTML += `<li>
        <button id= "btn"></button>
        <strong>${cinema.nom}</strong><br />
        ${cinema.adresse}, ${cinema.commune}<br />
        <br>
        </li>`;
  }
}

cinemaList();

const button = document.getElementById("btn")

function afficherPageInfo(){
 button.addEventListener("click", () => {
  document.getElementById("informationsPage").style.display = "block";
  document.getElementById("resultPage").style.display = "none";
 })
}
afficherPageInfo()




