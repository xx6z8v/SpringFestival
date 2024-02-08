$(function () {
var canvas = $('#canvas')[0];
canvas.width = $(window).width();
canvas.height = $(window).height();
var ctx = canvas.getContext('2d');

// resize
$(window).on('resize', function () {
canvas.width = $(window).width();
canvas.height = $(window).height();
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// init
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvas.width, canvas.height);
// objects
var listFire = [];
var listFirework = [];
var fireNumber = 10;
var center = { x: canvas.width / 2, y: canvas.height / 2 };
var range = 100;
for (var i = 0; i < fireNumber; i++) {
var fire = {
x: Math.random() * range / 2 - range / 4 + center.x,
y: Math.random() * range * 2 + canvas.height,
size: Math.random() + 0.5,
fill: '#fd1',
vx: Math.random() - 0.5,
vy: -(Math.random() + 4),
ax: Math.random() * 0.02 - 0.01,
far: Math.random() * range + (center.y - range)
};
fire.base = {
x: fire.x,
y: fire.y,
vx: fire.vx
};
//
listFire.push(fire);
}

function randColor() {
var r = Math.floor(Math.random() * 256);
var g = Math.floor(Math.random() * 256);
var b = Math.floor(Math.random() * 256);
var color = 'rgb($r, $g, $b)';
color = color.replace('$r', r);
color = color.replace('$g', g);
color = color.replace('$b', b);
return color;
}

(function loop() {
requestAnimationFrame(loop);
update();
draw();
})();

function update() {
for (var i = 0; i < listFire.length; i++) {
var fire = listFire[i];
//
if (fire.y <= fire.far) {
// case add firework
var color = randColor();
for (var i = 0; i < fireNumber * 5; i++) {
var firework = {
x: fire.x,
y: fire.y,
size: Math.random() + 1.5,
fill: color,
vx: Math.random() * 5 - 2.5,
vy: Math.random() * -5 + 1.5,
ay: 0.05,
alpha: 1,
life: Math.round(Math.random() * range / 2) + range / 2
};
firework.base = {
life: firework.life,
size: firework.size
};
listFirework.push(firework);
}
// reset
fire.y = fire.base.y;
fire.x = fire.base.x;
fire.vx = fire.base.vx;
fire.ax = Math.random() * 0.02 - 0.01;
}
//
fire.x += fire.vx;
fire.y += fire.vy;
fire.vx += fire.ax;
}

for (var i = listFirework.length - 1; i >= 0; i--) {
var firework = listFirework[i];
if (firework) {
firework.x += firework.vx;
firework.y += firework.vy;
firework.vy += firework.ay;
firework.alpha = firework.life / firework.base.life;
firework.size = firework.alpha * firework.base.size;
firework.alpha = firework.alpha > 0.6 ? 1 : firework.alpha;
//
firework.life--;
if (firework.life <= 0) {
listFirework.splice(i, 1);
}
}
}
}

function draw() {
// clear
ctx.globalCompositeOperation = 'source-over';
ctx.globalAlpha = 0.18;
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// re-draw
ctx.globalCompositeOperation = 'screen';
ctx.globalAlpha = 1;
for (var i = 0; i < listFire.length; i++) {
var fire = listFire[i];
ctx.beginPath();
ctx.arc(fire.x, fire.y, fire.size, 0, Math.PI * 2);
ctx.closePath();
ctx.fillStyle = fire.fill;
ctx.fill();
}

for (var i = 0; i < listFirework.length; i++) {
var firework = listFirework[i];
ctx.globalAlpha = firework.alpha;
ctx.beginPath();
ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
ctx.closePath();
ctx.fillStyle = firework.fill;
ctx.fill();
}
}
})
//音乐
$(document).ready(function () {
var audioElement = document.createElement('audio');
audioElement.setAttribute('src', $('.active-song').attr('data-src'));

var tl = new TimelineMax();
tl.to('.player__albumImg', 3, {
rotation: '360deg',
repeat: -1,
ease: Power0.easeNone
}, '-=0.2');
tl.pause();



if ($('.player').hasClass('play')) {
$('.player').removeClass('play');
audioElement.pause();
TweenMax.to('.player__albumImg', 0.2, {
scale: 1,
ease: Power0.easeNone
})
tl.pause();
} else {
$('.player').addClass('play');
audioElement.play();
TweenMax.to('.player__albumImg', 0.2, {
scale: 1.1,
ease: Power0.easeNone
})
tl.resume();
}
$('.player__play').click(function () {

if ($('.player').hasClass('play')) {
$('.player').removeClass('play');
audioElement.pause();
TweenMax.to('.player__albumImg', 0.2, {
scale: 1,
ease: Power0.easeNone
})
tl.pause();
} else {
$('.player').addClass('play');
audioElement.play();
TweenMax.to('.player__albumImg', 0.2, {
scale: 1.1,
ease: Power0.easeNone
})
tl.resume();
}
})

function updateInfo() {
$('.player__author').text($('.active-song').attr('data-author'));
$('.player__song').text($('.active-song').attr('data-song'));
}
updateInfo();
});
// 文字
$.fn.autotype = function () {
var $text = $(this);
console.log('this', this);
var str = $text.html(); //返回被选 元素的内容
var index = 0;
var x = $text.html('');
//$text.html()和$(this).html('')有区别
var timer = setInterval(function () {
//substr(index, 1) 方法在字符串中抽取从index下标开始的一个的字符
var current = str.substr(index, 1);
if (current == '<') {
//indexOf() 方法返回">"在字符串中首次出现的位置。
index = str.indexOf('>', index) + 1;
} else {
index++;
}
//console.log(["0到index下标下的字符",str.substring(0, index)],["符号",index & 1 ? '_': '']);
//substring() 方法用于提取字符串中介于两个指定下标之间的字符
$text.html(str.substring(0, index) + (index & 1 ? '_' : ''));
if (index >= str.length) {
clearInterval(timer);
}
},
100);
};
$("#autotype").autotype();
