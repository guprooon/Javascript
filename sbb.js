	window.oscCounters=function(e){e.addEventListener("DOMContentLoaded",function(t){var n,o=e.querySelectorAll(".osc-counter");if(0!==o.length)return n=new XMLHttpRequest,n.onreadystatechange=function(){4==n.readyState&&200==n.status&&(e.getElementsByTagName("HEAD")[0].insertAdjacentHTML("beforeend",n.responseText),[].forEach.call(o,function(e){var t=e.getAttribute("data-height")||"",n=e.getAttribute("data-url")||window.location.href,o=new XMLHttpRequest;e.style.width=e.getAttribute("data-width")||"",e.style.height=t,e.style.lineHeight=t,e.title="Powered by Lead Stories' OpenShareCount'",e.href="http://leadstories.com/opensharecount",o.onreadystatechange=function(){var t;4===o.readyState&&200===o.status&&(t=JSON.parse(o.responseText),e.childNodes[0].nodeValue=t.count>1e3?Math.floor(t.count/1e3)+"K":t.count)},o.open("GET","//opensharecount.com/count.json?source=bubble&url="+n,!0),o.send()}))},n.open("GET","//opensharecount.com/bubble.css",!0),n.send(),o})}(document);
