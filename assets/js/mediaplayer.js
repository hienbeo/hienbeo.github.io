var area_player = document.querySelector("#media-player");
var video_area = document.querySelector(".video-area");
var video_player = document.querySelector("#video-player");
var toggle_play_pause = document.getElementById("togglePlay");
var timeline_bar = document.querySelector(".video-process-area");
var realtime_bar = document.querySelector(".video-process-realtime");
var buffered_bar = document.querySelector(".video-process-buffered");
var time_video = document.getElementById("videoTimer");
var currentVolume = 0;

function togglePlayPause() {
    if (video_player.paused) {
        toggle_play_pause.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
        video_player.play();
    } else {
        toggle_play_pause.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
        video_player.pause();
    }
}

var i = null;
$("#media-player").mousemove(function () {
    clearTimeout(i);
    $(".video-control-area").fadeIn(300)
    i = setTimeout(function () {
        $(".video-control-area").fadeOut(300);
    }, 5000);
}).mouseleave(function () {
    clearTimeout(i);
    $(".video-control-area").fadeOut(300);
});

function convertSecondsToTime(time) {
    let h = Math.floor(time / 3600);
    let m = Math.floor((time % 3600) / 60);
    let s = Math.floor((time % 3600) % 60);
    return (h == 0 ? "" : h + ":") + m + ":" + (s < 10 ? "0" + s : s);
}

video_area.ondblclick = function () {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        area_player.requestFullscreen();
    }
};

toggle_play_pause.onclick = function () {
    togglePlayPause();
};

video_player.addEventListener("timeupdate", function () {
    realtime_bar.style.width =
        (video_player.currentTime / video_player.duration) * 100 + "%";
    time_video.innerText =
        convertSecondsToTime(video_player.currentTime) +
        " / " +
        convertSecondsToTime(video_player.duration);
});

video_player.addEventListener("progress", function () {
    buffered_bar.style.width = ((video_player.buffered.end(0) / video_player.duration) * 100 + "%");
});

video_area.onclick = function () {
    togglePlayPause();
};

timeline_bar.onclick = function (e) {
    let timePos = e.pageX - this.getBoundingClientRect().left;
    realtime_bar.style.width = (timePos / this.offsetWidth) * 100 + "%";
    video_player.currentTime =
        (timePos * video_player.duration) / this.offsetWidth;
};

document.onkeyup = function (e) {
    if (e.keyCode === 32) {
        togglePlayPause();
    }
    if (e.keyCode === 37) {
        video_player.currentTime -= 10;
    }
    if (e.keyCode === 38) {
        video_player.volume += 0.2;
    }
    if (e.keyCode === 39) {
        video_player.currentTime += 10;
    }
    if (e.keyCode === 40) {
        video_player.volume -= 0.2;
    }
    if (e.keyCode === 70) {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            area_player.requestFullscreen();
        }
    }
    if (e.keyCode === 77) {
        if (video_player.volume === 0) {
            video_player.volume = currentVolume;
        } else {
            currentVolume = video_player.volume;
            video_player.volume = 0;
        }
    }
};