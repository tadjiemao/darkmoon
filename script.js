const audio = document.getElementById('audio');
const albumCover = document.querySelector('.album-cover');
const songNameElement = document.getElementById('songName');
const progressBar = document.getElementById('progressBar');
const progressContainer = document.getElementById('progressContainer');
let isPlaying = false; 
let first = 0; 
let currentSong = 0;
const songs = ['01 Speak To Me.m4a', '02 Breathe (In The Air).m4a', '03 On The Run.m4a', '04 Time.m4a', '05 The Great Gig In The Sky.m4a', '06 Money.m4a', '07 Us And Them.m4a', '08 Any Colour You Like.m4a', '09 Brain Damage.m4a', '10 Eclipse.m4a'];
const songNames = ['Speak To Me', 'Breathe (In The Air)', 'On The Run', 'Time', 'The Great Gig In The Sky', 'Money', 'Us And Them', 'Any Colour You Like', 'Brain Damage', 'Eclipse'];

function loadSong() {
	audio.src = `music/${songs[currentSong]}`;	
	updateSongName();
	albumCover.src = `other/cover.png`;
	albumCover.onerror = function() {
		albumCover.src = 'other/default.png';
	};	
	if (first == 0) { 
		albumCover.src = 'other/default.png';
	}
}

function hideProgress() { 
  const progressContainer = document.getElementById('progressContainer');
  progressContainer.style.visibility = 'hidden'; 
}

function showProgress() { 
  const progressContainer = document.getElementById('progressContainer');
  progressContainer.style.visibility = 'visible'; 
}

function playMusic() { 
  audio.play();
  albumCover.style.animation = 'rotate 18s linear infinite';
  isPlaying = true;
  showProgress();
  songNameElement.style.visibility = 'visible';
  showTimeDisplay();
}

function pauseMusic() { 
  audio.pause();
  albumCover.style.animationPlayState = 'paused';
  isPlaying = false;
}

function stopMusic() { 
  audio.pause();
  audio.currentTime = 0;
  albumCover.style.animation = '';
  isPlaying = false;
  hideProgress();
  songNameElement.style.visibility = 'hidden';
  hideTimeDisplay();
  albumCover.src = 'other/default.png'; 
}

function playPauseMusic() { 
  first = 1; 

  if (isPlaying==true) {
	pauseMusic(); 
  } else if (isPlaying==false) {
	playMusic(); 
	
	albumCover.src = `other/cover.png`; 	
  }
}

function endToNextSong() { 
  currentSong = (currentSong + 1) % songs.length; 
  if (currentSong==0) { 
	currentSong = 0;
	loadSong()
	stopMusic();
  } else {
	loadSong();
	playMusic();
	albumCover.style.animation = '';
  }
}

function nextSong() { 
if (isPlaying==true) {
  currentSong = (currentSong + 1) % songs.length; 
  loadSong();
  playMusic();
  albumCover.style.animation = '';
  }
}

function previousSong() { 
if (isPlaying==true){
  currentSong = (currentSong - 1 + songs.length) % songs.length; 
  loadSong();
  playMusic();
  albumCover.style.animation = '';
  }
}

function updateSongName() { 
  songNameElement.textContent = songNames[currentSong];
}

audio.addEventListener('ended', () => { 
  albumCover.style.animation = ''; 
  isPlaying = false; 
  endToNextSong(); 
});

audio.addEventListener('play', () => { 
  playMusic();
});

loadSong(); 

function changeSong() { 
  first = 1; 
  const songList = document.getElementById('songList');
  currentSong = parseInt(songList.value); 
  loadSong(); 
  playMusic();
  albumCover.style.animation = '';
}

progressContainer.addEventListener('mousedown', (e) => { 
  const width = progressContainer.clientWidth; 
  const clickX = e.clientX - progressContainer.getBoundingClientRect().left; 
  const duration = audio.duration; 
  const currentTime = (clickX / width) * duration;  
  audio.currentTime = currentTime; 
  document.onmousemove = (e) => { 
	const moveX = e.clientX - progressContainer.getBoundingClientRect().left; 
	const newTime = (moveX / width) * duration;    
	if (newTime >= 0 && newTime <= duration) { 
	  audio.currentTime = newTime; 
	}
  };
});

