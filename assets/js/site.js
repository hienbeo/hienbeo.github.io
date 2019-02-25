let audioTag = document.querySelector('.music-player > audio');
let audioName = document.querySelector('#audio-name');
let audioSinger = document.querySelector('#audio-singer');
let buttonPlayPause = document.querySelector('.button-play-pause');
let buttonNext = document.querySelector('.button-next');
let buttonPrevious = document.querySelector('.button-previous');
let processBar = document.querySelector('.process-bar');
let buttonList = document.querySelector('.button-list');
let playerInformation = document.querySelector('.player-information');
let playerControl = document.querySelector('.player-control');
let musicPlayer = document.querySelector('.music-player');
let playerTada = document.querySelector('.player-tada');
let audioListTag = document.querySelector('.audio-list');

function addListener() {
    let btn = document.querySelector('#Heart_2_');
    btn.addEventListener("click", clicked, false);
    buttonPlayPause.addEventListener("click", togglePlayPauseAudio, false);
    buttonNext.addEventListener("click", nextAudio, false);
    buttonPrevious.addEventListener("click", previousAudio, false);
    buttonList.addEventListener("click", buttonListClick, false);
    audioTag.addEventListener('timeupdate', function () {
        processBar.style.width = (audioTag.currentTime / audioTag.duration) * 100 + "%";
        if (audioTag.ended) {
            nextAudio();
        }
    })
}

function buttonListClick() {
    if (playerTada.style.bottom === '0' || playerTada.style.bottom === '') {
        playerTada.style.bottom = musicPlayer.offsetHeight - 74 + "px";
        playerInformation.style.background = "rgba(0,0,0,1)";
        audioListTag.style.background = "rgba(0,0,0,1)";
        audioListTag.style.height = "calc(100% - 74px)";
    } else {
        playerTada.style.bottom = '';
        playerInformation.style.background = "rgba(0,0,0,.8)"
        audioListTag.style.background = "rgba(0,0,0,0.8)";
        audioListTag.style.height = "0";
    }
}

function clicked() {
    let heart = document.querySelector('.heart-area');
    let media = document.querySelector('.music-player');
    heart.style.display = 'none';
    media.style.display = 'block';
    loadAudio(0);
    playAudio();
}

function restart() {
    let container = document.querySelector('#Layer_1');
    let newContainer = container.cloneNode(true);
    container.parentNode.replaceChild(newContainer, container);
    addListener();
}

function loadAudio(order) {
    audioTag.setAttribute("src", "assets/music/" + audioList[order].url);
    window.localStorage.setItem("order-audio", order);
    processBar.style.width = '0';
    loadAudioInformation(order);
}

function chooseItemAudio(order){
    loadAudio(order);
    buttonListClick();
    playAudio();
}

function loadAudioInformation(order) {
    audioName.innerHTML = audioList[order].name;
    audioSinger.innerHTML = audioList[order].singer;
}

function loadAudioList() {
    let length = audioList.length;
    for (i = 0; i < length; i++) {
        audioListTag.innerHTML += ' <div class="audio-item">' +
            '<div style="float: left;">' +
            '<b>' + audioList[i].name + '</b>' +
            '<br>' +
            '<span>' + audioList[i].singer + '</span>' +
            '</div>' +
            '<div style="float: right">' +
            '<button onclick="chooseItemAudio(' + i + ')" class="button-list" style="background: none; border: none; outline: 0; font-size: 16px; line-height: 3">' +
            '<i class="fa fa-play"></i>' +
            '</button>' +
            '</div>' +
            '</div>'
    };
}

function playAudio() {
    if (audioTag.paused) {
        setTimeout("audioTag.play()", 1000);
        setTimeout("audioTag.volume = 0", 0);
        setTimeout("audioTag.volume = 0.2", 1000);
        setTimeout("audioTag.volume = 0.4", 2000);
        setTimeout("audioTag.volume = 0.6", 3000);
        setTimeout("audioTag.volume = 0.8", 4000);
        setTimeout("audioTag.volume = 1", 5000);
        buttonPlayPause.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
    }
}

function togglePlayPauseAudio() {
    if (audioTag.paused) {
        audioTag.play();
        buttonPlayPause.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
    } else {
        audioTag.pause();
        buttonPlayPause.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
    }
}

function nextAudio() {
    let currentOrder = parseInt(window.localStorage.getItem("order-audio"));
    if (currentOrder < audioList.length - 1) {
        loadAudio(currentOrder + 1);
        playAudio();
    } else {
        alert('Bạn đang ở cuối danh sách');
    }
}

function previousAudio() {
    let currentOrder = parseInt(window.localStorage.getItem("order-audio"));
    if (currentOrder >= 1) {
        loadAudio(currentOrder - 1);
        playAudio();
    } else {
        alert('Bạn đang ở đầu danh sách');
    }
}

addListener();
loadAudioList();