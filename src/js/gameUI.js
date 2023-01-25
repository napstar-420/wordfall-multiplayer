import { app } from "./app.js";
import loadMainMenu from "./mainMenu.js";
import loadNormalModeUI from "./normalMode/ui.js";
import { hoverSound, tapSound, normalModeBackMusic, brickBreakSound, turnMusicOff, turnMusicOn, turnSfxOff, turnSfxOn, bossModeBackMusic } from "./music and sounds/index.js";

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
  scoreFrame.scale.x = (app.view.height * 0.15) / 100;
  scoreFrame.scale.y = (app.view.height * 0.15) / 100;

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
  const clockFrame = new PIXI.Container();
  clockFrame.x = 30;
  clockFrame.y = 5;
  clockFrame.scale.x = (app.view.height * 0.15) / 100;
  clockFrame.scale.y = (app.view.height * 0.15) / 100;

  const clockFrameSprite = new PIXI.Sprite(texture);
  clockFrameSprite.width = 200;
  clockFrameSprite.height = 120;
  clockFrameSprite.anchor.y = 0.25;
  clockFrameSprite.anchor.x = 0.27;
  

  const time = new PIXI.Text("0", {
    fontWeight: "bold",
    fill: "#303030",
    fontFamily: "Barlow",
  });
  time.anchor.x = 0.5;
  time.anchor.y = 0.5;
  time.x = 65;
  time.y = 27;

  clockFrame.addChild(clockFrameSprite);
  clockFrame.addChild(time);

  return clockFrame;
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

