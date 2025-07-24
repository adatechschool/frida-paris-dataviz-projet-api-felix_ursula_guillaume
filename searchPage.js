console.log ("js bien chargé")
const input = document.getElementById("address");
const suggestionDiv = document.getElementById("suggestion");

input.addEventListener("input", async function () {
    console.log("Input modifié :", input.value);
    const inputAdded = input.value.trim();

    if (inputAdded.length < 3) {
        suggestionDiv.innerHTML = "";
        return;
    }

    try {
        const response = await fetch(`https://data.geopf.fr/geocodage/search?index=address&q=${encodeURIComponent(inputAdded)}&limit=5`);
        if (!response.ok) throw new Error("Erreur lors de la récupération");
        const data = await response.json();

        suggestionDiv.innerHTML = "";

        if (!data.features || data.features.length === 0) {
            suggestionDiv.innerHTML = "<div>Aucun résultat</div>";
            return;
        }

        data.features.forEach(feature => {
            const newDiv = document.createElement("div");
            newDiv.textContent = feature.properties.label;
            newDiv.style.cursor = "pointer"; // Optionnel, pour montrer que c'est cliquable
            newDiv.addEventListener("click", () => {
                input.value = feature.properties.label;
                suggestionDiv.innerHTML = "";
            });
            suggestionDiv.appendChild(newDiv);
        });
    } catch (error) {
        console.error("Erreur :", error);
        suggestionDiv.innerHTML = "<div>Erreur lors du chargement des suggestions</div>";
    }
});
