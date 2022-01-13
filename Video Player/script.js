const video = document.getElementById('video');
// since it's a html5 video element, there's a lot of properties/methods we can access
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');


// Play and Pause Video

function toggleVideoStatus() {
  // clicking on the video OR the play button should toggle the video accordingly
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update play/pause icon
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class= "fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class= "fa fa-pause fa-2x"></i>';
  }
}

// Update progress and timestamp 
function updateProgress() {
  // try console.log(video.currentTime); keeps giving current time.
  // also console.log(video.duration); for total duration
  progress.value = (video.currentTime/ video.duration) * 100;

  // Format time to be 00:00

  // Find Minutes: round down
  let min = Math.floor(video.currentTime/60);
  if (min < 10) {
    min = "0" + String(min);
  }

  // Find Sec
  let sec = Math.floor(video.currentTime % 60);
  if (sec < 10) {
    sec = "0" + String(sec);
  }

  timestamp.innerHTML = `${min}:${sec}`;
}


// Update video according to progress bar click
function setVideoProgress() {
  // take progress value ( goes from 0-100 per our HTML. make sure it's a number
  // convert to a percentage, then apply to our video
  video.currentTime = (+progress.value/100) * video.duration
}

// Stop Video
function stopVideo() {
  // there is no video.stop() unfortunately
  video.currentTime = 0;
  video.pause();
}



// Add Event Listeners

// so on click, if vids is paused, play it. if playing, pause.
video.addEventListener('click', toggleVideoStatus);
// when we click play, we want to switch to a stop icon, and vice versa. 
// the 2nd button is actually meant to take it back to the start
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
// Want to constantly update the timestamp
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

// it's a range input, so it has a change event. so when you change it, it slides over
// point is, when we clikc somewhere on the progress bar, the video should update accordingly
progress.addEventListener('change', setVideoProgress);