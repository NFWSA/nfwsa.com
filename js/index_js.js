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
});
