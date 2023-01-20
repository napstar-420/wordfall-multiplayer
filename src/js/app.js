import loadBossModeUI from "./bossModeUI.js";
import loadBossScoreBoard from "./bossScoreBoard.js";
import loadMainMenu from "./mainMenu.js";
import loadNormalModeUI from "./normalModeUI.js";
import createNormalModeUI from "./normalModeUI.js";
import loadScoreBoard from "./scoreBoard.js";
import createScoreBoard from "./scoreBoard.js";

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
PIXI.Assets.add(
  "mainMenuBackground",
  "/src/assets/images/Main menu background.png"
);
PIXI.Assets.add("menuBoard", "/src/assets/images/frame withouth button 1.png");
PIXI.Assets.add("menuBtnBack", "/src/assets/images/menu tile v1.png");
PIXI.Assets.add("normalModeBg", "/src/assets/images/normal mode back.png");
PIXI.Assets.add(
  "normalModeBg1",
  "/src/assets/images/back only for tiling light.png"
);
PIXI.Assets.add(
  "normalModeClouds",
  "/src/assets/images/clouds group light.png"
);
PIXI.Assets.add(
  "normalModeFg",
  "/src/assets/images/normal mode foreground.png"
);
PIXI.Assets.add("scoreFrame", "/src/assets/images/score with frame.png");
PIXI.Assets.add("clockFrame", "/src/assets/images/clock with frame.png");
PIXI.Assets.add("menuBtn", "/src/assets/images/hamburger menu b.png");
PIXI.Assets.add("flower", "/src/assets/images/flower without glow 1.png");
PIXI.Assets.add("twinFlower1", "/src/assets/images/flower without glow 2.png");
PIXI.Assets.add("twinFlower2", "/src/assets/images/flower without glow 3.png");
PIXI.Assets.add(
  "bossModeBg",
  "/src/assets/images/back only for tiling dark.png"
);
PIXI.Assets.add("bossModeClouds", "/src/assets/images/clouds group dark.png");
PIXI.Assets.add("bossModeFg", "/src/assets/images/boss mode foreground.png");
PIXI.Assets.add("jackOLantern1", "/src/assets/images/jack-O-lantern 1.png");
PIXI.Assets.add("jackOLantern2", "/src/assets/images/Jack-O-Lantern 2.png");
PIXI.Assets.add(
  "jackOLantern3",
  "/src/assets/images/Jack-O-Lantern 3 tilted.png"
);

//Score Board
PIXI.Assets.add("scoreBoardBg", "/src/assets/images/Group 70.png");
PIXI.Assets.add(
  "scoreBoard",
  "/src/assets/images/longboard without button 1.png"
);
PIXI.Assets.add("scoreBoardExtras", "/src/assets/images/Rectangle 27.png");
PIXI.Assets.add("troubledWordBg", "/src/assets/images/Rectangle 24.png");
PIXI.Assets.add(
  "normalCrossBtn",
  "/src/assets/images/normalScoreBoardCrossBtn.png"
);

//Boss Mode Score Board
PIXI.Assets.add(
  "bossScoreBoard",
  "/src/assets/images/bossmod menu board v1.4.png"
);
PIXI.Assets.add(
  "bossScoreBg",
  "/src/assets/images/scoreboard boss mode bacl.png"
);
PIXI.Assets.add("bossScoreBtnBg", "/src/assets/images/stone button1_.png");
PIXI.Assets.add(
  "bossScoreExtrasBg",
  "/src/assets/images/boss mode board shape1.png"
);
PIXI.Assets.add(
  "bossScoreBoardCross",
  "/src/assets/images/boss mode button.png"
);

// loadNormalModeUI(app);
loadMainMenu(app);
// loadBossModeUI(app);
// const endScore = {
//   accuracy: 56,
//   wpm: 40,
//   troubledWords: [
//     "lorem",
//     "ipsum",
//     "lorem",
//     "ipsum",
//     "lorem",
//     "ipsum",
//     "lorem",
//     "ipsum",
//     "lorem",
//     "ipsum",
//     "lorem",
//     "ipsum",
//     "lorem",
//     "ipsum",
//   ],
//   score: 1245,
// };
// loadScoreBoard(app, endScore);
// loadBossScoreBoard(app, endScore);
