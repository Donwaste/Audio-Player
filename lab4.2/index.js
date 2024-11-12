const songs = [
  { 
    id: 1, 
    artist: "Алексей Левкин",
    name: "Всё идёт по плану", 
    path: "songs/Всё идёт по плану.mp3", 
    cover: "images/Всё идёт по плану.jpg",
  },
  { 
    id: 2, 
    artist: "My Skin Is Multicam",
    name: "Zero Tolerance", 
    path: "songs/Zero Tolerance.mp3", 
    cover: "images/Zero Tolerance.jpg",
  },
  {
    id: 3, 
    artist: "Funeral Candies",
    name: "Меса Коло Дуба", 
    path: "songs/Меса Коло Дуба.mp3", 
    cover: "images/Меса Коло Дуба.jpg",
  },
  {
    id: 4, 
    artist: "Ross Bugden",
    name: "Something Wicked", 
    path: "songs/Something Wicked.mp3", 
    cover: "images/Something Wicked.jpg",
  }
];

let audio = new Audio();

let currentSongIndex = 0;
let isPlaying = false;

function loadSong(songIndex) {
  const song = songs[songIndex];
  document.getElementById("current-cover").src = song.cover;
  document.getElementById("current-artist").innerText = song.artist;
  document.getElementById("current-title").innerText = song.name;
  audio.src = song.path;
  audio.load();
}

function playPause() {
  if (isPlaying) {
      audio.pause();
      isPlaying = false;
      document.getElementById("play-pause-icon").src = "buttons/play.png";
  } else {
      audio.play();
      isPlaying = true;
      document.getElementById("play-pause-icon").src = "buttons/pause.png";
  }
}

function previous() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  playPause();
}

function next() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  playPause();
}

function adjustVolume(value) {
  audio.volume = value;
}

function seekTo(value) {
  audio.currentTime = value;
}

function updateSeekSlider() {
  const seekSlider = document.getElementById("seek-slider");
  
  if (!isNaN(audio.duration)) {
    seekSlider.max = audio.duration;
    seekSlider.value = audio.currentTime;
  
    document.getElementById("current-time").innerText = formatTime(audio.currentTime) + " / " + formatTime(audio.duration);
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return minutes + ":" + (secs < 10 ? "0" : "") + secs;
}

audio.addEventListener("timeupdate", updateSeekSlider);

function generateSongList() {
  const songListElement = document.getElementById("song-list");
  songs.forEach((song, index) => {
      const songElement = document.createElement("div");
      songElement.classList.add("song");
      songElement.innerHTML = `
          <img src="${song.cover}" alt="${song.name}">
          <div class="song-info">
              <p>${song.artist}</p>
              <p>${song.name}</p>
          </div>
          <button onclick="selectSong(${index})"><img src="buttons/play.png" alt="Play"></button>
      `;
      songListElement.appendChild(songElement);
  });
}

function selectSong(index) {
  currentSongIndex = index;
  loadSong(currentSongIndex);
  playPause();
}

window.onload = function() {
  loadSong(currentSongIndex);
  generateSongList();
};