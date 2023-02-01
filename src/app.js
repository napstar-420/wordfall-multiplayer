import { Application, Assets } from "pixi.js";
import FontFaceObserver from "fontfaceobserver";
import mainMenuBg from "./assets/images/mainMenu/Main menu background.png";
import menuBoard from "./assets/images/mainMenu/frame withouth button 1.png";
import menuBtnBack from "./assets/images/mainMenu/menu tile v1.png";
import sfxOn from "./assets/images/mainMenu/icon sfx.png";
import sfxOff from "./assets/images/mainMenu/icon sfx muted.png";
import musicOff from "./assets/images/mainMenu/music_off.png";
import musicOn from "./assets/images/mainMenu/music_on.png";
import normalModeBg from "./assets/images/normalMode/back only for tiling light.png";
import normalModeClouds from "./assets/images/normalMode/clouds group light.png";
import normalModefg from "./assets/images/normalMode/normal mode foreground.png";
import flower1 from "./assets/images/normalMode/flower without glow 1.png";
import flower2 from "./assets/images/normalMode/flower without glow 2.png";
import flower3 from "./assets/images/normalMode/flower without glow 3.png";
import scoreFrame from "./assets/images/gameUI/score with frame.png";
import clockFrame from "./assets/images/gameUI/clock with frame.png";
import menuBtn from "./assets/images/gameUI/hamburger menu b.png";
import bossModeBg from "./assets/images/bossMode/boss_background.png";
import bossModeFg from "./assets/images/bossMode/boss mode foreground.png";
import bossModeClouds from "./assets/images/bossMode/clouds group dark.png";
import jackoLantern1 from "./assets/images/bossMode/Layer 1.png";
import jackoLantern2 from "./assets/images/bossMode/Halloween-Jack-O-Lantern-PNG-Transparent-Picture-4.png";
import jackoLantern3 from "./assets/images/bossMode/Halloween-Jack-O-Lantern-PNG-Transparent-Picture-5.png";
import pumpkin from './assets/images/bossMode/pumpkin.png'
import scoreBoardBg from "./assets/images/normalMode/Group 70.png";
import scoreBoard from "./assets/images/normalMode/longboard without button 1.png";
import scoreBoardExtras from "./assets/images/normalMode/Rectangle 27.png";
import troubledWordBg from "./assets/images/Rectangle 24.png";
import normalCrossBtn from "./assets/images/normalMode/normalScoreBoardCrossBtn.png";
import bossScoreBoard from "./assets/images/bossMode/bossmod menu board v1.4.png";
import bossScoreBg from "./assets/images/bossMode/scoreboard boss mode bacl.png";
import bossBoardBtnBg from "./assets/images/bossMode/stone button1_.png";
import bossScoreExtrasBg from "./assets/images/bossMode/boss mode board shape1.png";
import bossScoreBoardCross from "./assets/images/bossMode/boss mode button.png";
import incrementWpmBtnTexture from "./assets/images/practiceMode/right_arrow.png";
import decrementWpmBtnTexture from "./assets/images/practiceMode/left_arrow.png";
import wpmBack from "./assets/images/practiceMode/Rectangle 27.png";
import difficultyBack from "./assets/images/practiceMode/Rectangle 45.png";
import pauseMenuBg from "./assets/options menu assets/mini options baord.png";
import resumeBtn from "./assets/options menu assets/resume_play button.png";
import restartBtn from "./assets/options menu assets/reset button.png";
import mainMenuBtn from "./assets/options menu assets/Main menu button.png";
import checkBox from "./assets/options menu assets/check box.png";
import checkBoxFill from "./assets/options menu assets/check box indicator.png";
import bossPauseMenuBg from "./assets/boss mode options menu assets/mini options baord.png";
import bossResumeBtn from "./assets/boss mode options menu assets/boss_resume_btn.png";
import bossRestartBtn from "./assets/boss mode options menu assets/boss_restart_btn.png";
import bossMainMenuBtn from "./assets/boss mode options menu assets/boss_mainMenu_btn.png";
import bossCheckBox from "./assets/boss mode options menu assets/boss_check_box.png";
import bossCheckFill from "./assets/boss mode options menu assets/boss_check_fill.png";
import leaderBoardBg from "./assets/images/leaderboard/Group 71.png";
import leaderScoreBg from './assets/images/leaderboard/Rectangle 3.png';
import leaderNameBg from './assets/images/leaderboard/Rectangle 2.png';
import scoreTrophy from './assets/images/leaderboard/Group 64.png';
import boardInnerBg from './assets/images/leaderboard/Rectangle 1.png';

