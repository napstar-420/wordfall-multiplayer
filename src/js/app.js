// PIXI APPLICATION
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
});

// APPENDING TO GAME DIV
document.getElementById("game-container").appendChild(app.view);

// ADDING ASSETS TO PIXI
//Main Menu
PIXI.Assets.add(
  "mainMenuBackground",
  "/src/assets/images/Main menu background.png"
);
PIXI.Assets.add("menuBoard", "/src/assets/images/frame withouth button 1.png");
PIXI.Assets.add("menuBtnBack", "/src/assets/images/menu tile v1.png");

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

// createMainMenu(app);
// createScoreBoard(app);
createBossScoreBoard(app);
