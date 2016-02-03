var randomRelatedIndex, showRelatedPost;
! function(e, t, a) {
    var l = {
        widgetTitle: "<h4>Artikel Terkait:</h4>",
        widgetStyle: 1,
        homePage: "http://www.dte.web.id",
        numPosts: 7,
        summaryLength: 370,
        titleLength: "auto",
        thumbnailSize: 72,
        noImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAA3NCSVQICAjb4U/gAAAADElEQVQImWOor68HAAL+AX7vOF2TAAAAAElFTkSuQmCC",
        containerId: "related-post",
        newTabLink: !1,
        moreText: "Baca Selengkapnya",
        callBack: function() {}
    };
    if ("object" == typeof relatedPostConfig)
        for (var i in relatedPostConfig) l[i] = relatedPostConfig[i];
    l.homePage = l.homePage.replace(/\/?\?m=\d+|\/+$/, "");
    var s = function(e) {
            var l = t.createElement("script");
            l.type = "text/javascript", l.src = e, a.appendChild(l)
        },
        r = function(e, t) {
            return Math.floor(Math.random() * (t - e + 1)) + e
        },
        n = function(e) {
            var t, a, l = e.length;
            if (0 === l) return !1;
            for (; --l;) t = Math.floor(Math.random() * (l + 1)), a = e[l], e[l] = e[t], e[t] = a;
            return e
        },
        o = "object" == typeof labelArray && labelArray.length > 0 ? "/-/" + n(labelArray)[0] : "",
        m = function(e) {
            var t = e.feed.openSearch$totalResults.$t - l.numPosts,
                a = r(1, t > 0 ? t : 1);
            s(l.homePage + "/feeds/posts/summary" + o + "?alt=json-in-script&orderby=updated&start-index=" + a + "&max-results=" + l.numPosts + "&callback=showRelatedPost")
        },
        d = function(e) {
            var a, i, s, r, o, m = t.getElementById(l.containerId),
                d = n(e.feed.entry),
                h = l.widgetStyle,
                p = l.widgetTitle + '<ul id="related-post-style-' + h + '">',
                c = l.newTabLink ? ' target="_blank"' : "",
                u = '<span style="display:block;clear:both;"></span>';
            if (m) {
                for (var g = d.length, b = 0; b < l.numPosts && b !== g; b++) {
                    i = d[b].title.$t, s = "auto" !== l.titleLength && l.titleLength < i.length ? i.substring(0, l.titleLength) + "&hellip;" : i, r = "media$thumbnail" in d[b] && l.thumbnailSize !== !1 ? d[b].media$thumbnail.url.replace(/\/s\d+(\-c)?\//, "/s" + l.thumbnailSize + "-c/") : l.noImage, o = "summary" in d[b] && l.summaryLength > 0 ? d[b].summary.$t.replace(/<br *\/?>/gi, " ").replace(/<.*?>/g, "").replace(/[<>]/g, "").substring(0, l.summaryLength) + "&hellip;" : "";
                    for (var A = 0, f = d[b].link.length; f > A; A++)
                        if ("alternate" == d[b].link[A].rel) {
                            a = d[b].link[A].href;
                            break
                        }
                    p += '<li class="related-li"><a title="' + i + '" href="' + a + '"><img alt="' + s + '" class="related-post-item-thumbnail" src="' + r + '" width="' + l.thumbnailSize + '" height="' + l.thumbnailSize + '"/></a><div id="content"><h4 class="related-post-item-title"><a title="' + i + '" href="' + a + '">' + s + '</a></h4><p class="related-post-item-summary">' + o + '</p></div><div class="related-post-item-more"><a href="' + a + '">' + l.moreText + '</a></div></li>'
                }
                m.innerHTML = p += "</ul>" + u, l.callBack(e)
            }
        };
    randomRelatedIndex = m, showRelatedPost = d, s(l.homePage + "/feeds/posts/summary?alt=json-in-script&orderby=updated&max-results=0&callback=randomRelatedIndex")
}(window, document, document.getElementsByTagName("head")[0]);
