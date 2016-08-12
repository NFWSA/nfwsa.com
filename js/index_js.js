var can, ctx;
const n = 15;
var winWidth

var quotes = [
	"红尘有道千秋在，低头便入此门中。",
	"每一次点击，这里都会诞生一颗新的流星~",
	"程序员便如塑星师，每样作品都是一颗美丽的流星。",
	'std::cout << "Hello, world!" << std::endl;',
	"因为单身狗，所以叫狗窝。:P",
	"文笔太差，没有博客，见笑。Orz",
	"学如逆水行舟，不进则退！共勉。",
	"萌新刚学做网站，太差请轻喷。XD",
	"这里是一只未来程序员，欢迎各位大大指教。(´ﾟДﾟ`)",
	"这里是一位道教小信徒，欢迎同道来指点。(＾o＾)ﾉ",
	"真常之道，悟者自得，得悟道者，常清静矣。",
	"以事建物则难,以道弃物则易。",
	"欢迎各位提意见哦~这里保证认真听取！",
	"模糊效果没做好，诸位强迫症求放过！|∀` )",
	"优秀的游戏是我们的事业。",
	"祸福无门，惟人自召。善恶有报，如影随形。",
];

function Star(x, y){
	this.x = x;
	this.y = y;
	this.cnt = 0;
	this.vx = Math.random()*1 - 0.5;
	this.vy = Math.random()*1;
	this.radius = 10;
	this.color = '#ffaeb9';
};
Star.prototype.draw = function(){
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fillStyle = this.color;
	ctx.fill();
};
Star.prototype.update = function(){
	this.x += this.vx;
	this.y += this.vy;
	this.vy += 0.001;
	this.cnt += 1;
	if(this.cnt == 50){
		this.cnt = 0;
		this.vx = Math.random()*1 - 0.5;
	}
	if(this.y>can.height){
		this.vx = Math.random()*1 - 0.5;
		this.vy = 0;
		this.x = Math.random()*can.width;
		this.y = 0;
	}
};

var stars = [];

var taichi = document.getElementById("taichi");
taichi.addEventListener("click", function(){
	if(taichi.getAttribute("class")==""){
		quote.innerHTML = quotes[Math.floor(Math.random()*quotes.length)];
		quote.style.visibility = "visible";
		taichi.setAttribute("class", "rotate");
		quote.setAttribute("class", "hide");
	}
});
taichi.addEventListener("transitionend", function(){
	if(taichi.getAttribute("class")=="rotate"){
		taichi.setAttribute("class", "");
		quote.setAttribute("class", "");
		quote.style.visibility = "hidden";
	}
});

can = document.getElementById("bgsvg");
ctx = can.getContext('2d');
for(var i=0; i<n; ++i){
	stars.push(new Star(Math.random()*can.width, -1 + Math.random()*can.height));
}

window.addEventListener('click', function(e){
	stars.push(new Star(e.clientX / document.documentElement.clientWidth * can.width, e.clientY / document.documentElement.clientHeight * can.height));
});
window.requestAnimationFrame(draw);

function clear()
{
	ctx.fillStyle = 'rgba(128, 203, 255, 1)';
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
