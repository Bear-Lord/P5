showPanier();

/* afficher tous les éléments de notre panier en HTML */
function showPanier(){
	let panierUtilisateur = JSON.parse(localStorage.getItem("panier"));
	let quantitePanier = JSON.parse(localStorage.getItem("quantitePanier"));

	let div_panier_liste = document.getElementById("panier_liste");
	let h2_panier = document.createElement("h2");

	div_panier_liste.innerHTML = "";
	h2_panier.textContent = "Vos articles";
	div_panier_liste.appendChild(h2_panier);

	/* Si le panier est vide, on affiche qu'il est vide */
	if(panierUtilisateur.length == 0){
		let p_panier_vide = document.createElement("p");
		p_panier_vide.textContent = "Le panier est vide.";
		div_panier_liste.appendChild(p_panier_vide);
	} else {
		let total = creerLignePanier(div_panier_liste, panierUtilisateur, quantitePanier);

		let div_produit = document.createElement("div");
		creerElementPanier("panier-element bold", "Total : "+total+" €", div_panier_liste, div_produit);
	}
}

/* Fonction qui crée toutes les lignes de produit d'un panier */
function creerLignePanier(div_panier_liste, panierUtilisateur, quantitePanier){
	let total = 0;

	let fond_beige = true;

	let num_produit = 0;

	/*pour chaque élément du panier, on crée la ligne correspondante en HTML */
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
		creerElementPanier("panier-element-left-part", produit.name + " - Prix : " + (produit.price/100) + "€", div_produit, div_produit_left_part);

		let div_produit_quantite_part = document.createElement("div");
		creerBoutonPanier(quantitePanier[i], div_produit, div_produit_quantite_part, false);

		let div_produit_plus_part = document.createElement("div");
		creerBoutonPanier("+", div_produit, div_produit_plus_part, true);
		div_produit_plus_part.addEventListener("click", function(){ajouterProduitPanier(i)});

		let div_produit_minus_part = document.createElement("div");
		creerBoutonPanier("-", div_produit, div_produit_minus_part, true);
		div_produit_minus_part.addEventListener("click", function(){diminuerProduitPanier(i)});	
        
        let div_produit_right_part = document.createElement("div");
		creerBoutonPanier("X", div_produit, div_produit_right_part, true);
		div_produit_right_part.addEventListener("click", function(){supprimerProduitPanier(i)});

		div_panier_liste.appendChild(div_produit);

		total = total + (produit.price * quantitePanier[i]/100); //on calcule le total au fur et à mesure
		fond_beige = !fond_beige; //on alterne le fond beige une ligne sur deux
	}
	return total;
}

/* Fonction qui crée une balise qui constitue la ligne d'un produit dans le panier */
function creerElementPanier(className, textContent, div_produit, div_produit_part){
	div_produit_part.setAttribute("class", className);
	div_produit_part.textContent = textContent;
	div_produit.appendChild(div_produit_part);
}


/* Fonction qui crée un bouton de la partie droite de la ligne d'un produit dans le panier */
function creerBoutonPanier(textContent, div_produit, div_produit_part, hasCursorFlag){
	cursor = "";
	if(hasCursorFlag){
		cursor = " cursor";
	}
	creerElementPanier("panier-element-right-part" + cursor, textContent, div_produit, div_produit_part, hasCursorFlag);
}

/* permet de supprimer un produit du panier */
function supprimerProduitPanier(num_produit){
	let panierUtilisateur = JSON.parse(localStorage.getItem("panier"));
	panierUtilisateur.splice(num_produit, 1);
	localStorage.setItem("panier", JSON.stringify(panierUtilisateur));

	let quantitePanier = JSON.parse(localStorage.getItem("quantitePanier"));
	quantitePanier.splice(num_produit, 1);
	localStorage.setItem("quantitePanier", JSON.stringify(quantitePanier));
	console.log("produit supprimé du panier");

	showPanier(); //réactualise l'affichage du panier sur la page
}

/* ajoute 1 à la quantité d'un produit du panier */
function ajouterProduitPanier(num_produit){
	let quantitePanier = JSON.parse(localStorage.getItem("quantitePanier"));
	quantitePanier[num_produit]++;
	localStorage.setItem("quantitePanier", JSON.stringify(quantitePanier));
	showPanier();
}

/* enlève 1 à la quantité d'un produit du panier, dont la quantité était supérieure à 1 */
function diminuerProduitPanier(num_produit){
	let quantitePanier = JSON.parse(localStorage.getItem("quantitePanier"));
	if(quantitePanier[num_produit] > 1){
		quantitePanier[num_produit]--;
		localStorage.setItem("quantitePanier", JSON.stringify(quantitePanier));
		showPanier();
	}
}

/*fonction qui teste les champs du formulaire et crée le message d'erreur s'il y en a un*/
function creerMessageErreur(nom, prenom, adresse, ville, email){
	let message_erreur = "";

	/*regex pour tester */
	let checkString = /^[a-zA-Zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ ,.'-]/;
    let checkMail = /.+@.+\..+/;
    let checkAdresse = /^[^@&"()!_$*€£`%+=\/;?#]+$/;

	if(checkString.test(nom) == false || nom.length == 0){
		message_erreur += "Nom incorrect.<br>";
    } else {
    	console.log("nom ok");
    }

    if(checkString.test(prenom) == false || prenom.length == 0){
		message_erreur += "Prénom incorrect.<br>";
    } else {
    	console.log("prénom ok");
    }

    if(checkAdresse.test(adresse) == false || adresse.length == 0){
		message_erreur += "Adresse incorrecte.<br>";
    } else {
    	console.log("adresse ok");
    }

    if(checkString.test(ville) == false || ville.length == 0){
		message_erreur += "Ville incorrecte.<br>";
    } else {
    	console.log("ville ok");
    }

    if(checkMail.test(email) == false || email.length == 0){
		message_erreur += "Email incorrect.<br>";
    } else {
    	console.log("email ok");
    }
    return message_erreur;
}

/* vérifie que les données du formulaire sont correctement formatées.
Le formulaire n'est validé que si checkFormulaire renvoit true */
function checkFormulaire(e){
	e.preventDefault();

    let nom = document.getElementById("nom").value.trim();
    let prenom = document.getElementById("prenom").value.trim();
    let adresse = document.getElementById("adresse").value.trim();
    let ville = document.getElementById("ville").value.trim();
    let email = document.getElementById("email").value.trim();

    let message_erreur = creerMessageErreur(nom, prenom, adresse, ville, email);

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

		let contact = {
			lastName : nom.value,
			firstName : prenom.value,
			email : email.value,
			address : adresse.value,
			city : ville.value
		}
		/*création de l'objet à envoyer */
		let objet = {
			contact: contact,
			products: panierUtilisateur
		}

		/*on fait la requête POST order de l'API*/
 		fetch('http://localhost:3000/api/cameras/order', {
		    method: 'post',
		    body: JSON.stringify(objet)
		  }).then(function(response) {
            return response.json();
		  }).then(function(data) {

		  	console.log(data);
		  	document.location.assign("./confirmation.html")
		  });

    	return true;
    }
}

document.getElementById("form_panier").addEventListener("submit",checkFormulaire);



