window.addEventListener("load", function(){
	var taichi = document.getElementById("taichi");
	taichi.setAttribute("class", "rotate");
	/*window.setInterval(function(){
		if(taichi.getAttribute("class")=="")
			taichi.setAttribute("class", "rotate");
	}, 50);*/
	taichi.addEventListener("rerotate", function(){
		if(taichi.getAttribute("class")==""){
			taichi.setAttribute("class", "rotate");
		}
	});
	taichi.addEventListener("transitionend", function(){
		document.body.setAttribute("class", "loaded");
		if(taichi.getAttribute("class")=="rotate"){
			taichi.setAttribute("class", "");
		}
		var event = new CustomEvent("rerotate", {
            detail: {
                message: "",
                time: new Date(),
            },
            bubbles: true,
            cancelable: true
        });
		taichi.dispatchEvent(event);
	});

	var name = document.getElementById("nameBtn");
	var nameArt = document.getElementById("nameArt");
	var nameBack = document.getElementById("nameArtBack");
	name.addEventListener("click", function(){
		nameArt.style.visibility = "visible";
		nameBack.style.visibility = "visible";
	});
	nameArt.addEventListener("click", function(){
		nameArt.style.visibility = "hidden";
		nameBack.style.visibility = "hidden";
	});
	nameBack.addEventListener("click", function(){
		nameArt.style.visibility = "hidden";
		nameBack.style.visibility = "hidden";
	});
});
