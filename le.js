var mf_defaults = {
    feedsUri: [{
        name: "Artikel",
        url: "http://pintasanoke.blogspot.com",
        tag: "Artikel"
    }],
    numPost: 20,
    showSummary: true,
    summaryLength: 80,
    titleLength: "auto",
    newTabLink: false,
    containerId: "list-articles",
    listClass: "list-entries",
    readMore: {
        text: "More",
        endParam: "?max-results=20"
    },
    autoHeight: false,
    current: 0,
    onLoadFeed: function(a) {},
    onLoadComplete: function() {},
    loadFeed: function(c) {
        var d = document.getElementsByTagName("head")[0],
            a = document.getElementById(this.containerId),
            b = document.createElement("script");
        b.type = "text/javascript";
        b.src = this.feedsUri[c].url + "/feeds/posts/summary" + (this.feedsUri[c].tag ? "/-/" + this.feedsUri[c].tag : "") + "?alt=json-in-script&orderby=updated&max-results=" + this.numPost + "&callback=listEntries";
        d.appendChild(b)
    }
};
for (var i in mf_defaults) {
    mf_defaults[i] = (typeof(multiFeed[i]) !== undefined && typeof(multiFeed[i]) !== "undefined") ? multiFeed[i] : mf_defaults[i]
}

function listEntries(q) {
    var p = q.feed.entry,
        c = mf_defaults,
        h = document.getElementById(c.containerId),
        a = document.createElement("div"),
        d = "<ul>",
        l = c.feedsUri.length,
        n, k, m, o, r, z;
    for (var f = 0; f < c.numPost; f++) {
        if (f == p.length) {
            break
        }
        n = (c.titleLength !== "auto") ? p[f].title.$t.substring(0, c.titleLength) + (c.titleLength < p[f].title.$t.length ? "&hellip;" : "") : p[f].title.$t;
        m = ("summary" in p[f]) ? p[f].summary.$t.replace(/<br ?\/?>/g, " ").replace(/<.*?>/g, "").replace(/[<>]/g, "") : "";
        m = (c.summaryLength < m.length) ? m.substring(0, c.summaryLength) + "&hellip;" : m;
        o = p[f].published.$t.substring(0, 10).replace(/-/g, "/");
        for (var e = 0, b = p[f].link.length; e < b; e++) {
            k = (p[f].link[e].rel == "alternate") ? p[f].link[e].href : "#"
        }
        for (var y = 0; y < p[f].category.length; y++) {
            z = p[f].category[y].term;
        }
        d += '<li>';
        d += '<div class="konten"><div class="judul"><a href="' + k + '"' + (c.newTabLink ? ' target="_blank"' : "") + ">" + n + "</a></div>";
        d += '<div class="deskripsi">';
        d += "<span" + (!c.showSummary ? ' style="display:none;"' : "") + ">";
        d += (c.showSummary) ? m : "";
        d += "</span></div>";
        d += '<div class="tanggal"><span>' + o + '</span></div>';
        d += '<div class="komentar"><span>' + z + '</span></div></div>';
        d += '<span style="display:block;clear:both;"></span></li>'
    }
    d += "</ul>";
    a.className = c.listClass;
    a.innerHTML = d;
    h.appendChild(a);
    c.onLoadFeed(c.current);
    if ((c.current + 1) < l) {
        c.loadFeed(c.current + 1)
    }
    if ((c.current + 1) == l) {
        c.onLoadComplete()
    }
    c.current++
}
mf_defaults.loadFeed(0);

