const input= document.getElementById ("adresse");
const suggestionDiv= document.getElementById("suggestion")
 
input.addEventListener("input", async function(){
    const inputAdded = input.value.trim();
    
    if (inputAdded.length <3) {
        suggestionDiv.innerHTML="";
        return;
    }
    try{
        const response = await fetch(`https://data.geopf.fr/geocodage/search?index=address&q=${encodeURIComponent(inputAdded)}&limit=5 `)
   if(!response.ok) throw new Error("Erreur lors de la récupération");
const data= await response.json();
suggestionDiv.innerHTML="";
    }
})