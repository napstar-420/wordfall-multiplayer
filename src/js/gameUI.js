import { app } from "./app.js";
import loadMainMenu from "./mainMenu.js";
import loadNormalModeUI from "./normalModeUI.js";

export function getMenuBoard(texture) {
  const menuBoardSprite = new PIXI.Sprite(texture);
  menuBoardSprite.width = (app.view.height * 90) / 100;
  menuBoardSprite.height = (app.view.height * 100) / 100;
  menuBoardSprite.anchor.x = 0.5;
  menuBoardSprite.anchor.y = 0.08;
  return menuBoardSprite;
}

export function getBackground(texture) {
  const bgSprite = new PIXI.Sprite(texture);
  bgSprite.width = app.view.width;
  bgSprite.height = app.view.height;
  return bgSprite;
}

export function getNormalClouds(texture) {
  const clouds = new PIXI.TilingSprite(texture, app.screen.width);
  clouds.width = app.view.width;
  clouds.height = app.view.height;
  clouds.alpha = 0.6;
  return clouds;
}

export function getForeground(texture) {
  const fgSprite = new PIXI.Sprite(texture);
  fgSprite.width = app.view.width;
  fgSprite.y = app.view.height - 140;
  return fgSprite;
}

export function getScoreFrame(texture) {
  const scoreFrame = new PIXI.Container();
  scoreFrame.x = app.view.width / 2;
  scoreFrame.y = (app.view.height * 6) / 100;

  const scoreFrameSprite = new PIXI.Sprite(texture);
  scoreFrameSprite.width = 200;
  scoreFrameSprite.height = 120;
  scoreFrameSprite.anchor.set(0.5);
  const score = new PIXI.Text("0", {
    fontWeight: "bold",
    fill: "#303030",
    fontFamily: "Barlow",
  });
  score.anchor.x = 0.5;
  score.anchor.y = 0.5;
  score.x = 15;
  score.y = -3;
  scoreFrame.addChild(scoreFrameSprite);
  scoreFrame.addChild(score);

  scoreFrame.scale.x = (app.view.height * 0.15) / 100;
  scoreFrame.scale.y = (app.view.height * 0.15) / 100;

  return scoreFrame;
}

export function getMultiplier() {
  // Multiplier
  const multiplier = new PIXI.Text("x1", {
    fontWeight: "normal",
    fill: "#f3ba22",
    fontFamily: "Luckiest Guy",
    fontSize: 40,
    stroke: "#ffffff",
    strokeThickness: 3,
  });
  multiplier.x = 30;
  multiplier.y = 5;
  multiplier.scale.x = (app.view.height * 0.15) / 100;
  multiplier.scale.y = (app.view.height * 0.15) / 100;
  return multiplier;
}

export function getClockFrame(texture) {
  const clockFrameSprite = new PIXI.Sprite(texture);
  clockFrameSprite.anchor.set(0.5);
  clockFrameSprite.x = 80;
  clockFrameSprite.y = 40;
  return clockFrameSprite;
}

export function getMenuBtn(texture) {
  const menuBtn = new PIXI.Sprite(texture);
  menuBtn.width = 130;
  menuBtn.height = 130;
  menuBtn.anchor.x = 0.9;
  menuBtn.anchor.y = 0.25;
  menuBtn.x = app.view.width + (app.view.width * 1.5) / 100;
  menuBtn.y = 5;
  menuBtn.scale.x = (app.view.height * 0.15) / 100;
  menuBtn.scale.y = (app.view.height * 0.15) / 100;
  return menuBtn;
}

export function getLivesContainer(textures) {
  const livesContainer = new PIXI.Container();
  const width = app.view.width - 80;
  livesContainer.width = width;
  livesContainer.height = 80;
  livesContainer.x = 20;
  livesContainer.y = app.view.height - 80;
  const distanceBetweenLife = width / 7 + (app.view.width * 2) / 100;
  for (let i = 0; i < 7; i++) {
    const lifeSprite = new PIXI.Sprite(
      textures[getRandomNumber(textures.length - 1, 0)]
    );
    lifeSprite.anchor.y = 1;
    lifeSprite.anchor.x = 0;
    lifeSprite.scale.x = (app.view.height * 0.15) / 100;
    lifeSprite.scale.y = (app.view.height * 0.15) / 100;
    lifeSprite.y = 0;
    lifeSprite.x = i * distanceBetweenLife;
    livesContainer.addChild(lifeSprite);
  }
  return livesContainer;
}

export function getWordsContainer() {
  const container = new PIXI.Container();
  const width = app.view.width;
  container.width = width;
  container.height = app.view.height - 140;
  return container;
}

