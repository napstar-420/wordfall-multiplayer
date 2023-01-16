import createMainMenu from "./mainMenu.js";
import createNormalModeUI from "./normalModeUI.js";
import createBossModeUI from "./bossModeUI.js";
import { startGame } from "./normalModeGameLogic.js";

// PIXI APPLICATION
export const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
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
PIXI.Assets.add("flower", "/src/assets/images/flower 1.png");
PIXI.Assets.add("twinFlower1", "/src/assets/images/twin flower 1.png");
PIXI.Assets.add("twinFlower2", "/src/assets/images/twin flower 2.png");
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

const MAIN_MENU = createMainMenu(app);
const NORMAL_MODE = createNormalModeUI(app);
const BOSS_MODE = createBossModeUI(app);
// createScoreBoard(app);
// createBossScoreBoard(app);

app.stage.addChild(MAIN_MENU);
app.stage.addChild(NORMAL_MODE);
app.stage.addChild(BOSS_MODE);

NORMAL_MODE.visible = true;

startGame(app)

BOSS_MODE.visible = false;

