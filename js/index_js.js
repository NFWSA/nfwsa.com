var can, ctx;
const n = 15;
var winWidth

var quotes = [
	"红尘有道千秋在，低头便入此门中。",
	"每一次点击，这里都会诞生一颗新的流星~",
	"程序员便如塑星师，每样作品都是一颗美丽的流星。",
	'std::cout << "Hello, world!" << std::endl;',
	"因为单身狗，所以叫狗窝。:P",
	"文笔太差，不爱写博客，见笑。Orz",
	"学如逆水行舟，不进则退！共勉。",
	"萌新刚学做网站，太差请轻喷。XD",
	"这里是一只未来程序员，希望得到各位大大指教。(´ﾟДﾟ`)",
	"这里是一位道教小信徒，欢迎同道来指点。(＾o＾)ﾉ",
	"真常之道，悟者自得，得悟道者，常清静矣。　　——《太上老君说常清静经》",
	"以事建物则难,以道弃物则易。　　——《关尹子》",
	"欢迎各位提意见哦~这里保证认真听取！",
	"模糊效果没做好，诸位强迫症求放过！|∀` )",
	"优秀的游戏是我们的事业。　　——暴雪",
	"祸福无门，惟人自召。善恶有报，如影随形。　　——《太上感应篇》",
];

function Star(x = Math.random()*can.width, y = -1 + Math.random()*can.height){
	this.x = x;
	this.y = y;
	this.vx = -0.5 - Math.random()*0.5;
	this.vy = Math.random()*1;
	this.radius = 2;
	this.color = '#111111';
};
Star.prototype.draw = function(){
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fillStyle = this.color;
	ctx.fill();
};
Star.prototype.update = function(){
	this.vy += 0.001;
	this.x += this.vx;
	this.y += this.vy;
	if(this.x<0 || this.y>can.height){
		this.vx = -0.5 - Math.random()*0.5;
		this.vy = Math.random()*1;
		this.x = Math.random()*can.width;
		if(this.x>can.width-20)
			this.y = Math.random()*can.height;
		else
			this.y = -1;
	}
};

var stars = [];

window.addEventListener("load", function(){
	var taichi = document.getElementById("taichi");
	var quote = document.getElementById("quote");
	taichi.setAttribute("class", "rotate");
	/*quote.style.visibility = "hidden";*/
	quote.setAttribute("class", "hide");
	taichi.addEventListener("click", function(){
		if(taichi.getAttribute("class")==""){
			quote.innerHTML = quotes[Math.floor(Math.random()*quotes.length)];
			quote.style.visibility = "visible";
			taichi.setAttribute("class", "rotate");
			quote.setAttribute("class", "hide");
		}
	});
	taichi.addEventListener("transitionend", function(){
		document.body.setAttribute("class", "loaded");
		if(taichi.getAttribute("class")=="rotate"){
			taichi.setAttribute("class", "");
			quote.setAttribute("class", "");
			quote.style.visibility = "hidden";
		}
	});

	var nameBtn = document.getElementById("nameBtn");
	var nameBack = document.getElementById("nameArtBack");
	nameBtn.addEventListener("click", function(){
		nameArt.style.visibility = "visible";
		nameBack.style.visibility = "visible";
	});
	nameBack.addEventListener("click", function(){
		nameArt.style.visibility = "hidden";
		nameBack.style.visibility = "hidden";
	});

	can = document.getElementById("bgsvg");
	ctx = can.getContext('2d');
	for(var i=0; i<n; ++i){
		stars.push(new Star());
	}

	window.addEventListener('click', function(e){
		stars.push(new Star(e.clientX / document.body.clientWidth * can.width, e.clientY / document.body.clientHeight * can.height));
	});

	window.requestAnimationFrame(draw);

});

function clear()
{
	ctx.fillStyle = 'rgba(128, 203, 255, 0.1)';
	ctx.fillRect(0, 0, can.width, can.height);
}

function draw()
{
	clear();
	stars.forEach(function(e){
		e.draw();
		e.update();
	})

		window.requestAnimationFrame(draw);
}
