$(document).ready(function() {
  let url = new URL(location.href);
  let code = url.searchParams.get("code");
  let currentTime = url.searchParams.get("t") === null ? 0 : url.searchParams.get("t");
  // let serverRoot = "https://cors-anywhere.herokuapp.com/http://canbo.vinhuni.edu.vn";
  let serverRoot = "http://localhost:55418";
  // playFilm(code, serverRoot, currentTime);
  playFilmFake(code, serverRoot, currentTime);
  if (code !== "") {
    var item = arrayCartoonFilms
      .concat(arrayRetailFilms)
      .concat(arraySeriesFilms)
      .filter(function(el) {
        return el.phimmoiCode === code;
      });
    document.title = "Xem phim: " + item[0].name + " | Nevar - films online";
    document.textContent = item.description;
    $(".film-information-area img").attr("src", "assets/images/" + item[0].img);
    $(".film-title").html(item[0].name);
    $(".film-title-eng").html(item[0].eng);
    $(".film-time").html(item[0].time + " phút");
    $(".film-director").html(item[0].director);
    $(".film-year").html(item[0].year);
    $(".film-desciption").html(item[0].description);
  } else {
    $(".film-information-area").hide();
  }
  shareFilmFacebook();
  setUrlCommentFacebook(url);
});



function setUrlCommentFacebook(url) {
  $(".fb-comments").attr(
    "data-href",
    "https://developers.facebook.com/docs/plugins/comments#" + url
  );
}

function playFilm(filmCode, serverRoot, currentTime) {
  $.ajax({
    type: "POST",
    url: serverRoot + "/api/phim-moi/" + filmCode,
    success: function(result) {
      $.each(JSON.parse(result).medias, function(i, item) {
        if (item.resolution === 360) {
          $("#360p").removeAttr("disabled");
          $("#360p").attr("data-url", item.url);
        }
        if (item.resolution === 480) {
          $("#480p").removeAttr("disabled");
          $("#480p").attr("data-url", item.url);
        }
        if (item.resolution === 720) {
          $("#720p").removeAttr("disabled");
          $("#720p").attr("data-url", item.url);
        }
        if (item.resolution === 1080) {
          $("#1080").removeAttr("disabled");
          $("#1080").attr("data-url", item.url);
        }
      });
      setUrlMedia(JSON.parse(result).medias[0].url, currentTime);
      togglePlayPause();
    }
  });
}

function playFilmFake(filmCode, serverRoot, currentTime) {
  var result =
    '{"requestId":"","status":1,"error":"","clientIp":"2405:4800:21c9:34f:1c9d:a46b:e758:c474","clientOrgIp":"","clientIp6":false,"clientISP":"Unknow","clientProxyOut":false,"isMobile":false,"useVipServer":0,"notice":[],"message":"","reload":0,"reloadUrl":"","url":"phimmoi*3a7829ddb307f7abff8bda4665d007c3329198443fd27655f9aa0281a90740e26084ab05e27012225d12adbdba0234f5","episodeId":175587,"episodeNumber":1,"episodePart":0,"episodeName":"","edition":"","serverId":"drive","backupOrder":3,"srtUrl":"","vttUrl":"","playTech":"auto","serverLanguage":"subtitle","language":"subtitle","filmId":7563,"isWaiting":0,"original":"","medias":[{"resolution":360,"type":"mp4","itag":"18","width":640,"height":360,"url":"https://r3---sn-npoe7nes.googlevideo.com/videoplayback?id=4e55647387a6831b&itag=18&source=webdrive&&requiressl=yes&mm=30&mn=sn-npoe7nes&ms=nxu&mv=u&pl=24&sc=yes&ttl=transient&ei=cFozXJvaB4fg4gLQu6mIBA&susc=drp&app=fife&driveid=1HYi3WT1Z59vQZ1oN6886r6T35AHwBCM1&mime=video/mp4&dur=7025.383&lmt=1546575772296117&mt=1546868514&ip=123.31.30.133&ipbits=8&expire=1546876560&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,driveid,mime,dur,lmt&signature=ADBFEBEE3629000B08CBAA497EA9A3673A56492D5766ACF502B6D8B6FB176A24.324C0E69B1AB7769A9F96C1E61E1B1C8A5D8031FDF1C34F339A088D6FC935704&key=us0"}],"mediasBk":[],"embedUrls":["U2FsdGVkX18H5RaHJ63379+kGBa58sgmBFVkoQAbHxb94huWRnrwCuC59aMh26Y/33F5Nu7toF46MYgSp88PI5MEHy7hXcv9JfWwqv2FJlMZX0YPUlzBuXkZ5vp9nQ5V8GKDm/QA3iaWU43I2vf9H0uLUieYGCpPyE1O31L8d14vUrRatz2X0nI9ztpM0Mfi/uYHO6onoCRCOKS6pElGLLYttqaPwFb09hAHq+ZJ85i/UnsnIqpnDK67wIQI5GPu01vTugtooSp2EXGzuoHGZu7lwQbmCS9cnzy9SkiK93kjCgkXDiaC1JM0NNzODPwHoPhzyhKQdKBWdHutp0eZt0X3ZCSc05siER/69nfS2xk85PoOAdbLdUlW/L+aWQ9nULfM4J+MUWjJPN1GUl3U0Mie0hGL2mUoVWrcw27rOgYTTzm3JOJ77EjJfMGyeCH+uzFl9/ezHTx4ZRawaeWeecV+idqyu9/IABr8hmGgIjAmFfybt5F9aVZ4cPFcQCppQ9yI4UEL9zQ5E1t1cGVjVKQtooCRFy49RvHEDqFfaxiyENUYTzCRVpWx4mGcAcff"]}';
  $.each(JSON.parse(result).medias, function(i, item) {
    if (item.resolution === 360) {
      $("#360p").removeAttr("disabled");
      $("#360p").attr("data-url", item.url);
    }
    if (item.resolution === 480) {
      $("#480p").removeAttr("disabled");
      $("#480p").attr("data-url", item.url);
    }
    if (item.resolution === 720) {
      $("#720p").removeAttr("disabled");
      $("#720p").attr("data-url", item.url);
    }
    if (item.resolution === 1080) {
      $("#1080").removeAttr("disabled");
      $("#1080").attr("data-url", item.url);
    }
  });
  setUrlMedia(JSON.parse(result).medias[0].url, currentTime);
  togglePlayPause();
}

function shareFilmFacebook() {
  var fb =
    "https://www.facebook.com/plugins/share_button.php?href=" +
    encodeURIComponent(location.href) +
    "&layout=button_count&size=large&mobile_iframe=true&width=94&height=28&appId";
  $("#share-film").html(
    '<iframe id="share-film" src="' +
      fb +
      '"' +
      'width="94" height="28" style="border:none;overflow:hidden" scrolling="no" frameborder="0"' +
      'allowTransparency="true" allow="encrypted-media"></iframe>'
  );
}

