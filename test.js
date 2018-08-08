function leftmenu() {
  $("li.more-label").html($(".more-label-name"));
  $('.menu').each(function() {
    $(this).mouseover(function() {
      $('.menu').removeClass('focus');
      $(this).addClass('focus');
    }).click(function() {
      if($(this).hasClass('active')) {
        $(this).removeClass('active');
      } else {
        $('.menu').removeClass('active');
        $(this).addClass('active');
      }
    });
    if($(this).find('a').attr('href') === window.location.href) {
      $(this).addClass('selected');
    }
  });
}

function labelmenu() {
  var showmm = $('.mm-config').attr('data-show'),
      stylemm1 = $('.mm-config').attr('data-style-list'),
      stylemm2 = $('.mm-config').attr('data-style-grid'),
      stylemm3 = $('.mm-config').attr('data-style-submenu'),
      arr1 = stylemm1.split(","),
      arr2 = stylemm2.split(","),
      arr3 = stylemm3.split(",");

  $(".label .menu").each(function() {
    var label = $(this).find("a").text().replace(/[0-9]/g, "").replace(/\n/g, "");

    if($(window).width() > 1100) {
      $('body').addClass('resized');
      $(this).one('mouseover', function() {
        $('.mega-menu-label').removeClass('first second third more');
        if(showmm === "auto") {
          $('.mega-menu-label').addClass('first');
        } else if(showmm === "true") {
          if(arr1.indexOf(label) > -1) {
            $('.mega-menu-label').addClass('first');
          } else if(arr2.indexOf(label) > -1) {
            $('.mega-menu-label').addClass('second');
          } else if(arr3.indexOf(label) > -1) {
            $('.mega-menu-label').addClass('third');
      		$('.third.mega-menu-label').append('<div class="third mega-content ' + label + '"><ul></ul></div>');
          } else {
			return
          }
        }
		megalabelmenu(label);
    	sublabelmenu(label);
      });
    }

    $(this).on('mouseover', function() {
      $('.mega-menu-label,.list-sub-label,.mega-content,.mega-menu-sublabel,.mega-sublabel-content.' + label).removeClass('first second third show more');
      if($(this).hasClass('more-label')) {
        if(!$('.mega-content.categories')[0]) {
          $('.mega-menu-label').append("<div class='mega-content categories'>" + $('#Label2').html() + "</div>");
        }
        $('.mega-menu-label,.mega-content.categories').addClass('more show');
      } else {
        if($(window).width() > 1100) {
          if(showmm === "auto") {
            $('.mega-menu-label,.sub-label-' + label).addClass('first show');
          } else if(showmm === "true") {
            if(arr1.indexOf(label) > -1) {
              $('.mega-menu-label,.sub-label-' + label).addClass('first show');
            } else if(arr2.indexOf(label) > -1) {
              $('.mega-menu-label,.sub-label-' + label).addClass('second show');
            } else if(arr3.indexOf(label) > -1) {
              $('.mega-menu-label,.mega-menu-sublabel').addClass('third show');
            } else {
			  return
          	}
          }
          if($('.mega-menu-label').hasClass('third')){
            var sublabel = $('.mega-content.' + label + ' li.focus').find('a span').text();
			$('.mega-content.' + label).addClass('show');
            $('.mega-sublabel-content').removeClass('show');
            $('.mega-sublabel-content.' + sublabel).addClass('show');
            $('.mega-menu-label .mega-search').removeClass('show');
            $('.mega-menu-sublabel .mega-search').addClass('show');
          } else {
            if($('.sub-label-' + label)[0]) {
              $('.sub-label-' + label + ' a').each(function() {
                var sublabel = $(this).text().replace(/[0-9]/g, "").replace(/\n/g, "");
                if($(this).hasClass('focus')) {
                  $('.mega-content').removeClass('show');
                  $('.mega-content.' + sublabel).addClass('show');
                }
              });
            } else if($('.mega-menu-label').hasClass('more')){
              $('.mega-menu-label .mega-search').removeClass('show');
            } else {
              $('.mega-content.' + label).addClass('show');
            }
          $('.mega-menu-label .mega-search').addClass('show');
          }
        }
      }
      mmconfig(label);
      showmegascrollbar(label);
    });
  });

  $("*").mouseover(function(event) {
    if(!$(event.target).closest('.mega-menu-label,.mega-menu-sublabel,ul.label,.sb-scrollbar').length) {
      $('.mega-menu-label').removeClass('show');
      $('.mega-menu-sublabel').removeClass('third show');
      $('.mega-sublabel-content').removeClass('third show');
      $('.third .mega-content li li').removeClass('hover');
      if(!$(event.target).closest('.menu,.dropdown-menu,.dropdown,.sb-scrollbar').length) {
        $('.menu').removeClass('focus');
        $('.dropdown-menu').removeClass('show');
        $(".dd-simple").removeClass('show');
        $('.dropdown .menu').removeClass('focus');
      }
    }
  });
}

