var cb = function() {
var l = document.createElement('link'); l.rel = 'stylesheet';
l.href = 'http://cdn.materialdesignicons.com/1.4.57/css/materialdesignicons.min.css';
var h = document.getElementsByTagName('head')[0]; h.parentNode.insertBefore(l, h);
};
var raf = requestAnimationFrame || mozRequestAnimationFrame ||
webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(cb);
else window.addEventListener('load', cb);
