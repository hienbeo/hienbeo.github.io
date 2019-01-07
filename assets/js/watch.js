$(document).ready(function () {
    let url = new URL(location.href);
    let code = url.searchParams.get("code");
    let currentTime = url.searchParams.get("t");
    let serverRoot = "https://cors-anywhere.herokuapp.com/http://canbo.vinhuni.edu.vn";
    // let serverRoot = "http://localhost:2018";
    playFilm(code, serverRoot, currentTime);
    // playFilmFake(code, serverRoot, currentTime);
    if (code !== "") {
        var item = arrayCartoonFilms
            .concat(arrayRetailFilms)
            .concat(arraySeriesFilms)
            .filter(function (el) {
                return el.phimmoiCode === code;
            });
        document.title = "Xem phim: " + item[0].name + " | Nevar - films online";
        document.textContent = item.description;
        $(".film-information-area img").attr("src", "assets/images/" + item[0].img);
        $(".film-title").html(item[0].name);
        $(".film-title-eng").html(item[0].eng);
        $(".film-director").html(item[0].director);
        $(".film-year").html(item[0].year);
        $(".film-desciption").html(item[0].description);
    } else {
        $(".film-information-area").hide();
    }
    shareFilmFacebook();
});

$(".change-pixel").click(function () {
    $("#video-player").attr("src", $(this).data("url"));
});

$("#toggleLight").click(function () {
    toggleLight();
});

