var randomRelatedIndex, showRelatedPost;
! function(e, t, a) {
    var l = {
        widgetTitle: "<h4>Artikel Terkait:</h4>",
        widgetStyle: 1,
        homePage: "http://www.dte.web.id",
        numPosts: 7,
        summaryLength: 370,
        titleLength: "auto",
        thumbnailSize: 1600,
        noImage: "",
        containerId: "related-post",
        newTabLink: !1,
        moreText: "Baca Selengkapnya",
        callBack: function() {}
    };
    if ("object" == typeof relatedPostConfig)
        for (var n in relatedPostConfig) l[n] = relatedPostConfig[n];
    l.homePage = l.homePage.replace(/\/?\?m=\d+|\/+$/, "");
    var r = function(e) {
            var l = t.createElement("script");
            l.type = "text/javascript", l.src = e, a.appendChild(l)
        },
        i = function(e, t) {
            return Math.floor(Math.random() * (t - e + 1)) + e
        },
        o = function(e) {
            var t, a, l = e.length;
            if (0 === l) return !1;
            for (; --l;) t = Math.floor(Math.random() * (l + 1)), a = e[l], e[l] = e[t], e[t] = a;
            return e
        },
        s = "object" == typeof labelArray && labelArray.length > 0 ? "/-/" + o(labelArray)[0] : "",
        d = function(e) {
            var t = e.feed.openSearch$totalResults.$t - l.numPosts,
                a = i(1, t > 0 ? t : 1);
            r(l.homePage + "/feeds/posts/summary" + s + "?alt=json-in-script&orderby=published&start-index=" + a + "&max-results=" + l.numPosts + "&callback=showRelatedPost")
        },
        m = function(e) {
            var a, n, r, i, s, d = t.getElementById(l.containerId),
                m = o(e.feed.entry),
                h = l.widgetStyle,
                c = l.widgetTitle + '<ul id="related-post-style-' + h + '">',
                u = (l.newTabLink ? ' target="_blank"' : "", '<span style="display:block;clear:both;"></span>');
            if (d) {
                for (var g = m.length, A = 0; A < l.numPosts && A !== g; A++) {
                    n = m[A].title.$t, r = "auto" !== l.titleLength && l.titleLength < n.length ? n.substring(0, l.titleLength) + "&hellip;" : n, i = "media$thumbnail" in m[A] && l.thumbnailSize !== !1 ? m[A].media$thumbnail.url.replace(/\/s\d+(\-c)?\//, "/s200-c/") : l.noImage, s = "summary" in m[A] && l.summaryLength > 0 ? m[A].summary.$t.replace(/<br *\/?>/gi, " ").replace(/<.*?>/g, "").replace(/[<>]/g, "").substring(0, l.summaryLength) + "&hellip;" : "";
                    for (var p = 0, f = m[A].link.length; f > p; p++)
                        if ("alternate" == m[A].link[p].rel) {
                            a = m[A].link[p].href;
                            break
                        }
                    c += '<li class="related-li"><a title="' + n + '" href="' + a + '"><img alt="' + r + '" class="related-post-item-thumbnail" src="' + i + '" width="" height="" /></a><div id="content"><h4 class="related-post-item-title"><a title="' + n + '" href="' + a + '">' + r + '</a></h4><p class="related-post-item-summary">' + s + '</p></div><div class="related-post-item-more"><a href="' + a + '">' + l.moreText + "</a></div><div class='clear'/></li>"
                }
                d.innerHTML = c += "</ul>" + u, l.callBack(e)
            }
        };
    randomRelatedIndex = d, showRelatedPost = m, r(l.homePage + "/feeds/posts/summary?alt=json-in-script&orderby=published&max-results=0&callback=randomRelatedIndex")
}(window, document, document.getElementsByTagName("head")[0]);
