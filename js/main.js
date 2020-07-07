/*
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response);
    }
};
request.open("GET", "http://localhost:3000/api/cameras");
request.send();

*/

function getProduits(){
	return new Promise((resolve) => {
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() {
		    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
		        var response = JSON.parse(this.responseText);
		        console.log(response);
		    }
		};
		request.open("GET", "http://localhost:3000/api/cameras");
		request.send();
	});
}

async function showProduits(){
	console.log("test2")
	const produits = await getProduits();
	console.log("test3");
	var bloc_liste_produits = document.etElementById("liste_produits");
	console.log(bloc_liste_produits);
	console.log(produits);

	produits.forEach((produit) => {
		var div_produit = document.createElement("div");
		div_produit.setAttribute("class", "produit");

		var img_produit = document.createElement("img");
		img_produit.setAttribute("class", "produit-image");
		img_produit.setAttribute("src", produit.imageUrl);
		div_produit.appendChild(img_produit);

		var p_produit_nom = document.createElement("p");
		p_produit_nom.setAttribute("class", "produit-nom");
		p_produit_nom.textContent = produit.name;
		div_produit.appendChild(p_produit_nom);

		var p_produit_prix = document.createElement("p");
		p_produit_prix.setAttribute("class", "produit-prix");
		p_produit_prix.textContent = produit.price;
		div_produit.appendChild(p_produit_prix);

		var p_produit_description = document.createElement("p");
		p_produit_description.setAttribute("class", "produit-description");
		p_produit_description.textContent = produit.description;
		div_produit.appendChild(p_produit_description);

		bloc_liste_produits.appendChild(div_produit);
	});

	


}

/*
<div class="produit">
				<img src="" class="produit-image">
				<p class="produit-nom"></p>
				<p class="produit-prix"></p>
				<p class="produit-description"></p>
			</div>
			*/

getProduits();