function sublabelmenu(label) {
  $('.sl-config').each(function() {
    var labelmarked = $(this).attr('data-label'),
        sublabel = $(this).attr('data-sublabel'),
		maxsublabel = $(this).attr('data-max-sublabel-show'),
        array = sublabel.split(","),
		array1 = sublabel.split(";"),
        array2 = (sublabel.indexOf(";") != -1) ? sublabel.split(";") : sublabel.split(",");


    if($('.mega-menu-label').hasClass('third')){
      if(labelmarked === label) {
        $('.third .mega-content.' + label + ' ul').prepend('<li class="focus fa fas fal far fab"><a class="sublabel-menu" href="/search/label/' + label + '?&max-results=20"><span>' + label + '</span></a></li>');
        if(sublabel.indexOf(':') && sublabel.indexOf(';')) {
          $.each(array1, function(e) {
            $('.third .mega-content.' + label + ' ul').append('<li class="fa fas fal far fab"><a class="sublabel-menu" href="#"><span>' + array1[e] + '</span></a></li>');
          });

          $('.third .mega-content.' + label + ' li').each(function() {
            var $this = $(this),
                sublabel2 = $this.text(),
                valuesublabel2 = (sublabel2.indexOf(':') != -1) ? sublabel2.replace(sublabel2.substring(0, sublabel2.indexOf(':') + 1), "") : "",
                namesublabel2 = (sublabel2.indexOf(':') != -1) ? sublabel2.replace(sublabel2.substring(sublabel2.indexOf(':')), "") : sublabel2,
                array2 = valuesublabel2.split(",");

            $this.find('a.sublabel-menu span').html(namesublabel2);
            $this.find('a.sublabel-menu').attr('href', '/search/label/' + namesublabel2 + '?&max-results=20');
            if(valuesublabel2 !== "") {
              $this.append('<i class="fa fas fal far fab"/><ul></ul>');
              $.each(array2, function(e) {
                $this.find('ul').append('<li><a href="/search/label/' + array2[e] + '?&max-results=20">' + array2[e] + '</a></li>');
              });
            }

            $this.find('i').click(function() {
              $this.toggleClass('open');
              $this.trigger('mouseover');
            });

            $this.mouseover(function() {
              var tag = $this.find('a.sublabel-menu span').text();

              $('.third .mega-content.' + label + ' li').removeClass('focus');
              $this.addClass('focus');
              if($this.hasClass('open')) {
                $this.find('a.sublabel-menu').mouseover(function() {
                  $('.third .mega-content.' + label + ' li li,.mega-sublabel-content').removeClass('hover show');
                  $('.mega-menu-sublabel,.mega-sublabel-content.' + tag).addClass('third show');
          		  $('.mega-menu-label .mega-search').attr('data-label',tag);
                });
                $this.find('ul li').each(function() {
                  var tag2 = $(this).find('a').text();
                  $(this).mouseover(function() {
                    $('.mega-sublabel-content,.third .mega-content.' + label + ' li li').removeClass('hover show');
                    $(this).addClass('hover');
                    if(!$(".mega-sublabel-content." + tag2)[0]) {
					  megalabelmenu(tag2);
                    }
                    $('.mega-menu-sublabel,.mega-sublabel-content.' + tag2).addClass('third show');
          			$('.mega-menu-label .mega-search').attr('data-label',tag2);
                  });
                });
              } else {
                $('.mega-sublabel-content,.third .mega-content.' + label + ' li li').removeClass('hover show');
                if(!$(".mega-sublabel-content." + tag)[0]) {
				  megalabelmenu(tag);
                }
                $('.mega-menu-sublabel,.mega-sublabel-content.' + tag).addClass('third show');
                $('.mega-menu-label .mega-search').attr('data-label',tag);
              }
            });
          });
        } else {
          $.each(array, function(e) {
            $('.third .mega-content.' + label + ' ul').append('<li class="fa fas fal far fab"><a href="/search/label/' + array[e] + '?&max-results=20"><span>' + array[e] + '</span></a></li>');
          })
        }
            if(!$(".mega-sublabel-content." + label)[0]) {
			  megalabelmenu(label);
            }
            $('.mega-menu-sublabel,.mega-sublabel-content.' + label).addClass('third show');
      }
    } else {
      if(!$('.sub-label-' + labelmarked).hasClass('marked')) {
        $.each(array2, function(e) {
            $('.sub-label-' + labelmarked).append('<a class="fa fas fal far fab" href="/search/label/' + array2[e] + '?&max-results=20"><span>' + array2[e] + '</span></a>');
        });        
        $('.sub-label-' + labelmarked).addClass('marked');
        if(typeof maxsublabel !== typeof undefined && maxsublabel !== false  && maxsublabel !== ""){
          maxsublabel = parseInt(maxsublabel);
          var listlength = parseInt($('.sub-label-' + labelmarked + ' a').length);
          if(listlength > maxsublabel){
              $('.sub-label-' + labelmarked).append('<span class="more-dot fa fas fal far fab"><span class="more-dot-content"></span></span>');
              $('.sub-label-' + labelmarked).each(function(){
                var morehtml= $(this).find('.more-dot .more-dot-content');			
                $('.sub-label-' + labelmarked + ' a').each(function(index){
                  if(index > (maxsublabel - 1)){
                    $(this).appendTo(morehtml);
                  }
                });
              });
            $('.sub-label-' + labelmarked + ' span.more-dot').click(function(){
              $(this).toggleClass('show');
            }).mouseleave(function(){
              $(this).removeClass('show');
            });
          }
        }
      }

      $('.list-sub-label a').each(function() {
        var labelmarked2 = $(this).text().replace(/[0-9]/g, "").replace(/\n/g, ""),
            sublabel1 = $(this).find('span').text(),
            sublabel1 = (sublabel1.indexOf(':') != -1) ? sublabel1.replace(sublabel1.substring(sublabel1.indexOf(':')), "") : sublabel1;
        $(this).find('span').text(sublabel1);

        $(this).mouseover(function() {
          $('.list-sub-label.show a,.mega-menu-label .mega-content').removeClass('focus show');
          $(this).addClass('focus');
          if(!$("#mega-menu-" + labelmarked2)[0]) {
			megalabelmenu(labelmarked2);
          }
          $('.mega-menu-label .mega-content.' + labelmarked2).addClass('show'),
          showmegascrollbar(labelmarked2);
          $('.mega-menu-label .mega-search').attr('data-label',labelmarked2);
        });
      });
      $('.sub-label' + label + ' a:contains("' + label + '")').addClass('focus');
    }
  });
}

