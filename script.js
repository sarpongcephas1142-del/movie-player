const video = document.getElementById("video");
const playPause = document.getElementById("playPause");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const mute = document.getElementById("mute");
const fullscreen = document.getElementById("fullscreen");
const centerPlay = document.getElementById("centerPlay");
const speed = document.getElementById("speed");

// INITIAL STAGES
video.volume = 1;
volume.muted = false;
volume.value = 1;
mute.textContent = "🔊";

// play / pause
function togglePlay() {
    if (video.paused || video.ended) {
      video.play();
      playPause.textContent = "⏸";
      centerPlay.style.display = "none";
    } else{
        video.pause();
        playPause.textContent = "▶";
        centerPlay.style.display = "block";
    }
}

playPause.addEventListener("click", togglePlay);
centerPlay.addEventListener("click", togglePlay);

video.addEventListener("ended", () => {
    playPause.textContent = "▶";
    centerPlay.style.display = "block";
});

// Duration
video.addEventListener("loadmetadata", () => {
    durationEl.textContent = formatTime(video.duration);
});

// Update time while playing
video.addEventListener("timeupdate", () => {
    currentTimeEl.textContent = formatTime(video.currentTime);

    const percent = (video.currentTime / video.duration) * 100;
    progress.value = percent || 0;
});

// Seek
progress.addEventListener("input", () => {
    video.currentTime = (progress.value / 100) * video.duration;
});

// VOLUME CONTROL
let lastVolume = 1; 

// Slider controls volume
volume.addEventListener("input", () => {
  video.volume = volume.value;
  video.muted = volume.value === "0";
  mute.textContent = volume.value === "0" ? "🔇" : "🔊";
  lastVolume = video.volume || lastVolume;
});

// Mute button
mute.addEventListener("click", () => {
  if (!video.muted && video.volume > 0) {
    lastVolume = video.volume;
    video.muted = true;
    video.volume = 0;
    volume.value = 0;
    mute.textContent = "🔇";
  } else {
    video.muted = false;
    video.volume = lastVolume;
    volume.value = lastVolume;
    mute.textContent = "🔊";
  }
});

// Playback speed
speed.addEventListener("change", () => {
    video.playbackRate = speed.value;
});

// PLAYBACK SPEED 
const speeds = [0.5, 1, 1.5, 2];
let speedIndex = 1; // default = 1x

video.playbackRate = speeds[speedIndex];
speed.textContent = `${speeds[speedIndex]}x`;

speed.addEventListener("click", () => {
  speedIndex = (speedIndex + 1) % speeds.length;
  video.playbackRate = speeds[speedIndex];
  speed.textContent = `${speeds[speedIndex]}x`;
});

// Fullscreen
fullscreen.addEventListener("click", () => {
    if (!document.fullscreenElement) {
        video.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

// Time formatter
function formatTime(time) {
    if(isNaN(time)) return "0:00";
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
};

function updateDuration() {
  if (!isNaN(video.duration) && video.duration > 0) {
    durationEl.textContent = formatTime(video.duration);
  }
}

// Metadata loaded 
video.addEventListener("loadedmetadata", updateDuration);

/* Fallbacks for stubborn browsers */
video.addEventListener("durationchange", updateDuration);
video.addEventListener("canplay", updateDuration);
video.addEventListener("canplaythrough", updateDuration);

/* Update current time */
video.addEventListener("timeupdate", () => {
  currentTimeEl.textContent = formatTime(video.currentTime);

  if (!isNaN(video.duration)) {
    progress.value = (video.currentTime / video.duration) * 100;
  }
});

const rewind = document.getElementById("rewind");
const forward = document.getElementById("forward");

const SEEK_TIME = 10; // seconds

// REWIND & FORWARD
rewind.addEventListener("click", () => {
  video.currentTime = Math.max(0, video.currentTime - SEEK_TIME);
});

forward.addEventListener("click", () => {
  video.currentTime = Math.min(
    video.duration,
    video.currentTime + SEEK_TIME
  );
});
fetch('c:\Users\csarp\OneDrive\Desktop\project\mp.mp4')
  .then(response => response.blob())
  .then(blob => { /* ... */ });