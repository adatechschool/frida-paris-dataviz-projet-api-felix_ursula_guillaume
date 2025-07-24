const input = document.getElementById("address");
const suggestionDiv = document.getElementById("suggestion");
const submit = document.getElementById("submissionBtn");
const radiusCursor = document.getElementById("radius");
const form = document.getElementById("submissionForm");
const resultPage = document.getElementById("resultPage");
const cinemaList = document.getElementById("cinemaList");
const informationsPage = document.getElementById("informationsPage");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    cinemaList.innerHTML = "";
    searchEngine(input.value, radiusCursor.value);
});

async function searchEngine(address, radius) {
    const responseCoord = await fetch(`https://data.geopf.fr/geocodage/search?q=${address}`);
    const dataCoord = await responseCoord.json();

    if (!dataCoord.features || dataCoord.features.length === 0) {
        console.error("Aucune coordonnée trouvée pour cette adresse.");
        return;
    }

    const coord = dataCoord.features[0].geometry.coordinates;
    const longitude = coord[0];
    const latitude = coord[1];

    console.log("Cinémas trouvés à proximité de :", dataCoord.features[0].properties.label);

    const responseCinema = await fetch(
        `https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records?where=(distance(%60geolocalisation%60%2C%20geom'POINT(${longitude}%20${latitude})'%2C%20${radius}km))&limit=20`
    );
    const dataCinema = await responseCinema.json();

    for (const item of dataCinema.results) {
        const button = document.createElement("button");
        button.className = "cinemaButton";
        button.innerHTML = `${item.nom}<br/>${item.adresse}, ${item.commune}`;
        
        button.addEventListener("click", () => {
            informationsPage.innerHTML = `
                <h1 id="InformationsPageTitle">${item.nom}</h1>
                <p><strong>Adresse :</strong> ${item.adresse}, ${item.commune}</p>
                <p><strong>Code postal :</strong> ${item.code_postal || "N/A"}</p>
                <p><strong>Statut :</strong> ${item.statut_etablissement || "N/A"}</p>
            `;
        });

        cinemaList.appendChild(button);
    }
}