function megalabelmenu(label) {
  var max = $('.mm-post-config').attr('data-max-post');

  if(!$('.mega-menu-label').hasClass('third')) {
    $("head").append('<script src="/feeds/posts/default/-/' + label + '?alt=json-in-script&start-index=1&max-results=' + max + '&order-by=published&callback=createmegalabelmenu" id="mega-menu-' + label + '" type="text/javascript"/>');
    $('.mega-content').each(function() {
      if($(this).attr('class') === "mega-content") {
        $(this).addClass(label);
      }
    });
    $('.mega-menu-label .mega-search').after('<div class="list-sub-label sub-label-' + label + '"><a class="focus fa fas fal far fab" href="/search/label/' + label + '?&max-results=20"><span>' + label + '</span></a></div>');
  } else {
    $("head").append('<script src="/feeds/posts/default/-/' + label + '?alt=json-in-script&start-index=1&max-results=' + max + '&order-by=published&callback=createmegalabelmenu" id="mega-sublabel-' + label + '" type="text/javascript"/>');
    $('.mega-sublabel-content').each(function() {
      if($(this).attr('class') === "mega-sublabel-content") {
        $(this).addClass(label);
      }
    });
  }
  $('.mega-menu-label .mega-search').attr('data-label',label);
  mmconfig(label);
}

