export function informationsPage() {

    const informationsPage = document.querySelector("#informationsPage");

    informationsPage.innerHTML += `<h1 id="InformationsPageTitle">${APIResult.results[0].nom}</h1>`;

    informationsPage.innerHTML += `<h2 InformationsPageAddress>${APIResult.results[0].adresse}, ${APIResult.results[0].commune}</h2>`;

    informationsPage.innerHTML += `<ul><li>${APIResult.results[0].fauteuils} fauteuils</li><li>${APIResult.results[0].ecrans} écran(s)</li></ul>`;

    informationsPage.innerHTML += `<iframe src="https://data.culture.gouv.fr/explore/embed/dataset/etablissements-cinematographiques/map/?location=15,${APIResult.results[0].latitude},${APIResult.results[0].longitude}&static=true&datasetcard=false&scrollWheelZoom=false" width="600" height="600" frameborder="0"></iframe>`;


    informationsPage.innerHTML += ``;
    informationsPage.innerHTML += ``;
    informationsPage.innerHTML += ``;

};