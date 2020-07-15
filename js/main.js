/* Cherche les produits via l'API */

/*
function getProduits(idProduit){
	return new Promise((resolve) => {
		let request = new XMLHttpRequest();
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
*/

async function getProduits(idProduit){
   let response = await fetch("http://localhost:3000/api/cameras/"+idProduit);
   let data = await response.json();
   return data ;
}

/* Affiche la liste et les informations de tous les produits pour la page index.html */
async function showProduits(){
	const produits = await getProduits("");
	let bloc_liste_produits = document.getElementById("liste_produits");
	console.log(bloc_liste_produits);
	console.log(produits);

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
	console.log(produit);
	produit.lenses.forEach((option) => {
		let option_lentille = document.createElement("option");
		option_lentille.textContent = option;
		select_lentille.appendChild(option_lentille);
	});
	div_produit_description.appendChild(select_lentille);

	let button_panier = document.createElement("button");
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
	let panierVide = [];
	localStorage.setItem("panier", JSON.stringify(panierVide))
}

async function ajouterPanier(){
	console.log("ajout panier");
	let panierUtilisateur = JSON.parse(localStorage.getItem("panier"));
	const produit = await getProduits(getIdProduit());
	panierUtilisateur.push(produit);
	localStorage.setItem("panier", JSON.stringify(panierUtilisateur));
	console.log(panierUtilisateur);
	document.location.href = "index.html";
}
function showPanier(){
	let panierUtilisateur = JSON.parse(localStorage.getItem("panier"));

	let div_panier_liste = document.getElementById("panier_liste");
	div_panier_liste.innerHTML = "";
	let h2_panier = document.createElement("h2");
	h2_panier.textContent = "Vos articles";
	div_panier_liste.appendChild(h2_panier);

	if(panierUtilisateur.length == 0){
		let p_panier_vide = document.createElement("p");
		p_panier_vide.textContent = "Le panier est vide.";
		div_panier_liste.appendChild(p_panier_vide);
	} else {
		let total = 0;

		let fond_beige = true;

		let num_produit = 1;
		panierUtilisateur.forEach((produit) => {
			let div_produit = document.createElement("div");
			if(fond_beige){
				div_produit.setAttribute("class", "panier-element fond-beige");
			} else {
				div_produit.setAttribute("class", "panier-element");
			}

			div_produit.setAttribute("id", "produit_panier_"+num_produit);

			let div_produit_left_part = document.createElement("div");
			div_produit_left_part.setAttribute("class", "panier-element-left-part");
			div_produit_left_part.textContent = produit.name + " - Prix : " + (produit.price/100) + "€";
			div_produit.appendChild(div_produit_left_part);

			let div_produit_right_part = document.createElement("div");
			div_produit_right_part.setAttribute("class", "panier-element-right-part");
			div_produit_right_part.textContent = "X";
			div_produit_right_part.addEventListener("click", supprimerProduitPanier.bind(num_produit));
			console.log("num_produit " + num_produit)
			div_produit.appendChild(div_produit_right_part);

			div_panier_liste.appendChild(div_produit);

			total = total + (produit.price/100);
			fond_beige = !fond_beige;
			num_produit = num_produit+1;
		});
		let div_produit = document.createElement("div");
		div_produit.setAttribute("class", "panier-element bold");
		div_produit.textContent = "Total : "+total+" €";
		div_panier_liste.appendChild(div_produit);
	}
}

function supprimerProduitPanier(num_produit){
	let panierUtilisateur = JSON.parse(localStorage.getItem("panier"));
	panierUtilisateur.splice(num_produit, 1);
	localStorage.setItem("panier", JSON.stringify(panierUtilisateur));
	console.log("produit supprimé du panier");

	showPanier();
}

function checkFormulaire(){
	let checkString = /^[a-zA-Z ,.'-]/;
    let checkMail = /.+@.+\..+/;
    let checkAdresse = /^[^@&"()!_$*€£`%+=\/;?#]+$/;

    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    let adresse = document.getElementById("adresse").value;
    let ville = document.getElementById("ville").value;
    let email = document.getElementById("email").value;

    let message_erreur = ""
    if(checkString.test(nom) == false){
		message_erreur += "Nom incorrect.\n";
    } else {
    	console.log("nom ok");
    }

    if(checkString.test(prenom) == false){
		message_erreur += "Prénom incorrect.\n";
    } else {
    	console.log("prénom ok");
    }

    if(checkAdresse.test(adresse) == false){
		message_erreur += "Adresse incorrect.\n";
    } else {
    	console.log("adresse ok");
    }

    if(checkString.test(ville) == false){
		message_erreur += "Ville incorrect.\n";
    } else {
    	console.log("ville ok");
    }

    if(checkMail.test(email) == false){
		message_erreur += "Email incorrect.\n";
    } else {
    	console.log("email ok");
    }

    if(message_erreur != ""){
    	alert(message_erreur);
    	return false;
    } else {
    	let panierUtilisateur = JSON.parse(localStorage.getItem("panier"));
		if (panierUtilisateur.length == 0){
			alert("Le panier est vide.");
			return false;
		}
    	return true;
    }
}

function confirmation(){
	let panierUtilisateur = JSON.parse(localStorage.getItem("panier"));
	if (panierUtilisateur.length == 0){
		let p_message_erreur = document.createElement("p");
		p_message_erreur.textContent = "Il n'y a eu aucune commande de passée.";
		let p_confirmation_message = document.getElementById("confirmation_message");
		p_confirmation_message.innerHTML = "";
		p_confirmation_message.appendChild(p_message_erreur);
	} else {
		let total = calculeTotal(panierUtilisateur);
		let p_confirmation_total = document.getElementById("confirmation_total");
		p_confirmation_total.textContent = "Total : " + total + " €";
		let panierVide = [];
		localStorage.setItem("panier", JSON.stringify(panierVide));
	}	
}

function calculeTotal(panierUtilisateur){
	let total = 0;
	panierUtilisateur.forEach((produit) => {
		total = total + (produit.price/100);
	});
	return total;
}