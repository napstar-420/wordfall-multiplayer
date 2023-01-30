import hoverSfx from "../assets/music and sound effects/hoverSound.mp3";
import tapSfx from "../assets/music and sound effects/tapSound.wav";
import brickBreakSfx from "../assets/music and sound effects/explosion.mp3";
import homeBack from '../assets/music and sound effects/background-music.mp3';
import normalModeBack from "../assets/music and sound effects/normalMode-back-music.mp3";
import bossModeBack from "../assets/music and sound effects/bossModeBackMusic.mp3";
import gameOverSfx from "../assets/music and sound effects/gameover.mp3";
import normalScoreMusic from "../assets/music and sound effects/normalScoreboardSound.mp3";
import successSfx from "../assets/music and sound effects/successSound.mp3";
import failureSfx from "../assets/music and sound effects/failureSound.mp3";

if (localStorage.length === 0) {
  localStorage.setItem("isMusicOn", true);
  localStorage.setItem("isSfxOn", true);
}

const isMusicOn = JSON.parse(localStorage.getItem("isMusicOn"));
const isSfxOn = JSON.parse(localStorage.getItem("isSfxOn"));

export const hoverSound = new Audio(hoverSfx);
export const tapSound = new Audio(tapSfx);
tapSound.volume = 1;

export const brickBreakSound = new Audio(brickBreakSfx);
brickBreakSound.volume = 0.6;
export const homeBackMusic = new Audio(homeBack);
homeBackMusic.volume = 0.5;
homeBackMusic.loop = true;

export const normalModeBackMusic = new Audio(normalModeBack);
normalModeBackMusic.volume = 0.5;
normalModeBackMusic.loop = true;

export const bossModeBackMusic = new Audio(bossModeBack);
bossModeBackMusic.volume = 0.5;
bossModeBackMusic.loop = true;

export const gameOverSound = new Audio(gameOverSfx);
export const normalScoreBoardMusic = new Audio(normalScoreMusic);
export const successSound = new Audio(successSfx);
export const failureSound = new Audio(failureSfx);
isMusicOn ? turnMusicOn() : turnMusicOff();
isSfxOn ? turnSfxOn() : turnSfxOff();
export function turnMusicOn() {
  localStorage.setItem("isMusicOn", true);
  homeBackMusic.volume = 0.5;
  normalModeBackMusic.volume = 0.5;
  bossModeBackMusic.volume = 0.5;
}
export function turnMusicOff() {
  localStorage.setItem("isMusicOn", false);
  homeBackMusic.volume = 0;
  normalModeBackMusic.volume = 0;
  bossModeBackMusic.volume = 0;
}
export function turnSfxOn() {
  localStorage.setItem("isSfxOn", true);
  hoverSound.volume = 0.5;
  tapSound.volume = 1;
  brickBreakSound.volume = 0.6;
  gameOverSound.volume = 1;
}
export function turnSfxOff() {
  localStorage.setItem("isSfxOn", false);
  hoverSound.volume = 0;
  tapSound.volume = 0;
  brickBreakSound.volume = 0;
  gameOverSound.volume = 0;
}