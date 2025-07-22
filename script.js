async function fetchGeocodage(adress) {

    const response = await fetch (`https://data.geopf.fr/geocodage/search?q=${adress}`);
    const data = await response.json();
    
console.log(data.features[0].geometry.coordinates);

};

fetchGeocodage("2 rue de la Baignade, 91130 Ris-Orangis");


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