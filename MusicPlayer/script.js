// Get HTML elements

const audio = document.getElementById("audio");

const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const songTitle = document.getElementById("song-title");
const artist = document.getElementById("artist");

const progress = document.getElementById("progress");

const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const volume = document.getElementById("volume");


// ========================================
// SONGS
// ========================================

const songs = [

    {
        title: "Song 1",
        artist: "Artist 1",
        src: "Assets/songg1.mp3"
    },

    {
        title: "Song 2",
        artist: "Artist 2",
        src: "Assets/song2.mp3"
    },

    {
        title: "Song 3",
        artist: "Artist 3",
        src: "Assets/song3.mp3"
    }

];


// Current song number

let currentSong = 0;


// ========================================
// LOAD SONG
// ========================================

function loadSong(index) {

    const song = songs[index];

    songTitle.textContent = song.title;

    artist.textContent = song.artist;

    audio.src = song.src;

    audio.load();

    progress.value = 0;

    currentTime.textContent = "0:00";

    duration.textContent = "0:00";

    playButton.textContent = "▶";
}


// ========================================
// PLAY SONG
// ========================================

function playSong() {

    audio.play()
        .then(() => {

            playButton.textContent = "⏸";

        })
        .catch((error) => {

            console.log("Audio could not play:", error);

        });

}


// ========================================
// PAUSE SONG
// ========================================

function pauseSong() {

    audio.pause();

    playButton.textContent = "▶";
}


// ========================================
// PLAY / PAUSE BUTTON
// ========================================

playButton.addEventListener("click", function () {

    if (audio.paused) {

        playSong();

    } else {

        pauseSong();

    }

});


// ========================================
// NEXT SONG
// ========================================

nextButton.addEventListener("click", function () {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

});


// ========================================
// PREVIOUS SONG
// ========================================

prevButton.addEventListener("click", function () {

    currentSong--;

    if (currentSong < 0) {

        currentSong = songs.length - 1;

    }

    loadSong(currentSong);

    playSong();

});


// ========================================
// PLAYLIST
// ========================================

function selectSong(index) {

    currentSong = index;

    loadSong(currentSong);

    playSong();

}


// ========================================
// UPDATE PROGRESS
// ========================================

audio.addEventListener("timeupdate", function () {

    if (audio.duration) {

        const percentage =
            (audio.currentTime / audio.duration) * 100;

        progress.value = percentage;

        currentTime.textContent =
            formatTime(audio.currentTime);

    }

});


// ========================================
// GET SONG DURATION
// ========================================

audio.addEventListener("loadedmetadata", function () {

    duration.textContent =
        formatTime(audio.duration);

});


// ========================================
// PROGRESS BAR CLICK
// ========================================

progress.addEventListener("input", function () {

    if (audio.duration) {

        audio.currentTime =
            (progress.value / 100) * audio.duration;

    }

});


// ========================================
// VOLUME CONTROL
// ========================================

volume.addEventListener("input", function () {

    audio.volume = volume.value;

});


// ========================================
// AUTOMATIC NEXT SONG
// ========================================

audio.addEventListener("ended", function () {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

});


// ========================================
// FORMAT TIME
// ========================================

function formatTime(seconds) {

    if (isNaN(seconds)) {

        return "0:00";

    }

    const minutes =
        Math.floor(seconds / 60);

    const secondsPart =
        Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");

    return minutes + ":" + secondsPart;

}


// ========================================
// LOAD FIRST SONG
// ========================================

loadSong(0);