$(document).ready(function () {
    let url = new URL(location.href);
    let pageActive = url.searchParams.get("page") != null ? parseInt(url.searchParams.get("page")) : 1;
    cartoonBinding(12, pageActive);
});

function cartoonBinding(pageSize = 12, pageActive = 1) {
    arrayCartoonFilms.sort();
    $(".cartoon-area").bindingPage(arrayCartoonFilms.length, pageSize, pageActive);
    let startLoop = pageActive * pageSize - pageSize;
    let maxLoop = pageActive * pageSize;
    if (maxLoop < pageSize) {
        maxLoop = maxLoop + startLoop;
    }
    for (i = startLoop; i < maxLoop; i++) {
        $(".cartoon-area .row").append('<div class="col-md-3 ">' +
            '<a href="watch.html?url=' + arrayCartoonFilms[i].url + '">' +
            '<div class="item">' +
            '<img src="assets/images/' + arrayCartoonFilms[i].img + '" />' +
            '<hr />' +
            '<span>' + arrayCartoonFilms[i].name + '</span>' +
            '<br>' +
            '<span class="eng">' + arrayCartoonFilms[i].eng + '</span>' +
            '</div>' +
            '</a>' +
            '</div>');
    };
}
