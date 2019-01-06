$(document).ready(function () {
    let url = new URL(location.href);
    let searchString = url.searchParams.get("search-string");
    let pageActive = url.searchParams.get("page") != null ? parseInt(url.searchParams.get("page")) : 1;
    document.title = "Tìm kiếm: " + searchString + " | Nevar - Films online";
    $(".area-header span").html("Tìm kiếm: " + searchString);
    searchLoading(searchString, pageActive, 12);
});

function searchFilms(query, arrayName) {
    return arrayName.filter(function (el) {
        let result = el.name.toLowerCase().toVietnamNoneAccent().indexOf(query.toLowerCase().toVietnamNoneAccent()) > -1;
        if (result) {
            return result;
        } else {
            return el.eng.toLowerCase().toVietnamNoneAccent().indexOf(query.toLowerCase().toVietnamNoneAccent()) > -1;
        }
    })
}

function searchLoading(searchString, pageActive, pageSize = 12) {
    let searchResult = searchFilms(searchString, arrayCartoonFilms.concat(arrayRetailFilms).concat(arraySeriesFilms));
    $(".search-result-area .row").html("");
    if (searchResult.length !== 0) {
        $(".search-result-area").bindingPage(searchResult.length, pageSize, pageActive);
        let startLoop = pageActive * pageSize - pageSize;
        let maxLoop = pageActive * pageSize;
        if (searchResult.length < maxLoop) {
            maxLoop = searchResult.length;
        }
        if (maxLoop < pageSize) {
            maxLoop = maxLoop + startLoop;
        }
        for (i = startLoop; i < maxLoop; i++) {
            $(".search-result-area .row").append('<div class="col-md-3 col-sm-4 col-xs-6">' +
                '<a href="watch.html?code=' + searchResult[i].phimmoiCode + '">' +
                '<div class="item" data-toggle="tooltip" data-placement="right" title="' + searchResult[i].name + '">' +
                '<img src="assets/images/' + searchResult[i].img + '" />' +
                '<hr />' +
                '<div class="content-item">' +
                '<span>' + searchResult[i].name + '</span>' +
                '<br>' +
                '<span class="eng">' + searchResult[i].eng + '</span>' +
                '</div>' +
                '</div>' +
                '</a>' +
                '</div>');
        };
    } else {
        $(".search-result-area .row").html('<div class="col-md-12">' +
            '<div class="search-empty">' +
            '<P><i class="fa fa-thumbs-o-down" aria-hidden="true"></i></P>' +
            '<span>Không tìm thấy kết quả</span>' +
            '</div>' +
            '</div>');
            $(".page-area").hide()
    }
}