function showmegascrollbar(label) {
  if($(".mega-content." + label + " ul").outerHeight(true) > $(".mega-content." + label).height()) {
    $(".mega-content." + label).scrollBox();
    $(".mega-content." + label).find('.sb-scrollbar').addClass('show');
  } else {
    $(".mega-content." + label).find('.sb-scrollbar').removeClass('show');
  }
}

function dropdownmenu() {
  var ddm = $('.ddm-config'),
    simple = ddm.attr('data-simple'),
    complex = ddm.attr('data-complex'),
    arrsimple = simple.split(','),
    arrcomplex = simple.split(',');

  $('.dropdown .menu').each(function() {
    var menu = $(this).find('a').text(),
      top = $(this).offset().top;

    $(this).mouseover(function() {
      if(arrsimple.indexOf(menu) > -1) {
        $('.sm-config').each(function() {
          var sm = $(this),
            smname = sm.attr('data-menu'),
            smitem = sm.attr('data-submenu'),
            arraysm = smitem.split(',');

          if(smname === menu) {
            if($(".dd-simple." + menu)[0]) {
              $(".dd-simple").removeClass('show');
              $(".dd-simple." + menu).addClass('show');
            } else {
              $(".dd-simple").removeClass('show');
              $('.dropdown-menu').append('<div class="dd-simple ' + menu + ' show"><ul/></div>');
              $.each(arraysm, function(e) {
                $(".dd-simple." + menu + " ul").append('<li><a href="#">' + arraysm[e] + '</a></li>');
              });
              $(".dd-simple." + menu + " li").each(function() {
                var menu2 = $(this).find('a').text(),
                  name1 = menu2.substring(menu2.indexOf('[') + 1, menu2.indexOf('=')),
                  link1 = menu2.substring(menu2.indexOf('=') + 1, menu2.indexOf(']'));
                $(this).find('a').attr('href', link1);
                $(this).find('a').text(name1);
              });
            }
            $('.dropdown-menu').css({
              'top': top - 20 + "px"
            });
            $('.dropdown-menu').addClass('show');
          }
        });
      } else if(arrcomplex.indexOf(menu) > -1) {
        $('.dropdown-menu').removeClass('show');
      } else {
        $('.dropdown-menu').removeClass('show');
      }
    });
  });
}

