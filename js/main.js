window.onload = function(){
	var data;
	var lightbox = document.querySelector(".lightbox");
	var body = document.querySelector("body");
	var productLinks = document.querySelectorAll(".product-list a[data-id]");
	
	function load(){
		var httpRequest = new XMLHttpRequest();
		httpRequest.open("GET", "data/potions.json", true);

		httpRequest.onreadystatechange = function(){
			if(httpRequest.status == 200 && httpRequest.readyState == 4){
				data = JSON.parse(httpRequest.responseText);
			}
		}

		httpRequest.send();
	}

	// Faz o bind em cada link de produto
	for(var y = 0; y<productLinks.length; y++){
		productLinks[y].addEventListener("click", function(e){
			e.preventDefault(); 
			var id = this.getAttribute("data-id");
			var product = data.potions[id];

			// Seta os dados dos produtos
			lightbox.querySelector(".product-name strong").innerHTML = product.name;
			lightbox.querySelector("img").src = product.image;
			lightbox.querySelector(".product-use").innerHTML = product.effect;
			lightbox.querySelector(".product-price strong").innerHTML = "$" + product.price;
			lightbox.querySelector(".product-ingredients").innerHTML = "";
			
			for(var i = 0; i<product.ingredients.length; i++){
				var ingredient = document.createElement("li");
				ingredient.innerHTML = product.ingredients[i];
				lightbox.querySelector(".product-ingredients").appendChild(ingredient);

			}

			lightbox.classList.add("show");
			body.classList.add("lightbox-on");
		});
	}

	// Fecha lightbox
	document.querySelector(".lightbox a.close").addEventListener("click", function(e){
		e.preventDefault(); 
		
		lightbox.classList.remove("show");
		body.classList.remove("lightbox-on");
	});

	load();
}	


