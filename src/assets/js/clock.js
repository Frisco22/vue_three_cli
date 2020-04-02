var canvas;

function canvObject () {
	this.x = 0;
	this.y = 0;
	this.rotation = 0;
	this.borderWidth = 2;
	this.borderColor = '#000000';
	this.fill = false;
	this.fillColor = '#ff0000';
	this.update = function () {
		if (!this.ctx) throw new Error('你没有指定ctx对象。');
		var ctx = this.ctx
		ctx.save();
		ctx.lineWidth = this.borderWidth;
		ctx.strokeStyle = this.borderColor;
		ctx.fillStyle = this.fillColor;
		ctx.translate(this.x, this.y);
		if (this.rotation) ctx.rotate(this.rotation * Math.PI / 180);
		if (this.draw) this.draw(ctx);
		if (this.fill) ctx.fill();
		ctx.stroke();
		ctx.restore();
	}
}
function Line () { }
function Circle () { }
const clock = () => {
	canvas = document.createElement('canvas');
	canvas.width = 200;
	canvas.height = 200;
	var ctx = canvas.getContext('2d');
	if (ctx) {

		var frameRate = 60;
		canvObject()

		Line.prototype = new canvObject();
		Line.prototype.fill = false;
		Line.prototype.start = [0, 0];
		Line.prototype.end = [5, 5];
		Line.prototype.draw = function (ctx) {
			ctx.beginPath();
			ctx.moveTo.apply(ctx, this.start);
			ctx.lineTo.apply(ctx, this.end);
			ctx.closePath();
		};

		Circle.prototype = new canvObject();
		Circle.prototype.draw = function (ctx) {
			ctx.beginPath();
			ctx.arc(0, 0, this.radius, 0, 2 * Math.PI, true);
			ctx.closePath();
		};

		var circle = new Circle();
		circle.ctx = ctx;
		circle.x = 100;
		circle.y = 100;
		circle.radius = 90;
		circle.fill = true;
		circle.borderWidth = 6;
		circle.fillColor = '#ffffff';

		var hour = new Line();
		hour.ctx = ctx;
		hour.x = 100;
		hour.y = 100;
		hour.borderColor = "#000000";
		hour.borderWidth = 10;
		hour.rotation = 0;
		hour.start = [0, 20];
		hour.end = [0, -50];

		var minute = new Line();
		minute.ctx = ctx;
		minute.x = 100;
		minute.y = 100;
		minute.borderColor = "#333333";
		minute.borderWidth = 7;
		minute.rotation = 0;
		minute.start = [0, 20];
		minute.end = [0, -70];

		var seconds = new Line();
		seconds.ctx = ctx;
		seconds.x = 100;
		seconds.y = 100;
		seconds.borderColor = "#ff0000";
		seconds.borderWidth = 4;
		seconds.rotation = 0;
		seconds.start = [0, 20];
		seconds.end = [0, -80];

		var center = new Circle();
		center.ctx = ctx;
		center.x = 100;
		center.y = 100;
		center.radius = 5;
		center.fill = true;
		center.borderColor = 'orange';

		for (var i = 0, ls = [], cache; i < 12; i++) {
			cache = ls[i] = new Line();
			cache.ctx = ctx;
			cache.x = 100;
			cache.y = 100;
			cache.borderColor = "orange";
			cache.borderWidth = 2;
			cache.rotation = i * 30;
			cache.start = [0, -70];
			cache.end = [0, -80];
		}

		setInterval(function () {
			// 清除画布
			ctx.clearRect(0, 0, 200, 200);
			// 填充背景色
			ctx.fillStyle = 'orange';
			ctx.fillRect(0, 0, 200, 200);
			// 表盘
			circle.update();
			// 刻度
			for (var i = 0; cache; ls[i++])cache.update();
			// 时针
			hour.rotation = (new Date()).getHours() * 30;
			hour.update();
			// 分针
			minute.rotation = (new Date()).getMinutes() * 6;
			minute.update();
			// 秒针
			seconds.rotation = (new Date()).getSeconds() * 6;
			seconds.update();
			// 中心圆
			center.update();
		}, (1000 / frameRate) | 0);
	} else {
		alert('您的浏览器不支持Canvas无法预览.\n跟我一起说："Fuck Internet Exploer!"');
	}
}
clock()