document.addEventListener('mouseup', () => { 
  document.onmousemove = null; 
});

audio.addEventListener('timeupdate', () => { 
  const progress = (audio.currentTime / audio.duration) * 100; 
  progressBar.style.width = `${progress}%`; 
  const currentTime = formatTime(audio.currentTime); 
  const totalTime = formatTime(audio.duration); 
  const currentTimeDisplay = document.querySelector('.time-display .current-time'); 
  const totalTimeDisplay = document.querySelector('.time-display .total-time'); 
  currentTimeDisplay.textContent = currentTime; 
  totalTimeDisplay.textContent = totalTime; 
});

function formatTime(seconds) { 
  const minutes = Math.floor(seconds / 60); 
  const remainingSeconds = Math.floor(seconds % 60); 
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds; 
  return `${minutes}:${formattedSeconds}`; 
}

function showTimeDisplay() { 
  const timeDisplay = document.getElementById('timeDisplay');
  timeDisplay.style.visibility = 'visible'; 
}

function hideTimeDisplay() { 
  const timeDisplay = document.getElementById('timeDisplay');
  timeDisplay.style.visibility = 'hidden'; 
}	

// 鼠标点击出现符号特效
	window.onload = function () {
		function ClickFrontShow() {
			this.fron = ['The Dark Side of the Moon', 'Pink Floyd', 'Progressive Rock', '1973', 'Speak To Me', 'Breathe (In The Air)', 'On The Run', 'Time', 'The Great Gig In The Sky', 'Money', 'Us And Them', 'Any Colour You Like', 'Brain Damage', 'Eclipse'];
			// 彩虹七色: 红、橙、黄、绿、蓝、靛蓝、堇紫
			this.colo = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#8B00FF'];
			this.elBody = document.getElementsByTagName("body")[0];
			this.randomNum = null;
			this.finde = 0;
			this.cls = 0;
		}
		ClickFrontShow.prototype.init = function (frontArray, colorArray) {
			this.fron = frontArray || this.fron;
			this.colo = colorArray || this.colo;
			this.listenMouse();
		}
		ClickFrontShow.prototype.createFront = function (classname) {
			var self = this;
			let ospan = document.createElement('span');
			let cssText = "position:absolute; width: 400px; height: 20px; cursor: default; transform: translate(-50%,-50%); font-weight: bold; opacity: 1; z-index: 1000; transition: 1s;";
			let randomFront = self.fron[self.finde];
			let randomColor = self.colo[Math.round(Math.random() * (self.colo.length - 1))];
			self.finde = (self.finde + 1) % self.fron.length;
			self.elBody.appendChild(ospan);
			ospan.className = String(classname);
			ospan.style.cssText = cssText + "-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;user-select: none;"
			ospan.style.color = randomColor;
			ospan.innerHTML = randomFront;
		}
		ClickFrontShow.prototype.listenMouse = function () {
			var self = this;
			document.onclick = function (e) {
				if (self.cls === 20) {
					self.cls = 0;
				} else {
					self.cls += 1;
				}
				self.createFront(self.cls);
				let el = document.getElementsByClassName(self.cls)[0];
				el.style.left = e.clientX + 'px';
				el.style.top = e.clientY + 'px';
				setTimeout(function () {
					el.style.opacity = 0;
					el.style.top = el.offsetTop - 100 + 'px';
				}, 100);
				setTimeout(function () {
					self.elBody.removeChild(el);
				}, 2000);
			}

		}
		var frontShow = new ClickFrontShow();
		frontShow.init();
	}

// 动态繁星背景
const stars = document.querySelector('.stars');
for (let i = 0; i < 100; i++) {
	const star = document.createElement('div');
	star.className = 'star';
	star.style.top = Math.random() * 100 + 'vh';
	star.style.left = Math.random() * 100 + 'vw';
	star.style.width = Math.random() * 2 + 1 + 'px';
	star.style.height = star.style.width;
	star.style.animationDuration = Math.random() * 2 + 1 + 's';
	stars.appendChild(star);

}
