$.fn.bindingPage = function (totalSize = 0, pageSize = 12, pageActive = 1) {
    let itemsCount = Math.floor(totalSize / pageSize) + 1;
    let currentUrl = location.protocol + '//' + location.hostname + location.pathname;
    let href = location.href;
    let pageParam = "&page=";
    $(this).find(".page-area").html();

    if (href.indexOf("?") === -1) {
        pageParam = "?&page=";
    }
    else{
        currentUrl = href.replace(/&page=[0-9]/i,"");
    }
    if (pageActive !== 1) {
        $(this).find(".page-area").append('<a href="' + currentUrl + pageParam + (pageActive - 1 > 0 ? pageActive - 1 : 1) + '"><i class="fa fa-caret-left" aria-hidden="true"></i> Trước</a>');
    }
    for (i = 1; i <= itemsCount; i++) {
        if (i === pageActive) {
            $(this).find(".page-area").append('<a class="page-active">' + i + '</a>');
        }
    }
    if (pageActive !== itemsCount) {
        $(this).find(".page-area").append('<a href="' + currentUrl + pageParam + (pageActive + 1 > itemsCount ? itemsCount : pageActive + 1) + '"> Sau <i class="fa fa-caret-right" aria-hidden="true"></i></a>');
    }
}