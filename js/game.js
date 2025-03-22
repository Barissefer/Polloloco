let canvas;
let world;
let gameStarted = false;
const arrowLeft = document.getElementById('arrowLeft');
const arrowRight = document.getElementById('arrowRight');
const dKey = document.getElementById('dKey');
const spaceKey = document.getElementById('spaceKey');
const speaker = document.getElementById('speaker');
const speakerTouchscreen = document.getElementById('touchMute');
const infoToast = document.getElementById('info');
const background_sound = new Audio ('audio/musica2.mp3');
const slider = document.getElementById('myRange');
const navBarTop = document.getElementById('navBarTop');
const reloadButton = document.getElementById('reloadGame');
const reloadButtonBig = document.getElementById('reloadGameBig');
const checkbox = document.getElementById('musicCheckbox');
const checkboxLabel = document.getElementById('guitarPicture'); 
const checkboxTouch = document.getElementById('musicCheckboxTouch');
const checkboxLabelTouch = document.getElementById('guitarPictureTouch'); 
let localStorageMusicMuted = localStorage.getItem('musicMuted');
let localStorageMuted = localStorage.getItem('Muted');
const allAudioElements = []
let muted 
let musicMuted
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  changeInfoToastBorder();
  setVolume();
  checkIfMobileIsHorizontal();
  positioningButtonsOnMobile();
  saveMutedToLocalStorage();
  setSavedMutedSoundFiles();
  checkForMuted();
  changeImagesOnMutedMusic();
}

function startGame() {
  if(!gameStarted){
      world.startScreen = false;
      world.character.animate();
      world.level.enemies.forEach(enemie => { enemie.animate()});
      gameStarted = true;
      showTouchControlsOnMobile();
      allAudioElements.push(background_sound);    
      background_sound.volume = 0.1;
      setSavedMutedSoundFiles();
      checkForMuted();
      changeImagesOnMutedMusic();      
      playMusic();
      world.level.screen[0].x = 4000;
  }
}

function restartGame(){
  setSavedMutedSoundFiles();  
  stopChickenIntervals();
  world.character.stopAllIntervals();
  world = null;  
  init();    
  gameStarted = false;
  level1 = createNewLevel();
  prepareWorld();
  startGame();
}

function saveMutedToLocalStorage() {  
  if(muted == undefined || musicMuted == undefined){
    muted = false;
    musicMuted = true;
  }else{
    localStorage.setItem('Muted' , muted);
    localStorage.setItem('musicMuted' , musicMuted);
  }
}

function changeInfoToastBorder(){
    canvas.addEventListener('mouseover', ()=> {
          infoToast.classList.add('hovered-canvas');
    })
    canvas.addEventListener('mouseout', ()=> {
        infoToast.classList.remove('hovered-canvas');  })
}

window.addEventListener('keydown', (event) => {
    event.keyCode == 40 ? keyboard.DOWN = true : null;
    event.keyCode == 38 ? keyboard.UP = true : null;
    event.keyCode == 32 ? keyboard.SPACE = true : null;
    event.keyCode == 39 ? keyboard.RIGHT = true : null;
    event.keyCode == 37 ? keyboard.LEFT = true : null;
    event.keyCode == 68 ? keyboard.D = true : null;
});

window.addEventListener('keyup', (event) => {
    event.keyCode == 40 ? keyboard.DOWN = false : null;
    event.keyCode == 38 ? keyboard.UP = false : null;
    event.keyCode == 32 ? keyboard.SPACE = false : null;
    event.keyCode == 39 ? keyboard.RIGHT = false : null;
    event.keyCode == 37 ? keyboard.LEFT = false : null; 
    event.keyCode == 68 ? keyboard.D = false : null;
});

function setVolume(){
    slider.addEventListener('input', () => {
        background_sound.volume = slider.value / 100;
    }
)}

function toggleMusic() {
  musicMuted = !musicMuted;  
  if (!musicMuted) {     
    checkbox.checked = false;
    checkboxTouch.checked = false;
  }else{    
    checkbox.checked = true;
    checkboxTouch.checked = true;
  }
  musicMutedToLocalSotrage();
  playMusic();
}

function changeImagesOnMutedMusic() {
  if (!musicMuted) {
    checkboxLabel.src = 'img/icons/guitar.png';
    checkboxLabelTouch.src = 'img/icons/guitar.png';        
  } else {
    checkboxLabel.src = 'img/icons/guitar-muted.png';
    checkboxLabelTouch.src = 'img/icons/guitar-muted.png';     
  }
}

function musicMutedToLocalSotrage(){
  localStorage.setItem('musicMuted', musicMuted);
}

function playMusic() {
  if (!musicMuted ) {
    !muted ? background_sound.play() : null;
    checkboxLabel.src = 'img/icons/guitar.png';
    checkboxLabelTouch.src = 'img/icons/guitar.png';        
  } else {
    background_sound.pause();
    background_sound.currentTime = 0; 
    checkboxLabel.src = 'img/icons/guitar-muted.png';
    checkboxLabelTouch.src = 'img/icons/guitar-muted.png';     
  }
}

function checkForMuted() {  
  if(muted){
        allAudioElements.forEach((audioFile) => { audioFile.muted = true});
    }else{
        allAudioElements.forEach((audioFile) => { audioFile.muted = false });
    }
    changeVolumeImageSource(muted);
}

function changeVolumeImageSource(muted) {
  muted == true ? speaker.src = 'img/icons/mute.png' : speaker.src = 'img/icons/volume-64.png';
  muted == true ? speakerTouchscreen.style.backgroundImage = 'url(\'img/icons/mute.png\')' : speakerTouchscreen.style.backgroundImage = 'url(\'img/icons/volume-64.png\')';
}

function muteSound() { 
  muted = !muted;
  localStorage.setItem('Muted' , muted);
  checkForMuted();
  playMusic();    
}

function setSavedMutedSoundFiles() {
  muted = localStorage.getItem('Muted') === 'true';
  musicMuted = localStorage.getItem('musicMuted') === 'true';
  checkbox.checked = musicMuted;
  checkboxTouch.checked = musicMuted;
}
