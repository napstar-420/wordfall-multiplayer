if (localStorage.length === 0) {
    localStorage.setItem("isMusicOn", true);
    localStorage.setItem("isSfxOn", true);
}

const isMusicOn = JSON.parse(localStorage.getItem('isMusicOn'));
const isSfxOn = JSON.parse(localStorage.getItem('isSfxOn'));

export const hoverSound = new Audio(
  "/src/assets/music and sound effects/hoverSound.mp3"
);

export const tapSound = new Audio(
  "/src/assets/music and sound effects/tapSound.wav"
);
tapSound.volume = 1;

export const brickBreakSound = new Audio (
  "/src/assets/music and sound effects/brickSound.wav"
);

export const homeBackMusic = new Audio(
  "/src/assets/music and sound effects/background-music.mp3"
);

homeBackMusic.volume = 0.5;
homeBackMusic.loop = true;

export const normalModeBackMusic = new Audio(
    '/src/assets/music and sound effects/normalMode-back-music.mp3'
)
normalModeBackMusic.volume = 0.5;
normalModeBackMusic.loop = true;

export const bossModeBackMusic = new Audio('/src/assets/music and sound effects/bossModeBackMusic.mp3');
bossModeBackMusic.volume = 0.5;
bossModeBackMusic.loop = true; 

isMusicOn ? turnMusicOn() : turnMusicOff();
isSfxOn ? turnSfxOn() : turnSfxOff();

export function turnMusicOn() {
    localStorage.setItem('isMusicOn', true);
    homeBackMusic.volume = 0.5;
    normalModeBackMusic.volume = 0.5;
    bossModeBackMusic.volume = 0.5;
}

export function turnMusicOff() {
    localStorage.setItem('isMusicOn', false);
    homeBackMusic.volume = 0;
    normalModeBackMusic.volume = 0;
    bossModeBackMusic.volume = 0;
}

export function turnSfxOn() {
    localStorage.setItem('isSfxOn', true);
    hoverSound.volume = 0.5;
    tapSound.volume = 1;
    brickBreakSound.volume = 1;
}

export function turnSfxOff() {
    localStorage.setItem('isSfxOn', false);
    hoverSound.volume = 0;
    tapSound.volume = 0;
    brickBreakSound.volume = 0;
}