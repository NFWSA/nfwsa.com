var sidebar = document.getElementById("sidebar")//;, sidecon = document.getElementById("sidebut");
var panel = [];
for(var i=0; i<3; ++i)
	panel.push(document.getElementById("panel-" + (i+1).toString()));
function sideout()
{
    if(sidebar.getAttribute("class") == "hide"){
        sidebar.setAttribute("class", "show");
        sidecon.innerText = '<';
        content.style.width = (document.documentElement.clientWidth - sidebar.clientWidth).toString() + 'px';
    }
    else{
        sidebar.setAttribute("class", "hide");
        sidecon.innerText = '>';
        content.style.width = '97.5%';
    }
}

function switchPage(e)
{
    var beg = 0, str = e==null ? window.location.hash : e.srcElement.hash;
    switch(str){
        case '#balalaAdv':
            beg = 0;
            break;
        case '#doordie':
            beg = -100;
            break;
        case '#daemonHunter':
            beg = -200;
            break;
    }
    for(var i=0; i<3; ++i){
        panel[i].style.left = (beg + 100*i).toString() + '%';
    }
}
sidecon.addEventListener("click", sideout);
var btns = sidebar.getElementsByTagName("a")
for(var i=0; i<btns.length; ++i){
    if(btns[i].getAttribute("href")[0]!='#')
        continue;
    btns[i].addEventListener("click", switchPage);
}
