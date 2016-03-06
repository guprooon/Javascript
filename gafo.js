  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-50816265-1', 'auto');
  ga('send', 'pageview');
  var cb = function() {
    var l = document.createElement('link'); l.rel = 'stylesheet';
    l.href = 'https://cdn.rawgit.com/guprooon/Javascript/master/fonts.css';
    var h = document.getElementsByTagName('head')[0]; h.insertBefore(l, h.lastChild);
};
var raf = requestAnimationFrame || mozRequestAnimationFrame ||
    webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(cb);
else if (window.addEventListener) window.addEventListener('load', cb);
else if (window.attachEvent) window.attachEvent("onload", cb);
else window.onload = cb;
