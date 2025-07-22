export default resultPage;

  function affichCharge() {
  const conteneur = document.getElementById("chargeDebut");
  const chargement = document.createElement("p");
  chargement.innerText = "Chargement des cinémas à proximité…";
  conteneur.appendChild(chargement);
}
affichCharge();


fetch('APIResult.json')
  .then(response => response.json())
  .then(data => {
    console.log(typeof data);
    // suite du code avec les données
  });



// function afficheListe(indice) {
//     data.innerText = Quiz[indice].question;
   
// }


    const offres = document.getElementById("resultPage")
    for (let i = 0; i < data.length; i++) {
    let titre = document.createElement("h2");
    let description = document.createElement("p2");

    titre.innerHTML = data[i].titre;
    description.innerHTML = data[i].description;

    offres.appendChild(titre);
    offres.appendChild(description);
}
document.getElementById("chargeDebut").style.display = "none";
document.getElementById("chargeDebut").innerHTML = "";