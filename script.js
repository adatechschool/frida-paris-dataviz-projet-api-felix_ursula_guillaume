// import { searchPage } from "./searchPage.js";
import { resultPage } from "./resultPage.js";
// import { informationsPage } from "./informationsPage.js";
import { APIResult } from "./APIResult.js";
console.log(APIResult);

const informationsPage = document.querySelector("#informationsPage");
const statList = document.querySelector("#statList");


informationsPage.innerHTML += `<h1 id="InformationsPageTitle">${APIResult.results[7].nom}</h1>`;

informationsPage.innerHTML += `<h2 InformationsPageAddress>${APIResult.results[7].adresse}, ${APIResult.results[7].commune}</h2>`;

statList.innerHTML += `<li>${APIResult.results[7].fauteuils} fauteuils</li>`;
statList.innerHTML += `<li>${APIResult.results[7].ecrans} écran(s)</li>`;

// informationsPage.innerHTML += `<iframe src="https://data.culture.gouv.fr/explore/embed/dataset/etablissements-cinematographiques/map/?location=15,${APIResult.results[7].latitude},${APIResult.results[7].longitude}&static=true&datasetcard=false&scrollWheelZoom=false" width="600" height="600" frameborder="0"></iframe>`;


informationsPage.innerHTML += ``;
informationsPage.innerHTML += ``;
informationsPage.innerHTML += ``;



// async function fetchGeocodage(adress) {

//     const response = await fetch(`https://data.geopf.fr/geocodage/search?q=${adress}`);
//     const data = await response.json();

//     console.log(data.features[0].geometry.coordinates);
// };

// on attend Vi pour cette section
// const expandArea = (latitude, longitude ) => {
//     const chosenDistance = 0.0134;

//     const latitudeMoins = latitude - chosenDistance;
//     const latitudePlus = latitude + chosenDistance;
//     const longMoins = longitude - chosenDistance;
//     const longPlus = longitude + chosenDistance;

//     return [longPlus, longMoins, latitudePlus, latitudeMoins];
// };

// console.log(expandArea(48.87393997249049, 2.358557443188446));