var media_player = document.querySelector("#media-player");
var video_area = document.querySelector(".video-area");
var video_player = document.querySelector("#video-player");
var toggle_play_pause = document.getElementById("toggle-play-pause");
var change_volume = document.getElementById("change-volume");
var process_bar = document.querySelector(".process-area");
var process_buffered_bar = document.querySelector(".process-buffered");
var process_currenttime_bar = document.querySelector(".process-currenttime");
var video_timer = document.querySelector(".video-timer");
var pixel_button = document.querySelectorAll(".pixel-button");
var currentVolume = 0;
var timeoutMouse = null;

function togglePlayPause() {
    if (video_player.paused) {
        toggle_play_pause.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
        video_player.play();
    } else {
        toggle_play_pause.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
        video_player.pause();
    }
}

function toggleMuteUnmute() {
    if (video_player.volume === 0) {
        change_volume.innerHTML = '<i class="fa fa-volume-up aria-hidden="true"></i>';
        video_player.volume = 1;
    } else {
        change_volume.innerHTML = '<i class="fa fa-volume-off" aria-hidden="true"></i>';
        video_player.volume = 0;
    }
}

function toggleLight() {
    if ($(".video-area").hasClass("light-off")) {
        $(".video-area").removeClass("light-off");
    } else {
        $(".video-area").addClass("light-off");
    }
}

function convertSecondsToTime(time) {
    let h = Math.floor(time / 3600);
    let m = Math.floor((time % 3600) / 60);
    let s = Math.floor((time % 3600) % 60);
    return (h == 0 ? "" : h + ":") + m + ":" + (s < 10 ? "0" + s : s);
}

function setUrlMedia(src, currentTime = 0) {
    video_player.setAttribute("src", src);
    video_player.addEventListener("loadedmetadata", function () {
        this.currentTime = currentTime;
    }, false);
}


$("#media-player").mousemove(function () {
    clearTimeout(timeoutMouse);
    $(".media-control-area").fadeIn(300)
    timeoutMouse = setTimeout(function () {
        $(".media-control-area").fadeOut(300);
    }, 5000);
}).mouseleave(function () {
    clearTimeout(timeoutMouse);
    $(".media-control-area").fadeOut(300);
});


$("#toggle-light").click(function () {
    toggleLight();
});

function changePixel(e) {
    let currentTimeOld = video_player.currentTime;
    video_player.setAttribute("src", e.dataset.url);
    video_player.addEventListener("loadedmetadata", function () {
        video_player.currentTime = currentTimeOld;
    }, false);
    video_player.play();
};

video_area.ondblclick = function () {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        media_player.requestFullscreen();
    }
};

video_area.onclick = function () {
    togglePlayPause();
};

video_player.addEventListener("timeupdate", function () {
    process_currenttime_bar.style.width = (video_player.currentTime / video_player.duration) * 100 + "%";
    video_timer.innerText = convertSecondsToTime(video_player.currentTime) + " / " + convertSecondsToTime(video_player.duration);
});

video_player.addEventListener("progress", function () {
    process_buffered_bar.style.width = ((video_player.buffered.end(0) / video_player.duration) * 100 + "%");
});

video_area.onclick = function () {
    togglePlayPause();
};

process_bar.onclick = function (e) {
    let timePos = e.pageX - this.getBoundingClientRect().left;
    process_currenttime_bar.style.width = (timePos / this.offsetWidth) * 100 + "%";
    video_player.currentTime = (timePos * video_player.duration) / this.offsetWidth;
};

change_volume.onclick = function () {
    toggleMuteUnmute();
}

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
            media_player.requestFullscreen();
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