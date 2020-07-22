showPanier()

/* afficher tous les éléments de notre panier en HTML */
function showPanier(){
	let panierUtilisateur = JSON.parse(localStorage.getItem("panier"));
	let quantitePanier = JSON.parse(localStorage.getItem("quantitePanier"));

	let div_panier_liste = document.getElementById("panier_liste");
	div_panier_liste.innerHTML = "";
	let h2_panier = document.createElement("h2");
	h2_panier.textContent = "Vos articles";
	div_panier_liste.appendChild(h2_panier);

	/* Si le panier est vide, on affiche qu'il est vide */
	if(panierUtilisateur.length == 0){
		let p_panier_vide = document.createElement("p");
		p_panier_vide.textContent = "Le panier est vide.";
		div_panier_liste.appendChild(p_panier_vide);
	} else {
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
			div_produit_left_part.setAttribute("class", "panier-element-left-part");
			div_produit_left_part.textContent = produit.name + " - Prix : " + (produit.price/100) + "€";
			div_produit.appendChild(div_produit_left_part);

			let div_produit_quantite_part = document.createElement("div");
			div_produit_quantite_part.setAttribute("class", "panier-element-right-part");
			div_produit_quantite_part.textContent = quantitePanier[i];;
			div_produit.appendChild(div_produit_quantite_part);

			let div_produit_plus_part = document.createElement("div");
			div_produit_plus_part.setAttribute("class", "panier-element-right-part cursor");
			div_produit_plus_part.textContent = "+";
			div_produit_plus_part.addEventListener("click", function(){ajouterProduitPanier(i)});
			div_produit.appendChild(div_produit_plus_part);

			let div_produit_minus_part = document.createElement("div");
			div_produit_minus_part.setAttribute("class", "panier-element-right-part cursor");
			div_produit_minus_part.textContent = "-";
			div_produit_minus_part.addEventListener("click", function(){diminuerProduitPanier(i)});
			div_produit.appendChild(div_produit_minus_part);
            
            let div_produit_right_part = document.createElement("div");
			div_produit_right_part.setAttribute("class", "panier-element-right-part cursor");
			div_produit_right_part.textContent = "X";
			div_produit_right_part.addEventListener("click", function(){supprimerProduitPanier(i)});
			console.log("num_produit " + num_produit)
			div_produit.appendChild(div_produit_right_part);

			div_panier_liste.appendChild(div_produit);

			total = total + (produit.price * quantitePanier[i]/100); //on calcule le total au fur et à mesure
			fond_beige = !fond_beige; //on alterne le fond beige une ligne sur deux
		}

		let div_produit = document.createElement("div");
		div_produit.setAttribute("class", "panier-element bold");
		div_produit.textContent = "Total : "+total+" €";
		div_panier_liste.appendChild(div_produit);
	}
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

/* vérifie que les données du formulaire sont correctement formatées.
Le formulaire n'est validé que si checkFormulaire renvoit true */
function checkFormulaire(){
	let checkString = /^[a-zA-Zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ ,.'-]/;
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
		message_erreur += "Adresse incorrecte.<br>";
    } else {
    	console.log("adresse ok");
    }

    if(checkString.test(ville) == false){
		message_erreur += "Ville incorrecte.<br>";
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

		let contact = {
			lastName : nom,
			firstName : prenom,
			email : email,
			address : adresse,
			city : ville
		}
		let objet = {
			contact,
			panierUtilisateur
		}

		let objetRequest = JSON.stringify(objet);
		let request = new XMLHttpRequest();
     	request.open("POST", "http://localhost:3000/api/cameras/order");
      	request.setRequestHeader("Content-Type", "application/json");
	    request.onreadystatechange = function() {
	        if (this.readyState == XMLHttpRequest.DONE){
		        console.log(this.responseText);
		        localStorage.setItem('order', this.responseText);

		    }
      	}
      	request.send(objetRequest);
    	return true;
    }
}