import loadMainMenu from "./mainMenu";
import loadBossModeUI from "./boss mode/ui";
import loadScoreBoard from "./normalMode/scoreBoard";

const game = document.createElement("div");
game.id = "game-container";
document.body.appendChild(game);

export const app = new Application({
  width: window.innerHeight * (5 / 3),
  height: window.innerHeight,
});

window.addEventListener("resize", () => {
  app.view.width = window.innerHeight * (5 / 3);
  app.view.height = window.innerHeight;
});

game.appendChild(app.view);

// MAIN MENU
Assets.add("mainMenuBackground", mainMenuBg);
Assets.add("menuBoard", menuBoard);
Assets.add("menuBtnBack", menuBtnBack);
Assets.add("sfxOn", sfxOn);
Assets.add("sfxOff", sfxOff);
Assets.add("musicOn", musicOn);
Assets.add("musicOff", musicOff);

// NORMAL MODE
Assets.add("normalModeBg1", normalModeBg);
Assets.add("normalModeClouds", normalModeClouds);
Assets.add("normalModeFg", normalModefg);
Assets.add("flower", flower1);
Assets.add("twinFlower1", flower2);
Assets.add("twinFlower2", flower3);

// GAME UI
Assets.add("scoreFrame", scoreFrame);
Assets.add("clockFrame", clockFrame);
Assets.add("menuBtn", menuBtn);

// BOSS MODE
Assets.add("bossModeBg", bossModeBg);
Assets.add("bossModeClouds", bossModeClouds);
Assets.add("bossModeFg", bossModeFg);
Assets.add("jackOLantern1", jackoLantern1);
Assets.add("jackOLantern2", jackoLantern2);
Assets.add("jackOLantern3", jackoLantern3);
Assets.add('pumpkin', pumpkin)

//Score Board
Assets.add("scoreBoardBg", scoreBoardBg);
Assets.add("scoreBoard", scoreBoard);
Assets.add("scoreBoardExtras", scoreBoardExtras);
Assets.add("troubledWordBg", troubledWordBg);
Assets.add("normalCrossBtn", normalCrossBtn);

//Boss Mode Score Board
Assets.add("bossScoreBoard", bossScoreBoard);
Assets.add("bossScoreBg", bossScoreBg);
Assets.add("bossScoreBtnBg", bossBoardBtnBg );
Assets.add("bossScoreExtrasBg", bossScoreExtrasBg);
Assets.add("bossScoreBoardCross", bossScoreBoardCross);

// Practice Mode
Assets.add("incrementWpmBtnTexture", incrementWpmBtnTexture);
Assets.add("decrementWpmBtnTexture", decrementWpmBtnTexture);
Assets.add("wpmBack", wpmBack);
Assets.add("difficultyBack", difficultyBack);

// Normal Mode Pause Menu
Assets.add("pauseMenuBg", pauseMenuBg);
Assets.add("resumeBtn", resumeBtn);
Assets.add("restartBtn", restartBtn);
Assets.add("mainMenuBtn", mainMenuBtn);
Assets.add("checkBox", checkBox);
Assets.add("checkFill", checkBoxFill);

// Boss Mode Pause menu
Assets.add("bossPauseMenuBg", bossPauseMenuBg);
Assets.add("bossResumeBtn", bossResumeBtn);
Assets.add("bossRestartBtn", bossRestartBtn);
Assets.add("bossMainMenuBtn", bossMainMenuBtn);
Assets.add("bossCheckBox", bossCheckBox);
Assets.add("bossCheckFill", bossCheckFill);

// LEADERBOARD
Assets.add('leaderBoardBg', leaderBoardBg);
Assets.add('leaderNameBg', leaderNameBg);
Assets.add('scoreTrophy', scoreTrophy);
Assets.add('leaderBoardInnerBg', boardInnerBg);
Assets.add('leaderScoreBg', leaderScoreBg);

const Boogaloo = new FontFaceObserver('Boogaloo');
const Barlow = new FontFaceObserver('Barlow');
const LuckiestGuy = new FontFaceObserver('Luckiest Guy');

(async () => {
  await Boogaloo.load().then(() => {
    loadMainMenu();
  })
  await Barlow.load();
  await LuckiestGuy.load();
})()

// loadBossModeUI(app, 2)
// loadScoreBoard(app, {accuracy: 98, wpm: 35, score: 945, level: 'NORMAL', troubledWords: ['lroem', 'ipsum', 'dripsum', 'cripsum']})