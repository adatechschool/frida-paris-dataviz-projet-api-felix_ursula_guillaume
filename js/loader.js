const loader = document.getElementById("charger");

export function displayLoader() {
    const chargement = document.createElement("p");
    chargement.innerText = "Chargement des cinémas à proximité…";
    loader.appendChild(chargement);
}