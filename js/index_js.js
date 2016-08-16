var can, ctx;
const n = 50, colors = ['#ffaeb9','#fddfe1','#f8c3cd','#f4a7b9','#f596aa','#e87a90','#e16b8c','#d05a6e','#db4d6d','#d0104c'];
var winWidth, wind = Math.random()*0.1 - 0.05, outBox = false;

var quotes = [
	"红尘有道千秋在，低头便入此门中。",
	"每一次点击，这里都会诞生一片新的花瓣~",
	"程序员便如塑星师，每样作品都是一颗美丽的流星。",
	"计算机的世界是如花一样美丽的世界。",
	'std::cout << "Hello, world!" << std::endl;',
	"因为单身狗，所以叫狗窝。:P",
	"文笔太差，没有博客，见笑。Orz",
	"学如逆水行舟，不进则退！共勉。",
	"萌新刚学做网站，太差请轻喷。XD",
	"花雨中的每朵都有自己的美丽。",
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
	this.vx = Math.random()*1 - 0.5;
	this.vy = Math.random()*1;
	this.radius = 5;
	// var r = parseInt(Math.random()*46+208).toString(),
	// 	g = parseInt(Math.random()*197+26).toString(),
	// 	b = (parseInt(g) + parseInt(Math.random()*-10+20)).toString();
	this.color = colors[parseInt(Math.random()*colors.length)];//'rgb(' + r + ', ' + g + ', ' + b + ')';
};
Star.prototype.draw = function(){
	ctx.save();
	ctx.beginPath();
	ctx.translate(this.x, this.y);
	var ang = Math.atan(-this.vx / this.vy);
	ctx.rotate(ang - ang%(Math.PI/45));
	ctx.moveTo(-8, 4);
	ctx.lineTo(0, -10);
	ctx.lineTo(8, 4);
	ctx.bezierCurveTo(8, 4, 0, 15, -8, 4);
	ctx.closePath();
	ctx.fillStyle = this.color;
	ctx.fill();
	ctx.restore();
};
Star.prototype.update = function(){
	this.x += this.vx;
	this.y += this.vy;
	this.vx += wind;
	this.vy += 0.001;
	if(this.vx>0)
		this.vx -= 0.001;
	else if (this.vx<0)
		this.vx += 0.001;
	if(this.y>can.height || (outBox && (this.x > can.width * 1.5 || this.x < -can.width*0.5))){
		this.vx = Math.random()*1 - 0.5;
		this.vy = Math.random()*1;
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
if((can.width = document.documentElement.clientWidth)<=520)
	outBox = true;
can.height = document.documentElement.clientHeight
ctx = can.getContext('2d');
for(var i=0; i<n; ++i){
	stars.push(new Star(Math.random()*can.width, Math.random()*can.height));
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

cnt = 0;
cntMax = parseInt(Math.random()*20 + 10);
function draw()
{
	clear();
	stars.forEach(function(e){
		e.draw();
		e.update();
	})
	++cnt;
	if(cnt >= cntMax){
		cnt = 0;
		cntMax = parseInt(Math.random()*20 + 10);
		wind = Math.random()*0.1 - 0.05;
	}
	window.requestAnimationFrame(draw);
}
