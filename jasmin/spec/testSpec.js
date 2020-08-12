var request = require("request");

describe("Hello World Test", function() {

	//let id="5be1ed3f1c9d44000030b061";
	let id="5be1ed3f1c9d44000030b06";
	let produit = await getProduits(idProduit);
  	// This is your test bundle

   	it("Checks if SO is online", function() {
      // This is description of your test - this is what you get when it fails
      
      expect(JSON.stringify(produit)).toBe("{}");
        // this is your test assertion - it expects status code to be '200'
    });
});