function playFilm(filmCode, serverRoot, currentTime) {
    $.ajax({
        type: "POST",
        url: serverRoot + "/api/phim-moi/" + filmCode,
        success: function (result) {
            $.each(JSON.parse(result).medias, function (i, item) {
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
            $("#video-player").attr("src", JSON.parse(result).medias[0].url);
            if (currentTime !== null) {
                document.getElementById("video-player").addEventListener(
                    "loadedmetadata",
                    function () {
                        this.currentTime = currentTime;
                    },
                    false
                );
            }
        }
    });
}

function playFilmFake(filmCode, serverRoot, currentTime) {
    var result = '{"requestId":"","status":1,"error":"","clientIp":"2405:4800:21c9:34f:7428:e7f2:4c00:6adf","clientOrgIp":"","clientIp6":false,"clientISP":"Unknow","clientProxyOut":false,"isMobile":false,"useVipServer":0,"notice":[],"message":"","reload":0,"reloadUrl":"","url":"phimmoi*3a7829ddb307f7abff8bda4665d007c3329198443fd27655f9aa0281a90740e227ac7f02e10481a77927d450cddd01d1","episodeId":159202,"episodeNumber":1,"episodePart":0,"episodeName":"","edition":"","serverId":"drive","backupOrder":3,"srtUrl":"","vttUrl":"","playTech":"auto","serverLanguage":"subtitle","language":"subtitle","filmId":6375,"isWaiting":0,"original":"","medias":[{"resolution":360,"type":"mp4","itag":"18","width":640,"height":360,"url":"https://r5---sn-npoe7ned.googlevideo.com/videoplayback?id=1847604d74d88d71&itag=18&source=webdrive&&requiressl=yes&mm=30&mn=sn-npoe7ned&ms=nxu&mv=u&pl=24&sc=yes&ttl=transient&ei=LbsxXKbNNNDH4ALUvor4DQ&susc=drp&app=fife&driveid=1lxpMsuQ1yxTA6kz4nMmFW2XgzttXTVHC&mime=video/mp4&dur=7070.290&lmt=1543116389409045&mt=1546762482&ip=123.31.30.133&ipbits=8&expire=1546770253&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,driveid,mime,dur,lmt&signature=70156858C0D44D2F0702FDB4293B37DE38E34216E1F76815121D8DF3FD77354B.0949A8B0119DB4F0EFB995DD503A056E657D0F86E03AF348FDE8239A366DF15E&key=us0"},{"resolution":480,"type":"mp4","itag":"59","width":854,"height":480,"url":"https://r5---sn-npoe7ned.googlevideo.com/videoplayback?id=1847604d74d88d71&itag=59&source=webdrive&&requiressl=yes&mm=30&mn=sn-npoe7ned&ms=nxu&mv=u&pl=24&sc=yes&ttl=transient&ei=L7sxXLWGA5Dm4gKN8pnYAg&susc=drp&app=fife&driveid=1lxpMsuQ1yxTA6kz4nMmFW2XgzttXTVHC&mime=video/mp4&dur=7070.290&lmt=1543116710664610&mt=1546762482&ip=123.31.30.133&ipbits=8&expire=1546770255&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,driveid,mime,dur,lmt&signature=89B9294C5D2EFBB0A4C990E7B9188699FBBABFB32DD7AABE78B5EF129D9E3432.1E199BD870F8A7ECD57CCFD840399BC46E7F0C5742776BBF65A2D8621D6E50E4&key=us0"},{"resolution":720,"type":"mp4","itag":"22","width":1280,"height":720,"url":"https://r5---sn-npoe7ned.googlevideo.com/videoplayback?id=1847604d74d88d71&itag=22&source=webdrive&&requiressl=yes&mm=30&mn=sn-npoe7ned&ms=nxu&mv=u&pl=24&sc=yes&ttl=transient&ei=L7sxXITUC5ns4wL74r2QDg&susc=drp&app=fife&driveid=1lxpMsuQ1yxTA6kz4nMmFW2XgzttXTVHC&mime=video/mp4&dur=7070.290&lmt=1543116035949255&mt=1546762482&ip=123.31.30.133&ipbits=8&expire=1546770255&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,driveid,mime,dur,lmt&signature=560371C6E3029158C0BE4D4CFEAFAAE498B573FA210553B60BDD48A6E1BAE82E.9B34B056D061FDB7C78D250795F49BF93040ED189C028E6EBDAD20CE6FE74B37&key=us0"},{"resolution":1080,"type":"mp4","itag":"37","width":1920,"height":1080,"url":"https://r5---sn-npoe7ned.googlevideo.com/videoplayback?id=1847604d74d88d71&itag=37&source=webdrive&&requiressl=yes&mm=30&mn=sn-npoe7ned&ms=nxu&mv=u&pl=24&sc=yes&ttl=transient&ei=L7sxXOWPOYWf4AL__6zICA&susc=drp&app=fife&driveid=1lxpMsuQ1yxTA6kz4nMmFW2XgzttXTVHC&mime=video/mp4&dur=7070.290&lmt=1543116897480535&mt=1546762482&ip=123.31.30.133&ipbits=8&expire=1546770255&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,driveid,mime,dur,lmt&signature=77D18BA7472E46ED68AB06A751C2CC62AD487A1351EFD9EB3510B45320D134B7.7F4DE0C0F5060C4596BF3F048B35133C70BD9BF6E99487395824BB99DD5A8812&key=us0"}],"mediasBk":[],"embedUrls":["U2FsdGVkX18nAEYMoQzeR0130j9RbawMjv0Z8ZP67uK0SqnLjda7IDXqiLMlY05P3Yf9qvLoTD3DYhWPEsr8AfPvlbSLJGIhlczpxaC7IqB5iI76VVsjTOLR2IQZZo635uk0EBOJZ7ul3yh+zbm6On8iAZ7KKuOvMYy5Mg4gVGoKCBXcbcRYKQaQK9uQIauYC6CZOPtzncJA01gN60oSx8HVyvXQZ38vRp4tgDWFKhu181zgniIoY22XlSf6RohQmb83cDylOzlN6S8UKdUc6kepnadItvi/etQIxJsa3KQ7l+XUqsOpYlGzjJUYvrX+mwH4e9kbXL4t/HzUTRkWY57Ig0IN0yhDdXgGQSVrFtwvlpm/7MQ/gnzWl6A4Gd0FkAEQovb/5oS6IDRjfdSfF03M1pYjv9jHlotf2F5sSJkQiU/FGUD1zmu4oq/WWgj/sZ8IuzVqIf5TFUiLNBonGGSoj3nS5eNQ3SPZBOVyqHOu2GVP3FOijgklo+urHx8dfol8cDZLNzPM1SaNdZrL4SXvKQkb3K9s3SUuAqJ0scDiBWYSkKfL4JV/eCFvnEhD"]}';
    $.each(JSON.parse(result).medias, function (i, item) {
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
    $("#video-player").attr("src", JSON.parse(result).medias[0].url);
    if (currentTime !== null) {
        document.getElementById("video-player").addEventListener(
            "loadedmetadata",
            function () {
                this.currentTime = currentTime;
            },
            false
        );
    }
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

function toggleLight() {
    if ($(".video-area").hasClass("light-off")) {
        $(".video-area").removeClass("light-off");
    } else {
        $(".video-area").addClass("light-off");
    }
}