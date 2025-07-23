const input = document.getElementById("addresse");
const suggestionDiv = document.getElementById("suggestion")

input.addEventListener("input", async function () {
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
        inputAdded.value = feature.properties.label;
        suggestionDiv.innerHTML="";
        });
        suggestionDiv.appendChild(div);
    });
    }
    catch (error) {
        console.error("Erreur :", error);
        suggestionDiv.innerHTML = "<div>Erreur lors du chargement des suggestions</div>";
    }
});