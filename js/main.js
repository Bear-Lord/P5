/* Cherche les produits via l'API */

async function getProduits(idProduit){
   let response = await fetch("http://localhost:3000/api/cameras/"+idProduit);
   let data = await response.json();
   return data ;
}

/* Création du panier s'il n'existe pas */

if(localStorage.getItem("panier")){
	console.log("Le panier existe");
} else {
	console.log("Le panier n'existe pas");
	let panierVide = [];
	localStorage.setItem("panier", JSON.stringify(panierVide));
}

if(localStorage.getItem("quantitePanier") == null){
	console.log("Quantité panier n'existe pas");
	let quantitePanier =[];
	localStorage.setItem("quantitePanier", JSON.stringify(quantitePanier));
} else {
	console.log("Quantité panier existe");
	console.log(localStorage.getItem("quantitePanier"));
}