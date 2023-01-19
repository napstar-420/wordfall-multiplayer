import { app } from "./app.js";

export function getMenuBoard(texture) {
  const menuBoardSprite = new PIXI.Sprite(texture);
  menuBoardSprite.width = app.view.height * 90 / 100;
  menuBoardSprite.height = app.view.height * 100 / 100;
  menuBoardSprite.anchor.x = 0.5
  return menuBoardSprite;
}

export function getBackground(texture) {
  const bgSprite = new PIXI.Sprite(texture);
  bgSprite.width = app.view.width;
  bgSprite.height = app.view.height;
  return bgSprite;
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

  const score = new PIXI.Text('0', {
    fontWeight: 'bold',
    fill: '#303030',
    fontFamily: 'Barlow'
  });
  score.anchor.x = 0.5;
  score.anchor.y = 0.5;
  score.x = 15;
  score.y = -3

  scoreFrame.addChild(scoreFrameSprite);
  scoreFrame.addChild(score);
  
  scoreFrame.scale.x = (app.view.height * 0.15) / 100
  scoreFrame.scale.y = (app.view.height * 0.15) / 100

  return scoreFrame;
}

export function getMultiplier() {
   // Multiplier
   const multiplier = new PIXI.Text('x1', {
    fontWeight: 'normal',
    fill: '#f3ba22',
    fontFamily: 'Luckiest Guy',
    fontSize: 40,
    stroke: '#ffffff',
    strokeThickness: 3,
  })
  multiplier.x = 30;
  multiplier.y = 5;
  multiplier.scale.x = (app.view.height * 0.15) / 100
  multiplier.scale.y = (app.view.height * 0.15) / 100
  return multiplier
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
  menuBtn.x = app.view.width + ((app.view.width * 1.5) / 100);
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
  const distanceBetweenLife = (width / 7) + ((app.view.width * 2) / 100);
  for (let i = 0; i < 7; i++) {
    const lifeSprite = new PIXI.Sprite(
      textures[getRandomNumber(textures.length - 1, 0)]
    );
    lifeSprite.anchor.y = 1;
    lifeSprite.anchor.x = 0;
    lifeSprite.scale.x = (app.view.height * 0.15) / 100
    lifeSprite.scale.y = (app.view.height * 0.15) / 100
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
  return container
}

export function getRandomNumber(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function getWordBg() {
  const textures = await PIXI.Assets.load(['letterTile']);
  const letterTileSprite = new PIXI.Sprite(textures.letterTile);
  return letterTileSprite;
}
  
