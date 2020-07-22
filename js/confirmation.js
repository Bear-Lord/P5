confirmation();

/* Affiche un message d'erreur si le panier est vide,
sinon, affiche le message de confirmation et vide le panier et quantitePanier */
function confirmation(){
	let panierUtilisateur = JSON.parse(localStorage.getItem("panier"));
	if (panierUtilisateur.length == 0){
		let p_message_erreur = document.createElement("p");
		p_message_erreur.textContent = "Il n'y a eu aucune commande de passée.";
		let p_confirmation_message = document.getElementById("confirmation_message");
		p_confirmation_message.innerHTML = "";
		p_confirmation_message.appendChild(p_message_erreur);
	} else {
		let quantitePanier = JSON.parse(localStorage.getItem("quantitePanier"));
		let total = calculeTotal(panierUtilisateur, quantitePanier);
		let p_confirmation_total = document.getElementById("confirmation_total");
		p_confirmation_total.textContent = "Total : " + total + " €";
		let panierVide = [];
		let quantitePanierVide = [];
		localStorage.setItem("panier", JSON.stringify(panierVide));
		localStorage.setItem("quantitePanier", JSON.stringify(quantitePanierVide));
	}	
}

/* calcule le prix total des achats */
function calculeTotal(panierUtilisateur, quantitePanier){
	let total = 0;
	for(let i = 0; i < panierUtilisateur.length; i++){
		total = total + (panierUtilisateur[i].price*quantitePanier[i]/100);
	}
	return total;
}