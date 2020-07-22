/* Cherche les produits via l'API */

async function getProduits(idProduit){
	let response = await fetch("http://localhost:3000/api/cameras/"+idProduit);
	let data = await response.json();
	if(data != null){
		console.log("récupération de données ok.")
	};
	return data ;
}

/* Création du panier s'il n'existe pas */

if(localStorage.getItem("panier")){
	console.log("Le panier existe.");
} else {
	console.log("Le panier n'existe pas.");
	let panierVide = [];
	localStorage.setItem("panier", JSON.stringify(panierVide));
}

/* Création du tableau stockant la quantité des produits s'il n'existe pas */

if(localStorage.getItem("quantitePanier") == null){
	let quantitePanier =[];
	localStorage.setItem("quantitePanier", JSON.stringify(quantitePanier));
}

/* On affiche le contenu de panier et quantitePanier pour les tests */

let panierUtilisateur = JSON.parse(localStorage.getItem("panier"));
console.log("Panier Utilisateur : ");
console.log(panierUtilisateur);
let quantitePanier = JSON.parse(localStorage.getItem("quantitePanier"));
console.log("Quantité Panier : ");
console.log(quantitePanier);