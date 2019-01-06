$(document).ready('div[data-toggle="tooltip"]', function () {
    $(this).tooltip();
});

$(".menu-button a").click(function () {
    $(".cover-header-menu").toggle();
    $(".right-menu").toggle();
});

$(".cover-header-menu").click(function () {
    $(this).toggle();
    $(".right-menu").toggle();
});

$(".search-button a").click(function () {
    $(".cover-header-search").toggle();
    $(".search-area").toggle();
});

$(".cover-header-search").click(function () {
    $(this).toggle();
    $(".search-area").toggle();
});

$("#search-input").keyup(function () {
    if ($(this).val() !== "") {
        $(".search-area button").show();
    } else {
        $(".search-area button").hide();
    }
});

$("#search-form").submit(function (e) {
    e.preventDefault();
    window.location.href = "search.html?search-string=" + $("#search-input").val();
})


Array.prototype.sortByName = function () {
    this.sort(function (a, b) {
        var nameA = a.name.toUpperCase(); // bỏ qua hoa thường
        var nameB = b.name.toUpperCase(); // bỏ qua hoa thường
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
}

Array.prototype.sortByInsertDate = function (mode) {
    if (mode === 0)
        this.reverse();
    else
        this.sort();
}

String.prototype.toVietnamNoneAccent = function () {
    return this.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}