function mmconfig(label) {
  var megamenu = $('.mega-menu-label'),
    first = $('.mm1-config'),
    second = $('.mm2-config'),
    third = $('.mm3-config'),
    more = $('.mm-more-config'),
	mmwidth = 'data-megamenu-width',
	mmimg = 'data-image-show',
	mmimgwidth = 'data-image-width',
	mmimgheight = 'data-image-height',
	mmimgcrop = 'data-image-crop',
	mmimgres = 'data-image-resolution',
	mmliheight = 'data-post-height',
	mmliwidth = 'data-post-width',
    firstmmwidth = first.attr(mmwidth),
    firstimg = first.attr(mmimg),
    firstimgwidth = first.attr(mmimgwidth),
    firstimgheight = first.attr(mmimgheight),
    firstimgcrop = first.attr(mmimgcrop),
    firstimgresolution = first.attr(mmimgres),
    secondmmwidth = second.attr(mmwidth),
    secondimgwidth = second.attr(mmimgwidth),
    secondimgheight = second.attr(mmimgheight),
    secondimgcrop = second.attr(mmimgcrop),
    secondliwidth = second.attr(mmliwidth),
    secondliheight = second.attr(mmliheight),
    secondimgresolution = second.attr(mmimgres),
    thirdimgwidth = third.attr(mmimgwidth),
    thirdimgheight = third.attr(mmimgheight),
    moremmwidth = more.attr(mmwidth);

  $('.mega-menu-label,.mega-menu-label *').removeAttr('style');
  if(megamenu.hasClass('first')) {

    $('.first.mega-menu-label').css({"width": firstmmwidth});
    $('.img-mm').removeClass('first second third fourth fifth');
    $('.img-mm').addClass('first');
    $('.first.img-mm').css({"width": firstimgwidth,"height": firstimgheight});
    $('.first li .content').css({"margin-left": ((firstimg !== "true") ? "20px" : parseInt(firstimgwidth.replace(/^\D+/g, ''))) + 20 + "px"});
    $('img.img-mm').each(function() {
      var src1 = $(this).attr('src'),
      	  imgsrc1 = (src1.indexOf("-c/") != -1) ? src1.substring(src1.indexOf(src1.match(/[/][s]\d/g)) + 2, src1.indexOf("-c/") + 2) : src1.substring(src1.indexOf(src1.match(/[/][s]\d/g)) + 2, src1.lastIndexOf("/"));
      (firstimgcrop === "true") ? $(this).attr('src', src1.replace("s" + imgsrc1, "s" + firstimgresolution + "-c")) : $(this).attr('src', src1.replace("s" + imgsrc1, "s" + firstimgresolution));
      $(this).css({"width": firstimgwidth,"height": firstimgheight});
    });

  } else if(megamenu.hasClass('second')) {

    $('.second.mega-menu-label').css({"width": secondmmwidth});
    $('.img-mm').removeClass('first second third fourth fifth');
    $('.img-mm').addClass('second');
    $('.second.img-mm').css({"width": secondimgwidth,"height": secondimgheight});
    $('.second li').css({"width": secondliwidth,"height": secondliheight});
    $('img.img-mm').each(function() {
      var src2 = $(this).attr('src'),
		  imgsrc2 = (src2.indexOf("-c/") != -1) ? src2.substring(src2.indexOf(src2.match(/[/][s]\d/g)) + 2, src2.indexOf("-c/") + 2) : src2.substring(src2.indexOf(src2.match(/[/][s]\d/g)) + 2, src2.lastIndexOf("/"));
      (secondimgcrop === "true") ? $(this).attr('src', src2.replace("s" + imgsrc2, "s" + secondimgresolution + "-c")) : $(this).attr('src', src2.replace("s" + imgsrc2, "s" + secondimgresolution));
      $(this).css({"width": secondimgwidth,"height": secondimgheight});
    });

  } else if(megamenu.hasClass('third')) {

    $('.img-mmsl').css({"width": thirdimgwidth,"height": thirdimgheight});
    $('.mega-sublabel-content li .content').css({"margin-right": parseInt(thirdimgwidth.replace(/^\D+/g, '')) + 15 + "px"});

  } else if(megamenu.hasClass('more')) {

    $('.more.mega-menu-label').css({"width": moremmwidth});
    $('.cloud-label-widget-content .label-size').each(function() {
      $(this).mouseover(function() {
        $(this).addClass('focus');
      }).mouseleave(function() {
        $(this).removeClass('focus');
      });
      if($(this).find('a').attr('href') === window.location.href) {
        $(this).addClass('selected');
      }
    });
    $('.more .list-label-widget-content li').each(function() {
      $(this).mouseover(function() {
        $(this).addClass('focus');
      }).mouseleave(function() {
        $(this).removeClass('focus');
      });
      if($(this).find('a').attr('href') === window.location.href) {
        $(this).addClass('selected');
      }
    });
  }
  $('.mega-search').click(function(){
	$(this).find('form').addClass('focus')
  });
  $('*').click(function(e){
    if(!$(e.target).closest('.mega-search form').length){
	  $('.mega-search form').removeClass('focus')
    }
  });
  $('*').mouseover(function(e){
    if(!$(e.target).closest('.mega-menu-label,.mega-menu-sublabel').length){
	  $('.mega-search form').removeClass('focus')
    }
  });
}


