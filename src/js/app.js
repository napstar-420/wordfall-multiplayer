import loadBossScoreBoard from "./bossScoreBoard.js";
import loadMainMenu from "./mainMenu.js";
import createNormalModeUI from "./normalModeUI.js";
import loadScoreBoard from "./scoreBoard.js";
import createScoreBoard from "./scoreBoard.js";

// PIXI APPLICATION
export const app = new PIXI.Application({
  width: 1000,
  height: 600,
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
  "normalModeFg",
  "/src/assets/images/normal mode foreground.png"
);
PIXI.Assets.add("scoreFrame", "/src/assets/images/score with frame.png");
PIXI.Assets.add("clockFrame", "/src/assets/images/clock with frame.png");
PIXI.Assets.add("menuBtn", "/src/assets/images/hamburger menu b.png");
PIXI.Assets.add("flower", "/src/assets/images/flower without glow 1.png");
PIXI.Assets.add("twinFlower1", "/src/assets/images/flower without glow 2.png");
PIXI.Assets.add("twinFlower2", "/src/assets/images/flower without glow 3.png");
PIXI.Assets.add("bossModeBg", "/src/assets/images/boss mode back.png");
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
PIXI.Assets.add('bossScoreBoardCross', '/src/assets/images/boss mode button.png')

loadMainMenu(app);