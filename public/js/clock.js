
var can2 = document.getElementById("can2");
var ctx = can2.getContext("2d");
drawclock(); //此处先引用函数是为了防止加载完页面的第一秒有空白画面。
function drawclock () {
    ctx.save();
    ctx.clearRect(0, 0, 300, 300);
    ctx.translate(150, 150);
    ctx.rotate(-Math.PI / 2);
    ctx.lineWidth = 6;
    ctx.strokeStyle = "blue";
    ctx.lineCap = "round";
    for (var i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.rotate(Math.PI / 6);
        ctx.moveTo(100, 0);
        ctx.lineTo(120, 0);
        ctx.stroke();
    }
    for (var k = 0; k < 60; k++) {
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.rotate(Math.PI / 30);
        ctx.moveTo(118, 0);
        ctx.lineTo(120, 0);
        ctx.stroke();
    }
    var time = new Date();
    var s = time.getSeconds();
    var m = time.getMinutes();
    var h = time.getHours();
    if (h > 12) {
        h -= 12;
    }
    //                    时针的角度=360/12*小时+360/12/60分钟+360/12/60/60秒;
    //                    换算成弧度
    //                    时针的弧度= π/6*小时+π/360*分钟+π/2160*秒
    ctx.save();
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.rotate(h * (Math.PI / 6) + (Math.PI / 360) * m + (Math.PI / 21600) * s);
    ctx.moveTo(-20, 0);
    ctx.lineTo(80, 0);
    ctx.stroke();
    ctx.restore();
    //                    分针的角度=360/60*分钟+360/60/60*秒
    //                    分针的弧度 =π/30*分钟+π/1800*秒
    ctx.save();
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.rotate((Math.PI / 30) * m + (Math.PI / 1800) * s);
    ctx.moveTo(-20, 0);
    ctx.lineTo(112, 0);
    ctx.stroke();
    ctx.restore();
    //                    秒针的角度=360/60*秒
    ////                    秒针的弧度 =π/30*秒
    ctx.save();
    ctx.lineWidth = 6;
    ctx.strokeStyle = "green";
    ctx.beginPath();
    ctx.rotate((Math.PI / 30) * s);
    ctx.moveTo(-30, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
    ctx.restore();
    //                    在钟表中心绘制一个圆点.
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.restore();
}
setInterval("drawclock()", 1000);
