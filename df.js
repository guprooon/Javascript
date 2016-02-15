var cb = function() {
var l = document.createElement('link'); l.rel = 'stylesheet';
l.href = 'https://github.com/guprooon/Javascript/blob/master/font-face.css';
var h = document.getElementsByTagName('head')[0]; h.parentNode.insertBefore(l, h);
};
var raf = requestAnimationFrame || mozRequestAnimationFrame ||
webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(cb);
else window.addEventListener('load', cb);
