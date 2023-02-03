import { Sprite, Container, Text, Assets } from "pixi.js";
import { TweenMax } from "gsap/gsap-core.js";
import { Back, Elastic } from "gsap";
import { app } from "./app.js";
import loadNormalModeUI from "./normalMode/ui.js";
import { getBackground, getMenuBoard } from "./gameUI.js";
import loadBossModeInfo from "./boss mode/info.js";
import loadPracticeModeInfo from "./practiceMode/practiceModeInfo.js";
import divBg from './assets/images/download (1).jpeg';
import {
  hoverSound,
  tapSound,
  homeBackMusic,
  turnMusicOff,
  turnMusicOn,
  turnSfxOn,
  turnSfxOff,
} from "./music and sounds/index.js";
import loadLeaderBoard from "./leaderboard/ui.js";

export default function loadMainMenu() {
  // Adding backrgound to div
  document.getElementById("game-container").style.backgroundImage =
    `url('${divBg}')`;
  // PLaying Background Music
  homeBackMusic.pause();
  homeBackMusic.currentTime = 0;
  let isMusicOn = JSON.parse(localStorage.getItem("isMusicOn"));
  let isSfxOn = JSON.parse(localStorage.getItem('isSfxOn'));
  const playBackMusicPromise = homeBackMusic.play();
  playBackMusicPromise
    .then(() => {
      console.log('music playing')
    })
    .catch((err) => {
      document
        .getElementById("game-container")
        .addEventListener("pointerdown", playHomeMusic);
    });

  function playHomeMusic() {
    homeBackMusic.play();
  }

  // MAIN MENU
  const MAIN_MENU = new Container();
  MAIN_MENU.width = app.view.width;
  MAIN_MENU.height = app.view.height;

  // BOARD CONTAINER
  const BoardContainer = new Container();
  const width = (app.view.height * 90) / 100;
  const height = (app.view.height * 100) / 100;
  BoardContainer.width = width;
  BoardContainer.height = height;
  BoardContainer.x = app.view.width / 2;
  BoardContainer.y = -height - 200;

  // LOADING ASSETS
  Assets.load([
    "mainMenuBackground",
    "menuBoard",
    "menuBtnBack",
    "sfxOn",
    "sfxOff",
    "musicOn",
    "musicOff",
  ]).then((textures) => {
    // DESTRUCTURING
    const {
      mainMenuBackground,
      menuBoard,
      menuBtnBack,
      sfxOn,
      sfxOff,
      musicOn,
      musicOff,
    } = textures;

    // ADD BACKGROUND AND BOARD SPRITE
    MAIN_MENU.addChild(getBackground(mainMenuBackground));
    BoardContainer.addChild(getMenuBoard(menuBoard));

    // PLAY NOW BTN
    const playNowButton = new Text("PLAY NOW", {
      fontSize: (BoardContainer.height * 10) / 100,
      fill: 0xffffff,
      align: "left",
      fontFamily: "Boogaloo",
      fontWeight: "500",
    });
    playNowButton.y = (BoardContainer.height * 29) / 100;
    playNowButton.anchor.x = 0.56;
    playNowButton.anchor.y = 0.5;
    playNowButton.scale.x = 0.8;
    playNowButton.scale.y = 0.8;
    playNowButton.interactive = true;
    playNowButton.cursor = "pointer";
    playNowButton
      .on("pointerover", () => cursorOver(playNowButton, 0.8))
      .on("pointerout", () => cursorOut(playNowButton, 0.8))
      .on("pointerdown", () => startMode(loadNormalModeUI));
    BoardContainer.addChild(playNowButton);

    // CURSOR INTERACTIONS
    function cursorOver(button, scale) {
      button.scale.x = scale + 0.05;
      button.scale.y = scale + 0.05;
      hoverSound.play();
    }
    function cursorOut(button, scale) {
      button.scale.x = scale;
      button.scale.y = scale;
      hoverSound.pause();
      hoverSound.currentTime = 0;
    }
    function startMode(callback) {
      MAIN_MENU.children[1].children.forEach(child => {
        console.log(child)
        child.interactive = false;
        child.cursor = 'normal';
        child.removeAllListeners();
      })
      document
        .getElementById("game-container")
        .removeEventListener("pointerdown", playHomeMusic);
      tapSound.play();
      TweenMax.to(BoardContainer, 1, {
        ease: Back.easeIn.config(1.7),
        y: -height - 200,
      });
      setTimeout(() => {
        homeBackMusic.pause();
        app.stage.removeChild(MAIN_MENU);
        callback(app);
      }, 1500);
    }

    // ADDING MAIN MENU BUTTONS
    const modeBtns = [
      {
        mode: "BOSS MODE",
        height: (BoardContainer.height * 45) / 100,
        callback: loadBossModeInfo,
      },
      {
        mode: "PRACTICE",
        height: (BoardContainer.height * 57) / 100,
        callback: loadPracticeModeInfo,
      },
      {
        mode: "MULTIPLAYER",
        height: (BoardContainer.height * 69) / 100,
        event: () => alert("have not added yet"),
      },
      {
        mode: "LEADERBOARD",
        height: (BoardContainer.height * 81) / 100,
        callback: loadLeaderBoard,
      },
    ];

    modeBtns.map((modeObj) => {
      const modeBtn = new Sprite(menuBtnBack);
      const modeBtnScale = (BoardContainer.height * 1.35) / 100 / 10;
      modeBtn.scale.x = modeBtnScale;
      modeBtn.scale.y = modeBtnScale;
      modeBtn.x = 0;
      modeBtn.anchor.x = 0.55;
      modeBtn.anchor.y = 0.5;
      modeBtn.y = modeObj.height;
      const modeBtnText = new Text(modeObj.mode, {
        fontFamily: "Boogaloo",
        fontSize: 35,
        fontWeight: "500",
        fill: "0xffffff",
      });
      modeBtnText.anchor.set(0.6);
      modeBtn.addChild(modeBtnText);
      modeBtn.interactive = true;
      modeBtn.cursor = "pointer";
      modeBtn
        .on("pointerover", () => cursorOver(modeBtn, modeBtnScale))
        .on("pointerout", () => cursorOut(modeBtn, modeBtnScale))
        .on("pointerdown", () => startMode(modeObj.callback));
      BoardContainer.addChild(modeBtn);
    });
    MAIN_MENU.addChild(BoardContainer);

    const musicBtn = new Sprite(isMusicOn === true ? musicOn : musicOff);
    musicBtn.scale.x = (app.view.width * 0.04) / 100;
    musicBtn.scale.y = (app.view.width * 0.04) / 100;
    musicBtn.anchor.set(0.5);
    musicBtn.x = (app.view.width * 97) / 100;
    musicBtn.y = (app.view.height * 95) / 100;
    musicBtn.interactive = true;
    musicBtn.cursor = 'pointer';
    musicBtn
      .on('pointerover', () => {
        musicBtn.scale.x = (app.view.width * 0.045) / 100;
        musicBtn.scale.y = (app.view.width * 0.045) / 100;
      })
      .on('pointerout', () => {
        musicBtn.scale.x = (app.view.width * 0.04) / 100;
        musicBtn.scale.y = (app.view.width * 0.04) / 100;
      })
      .on('pointerdown', () => {
        if (isMusicOn === true) {
          isMusicOn = false;
          musicBtn.texture = musicOff;
          turnMusicOff();
        } else {
          isMusicOn = true;
          musicBtn.texture = musicOn;
          turnMusicOn();
        }
      })
    MAIN_MENU.addChild(musicBtn);

    const sfxBtn = new Sprite(isSfxOn === true ? sfxOn : sfxOff);
    sfxBtn.scale.x = (app.view.width * 0.04) / 100;
    sfxBtn.scale.y = (app.view.width * 0.04) / 100;
    sfxBtn.anchor.set(0.5);
    sfxBtn.x = (app.view.width * 91.5) / 100;
    sfxBtn.y = (app.view.height * 95) / 100;
    sfxBtn.interactive = true;
    sfxBtn.cursor = 'pointer';
    sfxBtn
      .on('pointerover', () => {
        sfxBtn.scale.x = (app.view.width * 0.045) / 100;
        sfxBtn.scale.y = (app.view.width * 0.045) / 100;
      })
      .on('pointerout', () => {
        sfxBtn.scale.x = (app.view.width * 0.04) / 100;
        sfxBtn.scale.y = (app.view.width * 0.04) / 100;
      })
      .on('pointerdown', () => {
        if (isSfxOn === true) {
          isSfxOn = false;
          sfxBtn.texture = sfxOff;
          turnSfxOff();
        } else {
          isSfxOn = true;
          sfxBtn.texture = sfxOn;
          turnSfxOn();
        }
      })
    MAIN_MENU.addChild(sfxBtn);
  });

  setTimeout(() => {
    TweenMax.to(BoardContainer, 1, {
      ease: Elastic.easeOut.config(1, 0.99),
      y: -50,
    });
  }, 750);

  // ADDING MAIN MENU
  app.stage.addChild(MAIN_MENU);
}
