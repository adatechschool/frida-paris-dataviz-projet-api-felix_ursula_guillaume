export default resultPage;
import { APIResult } from "./APIResult.js";

  function affichCharge() {
  const conteneur = document.getElementById("chargeDebut");
  const chargement = document.createElement("p");
  chargement.innerText = "Chargement des cinémas à proximité…";
  conteneur.appendChild(chargement);
}
affichCharge();

document.getElementById("chargeDebut").style.display = "none";







