const addressInput = document.getElementById("addressInput");
const suggestion = document.getElementById("suggestion");
const radius = document.getElementById("radius");
const form = document.getElementById("submissionForm");
const cinemaList = document.getElementById("cinemaList");
const resultAddress = document.getElementById("resultAddress");
const searchPage = document.getElementById("searchPage");
const resultPage = document.getElementById("resultPage");
const informationsPage = document.getElementById("informationsPage");
const previousButton = document.getElementById("previousButton");

let currentPage = 1;

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    cinemaList.innerHTML = "";
    informationsPage.innerHTML = "";
    const address = addressInput.value;
    const currentRadius = radius.value;

    const coordinates = await getCoordinates(address);
    if (!coordinates) {
        resultAddress.innerText = "Aucune coordonnée trouvée pour cette adresse.";
        return;
    }

    const { longitude, latitude, label } = coordinates;
    resultAddress.innerText = `Cinémas trouvés à proximité de ${label} :`;

    const cinemas = await getCinema(longitude, latitude, currentRadius);
    if (cinemas.length === 0) {
        resultAddress.innerText = `Aucun cinéma trouvé à proximité de ${label} dans un rayon de ${currentRadius} km.`;
        return;
    }

    displayCinema(cinemas);
});

async function getCoordinates(address) {
    const responseCoord = await fetch(`https://data.geopf.fr/geocodage/search?q=${address}`);
    const dataCoord = await responseCoord.json();

    if (!dataCoord.features || dataCoord.features.length === 0) {
        return null;
    }

    const coord = dataCoord.features[0].geometry.coordinates;
    const longitude = coord[0];
    const latitude = coord[1];
    const label = dataCoord.features[0].properties.label;

    return { longitude, latitude, label };
};

async function getCinema(longitude, latitude, radius) {
    const responseCinema = await fetch(
        `https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records?where=(distance(%60geolocalisation%60%2C%20geom'POINT(${longitude}%20${latitude})'%2C%20${radius}km))&limit=20`
    );
    const dataCinema = await responseCinema.json();
    return dataCinema.results;
};

function displayCinema(cinemas) {

    currentPage = 2;
    searchPage.style.display = "none";
    resultPage.style.display = "block";
    previousButton.style.display = "block";

    for (const item of cinemas) {
        const button = document.createElement("button");
        button.className = "cinemaButton";
        button.innerHTML = `${item.nom}<br/>${item.adresse}, ${item.commune}`;

        button.addEventListener("click", () => {
            showCinemaInformations(item);
        });

        cinemaList.appendChild(button);
        informationsPage.style.display = "block";
        ;
    }
};

function showCinemaInformations(cinema) {

    currentPage = 3;
    resultPage.style.display = "none";

    informationsPage.innerHTML = `
        <h2 id="InformationsPageTitle">${cinema.nom}</h2>
        <p>Adresse : ${cinema.adresse}, ${cinema.commune}</p>
        <p>Nombre d'écrans : ${cinema.ecrans}</p>
        <p>Nombre de fauteuils : ${cinema.fauteuils}</p>
        <iframe src="https://data.culture.gouv.fr/explore/embed/dataset/etablissements-cinematographiques/map/?location=18,${cinema.latitude},${cinema.longitude}&static=true&datasetcard=false&scrollWheelZoom=false" width="600" height="600" frameborder="0"></iframe>
    `;
};

function toPreviousPage() {
    previousButton.addEventListener("click", () => {
        if (currentPage === 3) {
            informationsPage.style.display = "none";
            resultPage.style.display = "block";
            currentPage = 2;
        } else if (currentPage === 2) {
            resultPage.style.display = "none";
            previousButton.style.display = "none";
            searchPage.style.display = "block";
            currentPage = 1;
        }
    });
};
toPreviousPage();

/*input.addEventListener("input", async function () {
    const inputAdded = input.value.trim();

    if (inputAdded.length < 3) {
        suggestion.innerHTML = "";
        return;
    }
    try {
        const response = await fetch(`https://data.geopf.fr/geocodage/search?index=address&q=${encodeURIComponent(inputAdded)}&limit=5 `)
        if (!response.ok) throw new Error("Erreur lors de la récupération");
        const data = await response.json();
        suggestion.innerHTML = "";
        data.features.forEach(feature => {
        const newDiv = document.createElement("div");
        newDiv.textContent=feature.properties.label;
        newDiv.addEventListener("click" , () =>{
        input.value = feature.properties.label;
        suggestion.innerHTML="";
        });

        cinemaList.appendChild(button);
    }
});*/