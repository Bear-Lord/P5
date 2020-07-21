showPanier()

function showPanier(){
	let panierUtilisateur = JSON.parse(localStorage.getItem("panier"));
	let quantitePanier = JSON.parse(localStorage.getItem("quantitePanier"));

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

		let num_produit = 0;

		for(let i = 0; i < panierUtilisateur.length; i++){
			num_produit = i+1;
			let produit = panierUtilisateur[i];

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

			let div_produit_quantite_part = document.createElement("div");
			div_produit_quantite_part.setAttribute("class", "panier-element-right-part");
			div_produit_quantite_part.textContent = quantitePanier[i];;
			div_produit.appendChild(div_produit_quantite_part);

			let div_produit_plus_part = document.createElement("div");
			div_produit_plus_part.setAttribute("class", "panier-element-right-part");
			div_produit_plus_part.textContent = "+";
			div_produit_plus_part.addEventListener("click", ajouterProduitPanier.bind(num_produit));
			div_produit.appendChild(div_produit_plus_part);

			let div_produit_minus_part = document.createElement("div");
			div_produit_minus_part.setAttribute("class", "panier-element-right-part");
			div_produit_minus_part.textContent = "-";
			div_produit_minus_part.addEventListener("click", diminuerProduitPanier.bind(num_produit));
			div_produit.appendChild(div_produit_minus_part);
            
            let div_produit_right_part = document.createElement("div");
			div_produit_right_part.setAttribute("class", "panier-element-right-part");
			div_produit_right_part.textContent = "X";
			div_produit_right_part.addEventListener("click", supprimerProduitPanier.bind(num_produit));
			console.log("num_produit " + num_produit)
			div_produit.appendChild(div_produit_right_part);

			div_panier_liste.appendChild(div_produit);

			total = total + (produit.price/100);
			fond_beige = !fond_beige;
		}

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

	console.log("observer "+num_produit);
	let quantitePanier = JSON.parse(localStorage.getItem("quantitePanier"));
	console.log(quantitePanier);
	quantitePanier.splice(num_produit, 1);
	console.log(quantitePanier);
	localStorage.setItem("quantitePanier", JSON.stringify(quantitePanier));
	console.log("produit supprimé du panier");

	showPanier();
}


function ajouterProduitPanier(num_produit){
	
}


function diminuerProduitPanier(num_produit){

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
		message_erreur += "Nom incorrect.<br>";
    } else {
    	console.log("nom ok");
    }

    if(checkString.test(prenom) == false){
		message_erreur += "Prénom incorrect.<br>";
    } else {
    	console.log("prénom ok");
    }

    if(checkAdresse.test(adresse) == false){
		message_erreur += "Adresse incorrect.<br>";
    } else {
    	console.log("adresse ok");
    }

    if(checkString.test(ville) == false){
		message_erreur += "Ville incorrect.<br>";
    } else {
    	console.log("ville ok");
    }

    if(checkMail.test(email) == false){
		message_erreur += "Email incorrect.<br>";
    } else {
    	console.log("email ok");
    }

	let error_message = document.getElementById("error_message");
    if(message_erreur != ""){

    	error_message.innerHTML = message_erreur;
    	error_message.classList.remove("hidden");
    	return false;
    } else {
    	let panierUtilisateur = JSON.parse(localStorage.getItem("panier"));
		if (panierUtilisateur.length == 0){
			error_message.innerHTML = "Le panier est vide.";
    		error_message.classList.remove("hidden");
			return false;
		}
		error_message.classList.add("hidden");
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