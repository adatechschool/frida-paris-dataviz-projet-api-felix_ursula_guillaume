const addressInput = document.getElementById("addressInput");
const suggestion = document.getElementById("suggestion");
const userSearchRadius = document.getElementById("userSearchRadius");
const form = document.getElementById("submissionForm");
const cinemaList = document.getElementById("cinemaList");
const resultAddress = document.getElementById("resultAddress");
const searchPage = document.getElementById("searchPage");
const resultPage = document.getElementById("resultPage");
const informationsPage = document.getElementById("informationsPage");
const previousButton = document.getElementById("previousButton");
const loader = document.getElementById("charger");

let currentPage = 1;


function affichCharge() {
    const chargement = document.createElement("p");
    chargement.innerText = "Chargement des cinémas à proximité…";
    loader.appendChild(chargement);
}


form.addEventListener("submit", async (event) => {
    event.preventDefault();
    cinemaList.innerHTML = "";
    informationsPage.innerHTML = "";
    const address = addressInput.value;
    const currentRadius = userSearchRadius.value;

    const coordinates = await getCoordinates(address);
    if (!coordinates) {
        resultAddress.innerText = "Aucune coordonnée trouvée pour cette adresse.";
        return;
    }

    const { userLongitude, userLatitude, label } = coordinates;
    resultAddress.innerText = `Cinémas trouvés à proximité de ${label} :`;

    const cinemas = await getCinema(userLongitude, userLatitude, currentRadius);
    if (cinemas.length === 0) {
        resultAddress.innerText = `Aucun cinéma trouvé à proximité de ${label} dans un rayon de ${currentRadius} km.`;
        return;
    }

    displayCinema(cinemas);
});




async function getCoordinates(address) {
    affichCharge();
    const responseCoord = await fetch(`https://data.geopf.fr/geocodage/search?q=${address}`);
    const dataCoord = await responseCoord.json();

    if (!dataCoord.features || dataCoord.features.length === 0) {
        return null;
    }

    const coord = dataCoord.features[0].geometry.coordinates;
    const userLongitude = coord[0];
    const userLatitude = coord[1];
    const label = dataCoord.features[0].properties.label;

    return { userLongitude, userLatitude, label };
};

async function getCinema(userLongitude, userLatitude, userSearchRadius) {
    const responseCinema = await fetch(
        `https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records?where=(distance(%60geolocalisation%60%2C%20geom%27POINT(${userLongitude}%20${userLatitude})%27%2C%20${userSearchRadius}km))&order_by=distance(%60geolocalisation%60%2C%20geom%27POINT(${userLongitude}%20${userLatitude})%27)%20ASC&limit=20`
    );
    const dataCinema = await responseCinema.json();
    return dataCinema.results;
};

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const haversine =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const triangulationFactor = 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
    return earthRadius * triangulationFactor;
}

function displayCinema(cinemas) {

    currentPage = 2;
    searchPage.style.display = "none";
    resultPage.style.display = "block";
    previousButton.style.display = "block";

    for (const item of cinemas) {
        const button = document.createElement("button");
        button.className = "cinemaButton";
        button.innerHTML = `<strong>${item.nom}</strong><br/>${item.adresse}, ${item.commune}`;
        //${getDistanceFromLatLonInKm(item.userLongitude, item.userLatitude, 48.820877967178234, 2.422979893258561)} km, 

        button.addEventListener("click", () => {
            showCinemaInformations(item);
        });

        cinemaList.appendChild(button);
        informationsPage.style.display = "block";
        ;
    }
    loader.style.display = "none"
}

function showCinemaInformations(cinema) {

    currentPage = 3;
    resultPage.style.display = "none";

    informationsPage.innerHTML = `
        <h2 id="InformationsPageTitle">${cinema.nom}</h2>
        <p>Adresse : ${cinema.adresse}, ${cinema.commune}</p>
        <p>Nombre d'écrans : ${cinema.ecrans}</p>
        <p>Nombre de fauteuils : ${cinema.fauteuils}</p>
        <iframe src="https://data.culture.gouv.fr/explore/embed/dataset/etablissements-cinematographiques/map/?location=18,${cinema.userLatitude},${cinema.userLongitude}&static=true&datasetcard=false&scrollWheelZoom=false" width="600" height="600" frameborder="0"></iframe>
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

addressInput.addEventListener("input", async function () {
    const inputAdded = addressInput.value.trim();

    if (inputAdded.length < 3) {
        suggestion.innerHTML = "";
        return;
    }

    try {
        const response = await fetch(`https://data.geopf.fr/geocodage/search?index=address&q=${encodeURIComponent(inputAdded)}&limit=5`);
        if (!response.ok) throw new Error("Erreur lors de la récupération");
        const data = await response.json();

        suggestion.innerHTML = "";

        if (!data.features || data.features.length === 0) {
            suggestion.innerHTML = "<div>Aucun résultat</div>";
            return;
        }

        data.features.forEach(feature => {
            const newDiv = document.createElement("div");
            newDiv.textContent = feature.properties.label;
            newDiv.style.cursor = "pointer";
            newDiv.addEventListener("click", () => {
                addressInput.value = feature.properties.label;
                suggestion.innerHTML = "";
            });
            suggestion.appendChild(newDiv);
        });
    } catch (error) {
        console.error("Erreur :", error);
        suggestion.innerHTML = "<div>Erreur lors du chargement des suggestions</div>";
    }
});