export function getRandomNumber(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function getWordBg() {
  const textures = await PIXI.Assets.load(["letterTile"]);
  const letterTileSprite = new PIXI.Sprite(textures.letterTile);
  return letterTileSprite;
}

export function getPauseMenu() {
  let isMusicOn = true;
  let isSfxOn = true;

  // Container
  const pauseMenu = new PIXI.Container();
  const width = (app.view.height * 60) / 100;
  const height = (app.view.height * 80) / 100;
  pauseMenu.height = height;
  pauseMenu.width = width;
  pauseMenu.x = app.view.width / 2 - width / 2;
  pauseMenu.y = -(height + 100);

  // background
  const texture = PIXI.Texture.from(
    "/src/assets/options menu assets/mini options baord.png"
  );
  const pauseMenuBgSprite = new PIXI.Sprite(texture);
  pauseMenuBgSprite.width = width;
  pauseMenuBgSprite.height = height;
  pauseMenu.addChild(pauseMenuBgSprite);

  // Options Text
  const optionText = new PIXI.Text("OPTIONS", {
    fontSize: (height * 9) / 100,
    fontWeight: "500",
    fontFamily: "Boogaloo",
    fill: "#ffffff",
  });
  optionText.y = (height * 28) / 100;
  optionText.anchor.x = 0.5;
  optionText.x = width / 2;
  pauseMenu.addChild(optionText);

  // Music text
  const musicText = new PIXI.Text("MUSIC", {
    fontSize: (height * 7) / 100,
    fontWeight: "600",
    fontFamily: "Boogaloo",
    fill: "#56210c",
  });
  musicText.y = ((height * 28) / 100) * 1.8;
  musicText.x = (width * 15) / 100;
  pauseMenu.addChild(musicText);

  //MUSIC CHECK FILL
  const musicCheckFill = PIXI.Sprite.from(
    "/src/assets/options menu assets/check box indicator.png"
  );
  musicCheckFill.width = (height * 6) / 100;
  musicCheckFill.height = (height * 6) / 100;
  musicCheckFill.anchor.x = 1;
  musicCheckFill.x = width - (width * 17) / 100;
  musicCheckFill.y = ((height * 28) / 100) * 1.84;

  //Music on or off btn
  const musicCheckBox = PIXI.Sprite.from(
    "/src/assets/options menu assets/check box.png"
  );
  musicCheckBox.anchor.x = 1;
  musicCheckBox.width = (height * 9) / 100;
  musicCheckBox.height = (height * 9) / 100;
  musicCheckBox.y = ((height * 28) / 100) * 1.8;
  musicCheckBox.x = width - (width * 15) / 100;
  musicCheckBox.interactive = true;
  musicCheckBox.cursor = "pointer";
  musicCheckBox.on("pointerdown", () => {
    if (isMusicOn) {
      isMusicOn = false;
      pauseMenu.removeChild(musicCheckFill);
    } else {
      isMusicOn = true;
      pauseMenu.addChild(musicCheckFill);
    }
  });
  pauseMenu.addChild(musicCheckBox);
  pauseMenu.addChild(musicCheckFill);

  // SFX Text
  const sfxText = new PIXI.Text("SFX", {
    fontSize: (height * 7) / 100,
    fontWeight: "600",
    fontFamily: "Boogaloo",
    fill: "#56210c",
  });
  sfxText.y = ((height * 28) / 100) * 2.2;
  sfxText.x = (width * 15) / 100;
  pauseMenu.addChild(sfxText);

  // SFX CHECK FILL
  const sfxCheckFill = PIXI.Sprite.from(
    "/src/assets/options menu assets/check box indicator.png"
  );
  sfxCheckFill.width = (height * 6) / 100;
  sfxCheckFill.height = (height * 6) / 100;
  sfxCheckFill.anchor.x = 1;
  sfxCheckFill.x = width - (width * 17) / 100;
  sfxCheckFill.y = ((height * 28) / 100) * 2.24;

  //SFX on or off btn
  const sfxBox = PIXI.Sprite.from(
    "/src/assets/options menu assets/check box.png"
  );
  const sfxDimension = (height * 9) / 100;
  sfxBox.anchor.x = 1;
  sfxBox.width = sfxDimension;
  sfxBox.height = sfxDimension;
  sfxBox.y = ((height * 28) / 100) * 2.2;
  sfxBox.x = width - (width * 15) / 100;
  sfxBox.interactive = true;
  sfxBox.cursor = "pointer";
  sfxBox.on("pointerdown", () => {
    if (isSfxOn) {
      isSfxOn = false;
      pauseMenu.removeChild(sfxCheckFill);
    } else {
      isSfxOn = true;
      pauseMenu.addChild(sfxCheckFill);
    }
  });
  pauseMenu.addChild(sfxBox);
  pauseMenu.addChild(sfxCheckFill);

  const pauseButtons = [
    {
      spriteSrc: "/src/assets/options menu assets/reset button.png",
      anchor: 0,
      xPos: (width * 20) / 100,
      type: "RESTART",
    },
    {
      spriteSrc: "/src/assets/options menu assets/Main menu button.png",
      anchor: 0.5,
      xPos: width / 2,
      type: "MAIN MENU",
    },
    {
      spriteSrc: "/src/assets/options menu assets/resume_play button.png",
      anchor: 1,
      xPos: width - (width * 20) / 100,
      type: "WILL BE HANDLED BY GAME LOGIC",
    },
  ];

  pauseButtons.map((button) => {
    const btn = PIXI.Sprite.from(button.spriteSrc);
    btn.width = (width * 15) / 100;
    btn.height = (width * 15) / 100;
    btn.anchor.x = button.anchor;
    btn.y = ((height * 28) / 100) * 2.9;
    btn.x = button.xPos;
    btn.interactive = true;
    btn.cursor = "pointer";
    btn.on("pointerover", () => cursorOver(btn));
    btn.on("pointerout", () => cursorOut(btn));
    btn.on("pointerdown", () => handleClick(button.type));
    pauseMenu.addChild(btn);
  });

  function cursorOver(button) {
    button.width = (width * 16) / 100;
    button.height = (width * 16) / 100;
  }

  function cursorOut(button) {
    button.width = (width * 15) / 100;
    button.height = (width * 15) / 100;
  }

  function handleClick(type) {
    switch (type) {
      case "RESTART":
        app.stage.removeChild(app.stage.children[0]);
        loadNormalModeUI(app);
        break;
      case "MAIN MENU":
        app.stage.removeChild(app.stage.children[0]);
        loadMainMenu(app);
        break;
    }
  }

  return pauseMenu;
}
