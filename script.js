const input = document.getElementById("address");
const suggestionDiv = document.getElementById("suggestion");
const submit = document.getElementById("submissionBtn");
const radiusCursor = document.getElementById("radius");
const form = document.getElementById("submissionForm");
const resultPage = document.getElementById("resultPage");
const cinemaList = document.getElementById("cinemaList");
const button = document.getElementById("btn")

form.addEventListener("submit", (event) => {
    event.preventDefault();
    cinemaList.innerHTML = "";
    searchEngine(input.value, 2);
});

async function searchEngine(address, radius) {
    const responseCoord = await fetch(`https://data.geopf.fr/geocodage/search?q=${address}`);
    const dataCoord = await responseCoord.json();
    await console.log("voici les cinémas trouvés à proximité de l'adresse :", dataCoord.features[0].properties.label);
    let coord = dataCoord.features[0].geometry.coordinates;
    let longitude = coord[0];
    let latitude = coord[1];
    const responseCinema = await fetch(`https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records?where=(distance(%60geolocalisation%60%2C%20geom%27POINT(${longitude}%20${latitude})%27%2C%20${radius}km))&limit=20`);
    const dataCinema = await responseCinema.json();
    console.log(dataCinema);
    for (const item of dataCinema.results) {
        cinemaList.innerHTML += `<li>${item.nom}<br />
        ${item.adresse}, ${item.commune}<br />
        <br>
        </li>`;
    }

    // for (let i = 0; i < dataCinema.results.length; i++) {
    //     const cinema = dataCinema.results[i];
    //     cinemaList.innerHTML += `<li>
    //     <button id= "btn"></button>
    //     <strong>${cinema.nom}</strong><br />
    //     ${cinema.adresse}, ${cinema.commune}<br />
    //     <br>
    //     </li>`;
    // }
};

function afficherPageInfo() {
    button.addEventListener("click", () => {
        document.getElementById("informationsPage").style.display = "block";
        document.getElementById("resultPage").style.display = "none";
    })
}
afficherPageInfo()


/*input.addEventListener("input", async function () {
    const inputAdded = input.value.trim();

    if (inputAdded.length < 3) {
        suggestionDiv.innerHTML = "";
        return;
    }
    try {
        const response = await fetch(`https://data.geopf.fr/geocodage/search?index=address&q=${encodeURIComponent(inputAdded)}&limit=5 `)
        if (!response.ok) throw new Error("Erreur lors de la récupération");
        const data = await response.json();
        suggestionDiv.innerHTML = "";
    data.features.forEach(feature => {
        const newDiv = document.createElement("div");
        newDiv.textContent=feature.properties.label;
        newDiv.addEventListener("click" , () =>{
        input.value = feature.properties.label;
        suggestionDiv.innerHTML="";
        });
        suggestionDiv.appendChild(div);
    });
    }
    catch (error) {
        console.error("Erreur :", error);
        suggestionDiv.innerHTML = "<div>Erreur lors du chargement des suggestions</div>";
    }
});*/