async function searchEngine(adress, rayon) {
    const responseCoord = await fetch(`https://data.geopf.fr/geocodage/search?q=${adress}`);
    const dataCoord = await responseCoord.json();

    await console.log("voici les cinémas trouvés à proximiuté de l'adresse :", dataCoord.features[0].properties.label);
    let coord = dataCoord.features[0].geometry.coordinates;
    let longitude = coord[0];
    let latitude = coord[1];
    const responseCinema = await fetch(`https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records?where=(distance(%60geolocalisation%60%2C%20geom%27POINT(${longitude}%20${latitude})%27%2C%20${rayon}km))&limit=20`);
    const dataCinema = await responseCinema.json();
    console.log(dataCinema);
};

searchEngine('', 2);

