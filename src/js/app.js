import loadMainMenu from "./mainMenu.js";

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
  "/src/assets/images/mainMenu/Main menu background.png"
);
PIXI.Assets.add("menuBoard", "/src/assets/images/mainMenu/frame withouth button 1.png");
PIXI.Assets.add("menuBtnBack", "/src/assets/images/mainMenu/menu tile v1.png");
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
PIXI.Assets.add("scoreFrame", "/src/assets/images/gameUI/score with frame.png");
PIXI.Assets.add("clockFrame", "/src/assets/images/gameUI/clock with frame.png");
PIXI.Assets.add("menuBtn", "/src/assets/images/gameUI/hamburger menu b.png");
PIXI.Assets.add("flower", "/src/assets/images/normalMode/flower without glow 1.png");
PIXI.Assets.add("twinFlower1", "/src/assets/images/normalMode/flower without glow 2.png");
PIXI.Assets.add("twinFlower2", "/src/assets/images/normalMode/flower without glow 3.png");
PIXI.Assets.add('bossModeBg1', '/src/assets/images/bossMode/boss mode back 1.png');
PIXI.Assets.add('bossModeBg2', '/src/assets/images/bossMode/boss mode back 2.png');
PIXI.Assets.add('bossModeBg3', '/src/assets/images/bossMode/boss mode back 3.png');
PIXI.Assets.add("bossModeClouds", "/src/assets/images/bossMode/clouds group dark.png");
PIXI.Assets.add("bossModeFg", "/src/assets/images/bossMode/boss mode foreground.png");
PIXI.Assets.add("jackOLantern1", "/src/assets/images/bossMode/Jack-O-Lantern 1.png");
PIXI.Assets.add("jackOLantern2", "/src/assets/images/bossMode/Jack-O-Lantern 2.png");
PIXI.Assets.add(
  "jackOLantern3",
  "/src/assets/images/bossMode/Jack-O-Lantern 3 tilted.png"
);

//Score Board
PIXI.Assets.add("scoreBoardBg", "/src/assets/images/normalMode/Group 70.png");
PIXI.Assets.add(
  "scoreBoard",
  "/src/assets/images/normalMode/longboard without button 1.png"
);
PIXI.Assets.add("scoreBoardExtras", "/src/assets/images/normalMode/Rectangle 27.png");
PIXI.Assets.add("troubledWordBg", "/src/assets/images/normalMode/Rectangle 24.png");
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
PIXI.Assets.add("bossScoreBtnBg", "/src/assets/images/bossMode/stone button1_.png");
PIXI.Assets.add(
  "bossScoreExtrasBg",
  "/src/assets/images/bossMode/boss mode board shape1.png"
);
PIXI.Assets.add(
  "bossScoreBoardCross",
  "/src/assets/images/bossMode/boss mode button.png"
);

loadMainMenu(app);