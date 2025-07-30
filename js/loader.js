const loader = document.getElementById("loading");

export function displayLoader() {
    loader.innerHTML = "";
    const loading = document.createElement("p");
    loading.innerText = "Chargement des cinémas à proximité…";
    loader.appendChild(loading);
}