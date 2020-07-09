/* Cherche les produits via l'API */
function getProduits(idProduit){
	return new Promise((resolve) => {
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() {
		    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
		        resolve(JSON.parse(this.responseText));
		        console.log("Données récupérées");
		        error = document.getElementById("error");
		        if(error){
		        	error.remove();
		        }
		    }
		};
		request.open("GET", "http://localhost:3000/api/cameras/"+idProduit);
		request.send();
	});
}

/* Affiche la liste et les informations de tous les produits pour la page index.html */
async function showProduits(){
	const produits = await getProduits("");
	var bloc_liste_produits = document.getElementById("liste_produits");
	console.log(bloc_liste_produits);
	console.log(produits);

	produits.forEach((produit) => {
		

		var div_produit = document.createElement("div");
		div_produit.setAttribute("class", "produit");


		var div_produit_img = document.createElement("div");
		div_produit_img.setAttribute("class", "produit-left-part");
		div_produit.appendChild(div_produit_img);

		var a_img_produit = document.createElement("a");
		a_img_produit.setAttribute("href", "produit.html?id="+produit._id);

		var img_produit = document.createElement("img");
		img_produit.setAttribute("class", "produit-image");
		img_produit.setAttribute("src", produit.imageUrl);
		a_img_produit.appendChild(img_produit);

		div_produit_img.appendChild(a_img_produit);

		var div_produit_text = document.createElement("div");
		div_produit_text.setAttribute("class", "produit-right-part");
		div_produit.appendChild(div_produit_text);



		var a_p_produit_nom = document.createElement("a");
		a_p_produit_nom.setAttribute("href", "produit.html?id="+produit._id);
		a_p_produit_nom.textContent = produit.name;

		var p_produit_nom = document.createElement("p");
		p_produit_nom.setAttribute("class", "produit-nom");
		
		p_produit_nom.appendChild(a_p_produit_nom);

		div_produit_text.appendChild(p_produit_nom);

		var p_produit_prix = document.createElement("p");
		p_produit_prix.setAttribute("class", "produit-prix");
		p_produit_prix.textContent = "Prix : "+produit.price+" €";
		div_produit_text.appendChild(p_produit_prix);

		var p_produit_description = document.createElement("p");
		p_produit_description.setAttribute("class", "produit-description");
		p_produit_description.textContent = produit.description;
		div_produit_text.appendChild(p_produit_description);

		bloc_liste_produits.appendChild(div_produit);

	});
}

/* récupère l'id du produit dans l'URL d'une page produit.html */
function getIdProduit(){
	return window.location.search.substring(4);
}

/* Affiche les informations d'un produit pour la page produit.html */
async function showProduit(){
	idProduit = getIdProduit();
	console.log(idProduit);
	const produit = await getProduits(idProduit);
	console.log(produit)

	var bloc_main_produit = document.getElementById("main_produit");

	var h1_produit = document.createElement("h1");
	h1_produit.textContent = produit.name;
	bloc_main_produit.appendChild(h1_produit);

	var div_produit_image = document.createElement("div");
	

	var img_produit = document.createElement("img");
	img_produit.setAttribute("src", produit.imageUrl);
	img_produit.setAttribute("class", "produit-image");
	div_produit_image.appendChild(img_produit);

	bloc_main_produit.appendChild(div_produit_image);

	var div_produit_description = document.createElement("div");
	div_produit_description.setAttribute("class", "produit-description");

	var p_description = document.createElement("p");
	p_description.textContent = produit.description;
	div_produit_description.appendChild(p_description);

	var p_prix = document.createElement("p");
	p_prix.textContent = "Prix : " + produit.price + "€";
	div_produit_description.appendChild(p_prix);

	var p_choix_lentille = document.createElement("p");
	p_choix_lentille.textContent = "Choisissez votre lentille : ";
	div_produit_description.appendChild(p_choix_lentille);


	var select_lentille = document.createElement("select");
	console.log(produit);
	produit.lenses.forEach((option) => {
		var option_lentille = document.createElement("option");
		option_lentille.textContent = option;
		select_lentille.appendChild(option_lentille);
	});
	div_produit_description.appendChild(select_lentille);

	var button_panier = document.createElement("button");
	button_panier.setAttribute("id", "button-achat");
	button_panier.textContent = "Ajouter au panier";
	button_panier.addEventListener("click", ajouterPanier);
	div_produit_description.appendChild(button_panier);

	bloc_main_produit.appendChild(div_produit_description);
}

/* Création du panier s'il n'existe pas */

if(localStorage.getItem("panier")){
	console.log("Le panier existe");
} else {
	console.log("Le panier n'existe pas");
	var panierVide = [];
	localStorage.setItem("panier", JSON.stringify(panierVide))
}

async function ajouterPanier(){
	console.log("ajout panier");
	var panierUtilisateur = JSON.parse(localStorage.getItem("panier"));
	const produit = await getProduits(getIdProduit());
	panierUtilisateur.push(produit);
	localStorage.setItem("panier", JSON.stringify(panierUtilisateur));
	console.log(panierUtilisateur);
}
function showPanier(){
	var panierUtilisateur = JSON.parse(localStorage.getItem("panier"));

	var div_panier_liste = document.getElementById("panier_liste");

	if(panierUtilisateur.length == 0){
		var p_panier_vide = document.createElement("p");
		button_panier.textContent = "Le panier est vide.";
		div_panier_liste.appendChild(button_panier);
	} else {
		var total = 0;
		panierUtilisateur.forEach((produit) => {
			var div_produit = document.createElement("div");
			div_produit.textContent = produit.name + " - " + produit.price;
			div_panier_liste.appendChild(div_produit);
			total = total + produit.price;
		});
		var div_produit = document.createElement("div");
		div_produit.textContent = "Total : "+total+" €";
		div_panier_liste.appendChild(div_produit);
	}
}
