import loadBossScoreBoard from "./boss mode/scoreBoard.js";
import { getBrickAnimation } from "./gameUI.js";
import loadLeaderBoard from "./leaderboard/ui.js";
import loadMainMenu from "./mainMenu.js";
import loadPracticeModeInfo from "./practiceMode/practiceModeInfo.js";

// PIXI APPLICATION
export const app = new PIXI.Application({
  width: window.innerHeight * (5 / 3),
  height: window.innerHeight,
});

window.addEventListener("resize", () => {
  app.view.width = window.innerHeight * (5 / 3);
  app.view.height = window.innerHeight;
});

// APPENDING TO GAME DIV
document.getElementById("game-container").appendChild(app.view);

// ADDING ASSETS TO PIXI

// MAIN MENU
PIXI.Assets.add(
  "mainMenuBackground",
  "/src/assets/images/mainMenu/Main menu background.png"
);
PIXI.Assets.add(
  "menuBoard",
  "/src/assets/images/mainMenu/frame withouth button 1.png"
);
PIXI.Assets.add("menuBtnBack", "/src/assets/images/mainMenu/menu tile v1.png");
PIXI.Assets.add("sfxOn", "/src/assets/images/mainMenu/icon sfx.png");
PIXI.Assets.add("sfxOff", "/src/assets/images/mainMenu/icon sfx muted.png");
PIXI.Assets.add("musicOn", "/src/assets/images/mainMenu/music_on.png");
PIXI.Assets.add("musicOff", "/src/assets/images/mainMenu/music_off.png");

// NORMAL MODE
PIXI.Assets.add(
  "normalModeBg1",
  "/src/assets/images/normalMode/back only for tiling light.png"
);
PIXI.Assets.add(
  "normalModeClouds",
  "/src/assets/images/normalMode/clouds group light.png"
);
PIXI.Assets.add(
  "normalModeFg",
  "/src/assets/images/normalMode/normal mode foreground.png"
);
PIXI.Assets.add(
  "flower",
  "/src/assets/images/normalMode/flower without glow 1.png"
);
PIXI.Assets.add(
  "twinFlower1",
  "/src/assets/images/normalMode/flower without glow 2.png"
);
PIXI.Assets.add(
  "twinFlower2",
  "/src/assets/images/normalMode/flower without glow 3.png"
);

// GAME UI
PIXI.Assets.add("scoreFrame", "/src/assets/images/gameUI/score with frame.png");
PIXI.Assets.add("clockFrame", "/src/assets/images/gameUI/clock with frame.png");
PIXI.Assets.add("menuBtn", "/src/assets/images/gameUI/hamburger menu b.png");

// BOSS MODE
PIXI.Assets.add(
  "bossModeBg",
  "/src/assets/images/bossMode/boss_background.png"
);
PIXI.Assets.add(
  "bossModeClouds",
  "/src/assets/images/bossMode/clouds group dark.png"
);
PIXI.Assets.add(
  "bossModeFg",
  "/src/assets/images/bossMode/boss mode foreground.png"
);
PIXI.Assets.add(
  "jackOLantern1",
  "/src/assets/images/bossMode/Layer 1.png"
);
PIXI.Assets.add(
  "jackOLantern2",
  "/src/assets/images/bossMode/Halloween-Jack-O-Lantern-PNG-Transparent-Picture-4.png"
);
PIXI.Assets.add(
  "jackOLantern3",
  "/src/assets/images/bossMode/Halloween-Jack-O-Lantern-PNG-Transparent-Picture-5.png"
);

//Score Board
PIXI.Assets.add("scoreBoardBg", "/src/assets/images/normalMode/Group 70.png");
PIXI.Assets.add(
  "scoreBoard",
  "/src/assets/images/normalMode/longboard without button 1.png"
);
PIXI.Assets.add(
  "scoreBoardExtras",
  "/src/assets/images/normalMode/Rectangle 27.png"
);
PIXI.Assets.add("troubledWordBg", "/src/assets/images/Rectangle 24.png");
PIXI.Assets.add(
  "normalCrossBtn",
  "/src/assets/images/normalMode/normalScoreBoardCrossBtn.png"
);

//Boss Mode Score Board
PIXI.Assets.add(
  "bossScoreBoard",
  "/src/assets/images/bossMode/bossmod menu board v1.4.png"
);
PIXI.Assets.add(
  "bossScoreBg",
  "/src/assets/images/bossMode/scoreboard boss mode bacl.png"
);
PIXI.Assets.add(
  "bossScoreBtnBg",
  "/src/assets/images/bossMode/stone button1_.png"
);
PIXI.Assets.add(
  "bossScoreExtrasBg",
  "/src/assets/images/bossMode/boss mode board shape1.png"
);
PIXI.Assets.add(
  "bossScoreBoardCross",
  "/src/assets/images/bossMode/boss mode button.png"
);

// Practice Mode
PIXI.Assets.add(
  "incrementWpmBtnTexture",
  "/src/assets/images/practiceMode/right_arrow.png"
);
PIXI.Assets.add(
  "decrementWpmBtnTexture",
  "/src/assets/images/practiceMode/left_arrow.png"
);
PIXI.Assets.add('wpmBack', '/src/assets/images/practiceMode/Rectangle 27.png');
PIXI.Assets.add('difficultyBack', '/src/assets/images/practiceMode/Rectangle 45.png');

// Normal Mode Pause Menu
PIXI.Assets.add(
  "pauseMenuBg",
  "/src/assets/options menu assets/mini options baord.png"
);
PIXI.Assets.add(
  "resumeBtn",
  "/src/assets/options menu assets/resume_play button.png"
);
PIXI.Assets.add(
  "restartBtn",
  "/src/assets/options menu assets/reset button.png"
);
PIXI.Assets.add(
  "mainMenuBtn",
  "/src/assets/options menu assets/Main menu button.png"
);
PIXI.Assets.add("checkBox", "/src/assets/options menu assets/check box.png");
PIXI.Assets.add(
  "checkFill",
  "/src/assets/options menu assets/check box indicator.png"
);

// Boss Mode Pause menu
PIXI.Assets.add(
  "bossPauseMenuBg",
  "/src/assets/boss mode options menu assets/mini options baord.png"
);
PIXI.Assets.add(
  "bossResumeBtn",
  "/src/assets/boss mode options menu assets/boss_resume_btn.png"
);
PIXI.Assets.add(
  "bossRestartBtn",
  "/src/assets/boss mode options menu assets/boss_restart_btn.png"
);
PIXI.Assets.add(
  "bossMainMenuBtn",
  "/src/assets/boss mode options menu assets/boss_mainMenu_btn.png"
);
PIXI.Assets.add(
  "bossCheckBox",
  "/src/assets/boss mode options menu assets/boss_check_box.png"
);
PIXI.Assets.add(
  "bossCheckFill",
  "/src/assets/boss mode options menu assets/boss_check_fill.png"
);

// LEADERBOARD
PIXI.Assets.add('leaderBoardBg', "/src/assets/images/leaderboard/Group 71.png");
PIXI.Assets.add('leaderScoreBg', '/src/assets/images/leaderboard/Rectangle 32.png');
PIXI.Assets.add('leaderNameBg', '/src/assets/images/leaderboard/Rectangle 31.png');
PIXI.Assets.add('scoreTrophy', '/src/assets/images/leaderboard/Group 64.png')



loadMainMenu(app);
// loadLeaderBoard(app);
// loadPracticeModeInfo(app);
// loadBossScoreBoard(app, {accuracy: 85, wpm: 40, score: 5476, level: 1}, 'COMPLETED')