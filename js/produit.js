showProduit();

/* récupère l'id du produit dans l'URL d'une page produit.html */
function getIdProduit(){
	/* cette fonction récupère l'URL à partir du ? et substring enlève 4 caractères pour ne récupérer que l'id après le = */
	return window.location.search.substring(4);
}

/* Affiche les informations d'un produit pour la page produit.html */
async function showProduit(){
	let idProduit = getIdProduit();

	/* récupère le produit avec l'id récupéré via l'API */
	let produit = await getProduits(idProduit);

	/* si l'id ne correspond à aucun produit existant, le JSON renvoit un objet vide, donc on affiche un message d'erreur */
	if(JSON.stringify(produit) == "{}"){
		let bloc_main_produit = document.getElementById("main_produit");

		let h1_produit = document.createElement("h1");
		h1_produit.textContent = "Le produit demandé n'existe pas.";
		bloc_main_produit.appendChild(h1_produit);
	} else {
		/* création des balises HTML pour afficher le produit sur la page */
		let bloc_main_produit = document.getElementById("main_produit");

		let h1_produit = document.createElement("h1");
		h1_produit.textContent = produit.name;
		bloc_main_produit.appendChild(h1_produit);

		let div_produit_image = document.createElement("div");
		

		let img_produit = document.createElement("img");
		img_produit.setAttribute("src", produit.imageUrl);
		img_produit.setAttribute("class", "produit-image");
		div_produit_image.appendChild(img_produit);

		bloc_main_produit.appendChild(div_produit_image);

		let div_produit_description = document.createElement("div");
		div_produit_description.setAttribute("class", "produit-description");

		let p_description = document.createElement("p");
		p_description.textContent = produit.description;
		div_produit_description.appendChild(p_description);

		let p_prix = document.createElement("p");
		p_prix.textContent = "Prix : " + (produit.price/100) + "€";
		div_produit_description.appendChild(p_prix);

		let p_choix_lentille = document.createElement("p");
		p_choix_lentille.textContent = "Choisissez votre lentille : ";
		div_produit_description.appendChild(p_choix_lentille);

		let select_lentille = document.createElement("select");

		produit.lenses.forEach((option) => {
			let option_lentille = document.createElement("option");
			option_lentille.textContent = option;
			select_lentille.appendChild(option_lentille);
		});
		div_produit_description.appendChild(select_lentille);

		let button_panier = document.createElement("button");
		button_panier.setAttribute("id", "button_achat");
		button_panier.textContent = "Ajouter au panier";
		button_panier.addEventListener("click", ajouterPanier);
		div_produit_description.appendChild(button_panier);

		bloc_main_produit.appendChild(div_produit_description);
	}
}

/* fonction qui ajoute l'article au panier */
async function ajouterPanier(){
	/* si l'objet existe, on augmente sa quantité de 1, sinon on l'ajoute au panier avec une quantité de 1. */
	console.log("Produit ajouté dans le panier.");
	let panierUtilisateur = JSON.parse(localStorage.getItem("panier"));
	let quantitePanier = JSON.parse(localStorage.getItem("quantitePanier"));
	const produit = await getProduits(getIdProduit());
	let positionProduit = findElement(panierUtilisateur, produit);

	/* Si le produit existe déjà dans le panier, on augmente sa quantité de un, sinon, on l'ajoute dans le panier */
	if(positionProduit != -1){
		quantitePanier[positionProduit]++;
	} else {
		panierUtilisateur.push(produit);
		quantitePanier.push(1);
		localStorage.setItem("panier", JSON.stringify(panierUtilisateur));

	}
	localStorage.setItem("quantitePanier", JSON.stringify(quantitePanier));
	console.log(quantitePanier);
	console.log(panierUtilisateur);
	/* Après avoir pris un objet, on redirige vers la page index.html */
	document.location.href="index.html";
}

/* cherche la position d'un produit dans le panier */
function findElement(panierUtilisateur, produitSearch){
	for(let j = 0; j < panierUtilisateur.length; j++){
		if(panierUtilisateur[j]._id == produitSearch._id){
			return j;
		}
	}
	return -1;
}