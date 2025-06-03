/* Edit this file */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update the play/pause button icon
function updateButton() {
  if (video.paused) {
    toggle.textContent = '►';
  } else {
    toggle.textContent = '❚ ❚';
  }
}

// Update progress bar as video plays
function handleProgress() {
  var percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = percent + '%';
}

// Scrub video to clicked position on progress bar
function scrub(event) {
  var scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Skip forward or backward
function skip() {
  var skipValue = parseFloat(this.getAttribute('data-skip'));
  var newTime = video.currentTime + skipValue;
  if (newTime < 0) newTime = 0;
  if (newTime > video.duration) newTime = video.duration;
  video.currentTime = newTime;
}

// Handle volume and playback rate changes
function handleRangeUpdate() {
  var name = this.name; // 'volume' or 'playbackRate'
  var value = this.value;
  video[name] = value;
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

for (var i = 0; i < skipButtons.length; i++) {
  skipButtons[i].addEventListener('click', skip);
}

for (var i = 0; i < ranges.length; i++) {
  ranges[i].addEventListener('change', handleRangeUpdate);
  ranges[i].addEventListener('mousemove', handleRangeUpdate);
}

var mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', function() { mousedown = true; });
progress.addEventListener('mouseup', function() { mousedown = false; });
progress.addEventListener('mousemove', function(event) {
  if (mousedown) {
    scrub(event);
  }
});
