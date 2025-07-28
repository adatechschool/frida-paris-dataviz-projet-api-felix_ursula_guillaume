const cinemaList = document.getElementById("cinemaList");
const searchPage = document.getElementById("searchPage");
const resultPage = document.getElementById("resultPage");
const informationsPage = document.getElementById("informationsPage");
const previousButton = document.getElementById("previousButton");

export function displayCinema(cinemas) {
    currentPage = 2;
    searchPage.style.display = "none";
    loader.style.display = "none";
    informationsPage.style.display = "none";
    resultPage.style.display = "block";
    previousButton.style.display = "block";


    for (const item of cinemas) {
        const button = document.createElement("button");
        button.className = "cinemaButton";
        button.innerHTML = `<strong>${item.nom}</strong><br/>${item.adresse}, ${item.commune}`;
        //${getDistanceFromCoordInKm(item.userLongitude, item.userLatitude, 48.820877967178234, 2.422979893258561)} km, 

        button.addEventListener("click", () => {
            showCinemaInformations(item);
        });

        cinemaList.appendChild(button);
    };
};
