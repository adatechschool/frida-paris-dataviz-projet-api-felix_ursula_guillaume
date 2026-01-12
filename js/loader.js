const loader = document.getElementById("loader");

export function displayLoader() {

    loader.innerHTML = "";
    const loading = document.createElement("p");
    loading.innerText = "Chargement des cinémas à proximité…";
    loader.appendChild(loading);
}