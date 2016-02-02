var ca = function() {
var i = document.createElement('script');
i.href = 'https://cdn.rawgit.com/guprooon/Javascript/master/rp.js';
var j = document.getElementsByTagName('article')[0]; j.parentNode.insertBefore(i, j);
};
var rbf = requestAnimationFrame || mozRequestAnimationFrame ||
webkitRequestAnimationFrame || msRequestAnimationFrame;
if (rbf) rbf(ca);
else window.addEventListener('load', ca);
