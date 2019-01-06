$(document).ready(function () {
    let url = new URL(location.href);
    let pageActive = url.searchParams.get("page") != null ? parseInt(url.searchParams.get("page")) : 1;
    let typeActive = url.searchParams.get("type");
    if (typeActive === "cartoon") {
        $(".category-area .area-header span").html("Hoạt hình");
        cartoonBinding(12, pageActive);
    }
    if (typeActive === "retail") {
        $(".category-area .area-header span").html("Phim lẻ");
        retailBinding(12, pageActive);
    }
    if (typeActive === "series") {
        $(".category-area .area-header span").html("Phim bộ");
        seriesBinding(12, pageActive);
    }
});

function cartoonBinding(pageSize = 12, pageActive = 1) {
    arrayCartoonFilms.sortByInsertDate(1);
    $(".category-area").bindingPage(arrayCartoonFilms.length, pageSize, pageActive);
    let startLoop = pageActive * pageSize - pageSize;
    let maxLoop = pageActive * pageSize;
    if (arrayCartoonFilms.length < maxLoop) {
        maxLoop = arrayCartoonFilms.length;
    }
    if (maxLoop < pageSize) {
        maxLoop = maxLoop + startLoop;
    }
    for (i = startLoop; i < maxLoop; i++) {
        $(".category-area .row").append('<div class="col-md-3 col-sm-4 col-xs-6">' +
            '<a href="watch.html?code=' + arrayCartoonFilms[i].phimmoiCode + '">' +
            '<div class="item" data-toggle="tooltip" data-placement="right" title="' + arrayCartoonFilms[i].name + '">' +
            '<img src="assets/images/' + arrayCartoonFilms[i].img + '" />' +
            '<hr />' +
            '<div class="content-item">' +
            '<span>' + arrayCartoonFilms[i].name + '</span>' +
            '<br>' +
            '<span class="eng">' + arrayCartoonFilms[i].eng + '</span>' +
            '</div>' +
            '</div>' +
            '</a>' +
            '</div>');
    };
}

function retailBinding(pageSize = 12, pageActive = 1) {
    arrayRetailFilms.sortByInsertDate(1);
    $(".category-area").bindingPage(arrayRetailFilms.length, pageSize, pageActive);
    let startLoop = pageActive * pageSize - pageSize;
    let maxLoop = pageActive * pageSize;
    if (arrayRetailFilms.length < maxLoop) {
        maxLoop = arrayRetailFilms.length;
    }
    if (maxLoop < pageSize) {
        maxLoop = maxLoop + startLoop;
    }
    for (i = startLoop; i < maxLoop; i++) {
        $(".category-area .row").append('<div class="col-md-3 col-sm-4 col-xs-6">' +
            '<a href="watch.html?code=' + arrayRetailFilms[i].phimmoiCode + '">' +
            '<div class="item" data-toggle="tooltip" data-placement="right" title="' + arrayRetailFilms[i].name + '">' +
            '<img src="assets/images/' + arrayRetailFilms[i].img + '" />' +
            '<hr />' +
            '<div class="content-item">' +
            '<span>' + arrayRetailFilms[i].name + '</span>' +
            '<br>' +
            '<span class="eng">' + arrayRetailFilms[i].eng + '</span>' +
            '</div>' +
            '</div>' +
            '</a>' +
            '</div>');
    };
}

function seriesBinding(pageSize = 12, pageActive = 1) {
    arraySeriesFilms.sortByInsertDate(1);
    $(".category-area").bindingPage(arraySeriesFilms.length, pageSize, pageActive);
    let startLoop = pageActive * pageSize - pageSize;
    let maxLoop = pageActive * pageSize;
    if (arraySeriesFilms.length < maxLoop) {
        maxLoop = arraySeriesFilms.length;
    }
    if (maxLoop < pageSize) {
        maxLoop = maxLoop + startLoop;
    }
    for (i = startLoop; i < maxLoop; i++) {
        $(".category-area .row").append('<div class="col-md-3 col-sm-4 col-xs-6">' +
            '<a href="watch.html?code=' + arraySeriesFilms[i].phimmoiCode + '">' +
            '<div class="item" data-toggle="tooltip" data-placement="right" title="' + arraySeriesFilms[i].name + '">' +
            '<img src="assets/images/' + arraySeriesFilms[i].img + '" />' +
            '<hr />' +
            '<div class="content-item">' +
            '<span>' + arraySeriesFilms[i].name + '</span>' +
            '<br>' +
            '<span class="eng">' + arraySeriesFilms[i].eng + '</span>' +
            '</div>' +
            '</div>' +
            '</a>' +
            '</div>');
    };
}