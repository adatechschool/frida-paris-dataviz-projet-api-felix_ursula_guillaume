// // import { searchPage } from "./searchPage.js";
// import { resultPage } from "./resultPage.js";
// // import { informationsPage } from "./informationsPage.js";
// import { APIResult } from "./APIResult.js";
// console.log(APIResult);

// console.log(informationsPage());

let coord = [];

async function searchEngine(adress,rayon) {
    const responseCoord = await fetch(`https://data.geopf.fr/geocodage/search?q=${adress}`);
    const dataCoord = await responseCoord.json();
    coord = dataCoord.features[0].geometry.coordinates;
    let longitude = coord[0];
    let latitude = coord[1];
    const responseCinema = await fetch(`https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records?where=(distance(%60geolocalisation%60%2C%20geom%27POINT(${longitude}%20${latitude})%27%2C%20${rayon}km))&limit=20`);
    const dataCinema = await responseCinema.json();

    console.log (dataCinema);
};

searchEngine('6 rue Jules Béclard, 94410 Saint Maurice',3.5);

// await console.log(coord);

// async function fetchCinemas(){

    
//     const data = await response.json();
// };