export function getLivesContainer(textures, type) {
  const livesContainer = new PIXI.Container();
  const width = app.view.width - (app.view.width * 10 / 100);
  livesContainer.width = width;
  livesContainer.height = 80;
  livesContainer.x = (app.view.width * 4.5 / 100);
  livesContainer.y = app.view.height - 80;
  let numbersOfLife = 9;
  if (type === 'FLOWER') numbersOfLife = 16;
  const distanceBetweenLife = width / numbersOfLife + app.view.width * 1.4 / 100;
  for (let i = 0; i < numbersOfLife; i++) {
    const lifeSprite = new PIXI.Sprite(
      textures[getRandomNumber(textures.length - 1, 0)]
    );
    lifeSprite.anchor.y = 1;
    lifeSprite.anchor.x = 0.5;
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

export function getPauseMenu(bgTexture, resumeBtnTexture, restartBtnTexture, mainMenuBtnTexture, checkBoxTexture, checkFillTexture, type = 'NORMAL') {

  let isMusicOn = JSON.parse(localStorage.getItem('isMusicOn'));
  let isSfxOn = JSON.parse(localStorage.getItem('isSfxOn'));

  // Container
  const pauseMenu = new PIXI.Container();
  const width = (app.view.height * 60) / 100;
  const height = (app.view.height * 80) / 100;
  pauseMenu.height = height;
  pauseMenu.width = width;
  pauseMenu.x = app.view.width / 2 - width / 2;
  pauseMenu.y = -(height + 100);

  // background
  const pauseMenuBgSprite = new PIXI.Sprite(bgTexture);
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
  if (type === 'BOSS') {
    optionText.y = (height * 29.5) / 100;
  }
  optionText.anchor.x = 0.5;
  optionText.x = width / 2;
  pauseMenu.addChild(optionText);

  const pauseButtons = [
    {
      texture: restartBtnTexture,
      anchor: 0,
      xPos: (width * 20) / 100,
      type: "WILL BE HANDLED BY GAME LOGIC",
    },
    {
      texture: mainMenuBtnTexture,
      anchor: 0.5,
      xPos: width / 2,
      type: "MAIN MENU",
    },
    {
      texture: resumeBtnTexture,
      anchor: 1,
      xPos: width - (width * 20) / 100,
      type: "WILL BE HANDLED BY GAME LOGIC",
    },
  ];

  pauseButtons.map((button) => {
    const btn = new PIXI.Sprite(button.texture);
    btn.width = (width * 15) / 100;
    btn.height = (width * 15) / 100;
    btn.anchor.x = button.anchor;
    btn.y = ((height * 28) / 100) * 2.9;
    if (type === 'BOSS') btn.y = ((height * 25) / 100) * 2.9
    btn.x = button.xPos;
    btn.interactive = true;
    btn.cursor = "pointer";
    btn.on("pointerover", () => cursorOver(btn));
    btn.on("pointerout", () => cursorOut(btn));
    if (button.type !== 'WILL BE HANDLED BY GAME LOGIC') {
      btn.on("pointerdown", () => handleClick(button.type));
    }
    pauseMenu.addChild(btn);
  });

  function cursorOver(button) {
    hoverSound.pause();
    hoverSound.currentTime = 0;
    hoverSound.play();
    button.width = (width * 16) / 100;
    button.height = (width * 16) / 100;
  }

  function cursorOut(button) {
    hoverSound.pause();
    hoverSound.currentTime = 0;
    hoverSound.play();
    button.width = (width * 15) / 100;
    button.height = (width * 15) / 100;
  }

  function handleClick(type) {
    tapSound.pause();
    tapSound.currentTime = 0;
    tapSound.play();
    switch (type) {
        case "MAIN MENU":
        bossModeBackMusic.pause();
        normalModeBackMusic.pause();
        app.stage.removeChild(app.stage.children[0]);
        loadMainMenu(app);
        break;
    }
  }

  // Music text
  const musicText = new PIXI.Text("MUSIC", {
    fontSize: (height * 7) / 100,
    fontWeight: "600",
    fontFamily: "Boogaloo",
    fill: "#56210c",
  });
  musicText.y = ((height * 28) / 100) * 1.8;
  if (type === 'BOSS') musicText.y = ((height * 25) / 100) * 1.8;
  musicText.x = (width * 15) / 100;
  pauseMenu.addChild(musicText);

  //MUSIC CHECK FILL
  const musicCheckFill = new PIXI.Sprite(checkFillTexture);
  musicCheckFill.width = (height * 6) / 100;
  musicCheckFill.height = (height * 6) / 100;
  musicCheckFill.anchor.x = 1;
  musicCheckFill.x = width - (width * 17) / 100;
  musicCheckFill.y = ((height * 28) / 100) * 1.84;
  if (type === 'BOSS') musicCheckFill.y = ((height * 25) / 100) * 1.84;

  //Music on or off btn
  const musicCheckBox = new PIXI.Sprite(checkBoxTexture)
  musicCheckBox.anchor.x = 1;
  musicCheckBox.width = (height * 9) / 100;
  musicCheckBox.height = (height * 9) / 100;
  musicCheckBox.y = ((height * 28) / 100) * 1.8;
  if (type === 'BOSS') musicCheckBox.y = ((height * 25) / 100) * 1.8;
  musicCheckBox.x = width - (width * 15) / 100;
  musicCheckBox.interactive = true;
  musicCheckBox.cursor = "pointer";
  musicCheckBox.on("pointerdown", () => {
    tapSound.pause();
    tapSound.currentTime = 0;
    tapSound.play();
    if (isMusicOn) {
      isMusicOn = false;
      turnMusicOff();
      pauseMenu.removeChild(musicCheckFill);
    } else {
      turnMusicOn();
      isMusicOn = true;
      pauseMenu.addChild(musicCheckFill);
    }
  });

  pauseMenu.addChild(musicCheckBox);
  if (isMusicOn) {
    pauseMenu.addChild(musicCheckFill);
  }

  // SFX Text
  const sfxText = new PIXI.Text("SFX", {
    fontSize: (height * 7) / 100,
    fontWeight: "600",
    fontFamily: "Boogaloo",
    fill: "#56210c",
  });
  sfxText.y = ((height * 28) / 100) * 2.2;
  if (type === 'BOSS') sfxText.y = ((height * 25) / 100) * 2.2;
  sfxText.x = (width * 15) / 100;
  pauseMenu.addChild(sfxText);

  // SFX CHECK FILL
  const sfxCheckFill = new PIXI.Sprite(checkFillTexture);
  sfxCheckFill.width = (height * 6) / 100;
  sfxCheckFill.height = (height * 6) / 100;
  sfxCheckFill.anchor.x = 1;
  sfxCheckFill.x = width - (width * 17) / 100;
  sfxCheckFill.y = ((height * 28) / 100) * 2.24;
  if (type === 'BOSS') sfxCheckFill.y = ((height * 25) / 100) * 2.24;

  //SFX on or off btn
  const sfxBox = new PIXI.Sprite(checkBoxTexture);
  const sfxDimension = (height * 9) / 100;
  sfxBox.anchor.x = 1;
  sfxBox.width = sfxDimension;
  sfxBox.height = sfxDimension;
  sfxBox.y = ((height * 28) / 100) * 2.2;
  if (type === 'BOSS') sfxBox.y = ((height * 25) / 100) * 2.2;
  sfxBox.x = width - (width * 15) / 100;
  sfxBox.interactive = true;
  sfxBox.cursor = "pointer";
  sfxBox.on("pointerdown", () => {
    tapSound.pause();
    tapSound.currentTime = 0;
    tapSound.play();
    if (isSfxOn) {
      hoverSound.volume = 0;
      tapSound.volume = 0;
      brickBreakSound.volume = 0;
      isSfxOn = false;
      turnSfxOff();
      pauseMenu.removeChild(sfxCheckFill);
    } else {
      turnSfxOn();
      brickBreakSound.volume = 1;
      hoverSound.volume = 0.5;
      tapSound.volume = 1;
      isSfxOn = true;
      pauseMenu.addChild(sfxCheckFill);
    }
  });
  pauseMenu.addChild(sfxBox);
  if (isSfxOn) {
    pauseMenu.addChild(sfxCheckFill);
  }

  return pauseMenu;
}

export function getRulesBoard(texture, btnTexture, rulesInfo, level) {
  const board = new PIXI.Container();
  const boardWidth = app.view.width * 60 / 100;
  const boardHeight = app.view.height * 80 / 100;
  board.width = boardWidth;
  board.height = boardHeight;
  board.y = -(boardHeight + 100);
  board.x = app.view.width / 2 - boardWidth / 2;

  // Background
  const bg = new PIXI.Sprite(texture);
  bg.width = boardWidth;
  bg.height = boardHeight;
  board.addChild(bg);

  // Rules Heading;
  const rulesHeading = new PIXI.Text(`Level ${level}`, {
    fontSize: (boardWidth * 9) / 100,
    fontWeight: 500,
    fontFamily: "Boogaloo",
    fill: "#ff8316",
  })
  rulesHeading.anchor.set(0.5);
  rulesHeading.x = boardWidth / 2;
  rulesHeading.y = boardHeight * 28 / 100;
  board.addChild(rulesHeading);

  // Rules Text
  const rules = new PIXI.Text(rulesInfo, {
    fontSize: (boardWidth * 4) / 100,
    fontWeight: 500,
    fontFamily: "Boogaloo",
    fill: "#303030",
    wordWrap: true,
    wordWrapWidth: boardWidth * 64 / 100,
  })
  rules.x = boardWidth * 15 / 100;
  rules.y = boardHeight * 40 / 100;
  board.addChild(rules);

  // Adding StartGame Button
  const startGameBtn = new PIXI.Sprite(btnTexture);
  startGameBtn.anchor.set(0.5);
  startGameBtn.x = boardWidth / 2;
  startGameBtn.y = boardHeight * 78 / 100;
  startGameBtn.width = boardWidth * 25 / 100;
  startGameBtn.height = boardHeight * 12 / 100;
  board.addChild(startGameBtn);

  const startText= new PIXI.Text('START GAME', {
    fontSize: (boardWidth * 4) / 100,
    fontWeight: 500,
    fontFamily: "Boogaloo",
    fill: "#ffffff",
  })
  startText.anchor.set(0.5);
  startText.x = boardWidth / 2;
  startText.y = boardHeight * 78 / 100;
  board.addChild(startText);

  startGameBtn.interactive = true;
  startGameBtn.cursor = 'pointer';
  startGameBtn
  .on('pointerover', () => {
    hoverSound.pause();
    hoverSound.currentTime = 0;
    hoverSound.play();
    startText.scale.x = 1.1;
    startText.scale.y = 1.1;
  })
  .on('pointerout', () => {
    startText.scale.x = 1;
    startText.scale.y = 1;
  })

  return board;
}
