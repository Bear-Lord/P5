showProduits();

/* Affiche la liste et les informations de tous les produits pour la page index.html */
async function showProduits(){
	const produits = await getProduits("");
	let bloc_liste_produits = document.getElementById("liste_produits");
	console.log(bloc_liste_produits);
	console.log(produits);

	/* pour chaque produit, affiche les blocs contenant ses informations en HTML */
	produits.forEach((produit) => {		

		let div_produit = document.createElement("div");
		div_produit.setAttribute("class", "produit");


		let div_produit_img = document.createElement("div");
		div_produit_img.setAttribute("class", "produit-left-part");
		div_produit.appendChild(div_produit_img);

		let a_img_produit = document.createElement("a");
		a_img_produit.setAttribute("href", "produit.html?id="+produit._id);

		let img_produit = document.createElement("img");
		img_produit.setAttribute("class", "produit-image");
		img_produit.setAttribute("src", produit.imageUrl);
		a_img_produit.appendChild(img_produit);

		div_produit_img.appendChild(a_img_produit);

		let div_produit_text = document.createElement("div");
		div_produit_text.setAttribute("class", "produit-right-part");
		div_produit.appendChild(div_produit_text);



		let a_p_produit_nom = document.createElement("a");
		a_p_produit_nom.setAttribute("href", "produit.html?id="+produit._id);
		a_p_produit_nom.textContent = produit.name;

		let p_produit_nom = document.createElement("p");
		p_produit_nom.setAttribute("class", "produit-nom");
		
		p_produit_nom.appendChild(a_p_produit_nom);

		div_produit_text.appendChild(p_produit_nom);

		let p_produit_prix = document.createElement("p");
		p_produit_prix.setAttribute("class", "produit-prix");
		p_produit_prix.textContent = "Prix : "+(produit.price/100)+" €";
		div_produit_text.appendChild(p_produit_prix);

		let p_produit_description = document.createElement("p");
		p_produit_description.setAttribute("class", "produit-description");
		p_produit_description.textContent = produit.description;
		div_produit_text.appendChild(p_produit_description);

		bloc_liste_produits.appendChild(div_produit);

	});
}