function createmegalabelmenu(json) {

  var feed = json.feed.entry,
      mega = $(".mega-menu-label"),
      megasl = $(".mega-menu-sublabel"),
      jsn = $(".just-now-text").text(),
      mian = $(".minute-text").text(),
      han = $(".hour-text").text(),
      ysn = $(".yesterday-text").text(),
      dan = $(".day-text").text(),
      wan = $(".week-text").text(),
      man = $(".month-text").text(),
      yan = $(".year-text").text(),
      lbs = "data-label-show",
      imr = "data-image-resolution",
      imw = "data-image-width",
      imh = "data-image-height",
      imc = "data-image-crop",
      ims = "data-image-show",
      sml = "data-summary-length",
      sms = "data-summary-show",
      style1 = $(".mm1-config"),
      tag1 = style1.attr(lbs),
      imgres1 = style1.attr(imr),
      imgwidth1 = style1.attr(imw),
      imgheight1 = style1.attr(imh),
      imgcrop1 = style1.attr(imc),
      img1 = style1.attr(ims),
      desclength1 = style1.attr(sml),
      desc1 = style1.attr(sms),
      style2 = $(".mm2-config"),
      tag2 = style2.attr(lbs),
      imgres2 = style2.attr(imr),
      imgwidth2 = style2.attr(imw),
      imgheight2 = style2.attr(imh),
      imgcrop2 = style2.attr(imc),
      img2 = style2.attr(ims),
      desclength2 = style2.attr(sml),
      desc2 = style2.attr(sms),
      style3 = $(".mm3-config"),
      tag3 = style3.attr(lbs),
      imgres3 = style3.attr(imr),
      imgwidth3 = style3.attr(imw),
      imgheight3 = style3.attr(imh),
      imgcrop3 = style3.attr(imc),
      img3 = style3.attr(ims),
      desclength3 = style3.attr(sml),
      desc3 = style3.attr(sms),
      postcfg = $('.mm-post-config'),
      taglength = parseInt(postcfg.attr("data-label-length")),
      tagtextin = postcfg.attr("data-label-text-in"),
      tagtextand = postcfg.attr("data-label-text-and"),
      tagtextmore = postcfg.attr("data-label-text-more"),
      pts, pt, jp, mp, dp, bp, tp, hp, nt, jn, mn, dn, bn, tn, hn, thp, thpn, tahun, bulan, hari, jam, menit, detik, 
	  time,snippet, img, link, title, date, label, labels = "", html = "";


  if(typeof feed !== "undefined") {
    for(var a = 0; a < feed.length; a++) {

      for(var b = 0, c = feed[a].link.length; b < c; b++) {
        link = (feed[a].link[b].rel == "alternate") ? feed[a].link[b].href : "#";
      }

      label = "<div class='tag'>" + tagtextin + " ";
      var y = feed[a].category,
          z = taglength;

      if(y.length > 2 || z == 0) {
        if(y.length <= z || z == 0) {
          for(var x = 0; x < y.length; x++) {
            if(x == y.length - 1) {
              label += '<a href="/search/label/' + y[x].term + '?&max-results=20">' + y[x].term + '</a>';
            } else if(x == y.length - 2) {
              label += '<a href="/search/label/' + y[x].term + '?&max-results=20">' + y[x].term + '</a> ' + tagtextand + ' ';
            } else {
              label += '<a href="/search/label/' + y[x].term + '?&max-results=20">' + y[x].term + '</a>, ';
            }
          }
        } else {
          for(var x = 0; x < z; x++) {
            if(x == z - 1) {
              label += '<a href="/search/label/' + y[x].term + '?&max-results=20">' + y[x].term + '</a> ' + tagtextmore;
            } else {
              label += '<a href="/search/label/' + y[x].term + '?&max-results=20">' + y[x].term + '</a>, ';
            }
          }
        }
      } else if(y.length == 2) {
        for(var x = 0; x < y.length; x++) {
          if(x == y.length - 1) {
            label += '<a href="/search/label/' + y[x].term + '?&max-results=20">' + y[x].term + '</a>';
          } else {
            label += '<a href="/search/label/' + y[x].term + '?&max-results=20">' + y[x].term + '</a> ' + tagtextand + ' ';
          }
        }
      } else {
        for(var x = 0; x < y.length; x++) {
          label += '<a href="/search/label/' + y[x].term + '?&max-results=20">' + y[x].term + '</a>';
        }
      }
      label += "</div>";

      pts = feed[a].published.$t,
      pt = new Date(pts);
      jp = pt.getHours();
      mp = pt.getMinutes();
      dp = pt.getSeconds();
      bp = pt.getMonth() + 1;
      tp = pt.getYear();
      hp = pt.getDate();
      nt = new Date;
      jn = nt.getHours();
      mn = nt.getMinutes();
      dn = nt.getSeconds();
      bn = nt.getMonth() + 1;
      tn = nt.getYear();
      hn = nt.getDate();
      thp = getDaysInMonth(bp, tp) - hp;
      thpn = hn + thp;
      tahun = tn - tp;
      bulan = bp > bn ? bn + 12 - bp : bn - bp;
      hari = hp > hn ? hn + 31 - hp : hn - hp;
      jam = (hari = bp == bn ? hn - hp : hari, jp > jn ? jn + 24 - jp : jn - jp);
      menit = mp > mn ? mn + 60 - mp : mn - mp;
      detik = dp > dn ? dn + 60 - dp : dn - dp;
      time = "";

      title = feed[a].title.$t;
      img = feed[a].media$thumbnail.url;
      snippet = feed[a].content.$t.replace(/<^img?\/?>/ig, "").replace(/<(pre)[^>]*>.*<\/\1>/ig, " ").replace(/(<([^>]+)>)/ig, " ").replace(/<^.*?\/?>/ig, "");

      if(mega.hasClass('first')) {
        img = (imgcrop1 === 'true') ? img.replace('s72-c', 's' + imgres1 + '-c') : img.replace('s72-c', 's' + imgres1);
        img = (img1 === "true") ? "<div class='first img-mm'><a class='first img-mm' href='" + link + "' target='_blank'><img class='first img-mm' src='" + img + "'/></a></div>" : "";
        snippet = (desclength1 === '' || desclength1 === '0') ? snippet.substr(0, 100) + '...' : (desclength1 === '.') ? snippet.substr(0, snippet.indexOf('.') + 1) : snippet.substr(0, desclength1) + '...';
        snippet = (desc1 === "true") ? "<p>" + snippet + "</p>" : "";
        labels = (tag1 === "true") ? label : "";
      } else if(mega.hasClass('second')) {
        img = (imgcrop2 === 'true') ? img.replace('s72-c', 's' + imgres2 + '-c') : img.replace('s72-c', 's' + imgres2);
        img = (img2 === "true") ? "<div class='second img-mm'><a class='second img-mm' href='" + link + "' target='_blank'><img class='second img-mm' src='" + img + "'/></a></div>" : "";
        snippet = (desclength2 === '' || desclength2 === '0') ? snippet.substr(0, 100) + '...' : (desclength2 === '.') ? snippet.substr(0, snippet.indexOf('.') + 1) : snippet.substr(0, desclength2) + '...';
        snippet = (desc2 === "true") ? "<p>" + snippet + "</p>" : "";
        labels = (tag2 === "true") ? label : "";
      } else if(mega.hasClass('third')) {
        img = (imgcrop3 === 'true') ? img.replace('s72-c', 's' + imgres3 + '-c') : img.replace('s72-c', 's' + imgres3);
        img = (img3 === "true") ? "<div class='third img-mmsl'><a class='third img-mmsl' href='" + link + "' target='_blank'><img class='third img-mmsl' src='" + img + "'/></a></div>" : "";
        snippet = (desclength3 === '' || desclength3 === '0') ? snippet.substr(0, 100) + '...' : (desclength3 === '.') ? snippet.substr(0, snippet.indexOf('.') + 1) : snippet.substr(0, desclength3) + '...';
        snippet = (desc3 === "true") ? "<p>" + snippet + "</p>" : "";
        labels = (tag3 === "true") ? label : "";
      }

      tp == tn ? bp == bn ? hp == hn ? time = jp == jn ? mp == mn ? jsn : mn - mp < 1 ? jsn : menit + " " + mian : jn - jp < 1 && menit < 60 ? menit + " " + mian : jam + " " + han : hari < 7 ? hn - hp < 1 && jam < 24 ? time = jam + " " + han : hari < 2 && jam < 48 ? time = ysn : jam < 72 ? time = hari + " " + dan : jam < 96 ? time = hari + " " + dan : jam < 120 ? time = hari + " " + dan : jam < 144 ? time = hari + " " + dan : jam < 168 && (time = hari + " " + dan) : time = hari < 14 ? "1 " + wan : hari < 21 ? "2 " + wan : "3 " + wan : time = thpn < 31 ? thpn < 7 ? hari + " " + dan : 7 == thpn && thpn < 14 ? "1 " + wan : 14 == thpn && thpn < 21 ? "2 " + wan : "3 " + wan : bulan + " " + man : time = tahun + " " + yan;

      html += '<li><a class="list-link" href="' + link + '"/>' + img + '<div class="content"><h4><a href="' + link + '" target="_blank">' + title + '</a></h4>' + snippet + labels + '<time datetime="' + date + '">' + time + '</time></div></li>';
    }

    var megacontent = "<ul>" + html + "<br class='clear'></ul>";

    if(mega.hasClass('third')) {
      var newhtml = $("<div class='mega-sublabel-content'/>").html(megacontent);
      megasl.append(newhtml);
    } else {
      var newhtml = $("<div class='mega-content'/>").html(megacontent);
      mega.append(newhtml);
    }
  }
}
